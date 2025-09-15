// your-api-route.ts

import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function PATCH(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  try {
    // Find the post to get its current state
    const post = await prisma.publication.findUnique({
      where: { pubId: id },
      select: { isFeatured: true }, // only need the isFeatured field
    });

    if (!post) {
      return NextResponse.json(
        { message: "Publication not found" },
        { status: 404 }
      );
    }

    // Determine the new value by toggling the current one
    const newFeaturedStatus = !post.isFeatured;

    // Update the post with the new toggled value
    await prisma.publication.update({
      where: { pubId: id },
      data: { isFeatured: newFeaturedStatus }, // Use the toggled value
    });

    return NextResponse.json({ ok: true, isFeatured: newFeaturedStatus });
  } catch (error) {
    console.error("Failed to toggle featured status:", error);
    return NextResponse.json({ message: "An error occurred" }, { status: 500 });
  }
}
