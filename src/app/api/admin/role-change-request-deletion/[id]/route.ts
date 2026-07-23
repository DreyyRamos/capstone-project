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

  const { id: request_id } = await params;

  if (!request_id) {
    return NextResponse.json(
      { error: "Request ID is required" },
      { status: 400 },
    );
  }

  try {
    const deleteRequest = await prisma.changeUserRole.delete({
      where: { request_id: request_id },
    });

    console.log("request deleted");
    return NextResponse.json(deleteRequest);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the request." },
      { status: 500 },
    );
  }
}
