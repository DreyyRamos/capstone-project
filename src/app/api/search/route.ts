// app/api/search/route.ts
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("q");
    const type = searchParams.get("type"); // 'all', 'users', 'publications', 'forums'
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = parseInt(searchParams.get("offset") || "0");

    if (!query || query.trim().length < 2) {
      return NextResponse.json({
        users: [],
        publications: [],
        forums: [],
        total: 0,
      });
    }

    const searchTerm = query.trim();
    const searchCondition = {
      contains: searchTerm,
      mode: "insensitive" as const,
    };

    let users: any[] = [];
    let publications: any[] = [];
    let forums: any[] = [];

    // Search Users
    if (type === "all" || type === "users") {
      users = await prisma.user.findMany({
        where: {
          AND: [
            {
              status: "ACTIVE", // Only search active users
            },
            {
              OR: [
                { firstName: searchCondition },
                { lastName: searchCondition },
                { email: searchCondition },
                { bio: searchCondition },
                { interests: { hasSome: [searchTerm] } },
              ],
            },
          ],
        },
        select: {
          id: true,
          email: true,
          firstName: true,
          lastName: true,
          profileImage: true,
          bio: true,
          role: true,
          interests: true,
          reputationPoints: true,
        },
        take: limit,
        skip: offset,
        orderBy: [{ reputationPoints: "desc" }, { createdAt: "desc" }],
      });
    }

    // Search Publications
    if (type === "all" || type === "publications") {
      publications = await prisma.publication.findMany({
        where: {
          AND: [
            { status: "PUBLISHED" }, // Only search published publications
            {
              OR: [
                { title: searchCondition },
                { excerpt: searchCondition },
                { content: searchCondition },
                { category: searchCondition },
                { tags: { hasSome: [searchTerm] } },
              ],
            },
          ],
        },
        select: {
          pubId: true,
          title: true,
          excerpt: true,
          imageUrl: true,
          category: true,
          tags: true,
          isFeatured: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
              role: true,
            },
          },
          _count: {
            select: {
              pubLikes: true,
              pubComments: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: [{ isFeatured: "desc" }, { updatedAt: "desc" }],
      });
    }

    // Search Forums
    if (type === "all" || type === "forums") {
      forums = await prisma.forum.findMany({
        where: {
          OR: [
            { topicTitle: searchCondition },
            { description: searchCondition },
            { category: searchCondition },
            { tags: { hasSome: [searchTerm] } },
          ],
        },
        select: {
          forumId: true,
          topicTitle: true,
          description: true,
          imageUrl: true,
          category: true,
          tags: true,
          createdAt: true,
          updatedAt: true,
          author: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
              profileImage: true,
              role: true,
            },
          },
          _count: {
            select: {
              forumLikes: true,
              forumComments: true,
            },
          },
        },
        take: limit,
        skip: offset,
        orderBy: [{ updatedAt: "desc" }],
      });
    }

    const total = users.length + publications.length + forums.length;

    return NextResponse.json({
      users,
      publications,
      forums,
      total,
      query: searchTerm,
    });
  } catch (error) {
    console.error("Search API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
