// File: /app/api/analytics/route.ts

import { NextResponse, NextRequest } from "next/server";
import prisma from "@/lib/prisma"; // Adjust this import path if necessary
import { subDays, startOfMonth, subYears, endOfMonth, format } from "date-fns";

export async function GET(request: NextRequest) {
  try {
    // ======== 1. DEFINE DATE RANGES ========
    // 1. Get the 'period' from the URL, default to '30days'
    const period = request.nextUrl.searchParams.get("period") || "30days";

    // 2. Set a dynamic start date based on the period
    let startDate: Date;
    const today = new Date();
    today.setHours(23, 59, 59, 999); // End of today

    switch (period) {
      case "7days":
        startDate = subDays(today, 6);
        break;
      case "90days":
        startDate = subDays(today, 89);
        break;
      case "1year":
        startDate = subYears(today, 1);
        break;
      case "30days":
      default:
        startDate = subDays(today, 29);
        break;
    }
    startDate.setHours(0, 0, 0, 0); // Start of the day

    // ======== 2. FETCH DATA IN PARALLEL ========
    // ======== FETCH DATA USING DYNAMIC START DATE ========
    const [
      totalPublications,
      totalForums,
      totalUsers,
      publicationsInPeriod,
      usersInPeriod,
      categoryDataPubs,
      categoryDataForums,
      topContent,
    ] = await Promise.all([
      prisma.publication.count({ where: { status: "PUBLISHED" } }),
      prisma.forum.count(),
      prisma.user.count(),

      // --- Use the dynamic 'startDate' in queries ---
      prisma.publication.count({
        where: { createdAt: { gte: startDate } },
      }),
      prisma.user.count({
        where: { createdAt: { gte: startDate } },
      }),
      prisma.publication.groupBy({
        by: ["category"],
        _count: { pubId: true },
        where: {
          status: "PUBLISHED",
          category: { not: null },
          createdAt: { gte: startDate },
        },
      }),
      prisma.forum.groupBy({
        by: ["category"],
        _count: { forumId: true },
        where: { category: { not: null }, createdAt: { gte: startDate } },
      }),
      prisma.publication.findMany({
        where: { status: "PUBLISHED", createdAt: { gte: startDate } },
        take: 5,
        select: {
          title: true,
          category: true,
          _count: { select: { pubLikes: true, pubComments: true } },
        },
        orderBy: [
          { pubLikes: { _count: "desc" } },
          { pubComments: { _count: "desc" } },
        ],
      }),
      // ]);

      // --- Category Distribution ---
      prisma.publication.groupBy({
        by: ["category"],
        _count: { pubId: true },
        where: { status: "PUBLISHED", category: { not: null } },
      }),
      prisma.forum.groupBy({
        by: ["category"],
        _count: { forumId: true },
        where: { category: { not: null } },
      }),

      // --- Top Content ---
      prisma.publication.findMany({
        where: { status: "PUBLISHED" },
        take: 5,
        select: {
          title: true,
          category: true,
          _count: { select: { pubLikes: true, pubComments: true } },
        },
        orderBy: [
          { pubLikes: { _count: "desc" } },
          { pubComments: { _count: "desc" } },
        ],
      }),
    ]);

    // --- Raw SQL queries for time-series data (more efficient for DB) ---
    const monthlyActivity: any[] = await prisma.$queryRaw`
      SELECT
        TO_CHAR(d.month, 'YYYY-MM') AS date,
        COALESCE(p.count, 0)::int AS publications,
        COALESCE(f.count, 0)::int AS "forumPosts",
        COALESCE(u.count, 0)::int AS users
      FROM (
        SELECT generate_series(
          date_trunc('month', NOW() - interval '5 months'),
          date_trunc('month', NOW()),
          '1 month'
        ) AS month
      ) d
      LEFT JOIN (
        SELECT date_trunc('month', "createdAt") AS month, COUNT(*) AS count
        FROM "Publication"
        WHERE "createdAt" >= NOW() - interval '5 months'
        GROUP BY 1
      ) p ON d.month = p.month
      LEFT JOIN (
        SELECT date_trunc('month', "createdAt") AS month, COUNT(*) AS count
        FROM "Forum"
        WHERE "createdAt" >= NOW() - interval '5 months'
        GROUP BY 1
      ) f ON d.month = f.month
      LEFT JOIN (
        SELECT date_trunc('month', "createdAt") AS month, COUNT(*) AS count
        FROM "User"
        WHERE "createdAt" >= NOW() - interval '5 months'
        GROUP BY 1
      ) u ON d.month = u.month
      ORDER BY d.month;
    `;

    const weeklyActivity: any[] = await prisma.$queryRaw`
      SELECT
        TO_CHAR(d.day, 'Dy') AS day,
        EXTRACT(ISODOW FROM d.day)::int AS day_of_week,
        COALESCE(p.count, 0)::int AS publications,
        COALESCE(f.count, 0)::int AS "forumPosts"
      FROM (
        SELECT generate_series(
          NOW() - interval '6 days',
          NOW(),
          '1 day'
        )::date AS day
      ) d
      LEFT JOIN (
        SELECT "createdAt"::date AS day, COUNT(*) AS count
        FROM "Publication"
        WHERE "createdAt" >= NOW() - interval '6 days'
        GROUP BY 1
      ) p ON d.day = p.day
      LEFT JOIN (
        SELECT "createdAt"::date AS day, COUNT(*) AS count
        FROM "Forum"
        WHERE "createdAt" >= NOW() - interval '6 days'
        GROUP BY 1
      ) f ON d.day = f.day
      ORDER BY d.day;
    `;

    // ======== 3. PROCESS AND FORMAT DATA ========

    // --- Helper function for calculating percentage change ---
    const calculateChange = (current: number, previous: number) => {
      if (previous === 0) return current > 0 ? "+100%" : "+0.0%";
      const change = ((current - previous) / previous) * 100;
      return `${change > 0 ? "+" : ""}${change.toFixed(1)}%`;
    };

    // --- Process Overview Stats ---
    // const userChange = calculateChange(usersLast30Days, usersPrev30Days);
    // const pubChange = calculateChange(
    //   publicationsLast30Days,
    //   publicationsPrev30Days
    // );
    // Note: Forum change and Total Views are placeholders as an example
    const overviewStats = [
      {
        title: "Publications in Period",
        value: publicationsInPeriod.toLocaleString(),
        change: "", // Change calculation needs a 'previous period'
        trend: "up",
      },
      {
        title: "New Users in Period",
        value: usersInPeriod.toLocaleString(),
        change: "",
        trend: "up",
      },
      {
        title: "Total Publications",
        value: totalPublications.toLocaleString(),
        change: "",
        trend: "up",
      },
      {
        title: "Total Users",
        value: totalUsers.toLocaleString(),
        change: "",
        trend: "up",
      },
    ];

    // --- Process Monthly Activity ---
    // Note: 'views' are simulated here as they aren't in the schema
    const formattedMonthly = monthlyActivity.map((m) => ({
      month: format(new Date(m.date), "MMM"),
      publications: m.publications,
      forumPosts: m.forumPosts,
      users: m.users,
      views: m.publications * 150 + m.forumPosts * 50 + m.users * 10, // Simulate views
    }));

    // --- Process Weekly Activity ---
    const formattedWeekly = weeklyActivity.map((w) => ({
      day: w.day.trim(),
      publications: w.publications,
      forumPosts: w.forumPosts,
      views: w.publications * 150 + w.forumPosts * 50, // Simulate views
    }));

    // --- Process Category Distribution ---
    const categoryMap = new Map<string, number>();
    categoryDataPubs.forEach((p) => {
      categoryMap.set(
        p.category!,
        (categoryMap.get(p.category!) || 0) + p._count.pubId
      );
    });
    categoryDataForums.forEach((f) => {
      categoryMap.set(
        f.category!,
        (categoryMap.get(f.category!) || 0) + f._count.forumId
      );
    });

    const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7300", "#00C49F"];
    const categoryDistribution = Array.from(categoryMap.entries()).map(
      ([name, value], index) => ({
        name,
        value,
        color: colors[index % colors.length],
      })
    );

    // --- Process Top Content ---
    // NOTE: Engagement level is simulated here
    const getEngagement = (likes: number, comments: number) => {
      const score = likes + comments * 2;
      if (score > 100) return "Very High";
      if (score > 50) return "High";
      if (score > 10) return "Medium";
      return "Low";
    };
    const topPerformingContent = topContent.map((p) => ({
      title: p.title,
      type: "Publication",
      views: p._count.pubLikes + p._count.pubComments * 5, // Simulated views
      engagement: getEngagement(p._count.pubLikes, p._count.pubComments),
      category: p.category,
    }));

    // ======== 4. RETURN FINAL RESPONSE ========
    return NextResponse.json({
      overviewStats,
      monthlyData: formattedMonthly,
      dailyActivity: formattedWeekly,
      categoryData: categoryDistribution,
      topContent: topPerformingContent,
    });
  } catch (error) {
    console.error("Failed to fetch analytics data:", error);
    return NextResponse.json(
      { error: "An error occurred while fetching analytics data." },
      { status: 500 }
    );
  }
}
