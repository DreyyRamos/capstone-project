import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(_req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;
  const { commentId } = await params;

  // 1) top-level replies
  const top = await prisma.publicationCommentReplies.findMany({
    where: { commentId },
    include: { reply_author: true },
    orderBy: { createdAt: "asc" },
  });

  // 2) nested replies
  const nested = await prisma.publicationCommentReplyToReplies.findMany({
    where: { parentReplyId: { in: top.map((r) => r.replyId) } },
    include: { reply_author: true },
    orderBy: { createdAt: "asc" },
  });

  // 3) single flat payload
  return NextResponse.json({
    top: top.map((t) => ({ ...t, children: [] })),
    nested,
  });
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ commentId: string }> }
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  // const resolvedParams = await params;
  // const commentId = resolvedParams.commentId;
  const { commentId } = await params;

  const { reply_content } = await req.json();

  if (!reply_content || !user.id)
    return NextResponse.json(
      { error: "Missing content or authorId" },
      { status: 400 }
    );

  const reply = await prisma.publicationCommentReplies.create({
    data: {
      reply_content,
      commentId,
      reply_authorId: user.id,
    },
  });
  return NextResponse.json(reply, { status: 201 });
}
