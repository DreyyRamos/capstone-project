import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const featuredPublications = await prisma.publication.findMany({
      where: {
        status: "ARCHIVED",
      },
      // Optionally include author details or order them
      orderBy: {
        createdAt: "asc",
      },
      include: {
        author: {
          select: {
            firstName: true,
            lastName: true,
            profileImage: true,
            role: true,
          },
        },
      },
    });

    return NextResponse.json(featuredPublications);
  } catch (error) {
    console.error("Failed to fetch featured publications:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
