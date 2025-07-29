// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "../(middlware)/auth";

export async function POST(req: Request) {
  const { firstName, lastName, email, password } = await req.json();

  if (!email || !firstName || !lastName || !password) {
    return NextResponse.json(
      { message: "Missing required fields" },
      { status: 400 }
    );
  }

  const hashedPassword = await hashPassword(password);

  try {
    const user = await prisma.user.create({
      data: {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        // profileImage,
      },
    });

    return NextResponse.json({ message: "User registered successfully", user });
  } catch (error) {
    return NextResponse.json({ message: "Error registering user", error });
  }
}
