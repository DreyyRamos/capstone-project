import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// pages that guests may see but logged-in users should leave
const GUEST_ONLY = ["/login", "/register"];

// pages that absolutely need a token
const AUTH_REQUIRED = [
  "/profile",
  "/content-manager",
  "/forum/create",
  "/moderation",
  "/users",
  "/admissions",
  "/publications/create",
  "/request-role-change",
  "/role-request",
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  const token = req.cookies.get("token")?.value;

  // logged-in user on /login or /register
  if (GUEST_ONLY.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/", req.url)); // send to the homepage
  }

  // anonymous user on a protected route
  const needsAuth = AUTH_REQUIRED.some((p) => pathname.startsWith(p));
  if (needsAuth && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  //everything else (including "/")
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], // exclude Next.js internals
};
