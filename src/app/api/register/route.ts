// import { PrismaClient } from "@prisma/client";
import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { hashPassword } from "../(middlware)/auth";

export async function POST(req: Request) {
  try {
    // Parse FormData instead of JSON
    const formData = await req.formData();

    // Extract fields from FormData
    const user_email = formData.get("user_email") as string;
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const password = formData.get("password") as string;
    const profileImage = formData.get("profileImage") as string;
    const id_picture = formData.get("id_picture") as string;
    const bio = formData.get("bio") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const location = formData.get("location") as string;
    const interestsString = formData.get("interests") as string;

    // Parse interests JSON string back to array
    let interests = [];
    if (interestsString) {
      try {
        interests = JSON.parse(interestsString);
      } catch (error) {
        console.error("Error parsing interests:", error);
        interests = [];
      }
    }

    // Validate required fields
    if (!user_email || !firstName || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    const hashedPassword = await hashPassword(password);

    const existing = await prisma.user.findUnique({
      where: { email: user_email },
      select: { id: true },
    });
    if (existing) {
      return NextResponse.json(
        {
          status: 409,
          message: "E-mail already registered",
        },
        { status: 409 }
      );
    } else {
      const user = await prisma.userAdmission.create({
        data: {
          user_email,
          firstName,
          lastName: lastName || "",
          password: hashedPassword,
          profileImage: profileImage || null,
          id_picture: id_picture || null,
          bio: bio || null,
          contactNumber: contactNumber || null,
          location: location || null,
          interests: interests,
        },
      });
    }

    return NextResponse.json({
      message: "User registered successfully",
    });
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      {
        message: "Error registering user",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
