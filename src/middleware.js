import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  async function middleware(req) {
    // console.log(req.nextUrl.pathname);
    // console.log(req.nextauth.token.role);

    const token = req.nextauth.token;

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    if (
      token.role !== "admin" &&
      (req.nextUrl.pathname.includes("/create-competition") ||
        req.nextUrl.pathname.includes("/update-competition") ||
        req.nextUrl.pathname.includes("/users"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      token.role !== "admin" &&
      token.role !== "coach" &&
      (req.nextUrl.pathname.includes("/create-course") ||
        req.nextUrl.pathname.includes("/update-course"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },

    // pages: {
    //   signIn: "/login",
    // },
  }
);

export const config = {
  matcher: [
    "/train/:path*",
    "/community/:path*",
    "/my-account",
    "/my-performance",
    "/competitions/create-competition",
    "/competitions/update-competition/:path*",
    "/users/:path*",
    "/courses/:path*",
    "/create-course/:path*",
    "/update-course/:path*",
  ],
};
