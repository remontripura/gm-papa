import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("GM_T")?.value;
  const { pathname } = request.nextUrl;

  if (!token && ["/profile", "/my-order"].includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/profile", "/my-order"],
};
