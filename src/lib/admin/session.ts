import { ADMIN_ROUTE } from '@/constants/admin';

/** Cookie the backend sets on login. Presence only — validity is the 401 path's job. */
export const ACCESS_TOKEN_COOKIE = 'access_token';

/**
 * Routes that require a session. Keep in sync with the matcher in
 * `src/proxy.ts`.
 */
export const PROTECTED_ROUTES = [
  ADMIN_ROUTE.DASHBOARD,
  ADMIN_ROUTE.PAGES,
  ADMIN_ROUTE.PRODUCTS,
];

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
