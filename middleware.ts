import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Allow auth routes without authentication
  if (pathname.startsWith('/(auth)') || pathname === '/' || pathname === '/login') {
    return NextResponse.next();
  }

  // Check for auth session in cookies or localStorage (via header)
  const authSession = request.cookies.get('auth_session');

  // If not authenticated and trying to access admin routes, redirect to login
  if (!authSession && pathname.startsWith('/(admin)')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
