import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../../(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug: category } = await params;

  try {
    // Properly construct the where condition
    let whereCondition;

    if (category === "Uncategorized" || !category) {
      // For uncategorized items, look for null or empty category
      whereCondition = {
        OR: [
          { category: null },
          { category: "" },
          { category: "Uncategorized" },
        ],
      };
    } else {
      // For specific categories
      whereCondition = { category: category };
    }

    const fetchPost = await prisma.forum.findMany({
      orderBy: { createdAt: "desc" },
      where: whereCondition,
      include: {
        author: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            role: true,
          },
        },
        forumLikes: true,

        forumComments: {
          orderBy: { createdAt: "asc" },
          include: {
            author: {
              select: {
                id: true,
                firstName: true,
                lastName: true,
                profileImage: true,
                role: true,
              },
            },

            // top-level replies
            replies: {
              orderBy: { createdAt: "asc" },
              include: {
                reply_author: {
                  select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    profileImage: true,
                    role: true,
                  },
                },

                // nested replies
                children: {
                  orderBy: { createdAt: "asc" },
                  include: {
                    reply_author: {
                      select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        profileImage: true,
                        role: true,
                      },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return NextResponse.json(fetchPost);
  } catch (error) {
    console.error("Error fetching forum posts:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching the post." },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;

  const { id: pubId } = await params;

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
  { params }: { params: Promise<{ id: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;

  const { id: pubId } = await params;

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
