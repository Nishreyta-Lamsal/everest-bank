import { revalidatePath } from 'next/cache';
import { NextRequest } from 'next/server';

import { PRIVATE_ENV } from '@/config/env';

const API_PROXY_TARGET =
  PRIVATE_ENV.API_PROXY_TARGET ?? 'http://143.110.240.38:8000';

const STRIPPED_RESPONSE_HEADERS = [
  'content-encoding',
  'content-length',
  'transfer-encoding',
];

const READ_METHODS = ['GET', 'HEAD', 'OPTIONS'];

/**
 * Prefixes that write something a reader never sees, so they must not purge
 * the page cache: `public/` is the reader's own traffic (a contact form post
 * would otherwise let anyone clear the cache at will), and `auth/` is login
 * and the token refresh that runs on a timer behind every editor session.
 */
const NON_CONTENT_PREFIXES = ['/api/v1/public/', '/api/v1/auth/'];

/**
 * Whether this request changed something a public page renders.
 *
 * Every CMS write leaves the editor through this proxy - the browser talks to
 * `/api/v1/*` same-origin so its session cookie stays first-party - so Next
 * learns about the edit here and needs no webhook back from Django.
 */
function isContentWrite(method: string, pathname: string, status: number) {
  if (READ_METHODS.includes(method)) return false;
  if (status >= 400) return false;

  return !NON_CONTENT_PREFIXES.some((prefix) => pathname.startsWith(prefix));
}

function rewriteSetCookie(cookie: string) {
  return cookie
    .replace(/;\s*Domain=[^;]*/gi, '') // host-only, so localhost keeps it
    .replace(/;\s*Secure/gi, '') // survives plain http
    .replace(/;\s*SameSite=None/gi, '; SameSite=Lax'); // None requires Secure
}

async function handler(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const upstreamUrl = `${API_PROXY_TARGET.replace(/\/$/, '')}${pathname}${search}`;

  const headers = new Headers(request.headers);
  headers.delete('host');
  headers.delete('accept-encoding'); // let fetch negotiate its own

  const hasBody = !['GET', 'HEAD'].includes(request.method);

  const upstreamResponse = await fetch(upstreamUrl, {
    method: request.method,
    headers,
    body: hasBody ? request.body : undefined,
    redirect: 'manual',
    // Required by undici when streaming a request body.
    ...(hasBody ? { duplex: 'half' } : {}),
  } as RequestInit);

  // ponytail: one edit clears every page rather than mapping each endpoint to
  // the pages it feeds. The site is ~30 cached marketing pages and staff edit
  // it a handful of times a day, so a rebuilt page costs less than a mapping
  // that silently misses a route. Narrow it if the edit rate ever climbs.
  //
  // In a Route Handler this only marks the paths stale; each one re-renders on
  // its next visit, so an edit does not rebuild the site at once.
  if (isContentWrite(request.method, pathname, upstreamResponse.status)) {
    revalidatePath('/', 'layout');
  }

  const responseHeaders = new Headers(upstreamResponse.headers);
  STRIPPED_RESPONSE_HEADERS.forEach((name) => responseHeaders.delete(name));

  // getSetCookie() keeps multiple Set-Cookie headers separate; a plain get()
  // would join them into one unparseable string.
  const setCookies = upstreamResponse.headers.getSetCookie?.() ?? [];

  if (setCookies.length > 0) {
    responseHeaders.delete('set-cookie');
    setCookies.forEach((cookie) => {
      responseHeaders.append('set-cookie', rewriteSetCookie(cookie));
    });
  }

  return new Response(upstreamResponse.body, {
    status: upstreamResponse.status,
    statusText: upstreamResponse.statusText,
    headers: responseHeaders,
  });
}

export {
  handler as GET,
  handler as POST,
  handler as PUT,
  handler as PATCH,
  handler as DELETE,
  handler as HEAD,
  handler as OPTIONS,
};
