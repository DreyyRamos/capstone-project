import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma"; // Assuming prisma client path
import { Role } from "@/generated/prisma";

// enum Role {
//   "ADMIN",
//   "EDITOR",
//   "MODERATOR",
//   "STUDENT"
// }

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: authorId } = authResult.user;

    const { title, excerpt, content, imageUrl, tags, category, isFeatured } =
      await req.json();

    const newPublication = await prisma.$transaction(async (tx) => {
      // STEP 1: Create the publication
      const publication = await tx.publication.create({
        data: {
          title,
          excerpt,
          content,
          imageUrl,
          tags,
          category,
          isFeatured,
          status: "PENDING_REVIEW",
          author: {
            connect: { id: authorId },
          },
        },
        select: {
          pubId: true,
          title: true,
        },
      });

      // STEP 2: Find all users to notify.
      const usersToNotify = await tx.user.findMany({
        where: {
          OR: [
            {
              // Condition 1: Any user who is not the author
              id: {
                not: authorId,
              },
            },
            {
              // Condition 2: Any user whose role array contains 'EDITOR'
              role: "EDITOR",
            },
          ],
        },
        // IMPORTANT: Select the 'role' field as well
        select: {
          id: true,
          role: true, // We need the roles to create conditional messages
        },
      });

      // STEP 3: Create the notifications with conditional messages.
      if (usersToNotify.length > 0) {
        const notificationData = usersToNotify.map((user) => {
          // Check if the user has the EDITOR role
          const isEditor = user.role === "EDITOR";

          // Customize notification content based on the role
          const notifTitle = isEditor
            ? "Publication for Review"
            : "New Publication!";

          const notifContent = isEditor
            ? `A new publication titled "${publication.title}" is ready for review.`
            : `A new article titled "${publication.title}" has been posted.`;

          return {
            notifTitle,
            notifContent,
            userId: user.id,
            pubNotifId: publication.pubId,
          };
        });

        await tx.notifications.createMany({
          data: notificationData,
          skipDuplicates: true,
        });
      }

      return publication;
    });

    return NextResponse.json({ publication: newPublication }, { status: 201 });
  } catch (error) {
    console.error("Transaction failed:", error);
    return NextResponse.json(
      { message: "Failed to create publication and notify users." },
      { status: 500 }
    );
  }
}




// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "../../(middlware)/authMiddleware";
// import prisma from "@/lib/prisma"; // Assuming prisma client path

// export async function POST(req: NextRequest) {
//   try {
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) {
//       return authResult;
//     }
//     const { id: authorId } = authResult.user;

//     const { title, excerpt, content, imageUrl, tags, category, isFeatured } =
//       await req.json();

//     const newPublication = await prisma.$transaction(async (tx) => {
//       // All database operations inside this block must use the tx client.

//       const publication = await tx.publication.create({
//         data: {
//           title,
//           excerpt,
//           content,
//           imageUrl,
//           tags,
//           category,
//           isFeatured,
//           author: {
//             connect: { id: authorId },
//           },
//         },
//         select: {
//           pubId: true,
//           title: true,
//         },
//       });

//       // Find all users who should receive a notification.
//       // In this case, it's everyone EXCEPT the author of the publication.
//       const usersToNotify = await tx.user.findMany({
//         where: {
//           id: {
//             not: authorId, // Exclude the author
//           },
//         },
//         select: {
//           id: true, // We only need the user IDs to create the notifications
//         },
//       });

//       // if theres users to notify, prepare and create the notifications.
//       if (usersToNotify.length > 0) {
//         const notificationData = usersToNotify.map((user) => ({
//           notifTitle: "New Publication!",
//           notifContent: `A new article titled "${publication.title}" has been posted.`,
//           userId: user.id, // Link each notification to a specific user
//           pubNotifId: publication.pubId,
//         }));

//         // Create all notifications in a single, efficient database query.
//         await tx.notifications.createMany({
//           data: notificationData,
//           skipDuplicates: true, // Recommended for `createMany`
//         });
//       }

//       return publication;
//     });

//     return NextResponse.json({ publication: newPublication }, { status: 201 });
//   } catch (error) {
//     console.error("Transaction failed:", error);
//     return NextResponse.json(
//       { message: "Failed to create publication and notify users." },
//       { status: 500 }
//     );
//   }
// }
