import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";
import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
import { NextRequest } from "next/server";
import { Role, PublicationStatus } from "@/generated/prisma";
export async function POST(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authMiddleware(req);
    if (authResult instanceof NextResponse) {
      return authResult; // Not logged in
    }

    const {
      user_email,
      firstName,
      lastName,
      password,
      profileImage,
      id_picture,
      bio,
      contactNumber,
      location,
      interests,
    } = await req.json();

    const resolvedParams = await params;
    const id = resolvedParams.id;

    const approveAdmission = await prisma.$transaction(async (tx) => {
      // First, check if the admission exists and is still pending
      const existingAdmission = await tx.userAdmission.findUnique({
        where: { admission_id: id },
        select: {
          role: true,
          status: true,
        },
      });

      if (!existingAdmission) {
        throw new Error("Admission not found");
      }

      if (existingAdmission.status !== "PENDING") {
        throw new Error("Admission is not in pending status");
      }

      // Check if user with this email already exists
      const existingUser = await tx.user.findUnique({
        where: { email: user_email },
      });

      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      // Create new user record
      const newUser = await tx.user.create({
        data: {
          email: user_email,
          firstName,
          lastName,
          password, // Password is already hashed from registration
          profileImage,
          id_picture,
          bio,
          contactNumber,
          location,
          interests,
          role: [existingAdmission.role], // Use role from admission
        },
      });

      // Update the admission status to approved
      const updatedAdmission = await tx.userAdmission.update({
        where: { admission_id: id },
        data: {
          status: "APPROVED",
        },
      });

      return {
        user: newUser,
        admission: updatedAdmission,
      };
    });

    return NextResponse.json({
      status: 200,
      message: "User admission approved successfully",
      data: approveAdmission,
    });
  } catch (error: any) {
    console.error("Error in approve admission:", error);

    // Return more specific error messages
    let errorMessage = "Something went wrong";
    if (error.message.includes("Admission not found")) {
      errorMessage = "Admission record not found";
    } else if (error.message.includes("not in pending status")) {
      errorMessage = "Admission is not in pending status";
    } else if (error.message.includes("already exists")) {
      errorMessage = "User with this email already exists";
    } else if (error.code === "P2002") {
      errorMessage = "Unique constraint violation - user may already exist";
    }

    return NextResponse.json(
      {
        error: errorMessage,
        details:
          process.env.NODE_ENV === "development" ? error.message : undefined,
      },
      { status: 500 }
    );
  }
}

// import prisma from "@/lib/prisma";
// import { NextResponse } from "next/server";
// import { authMiddleware } from "@/app/api/(middlware)/authMiddleware";
// import { NextRequest } from "next/server";
// import { Role, PublicationStatus } from "@/generated/prisma";

// export async function POST(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   try {
//     const authResult = await authMiddleware(req);
//     if (authResult instanceof NextResponse) {
//       return authResult; // Not logged in
//     }

//     const {
//       user_email,
//       firstName,
//       lastName,
//       password,
//       profileImage,
//       id_picture,
//       bio,
//       contactNumber,
//       location,
//       interests,
//     } = await req.json();

//     const resolvedParams = await params;
//     const id = resolvedParams.id;

//     const approveAdmission = await prisma.$transaction(async (tx) => {
//       const user = await tx.user.create({
//         data: {
//           email: user_email,
//           firstName,
//           lastName,
//           password,
//           profileImage,
//           id_picture,
//           bio,
//           contactNumber,
//           location,
//           interests,
//         },
//       });

//       await tx.userAdmission.update({
//         where: { admission_id: id },
//         data: {
//           status: "APPROVED",
//         },
//       });
//       return user;
//     });

//     return NextResponse.json({
//       status: 200,
//       admission: approveAdmission,
//     });
//   } catch (error) {
//     return NextResponse.json(
//       { error: "Something went wrong" },
//       { status: 500 }
//     );
//   }
// }
