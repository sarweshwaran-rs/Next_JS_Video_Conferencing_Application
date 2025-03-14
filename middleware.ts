import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([
  '/(.*)',
  '/upcoming(.*)',
  '/previous(.*)',
  '/recordings(.*)',
  '/personal-room(.*)',
  '/meeting(.*)'
])


export default clerkMiddleware((auth, req) => {

  if (req.nextUrl.pathname.startsWith("/sign-in") || req.nextUrl.pathname.startsWith("/sign-up")) {
    return NextResponse.next();
  }

  if (protectedRoutes(req)) {
    return auth
      .protect()
      .then(() =>NextResponse.next())
      .catch(() => NextResponse.rewrite(new URL('/sign-in', req.url)));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
