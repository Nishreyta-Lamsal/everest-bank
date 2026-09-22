import { ADMIN_ROUTE } from '@/constants/admin';

export const ACCESS_TOKEN_COOKIE = 'access_token';

export const PROTECTED_ROUTES = [
  ADMIN_ROUTE.DASHBOARD,
  ADMIN_ROUTE.PAGES,
  ADMIN_ROUTE.PRODUCTS,
  ADMIN_ROUTE.NOTICES_AND_NEWS,
  ADMIN_ROUTE.FOREX_RATES,
  ADMIN_ROUTE.FORMS,
  ADMIN_ROUTE.ASSETS,
  ADMIN_ROUTE.FOOTER,
  ADMIN_ROUTE.LOCATIONS,
  ADMIN_ROUTE.CALENDARS,
  ADMIN_ROUTE.TOOLS,
  ADMIN_ROUTE.MORE_SERVICES,
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
