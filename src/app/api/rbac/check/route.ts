import { type NextRequest, NextResponse } from "next/server"
import { checkPermission } from "@/lib/rbac-utils"

export async function POST(request: NextRequest) {
  try {
    const { userRole, permission, context } = await request.json()

    const hasPermission = checkPermission(userRole, permission, context)

    return NextResponse.json({ hasPermission })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}
