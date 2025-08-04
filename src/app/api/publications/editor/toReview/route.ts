//To-DO This

// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
// import { Role } from "@/generated/prisma";

// // This file would be at a path like: app/api/publications/review/[pubId]/route.ts
// // It handles updating the status of a specific publication.
// enum PublicationStatus {
//     DRAFT = "DRAFT",
//     PUBLISHED = "PUBLISHED",
//     ARCHIVED = "ARCHIVED",
//     PENDING_REVIEW = "PENDING_REVIEW",
//     APPROVED = "APPROVED",
//     REJECTED = "REJECTED",
// }

// export async function PUT(
//   req: NextRequest,
//   { params }: { params: { pubId: string } }
// ) {
//   try {
//     // 1. Authenticate the user and check their role
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) {
//       return authResult; // Not logged in
//     }

//     // Check if the user is an EDITOR. Your schema defines 'role' as an array.
//     if (!authResult.user.role.includes(Role.EDITOR)) {
//       return NextResponse.json(
//         { message: "Unauthorized: You do not have permission to perform this action." },
//         { status: 403 }
//       );
//     }

//     // 2. Get the publication ID from the URL and the new status from the body
//     const { pubId } = params;
//     const { status } = (await req.json()) as { status: PublicationStatus };

//     // Validate the incoming status for this review endpoint
//     if (status !== "APPROVED" && status !== "REJECTED") {
//       return NextResponse.json(
//         { message: "Invalid status provided. Must be 'APPROVED' or 'REJECTED'." },
//         { status: 400 }
//       );
//     }

//     // 3. Use a transaction to update the publication and notify the author
//     const updatedPublication = await prisma.$transaction(async (tx) => {
//       // First, find the publication to get its authorId and title
//       const publication = await tx.publication.findUnique({
//         where: { pubId },
//         select: { authorId: true, title: true },
//       });

//       if (!publication || !publication.authorId) {
//         // Use a custom error to be caught by the catch block
//         throw new Error("Publication not found or has no author.");
//       }

//       // STEP A: Update the publication's status
//       const updatedPub = await tx.publication.update({
//         where: { pubId },
//         data: { status }, // Assign status directly for enum fields
//       });

//       // STEP B: Create a notification for the original author
//       const notificationTitle = `Your Publication was ${status === 'APPROVED' ? 'Approved' : 'Rejected'}`;
//       const notificationContent = `Your publication titled "${publication.title}" has been ${status.toLowerCase()}.`;

//       await tx.notifications.create({
//         data: {
//           notifTitle: notificationTitle,
//           notifContent: notificationContent,
//           userId: publication.authorId, // Notify the original author
//           pubNotifId: pubId, // Link notification back to the publication
//         },
//       });

//       return updatedPub;
//     });

//     // 4. Return a success response
//     return NextResponse.json(
//       {
//         message: `Publication successfully ${status.toLowerCase()}.`,
//         publication: updatedPublication,
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Publication update failed:", error);
//     const errorMessage = error instanceof Error ? error.message : "An unknown error occurred.";
//     return NextResponse.json(
//       { message: "Something went wrong.", error: errorMessage },
//       { status: 500 }
//     );
//   }
// }

// import prisma from "@/lib/prisma";
// import { NextRequest, NextResponse } from "next/server";
// import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";

// export async function GET(req: NextRequest) {
//   const authResult = await authMiddleware(req);
//   if (authResult instanceof NextResponse) return authResult;
//   //   const { id } = authResult.user;

//   try {
//     const postToReview = await prisma.publication.findMany({
//       orderBy: { createdAt: "desc" },
//       where: { status: "PENDING_REVIEW" },
//       include: {
//         author: {
//           select: {
//             id: true,
//             firstName: true,
//             lastName: true,
//             profileImage: true,
//             role: true,
//           },
//         },
//         pubComments: {
//           select: {
//             comment_content: true,
//             author: {
//               select: {
//                 id: true,
//                 firstName: true,
//                 lastName: true,
//                 profileImage: true,
//               },
//             },
//             commentId: true,
//           },
//         },
//         pubLikes: true,
//       },
//     });
//     return NextResponse.json({ status: 200, postToReview });
//   } catch (error) {
//     return NextResponse.json({ status: 500, error });
//   }
// }
