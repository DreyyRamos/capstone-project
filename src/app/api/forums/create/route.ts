import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "../../(middlware)/authMiddleware";
import prisma from "@/lib/prisma"; // Assuming prisma client path

export async function POST(req: NextRequest) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult;
    }
    const { id: authorId } = authResult.user;

    const { topicTitle, description, tags, category } = await req.json();

    const newPublication = await prisma.$transaction(async (tx) => {
      // STEP 1: Create the publication
      const forum = await tx.forum.create({
        data: {
          topicTitle,
          description,
          tags,
          category,
          author: {
            connect: { id: authorId },
          },
        },
        select: {
          forumId: true,
          topicTitle: true,
          author: {
            select: { id: true },
          },
        },
      });

      const forumAuthorId = forum.author?.id;

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
            // {
            //   // Condition 2: Any user whose role array contains 'EDITOR'
            //   role: {
            //     has: Role.EDITOR,
            //   },
            // },
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
          //   const isEditor = user.role.includes(Role.EDITOR);

          // Customize notification content based on the role
          //   const notifTitle = isEditor
          //     ? "Publication for Review"
          //     : "New Publication!";
          const notifTitle = "New Discussion Started";
          const notifContent = `A new discussion titled ${forum.topicTitle} has been posted! Check it out.`;

          //   const notifContent = isEditor
          //     ? `A new publication titled "${publication.title}" is ready for review.`
          //     : `A new article titled "${publication.title}" has been posted.`;

          return {
            notifTitle,
            notifContent,
            userId: user.id,
            forumNotifId: forum.forumId,
          };
        });

        await tx.notifications.createMany({
          data: notificationData,
          skipDuplicates: true,
        });

        await tx.user.update({
          where: { id: forumAuthorId },
          data: {
            reputationPoints: { increment: 15 },
          },
        });
      }

      return forum;
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
