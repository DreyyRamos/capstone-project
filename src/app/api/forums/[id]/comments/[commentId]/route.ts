import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string; commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const resolvedParams = await params;
  const { id: forumId, commentId } = resolvedParams;

  const { reply_content } = await req.json();

  if (!reply_content || !user.id) {
    return NextResponse.json(
      { error: "Missing content or authorId" },
      { status: 400 }
    );
  }

  try {
    const reply = await prisma.forumCommentReplies.create({
      data: {
        reply_content: reply_content,
        commentId: commentId,
        reply_authorId: user.id,
        forumId,
        // No parentReplyId - this is a direct reply to comment
      },
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
    });

    return NextResponse.json(reply, { status: 201 });
  } catch (error) {
    console.error("Error creating reply:", error);
    return NextResponse.json(
      { error: "Error creating reply" },
      { status: 500 }
    );
  }
}

// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

// export async function POST(
//   req: NextRequest,
//   { params }: { params: Promise<{ commentId: string }> }
// ) {
//   const authResult = await authMiddleware(req);
//   if (authResult instanceof NextResponse) return authResult;
//   const { user } = authResult;

//   const resolvedParams = await params;
//   const commentId = resolvedParams.commentId;

//   const { reply_content } = await req.json();

//   try {
//     const reply = await prisma.publicationCommentReplies.create({
//       data: {
//         reply_content: reply_content,
//         reply_author: {
//           connect: { id: user.id },
//         },
//         comment: {
//           connect: { commentId: commentId },
//         },
//       },
//     });

//     return NextResponse.json(reply);
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Error creating comment" },
//       { status: 500 }
//     );
//   }
// }
