import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";

export async function POST(req: NextRequest) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { id } = authResult.user;

  const { title, excerpt, content, imageUrl, tags, category } =
    await req.json();
  try {
    const publication = await prisma.publication.create({
      data: {
        title,
        excerpt,
        content,
        imageUrl,
        tags,
        category,
        author: {
          connect: { id: id },
        },
      },
    });
    return NextResponse.json({ publication });
  } catch (error) {
    return NextResponse.json(
      { message: `Something went wrong! ${error}` },
      { status: 500 }
    );
  }
}
