import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const { pathname } = req.nextUrl;
    const isAuth = !!req.nextauth.token;

    // Redirect authenticated users away from login
    if (isAuth && pathname === "/login") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }

    // Redirect unauthenticated users trying to access the dashboard
    if (!isAuth && pathname.startsWith("/dashboard")) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ["/dashboard/:path*", "/login"],
};
