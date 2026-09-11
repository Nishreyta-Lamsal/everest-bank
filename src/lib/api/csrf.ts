import axios from 'axios';

import { getApiBaseUrl } from './base-url';

const CSRF_COOKIE = 'csrftoken';

/** Cached token, and a shared promise so concurrent callers fire one fetch. */
let cachedToken: string | null = null;
let inFlight: Promise<string> | null = null;

function readCookieToken(): string | null {
  if (typeof document === 'undefined') return null;

  const match = document.cookie.match(
    new RegExp(`(?:^|;\\s*)${CSRF_COOKIE}=([^;]*)`),
  );

  return match ? decodeURIComponent(match[1]) : null;
}

/** Bare client: no interceptors, so fetching CSRF can never recurse. */
const csrfClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

async function fetchToken(): Promise<string> {
  const response = await csrfClient.get('auth/csrf/');
  // The API returns { data: { csrf_token } }; fall back to the cookie it set.
  const token =
    response.data?.data?.csrf_token ??
    response.data?.csrf_token ??
    readCookieToken() ??
    '';

  cachedToken = token;
  return token;
}

export async function getCsrfToken(): Promise<string> {
  const fromCookie = readCookieToken();
  if (fromCookie) {
    cachedToken = fromCookie;
    return fromCookie;
  }

  if (cachedToken) return cachedToken;

  inFlight ??= fetchToken().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

/** Force a refetch after the server rejects the current token. */
export async function refreshCsrfToken(): Promise<string> {
  cachedToken = null;

  inFlight ??= fetchToken().finally(() => {
    inFlight = null;
  });

  return inFlight;
}

export function clearCsrfToken() {
  cachedToken = null;
}
