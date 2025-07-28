import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Route protection middleware
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected routes mapping
  const protectedRoutes = {
    "/users": ["users.view"],
    "/analytics": ["analytics.view"],
    "/moderation": ["moderation.reports"],
    "/content": ["publications.edit.any"],
  };

  // Check if route needs protection
  const requiredPermissions =
    protectedRoutes[pathname as keyof typeof protectedRoutes];

  if (requiredPermissions) {
    // get user from session/JWT pag naimplement ko na
    const userRole = request.headers.get("x-user-role") || "student";

    // Check permissions (verify JWT/session)
    const hasAccess = checkUserAccess(userRole, requiredPermissions);

    if (!hasAccess) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
  }

  return NextResponse.next();
}

function checkUserAccess(
  userRole: string,
  requiredPermissions: string[]
): boolean {
  // Simplified check - use proper permission checking once idedeploy ko na
  const rolePermissions = {
    student: ["publications.create"],
    moderator: ["publications.create", "moderation.reports"],
    editor: ["publications.create", "publications.edit.any", "analytics.view"],
    admin: [
      "users.view",
      "analytics.view",
      "moderation.reports",
      "publications.edit.any",
    ],
  };

  const userPermissions =
    rolePermissions[userRole as keyof typeof rolePermissions] || [];

  return requiredPermissions.some((permission) =>
    userPermissions.includes(permission)
  );
}

export const config = {
  matcher: [
    "/users/:path*",
    "/analytics/:path*",
    "/moderation/:path*",
    "/content/:path*",
  ],
};
