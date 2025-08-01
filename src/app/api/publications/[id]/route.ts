import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const resolvedParams = await params;
  const pubId = resolvedParams.id;

  try {
    const fetchPost = await prisma.publication.findUnique({
      where: {
        pubId: pubId,
      },
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            profileImage: true,
          },
        },
        pubComments: {
          select: {
            comment_content: true,
            author: {
              select: {
                id: true,
                firstName: true,
                profileImage: true,
                role: true,
              },
            },
            commentId: true,
          },
        },
        pubLikes: true,
      },
    });

    return NextResponse.json(fetchPost);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "An error occurred while fetching the post." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const resolvedParams = await params;
  const pubId = resolvedParams.id;

  if (!pubId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }
  const { title, content, imageUrl } = await req.json();

  try {
    const updatePost = await prisma.publication.update({
      where: {
        pubId: pubId,
      },
      data: {
        title,
        content,
        imageUrl,
      },
    });

    console.log(updatePost);
    return NextResponse.json(updatePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while updating the post." },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const resolvedParams = await params;
  const pubId = resolvedParams.id;

  if (!pubId) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const deletePost = await prisma.publication.delete({
      where: { pubId: pubId },
    });

    console.log("post deleted");
    return NextResponse.json(deletePost);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the post." },
      { status: 500 }
    );
  }
}
