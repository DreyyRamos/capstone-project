import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ replyId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;
  const { replyId } = await params;
  const { content } = await req.json();

  const child = await prisma.forumCommentReplyToReplies.create({
    data: {
      replyToReply_content: content,
      parentReplyId: replyId,
      reply_authorId: user.id,
    },
    include: { reply_author: true },
  });

  return NextResponse.json(child, { status: 201 });
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

//   const resolvedParams = await params;
//   const replyId = resolvedParams.replyId;

//   const { reply_content } = await req.json();

//   if (!reply_content || !user.id)
//     return NextResponse.json(
//       { error: "Missing content or authorId" },
//       { status: 400 }
//     );

//   const nestedReply = await prisma.publicationCommentReplies.create({
//     data: {
//       reply_content: reply_content,
//       parentReplyId: replyId,
//       reply_authorId: user.id,
//     },
//   });
//   return NextResponse.json(nestedReply, { status: 201 });
// }
