import { ADMIN_ROUTE } from '@/constants/admin';

export const ACCESS_TOKEN_COOKIE = 'access_token';

export const PROTECTED_ROUTES = [
  ADMIN_ROUTE.DASHBOARD,
  ADMIN_ROUTE.PAGES,
  ADMIN_ROUTE.PRODUCTS,
];

export const PUBLIC_ROUTES = [ADMIN_ROUTE.LOGIN];

export function isProtectedRoute(pathname: string) {
  return PROTECTED_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}

export function isPublicRoute(pathname: string) {
  return PUBLIC_ROUTES.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`),
  );
}
