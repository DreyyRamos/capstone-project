import { NextRequest, NextResponse } from "next/server";
import { UserPayload } from "@/types/auth";
import { verifyToken } from "./auth";

export async function authMiddleware(
  req: NextRequest,
  allowedRoles?: string[],
) {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.get("authorization");

    const token = authHeader
      ? authHeader.startsWith("Bearer ")
        ? authHeader.substring(7)
        : authHeader
      : null;

    if (!token) {
      return NextResponse.json(
        { message: "No token provided", code: "NO_TOKEN" },
        { status: 401 },
      );
    }

    // Verify token
    const decoded = verifyToken(token) as UserPayload;

    if (allowedRoles && !allowedRoles.includes(decoded.role)) {
      return NextResponse.json(
        { message: "Forbidden: Insufficient permissions", code: "FORBIDDEN" },
        { status: 403 },
      );
    }

    // Clone request and attach user
    const request = req.clone();
    (request as any).user = decoded;

    return { request, user: decoded };
  } catch (error) {
    console.error("Auth middleware error:", error);

    if (error instanceof Error) {
      if (error.message === "TOKEN_EXPIRED") {
        return NextResponse.json(
          { message: "Token has expired", code: "TOKEN_EXPIRED" },
          { status: 401 },
        );
      }
      if (error.message === "TOKEN_INVALID") {
        return NextResponse.json(
          { message: "Invalid token", code: "TOKEN_INVALID" },
          { status: 401 },
        );
      }
    }

    return NextResponse.json(
      { message: "Authentication failed", code: "AUTH_FAILED" },
      { status: 401 },
    );
  }
}