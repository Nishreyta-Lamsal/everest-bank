import { PRIVATE_ENV, PUBLIC_ENV } from '@/config/env';

/**
 * Server-side requests have no browser origin to resolve a relative path
 * against, so they must hit the backend directly. Browser requests go
 * through the same-origin `/api/v1/*` proxy (`src/app/api/v1/[...path]`) so
 * session cookies stay first-party instead of being scoped to the backend's
 * own origin.
 */
export function getApiBaseUrl() {
  if (typeof window === 'undefined') {
    return `${PRIVATE_ENV.API_PROXY_TARGET.replace(/\/$/, '')}/api/v1`;
  }

  return PUBLIC_ENV.API_BASE_URL;
}
