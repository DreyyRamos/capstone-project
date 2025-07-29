import { NextRequest, NextResponse } from "next/server";
import { UserPayload } from "@/types/auth";
import { verifyToken } from "./auth";

export async function authMiddleware(req: NextRequest) {
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
        { message: "No token provided" },
        { status: 401 }
      );
    }

    // Verify token
    const decoded = verifyToken(token) as UserPayload;

    // Clone request and attach user
    const request = req.clone();
    (request as any).user = decoded;

    return { request, user: decoded };
  } catch (error) {
    console.error("Auth middleware error:", error);
    return NextResponse.json(
      { message: "Invalid or expired token" },
      { status: 401 }
    );
  }
}
