// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { comparePassword, signToken } from "../(middlware)/auth";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user || !(await comparePassword(password, user.password))) {
      return NextResponse.json(
        { message: "Invalid credentials" },
        { status: 400 }
      );
    }

    const token = signToken({
      id: user.id,
      email: user.email,
      role: user.role,
    });
    return NextResponse.json({ user, token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ message: `Something went wrong! ${error}` });
  }
}
