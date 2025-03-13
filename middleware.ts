import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from 'next/server';

const protectedRoutes = createRouteMatcher([
    '/',
    '/upcoming',
    '/previous',
    '/recordings',
    '/personal-room',
    '/meeting(.*)',
])


export default clerkMiddleware((auth, req)=>{
  
  if (protectedRoutes(req)) {
    return auth.protect().then(() => NextResponse.next()).catch(() => NextResponse.redirect('/sign-in'));
  } 
  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
