import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const pubId = resolvedParams.id;

  const { id: pubId } = await params;

  const { comment_content } = await req.json();

  try {
    const comment = await prisma.publicationComments.create({
      data: {
        comment_content: comment_content,
        author: {
          connect: { id: user.id },
        },
        publication: {
          connect: { pubId: pubId },
        },
      },
    });

    return NextResponse.json(comment);
  } catch (error) {
    return NextResponse.json(
      { error: "Error creating comment" },
      { status: 500 }
    );
  }
}
