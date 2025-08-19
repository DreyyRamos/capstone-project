import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../(middlware)/authMiddleware";
import prisma from "@/lib/prisma";

// Priority levels enum for consistency
enum Priority {
  LOW = "LOW",
  MEDIUM = "MEDIUM",
  HIGH = "HIGH",
  URGENT = "URGENT",
}

// Function to automatically assign priority based on report reason
function assignPriorityByReason(reportReason: string): Priority {
  const priorityMap: Record<string, Priority> = {
    // URGENT - Immediate attention required
    "Hate Speech": Priority.URGENT,
    "Harassment or bullying": Priority.URGENT,

    // High - Serious violations that need quick action
    "Inappropriate Language": Priority.HIGH,
    Misinformation: Priority.HIGH,

    // Medium - Important but less urgent
    "Copyright violation": Priority.MEDIUM,
    Other: Priority.MEDIUM, // Default for custom reports

    // Low - Less severe, can be reviewed in regular queue
    "Spam or unwanted content": Priority.LOW,
  };

  return priorityMap[reportReason] || Priority.MEDIUM; // Default to MEDIUM if reason not found
}

// Optional: Enhanced priority assignment considering multiple factors
function assignAdvancedPriority(
  reportReason: string,
  contentType: string,
  description?: string,
  reportedUserId?: string
): Priority {
  // Start with base priority from reason
  let priority = assignPriorityByReason(reportReason);

  // Escalate for main content types (posts/publications vs comments/replies)
  const isMainContent =
    contentType === "FORUM_POST" || contentType === "PUBLICATION";
  if (isMainContent && priority === Priority.LOW) {
    priority = Priority.MEDIUM;
  }

  // Check for escalation keywords in description
  if (description) {
    const urgentKeywords = [
      "threat",
      "violence",
      "suicide",
      "self-harm",
      "doxxing",
      "personal information",
      "illegal",
      "dangerous",
    ];
    const hasUrgentContent = urgentKeywords.some((keyword) =>
      description.toLowerCase().includes(keyword)
    );

    if (hasUrgentContent && priority < Priority.URGENT) {
      priority = Priority.URGENT;
    }
  }

  // We could also check for repeat offenders here
  // if (await isRepeatOffender(reportedUserId)) {
  //   priority = Math.max(priority, Priority.HIGH);
  // }

  return priority;
}

export async function GET(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }

    const reports = await prisma.reports.findMany({
      select: {
        reportId: true,
        contentType: true,
        reportedContent: true,
        reportReason: true,
        description: true,
        reportedUserId: true,
        reportedById: true,
        reportedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            email: true,
          },
        },
        reportedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            email: true,
          },
        },
        forumId: true,
        pubId: true,
        forumCommentId: true,
        pubCommentId: true,
        forumReplyId: true,
        pubReplyId: true,
        forumReplyToReplyId: true,
        pubReplyToReplyId: true,
        status: true,
        priority: true,
        createdAt: true,
      },
      orderBy: [
        { priority: "desc" }, // Show highest priority first
        { createdAt: "desc" },
      ],
    });

    return NextResponse.json({ status: 200, reports });
  } catch (error) {
    console.error("Failed to fetch reports:", error);
    return NextResponse.json(
      { message: "Failed to fetch reports." },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: reporterId } = authResult.user;

    const {
      contentType,
      reportedContent,
      reportReason,
      description,
      reportedUserId,
      forumId,
      forumCommentId,
      forumReplyId,
      forumReplyToReplyId,
      pubId,
      pubCommentId,
      pubReplyId,
      pubReplyToReplyId,
    } = await req.json();

    // Validate required fields
    if (!contentType || !reportedContent || !reportReason) {
      return NextResponse.json(
        {
          message:
            "Missing required fields: contentType, reportedContent, or reportReason",
        },
        { status: 400 }
      );
    }

    // Automatically assign priority based on report reason and other factors
    const priority = assignAdvancedPriority(
      reportReason,
      contentType,
      description,
      reportedUserId
    );

    const report = await prisma.reports.create({
      data: {
        contentType,
        reportedContent,
        reportReason,
        description: description || null,
        priority, // Automatically assigned priority
        status: "PENDING", // Default status
        reportedBy: {
          connect: { id: reporterId },
        },
        ...(reportedUserId && {
          reportedUser: { connect: { id: reportedUserId } },
        }),
        ...(forumId && {
          forum: { connect: { forumId } },
        }),
        ...(pubId && {
          publication: { connect: { pubId: pubId } },
        }),
        ...(forumCommentId && {
          forumComment: { connect: { commentId: forumCommentId } },
        }),
        ...(forumReplyId && {
          forumReply: { connect: { replyId: forumReplyId } },
        }),
        ...(forumReplyToReplyId && {
          forumReplyToReply: {
            connect: { replyToReplyId: forumReplyToReplyId },
          },
        }),
        ...(pubCommentId && {
          pubComment: { connect: { commentId: pubCommentId } },
        }),
        ...(pubReplyId && {
          pubReply: { connect: { replyId: pubReplyId } },
        }),
        ...(pubReplyToReplyId && {
          pubReplyToReply: { connect: { replyToReplyId: pubReplyToReplyId } },
        }),
      },
    });

    // Optional: Send notifications for high/URGENT priority reports
    if (priority === Priority.URGENT || priority === Priority.HIGH) {
      // You can implement notification logic here
      console.log(
        `High priority report created: ${report.reportId} - ${priority}`
      );
      // await sendUrgentNotification(report);
    }

    return NextResponse.json({
      status: 200,
      report: {
        ...report,
        priorityAssigned: priority,
        message: `Report created with ${priority} priority`,
      },
    });
  } catch (error) {
    console.error("Report failed:", error);
    return NextResponse.json(
      { message: "Failed to create report." },
      { status: 500 }
    );
  }
}

// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "../(middlware)/authMiddleware";
// import prisma from "@/lib/prisma";

// export async function GET(req: NextRequest) {
//   try {
//     // Uncomment auth if needed
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) {
//       return authResult;
//     }

//     const reports = await prisma.reports.findMany({
//       select: {
//         contentType: true,
//         reportedContent: true,
//         reportReason: true,
//         description: true,
//         reportedUserId: true,
//         reportedUser: {
//           select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             profileImage: true,
//             email: true,
//           },
//         },
//         // Add all ID fields for completeness
//         forumId: true,
//         pubId: true,
//         forumCommentId: true,
//         pubCommentId: true,
//         forumReplyId: true,
//         pubReplyId: true,
//         forumReplyToReplyId: true,
//         pubReplyToReplyId: true,
//         // Optional: Include other fields like status, priority if useful
//         status: true,
//         priority: true,
//       },
//     });
//     return NextResponse.json({ status: 200, reports });
//   } catch (error) {
//     console.error("Failed to fetch reports:", error);
//     return NextResponse.json(
//       { message: "Failed to fetch reports." },
//       { status: 500 }
//     );
//   }
// }

// export async function POST(req: NextRequest) {
//   try {
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) {
//       return authResult;
//     }
//     const { id: reporterId } = authResult.user;

//     // Destructure ALL possible fields from the body
//     const {
//       contentType,
//       reportedContent,
//       reportReason,
//       description,
//       reportedUserId,
//       forumId,
//       forumCommentId,
//       forumReplyId,
//       forumReplyToReplyId,
//       pubId,
//       pubCommentId,
//       pubReplyId,
//       pubReplyToReplyId,
//     } = await req.json();

//     // Optional: Add validation based on contentType
//     // e.g., if (contentType === 'FORUM_POST' && !forumId) throw new Error('Missing forumId');

//     const report = await prisma.reports.create({
//       data: {
//         contentType,
//         reportedContent,
//         reportReason,
//         description: description || null, // Explicitly handle undefined as null
//         // reportedUserId: reportedUserId || null,
//         reportedBy: {
//           connect: { id: reporterId },
//         },
//         ...(reportedUserId && {
//           reportedUser: { connect: { id: reportedUserId } },
//         }),
//         // Include conditional IDs (they'll be undefined/null if not sent, which is fine)
//         ...(forumId && {
//           forum: { connect: { forumId } },
//         }),
//         ...(pubId && {
//           publication: { connect: { pubId: pubId } },
//         }),
//         ...(forumCommentId && {
//           forumComment: { connect: { commentId: forumCommentId } },
//         }),
//         ...(forumReplyId && {
//           forumReply: { connect: { replyId: forumReplyId } },
//         }),
//         ...(forumReplyToReplyId && {
//           forumReplyToReply: {
//             connect: { replyToReplyId: forumReplyToReplyId },
//           },
//         }),
//         ...(pubCommentId && {
//           pubComment: { connect: { commentId: pubCommentId } },
//         }),
//         ...(pubReplyId && {
//           pubReply: { connect: { replyId: pubReplyId } },
//         }),
//         ...(pubReplyToReplyId && {
//           pubReplyToReply: { connect: { replyToReplyId: pubReplyToReplyId } },
//         }),
//       },
//     });
//     return NextResponse.json({ status: 200, report });
//   } catch (error) {
//     console.error("Report failed:", error);
//     return NextResponse.json(
//       { message: "Failed to create report." },
//       { status: 500 }
//     );
//   }
// }
