import { NextRequest, NextResponse } from 'next/server';

import { ACCESS_TOKEN_COOKIE, isProtectedRoute } from '@/lib/admin/session';

import { ADMIN_ROUTE } from '@/constants/admin';

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  const hasSession = request.cookies.has(ACCESS_TOKEN_COOKIE);

  if (hasSession) {
    return NextResponse.next();
  }

  const loginUrl = new URL(ADMIN_ROUTE.LOGIN, request.url);
  loginUrl.searchParams.set('next', `${pathname}${search}`);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    '/admin/dashboard/:path*',
    '/admin/pages/:path*',
    '/admin/products/:path*',
  ],
};
