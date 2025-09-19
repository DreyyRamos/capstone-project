import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(_: NextRequest) {
  try {
    const rows = await prisma.reports.groupBy({
      by: ["status"],
      _count: { status: true },
    });

    // turn [{ status: 'PUBLISHED', _count: { status: 7 } }, ...]
    // into { PUBLISHED: 7, DRAFT: 3, ... }
    const reports = rows.reduce<Record<string, number>>((acc, cur) => {
      acc[cur.status] = cur._count.status;
      return acc;
    }, {});

    return NextResponse.json({ reports }, { status: 200 });
  } catch (error) {
    console.error("Failed to count reports:", error);
    return NextResponse.json(
      { message: "Failed to count reports." },
      { status: 500 }
    );
  }
}
