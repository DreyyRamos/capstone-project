import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // Await the params to resolve the Promise
  const resolvedParams = await params;
  const commentId = resolvedParams.commentId;

  try {
    const likePub = await prisma.$transaction(async (tx) => {
      const pubComment = await tx.publicationComments.findUnique({
        where: { commentId },
        select: { authorId: true },
      });
      if (!pubComment) throw new Error("Publication comment not found");

      const authorId = pubComment.authorId; // still nullable
      const existingLike = await tx.publicationCommentLikes.findUnique({
        where: { commentId_userId: { commentId, userId: user.id } },
      });

      let result;
      let shouldAward = false;

      if (existingLike) {
        // user row already exists → just flip the flag, **never** award again
        result = await tx.publicationCommentLikes.update({
          where: { commentLikeId: existingLike.commentLikeId },
          data: { isLiked: !existingLike.isLiked },
        });
      } else {
        // very first like from this user to create row + award once
        result = await tx.publicationCommentLikes.create({
          data: { commentId, userId: user.id, isLiked: true },
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
//   { params }: { params: Promise<{ commentId: string }> }
// ) {
//   const authResult = await authMiddleware(req);
//   if (authResult instanceof NextResponse) return authResult;
//   const { user } = authResult;

//   // Await the params to resolve the Promise
//   const resolvedParams = await params;
//   const commentId = resolvedParams.commentId;

//   try {
//     const existingLike = await prisma.publicationCommentLikes.findUnique({
//       where: {
//         commentId_userId: { commentId: commentId, userId: user.id },
//       },
//     });

//     if (existingLike) {
//       const updatedLike = await prisma.publicationCommentLikes.update({
//         where: {
//           commentLikeId: existingLike.commentLikeId,
//         },
//         data: {
//           isLiked: !existingLike.isLiked,
//         },
//       });
//       return NextResponse.json(updatedLike);
//     } else {
//       const newLike = await prisma.publicationCommentLikes.create({
//         data: {
//           commentId: commentId,
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
