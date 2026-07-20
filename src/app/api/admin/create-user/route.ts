import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    // const { id: authorId } = authResult.user;

    const { email, firstName, lastName, password } = await req.json();

    const newUser = await prisma.user.create({
      data: {
        email,
        firstName,
        lastName,
        password,
      },
    });

    return NextResponse.json({ user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      { message: "Failed to create new user" },
      { status: 500 },
    );
  }
}
