import axios from 'axios';

import { getApiBaseUrl } from './base-url';

/**
 * A bare client with no interceptors — refreshing must never re-enter the
 * 401 handler that triggered it.
 */
const refreshClient = axios.create({
  baseURL: getApiBaseUrl(),
  withCredentials: true,
});

/** Module-level promise so a burst of parallel 401s triggers one refresh. */
let refreshPromise: Promise<void> | null = null;

export function refreshAccessToken(): Promise<void> {
  refreshPromise ??= refreshClient
    .post('auth/token/refresh/')
    .then(() => undefined)
    .finally(() => {
      refreshPromise = null;
    });

  return refreshPromise;
}

export async function logout(): Promise<void> {
  try {
    await refreshClient.post('auth/token/logout/');
  } catch {
    // Best effort: the cookies are cleared client-side by the redirect anyway.
  }
}
