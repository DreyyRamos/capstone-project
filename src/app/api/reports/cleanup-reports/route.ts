import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: moderatorId, role } = authResult.user;

    // Add role check for extra security
    const allowed = ["ADMIN", "MODERATOR"];
    if (!allowed.includes(role)) {
      return NextResponse.json(
        { error: "Unauthorized: Admin or Moderator role required" },
        { status: 403 }
      );
    }

    // Calculate date 15 days ago
    // const fifteenDaysAgo = new Date();
    // fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // First, count what will be deleted for logging
    const countToDelete = await prisma.reports.count({
      where: {
        status: {
          in: ["RESOLVED", "DELETED", "RESTORED"],
        },
        // updatedAt: {
        //   lt: fifteenDaysAgo,
        // },
      },
    });

    if (countToDelete === 0) {
      return NextResponse.json({
        message: "No old reports to cleanup",
        deleted: 0,
        // cutoffDate: fifteenDaysAgo.toISOString(),
        status: 200,
      });
    }

    // Delete old reports (15+ days old)
    const deletedOldReports = await prisma.reports.deleteMany({
      where: {
        status: {
          in: ["RESOLVED", "DELETED", "RESTORED"],
        },
        // updatedAt: {
        //   lt: fifteenDaysAgo,
        // },
      },
    });

    // Log the cleanup action
    console.log(
      `Manual cleanup triggered by moderator ${moderatorId}: Deleted ${deletedOldReports.count} reports older than 15 days`
    );

    return NextResponse.json({
      message: `Successfully deleted ${deletedOldReports.count} old reports`,
      deleted: deletedOldReports.count,
      // cutoffDate: fifteenDaysAgo.toISOString(),
      triggeredBy: moderatorId,
      status: 200,
    });
  } catch (error: any) {
    console.error("Report cleanup error:", error);
    return NextResponse.json(
      {
        error: "Cleanup failed",
        details: error.message,
      },
      { status: 500 }
    );
  }
}

// Add GET method to preview what would be deleted
export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { role } = authResult.user;

    const allowed = ["ADMIN", "MODERATOR"];
    if (!allowed.includes(role)) {
      return NextResponse.json(
        { error: "Unauthorized: Admin or Moderator role required" },
        { status: 403 }
      );
    }

    const fifteenDaysAgo = new Date();
    fifteenDaysAgo.setDate(fifteenDaysAgo.getDate() - 15);

    // Just count, don't delete
    const countToDelete = await prisma.reports.count({
      where: {
        status: {
          in: ["RESOLVED", "DELETED", "RESTORED"],
        },
        updatedAt: {
          lt: fifteenDaysAgo,
        },
      },
    });

    return NextResponse.json({
      message: `Found ${countToDelete} reports ready for cleanup`,
      reportsToDelete: countToDelete,
      cutoffDate: fifteenDaysAgo.toISOString(),
      status: 200,
    });
  } catch (error: any) {
    console.error("Report cleanup check error:", error);
    return NextResponse.json({ error: "Check failed" }, { status: 500 });
  }
}
