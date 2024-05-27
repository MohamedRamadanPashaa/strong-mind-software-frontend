export { default } from "next-auth/middleware";
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req });
  if (!token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (
    token.role !== "admin" &&
    (req.nextUrl.pathname.includes("/create-competition") ||
      req.nextUrl.pathname.includes("/update-competition"))
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
}

export const config = {
  matcher: [
    "/train/:path*",
    "/community/:path*",
    "/my-account",
    "/my-performance",
    "/competitions/create-competition",
    "/competitions/update-competition/:path*",
  ],
};
