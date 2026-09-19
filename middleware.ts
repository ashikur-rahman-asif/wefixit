import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname } = request.nextUrl;

  if (token && pathname.startsWith("/auth")) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (pathname.startsWith("/admin")) {
    if (!token) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }

    if (!userRole) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete("token");
      return response;
    }

    if (userRole !== "admin") {
      return NextResponse.redirect(new URL("/403", request.url));
    }
  }

  if (
    userRole === "admin" &&
    (pathname.startsWith("/checkout") || pathname.startsWith("/account"))
  ) {
    const errorUrl = new URL("/403", request.url);
    errorUrl.searchParams.set("error", "admin_checkout");
    return NextResponse.redirect(errorUrl);
  }

  if (!token && pathname.startsWith("/account")) {
    const loginUrl = new URL("/auth/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
  ],
};
