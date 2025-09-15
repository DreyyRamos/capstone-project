// app/api/public/users/route.ts
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const count = await prisma.user.count();
    return NextResponse.json({ count });
  } catch {
    return NextResponse.json(
      { error: "Failed to count users" },
      { status: 500 }
    );
  }
}
