// app/api/check-warning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";
import { UserStatus, Role } from "@/generated/prisma";

function computeStatus(points: number): UserStatus {
  if (points >= 10) return UserStatus.BANNED;
  if (points >= 5) return UserStatus.SUSPENDED;
  if (points >= 3) return UserStatus.WARNED;
  return UserStatus.ACTIVE;
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) return authResult;

    if (
      !([Role.MODERATOR, Role.ADMIN] as Role[]).includes(authResult.user.role)
    ) {
      return NextResponse.json(
        {
          message:
            "Unauthorized: You do not have permission to perform this action.",
        },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { userId, reportId } = body;

    // Validate required parameters
    if (!userId) {
      return NextResponse.json(
        { message: "userId is required" },
        { status: 400 }
      );
    }

    // reportId is optional - log if missing but don't fail
    if (!reportId) {
      console.warn("reportId not provided for userId:", userId);
    }

    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (!user) {
        throw new Error("User not found");
      }

      const newStatus = computeStatus(user.warningPoints);
      let updatedUser = user;

      if (user.status !== newStatus) {
        updatedUser = await tx.user.update({
          where: { id: userId },
          data: { status: newStatus },
        });
      }

      let notificationTitle = "";
      let notificationContent = "";
      
      // Use the new status, not the old status for notification content
      if (newStatus === UserStatus.WARNED) {
        notificationTitle = "You are being warned";
        notificationContent = "Your account has been reported 3 times";
      } else if (newStatus === UserStatus.SUSPENDED) {
        notificationTitle = "You are being suspended";
        notificationContent = "Your account has been reported 5 or more times, you cannot interact with Publications or Forums for indefinite amount of time";
      } else if (newStatus === UserStatus.BANNED) {
        notificationTitle = "Your account is banned";
        notificationContent = "Your account has been banned, please contact the administrator to restore your account.";
      }

      // Only create notification if there's content to notify about
      if (notificationTitle && notificationContent) {
        await tx.notifications.create({
          data: {
            notifType: 'reports',
            notifTitle: notificationTitle,
            notifContent: notificationContent,
            userId: userId,
            reportId: reportId || null, // Allow null if reportId is not provided
          },
        });
      }

      return { 
        user: updatedUser, 
        statusChanged: user.status !== newStatus,
        newStatus,
        oldStatus: user.status
      };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to check warnings:", error);
    if (error instanceof Error) {
      if (error.message === "User not found") {
        return NextResponse.json({ message: "User not found" }, { status: 404 });
      }
      console.error("Error details:", error.message);
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
