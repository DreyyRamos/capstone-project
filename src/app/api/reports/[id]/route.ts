import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import { NextRequest } from "next/server";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const authResult = await authMiddleware(req);
  if (authResult instanceof NextResponse) return authResult;
  //   const { user } = authResult;

  const { id: reportId } = await params;

  if (!reportId) {
    return NextResponse.json(
      { error: "Report ID is required" },
      { status: 400 },
    );
  }

  try {
    const deleteReport = await prisma.reports.delete({
      where: { reportId: reportId },
    });

    console.log("report deleted");
    return NextResponse.json(deleteReport);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the report." },
      { status: 500 },
    );
  }
}
