import { NextRequest, NextResponse } from 'next/server';

import {
  ACCESS_TOKEN_COOKIE,
  isProtectedRoute,
  isPublicRoute,
} from '@/lib/admin/session';

import { ADMIN_ROUTE } from '@/constants/admin';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  const hasSession = request.cookies.has(ACCESS_TOKEN_COOKIE);

  if (isPublicRoute(pathname)) {
    if (hasSession) {
      return NextResponse.redirect(new URL(ADMIN_ROUTE.DASHBOARD, request.url));
    }

    return NextResponse.next();
  }

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL(ADMIN_ROUTE.LOGIN, request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/admin/login',
    '/admin/dashboard/:path*',
    '/admin/pages/:path*',
    '/admin/products/:path*',
  ],
};
