import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // Await the params to resolve the Promise
  const resolvedParams = await params;
  const replyId = resolvedParams.replyId;

  try {
    const likePub = await prisma.$transaction(async (tx) => {
      const pubCommentReplies = await tx.publicationCommentReplies.findUnique({
        where: { replyId },
        select: { reply_authorId: true },
      });
      if (!pubCommentReplies) throw new Error("Publication comment not found");

      const authorId = pubCommentReplies.reply_authorId; // still nullable
      const existingLike = await tx.publicationCommentReplyLikes.findUnique({
        where: { replyId_userId: { replyId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.publicationCommentReplyLikes.update({
          where: { commentReplyLikeId: existingLike.commentReplyLikeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.publicationCommentReplyLikes.create({
          data: { replyId, userId: user.id, isLiked: true },
        });
        if (authorId) shouldAward = true;
      }

      // one-time reputation bump (only on first-ever like from user)
      if (shouldAward) {
        await tx.user.update({
          where: { id: authorId! },
          data: { reputationPoints: { increment: 8 } },
        });
      }

      return result;
    });

    return NextResponse.json({
      status: 200,
      message: "Publication liked successfully!",
      data: likePub,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
  }
}


// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

// export async function POST(
//   req: NextRequest,
//   { params }: { params: Promise<{ replyId: string }> }
// ) {
//   const authResult = await authMiddleware(req);
//   if (authResult instanceof NextResponse) return authResult;
//   const { user } = authResult;

//   // Await the params to resolve the Promise
//   const resolvedParams = await params;
//   const replyId = resolvedParams.replyId;

//   try {
//     const existingLike = await prisma.publicationCommentReplyLikes.findUnique({
//       where: {
//         replyId_userId: { replyId: replyId, userId: user.id },
//       },
//     });

//     if (existingLike) {
//       const updatedLike = await prisma.publicationCommentReplyLikes.update({
//         where: {
//           commentReplyLikeId: existingLike.commentReplyLikeId,
//         },
//         data: {
//           isLiked: !existingLike.isLiked,
//         },
//       });
//       return NextResponse.json(updatedLike);
//     } else {
//       const newLike = await prisma.publicationCommentReplyLikes.create({
//         data: {
//           replyId: replyId,
//           userId: user.id,
//           isLiked: true,
//         },
//       });
//       return NextResponse.json(newLike);
//     }
//   } catch (error) {
//     return NextResponse.json({ error: "Error toggling like" }, { status: 500 });
//   }
// }
