import { NextRequest } from 'next/server';

import { PRIVATE_ENV } from '@/config/env';

const API_PROXY_TARGET =
  PRIVATE_ENV.API_PROXY_TARGET ?? 'http://143.110.240.38:8000';

const STRIPPED_RESPONSE_HEADERS = [
  'content-encoding',
  'content-length',
  'transfer-encoding',
];

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
