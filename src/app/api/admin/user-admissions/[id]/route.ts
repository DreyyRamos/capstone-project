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

  // const resolvedParams = await params;
  // const admission_id = resolvedParams.id;

  const { id: admission_id } = await params;

  if (!admission_id) {
    return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
  }

  try {
    const admission = await prisma.userAdmission.delete({
      where: { admission_id: admission_id },
    });

    console.log("admission deleted");
    return NextResponse.json(admission);
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { error: "An error occurred while deleting the admission." },
      { status: 500 },
    );
  }
}
