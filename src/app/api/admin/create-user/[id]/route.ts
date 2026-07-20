import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  const { user } = authResult;

  const { id: userId } = await params;

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 });
  }

  try {
    const deleteUser = await prisma.user.delete({
      where: { id: userId },
    });

    return NextResponse.json(deleteUser);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the user." },
      { status: 500 },
    );
  }
}
