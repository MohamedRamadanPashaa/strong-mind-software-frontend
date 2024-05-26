import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    console.log(req.nextUrl.pathname);
    console.log(req.nextauth.token.role);

    if (
      req.nextUrl.pathname.includes("/create-competition") &&
      req.nextauth.token.role !== "admin"
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
    pages: {
      signIn: "/login",
    },
  }
);

export const config = {
  matcher: [
    "/train/:path*",
    "/community/:path*",
    "/my-account",
    "/my-performance",
    "/competitions/create-competition",
  ],
};
