import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("FFT")?.value;
  const { pathname } = request.nextUrl;

  if (
    !token &&
    [
      "/profile",
      "/my-order",
      "/wallet-balance",
      "/profile/edit",
      "/wallet-history",
    ].includes(pathname)
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
}

export const config = {
  matcher: [
    "/profile",
    "/my-order",
    "/wallet-balance",
    "/profile/edit",
    "/wallet-history",
  ],
};
