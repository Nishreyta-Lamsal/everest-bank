import { NextResponse } from 'next/server';

import { ROUTE, SITE_ACCESS_COOKIE, SITE_ACCESS_VALUE } from '@/constants';

import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const hasAccess =
    request.cookies.get(SITE_ACCESS_COOKIE)?.value === SITE_ACCESS_VALUE;
  const isLoginRoute = request.nextUrl.pathname === ROUTE.ADMIN_LOGIN;

  if (hasAccess) {
    return isLoginRoute
      ? NextResponse.redirect(new URL(ROUTE.PERSONAL, request.url))
      : NextResponse.next();
  }

  return isLoginRoute
    ? NextResponse.next()
    : NextResponse.redirect(new URL(ROUTE.ADMIN_LOGIN, request.url));
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|woff2?|ttf)$).*)',
  ],
};
