import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function PATCH(_req: NextRequest) {
  const authResult = await authMiddleware(_req);
  if (authResult instanceof NextResponse) {
    return authResult; // Not logged in
  }

  const { id } = authResult.user;
  try {
    // 2. Use Prisma to update the notifications
    const updateResult = await prisma.notifications.updateMany({
      where: {
        userId: id,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });

    // 3. Send a success response
    return NextResponse.json(
      {
        message: "All notifications marked as read successfully.",
        count: updateResult.count,
      },
      { status: 200 }
    );
  } catch (error) {
    // 4. Handle errors gracefully
    console.error("Mark all as read error:", error);

    // Generic server error for all other cases
    return NextResponse.json(
      { message: "An internal server error occurred." },
      { status: 500 }
    );
  }
}
