import { NextResponse } from "next/server";
import { auth } from "./auth";

const privateRoutes = ["/dashboard", "/profile", "/savings", "/investments", "/friends"];

// https://authjs.dev/reference/nextjs#in-middleware
export default auth(({ auth, nextUrl }) => {
  const { pathname } = nextUrl;
  console.log(auth, typeof auth);

  if (auth && (pathname === "/" || pathname === "/sign-in")) {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
  if (!auth && privateRoutes.some((route) => pathname.startsWith(route))) {
    return NextResponse.redirect(new URL("/sign-in", nextUrl));
  }

  return NextResponse.next();
});

// https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
