import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PROTECTED = ["/product", "/profile"];

function isProtected(pathname: string) {
  return PROTECTED.some((prefix) => pathname.startsWith(prefix));
}

export function middleware(request: NextRequest) {
  if (isProtected(request.nextUrl.pathname)) {
    const token = request.cookies.get("better-auth.session_token")?.value;
    if (!token) {
      const url = new URL("/signin", request.url);
      url.searchParams.set("redirect", request.nextUrl.pathname);
      return NextResponse.redirect(url);
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};