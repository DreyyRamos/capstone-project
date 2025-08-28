// app/api/check-warning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";
import { UserStatus } from "@/generated/prisma";

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

    const { userId } = await req.json();

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
        let notificationTitle = ""
        let notificationContent = ""
      if(user.status === "WARNED") {
        notificationTitle = "You are being warned",
        notificationContent = "Your account has been reported 3 times"
      } else if (user.status === "SUSPENDED") {
        notificationTitle = "You are being suspended",
        notificationContent = "Your account has been reported 3 or more times, you cannot interact with Publications or Forums for indefinite amount of time"
      } else if (user.status === "BANNED") {
        notificationTitle = "Your account is banned",
        notificationContent = "Your account has been banned, please contact the administrator to restore your account."
      }

      await tx.notifications.create({
        data: {
          notifTitle: notificationTitle,
          notifContent: notificationContent,
          userId: userId, // Notify the original author
          // reportId: id, // Link notification back to the publication
        },
      });

      return { user: updatedUser, statusChanged: user.status !== newStatus };
    });

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to check warnings:", error);
    if (error instanceof Error && error.message === "User not found") {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}


// // app/api/check-warning/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "../../(middlware)/authMiddleware";
// import prisma from "@/lib/prisma";
// import { UserStatus } from "@/generated/prisma";

// function computeStatus(points: number): UserStatus {
//   if (points >= 10) return UserStatus.BANNED;
//   if (points >= 5) return UserStatus.SUSPENDED;
//   if (points >= 3) return UserStatus.WARNED;
//   return UserStatus.ACTIVE;
// }

// export async function POST(req: NextRequest) {
//   try {
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) return authResult;

//     const { userId } = await req.json();

//     const user = await prisma.user.findUnique({ where: { id: userId } });
//     if (!user) {
//       return NextResponse.json({ message: "User not found" }, { status: 404 });
//     }

//     const newStatus = computeStatus(user.warningPoints);
//     let updatedUser = user;

//     if (user.status !== newStatus) {
//       updatedUser = await prisma.user.update({
//         where: { id: userId },
//         data: { status: newStatus },
//       });
//     }

//     return NextResponse.json(
//       { user: updatedUser, statusChanged: user.status !== newStatus },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Failed to check warnings:", error);
//     return NextResponse.json(
//       { message: "Internal server error" },
//       { status: 500 }
//     );
//   }
// }
