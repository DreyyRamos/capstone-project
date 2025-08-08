import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function PUT(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { id } = authResult.user;

  const {
    firstName,
    lastName,
    email,
    contactNumber,
    bio,
    location,
    interests,
    profileImage,
  } = await req.json();

  try {
    const updateUser = await prisma.user.update({
      where: {
        id: id,
      },
      data: {
        firstName,
        lastName,
        email,
        contactNumber,
        bio,
        location,
        interests,
        profileImage,
      },
    });
    return NextResponse.json(updateUser);
  } catch (error) {
    return NextResponse.json(
      { error: "An error occurred while updating the user." },
      { status: 500 }
    );
  }
}
