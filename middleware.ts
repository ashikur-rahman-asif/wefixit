import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const userRole = request.cookies.get("user_role")?.value;
  const { pathname, searchParams } = request.nextUrl;

  if (searchParams.get("clear") === "1") {
    const response = NextResponse.redirect(new URL("/auth/login", request.url));
    response.cookies.delete("token");
    response.cookies.delete("user_role");
    return response;
  }

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

  const protectedUserRoutes = [
    "/account",
    "/checkout",
    "/order-success",
    "/orders",
    "/my-repairs",
  ];

  const isProtectedUserRoute = protectedUserRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (userRole === "admin" && isProtectedUserRoute) {
    const errorUrl = new URL("/403", request.url);
    errorUrl.searchParams.set("error", "admin_checkout");
    return NextResponse.redirect(errorUrl);
  }

  if (!token && isProtectedUserRoute) {
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
