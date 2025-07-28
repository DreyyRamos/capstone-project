"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  Users,
  BookOpen,
  MessageSquare,
  Eye,
} from "lucide-react";

export default function AnalyticsPage() {
  // Sample data - this would come from analytics service
  const overviewStats = [
    {
      title: "Total Views",
      value: "45,231",
      change: "+12.5%",
      trend: "up",
      icon: Eye,
      description: "Page views this month",
    },
    {
      title: "Active Users",
      value: "1,247",
      change: "+8.2%",
      trend: "up",
      icon: Users,
      description: "Monthly active users",
    },
    {
      title: "Publications",
      value: "156",
      change: "+15.3%",
      trend: "up",
      icon: BookOpen,
      description: "Total publications",
    },
    {
      title: "Forum Posts",
      value: "2,891",
      change: "-2.1%",
      trend: "down",
      icon: MessageSquare,
      description: "Forum activity this month",
    },
  ];

  const monthlyData = [
    {
      month: "Jan",
      publications: 12,
      forumPosts: 245,
      users: 1100,
      views: 3200,
    },
    {
      month: "Feb",
      publications: 15,
      forumPosts: 289,
      users: 1150,
      views: 3800,
    },
    {
      month: "Mar",
      publications: 18,
      forumPosts: 312,
      users: 1200,
      views: 4200,
    },
    {
      month: "Apr",
      publications: 14,
      forumPosts: 298,
      users: 1180,
      views: 3900,
    },
    {
      month: "May",
      publications: 22,
      forumPosts: 356,
      users: 1250,
      views: 4800,
    },
    {
      month: "Jun",
      publications: 19,
      forumPosts: 334,
      users: 1220,
      views: 4400,
    },
  ];

  const categoryData = [
    { name: "Science", value: 35, color: "#8884d8" },
    { name: "Arts", value: 25, color: "#82ca9d" },
    { name: "Sports", value: 20, color: "#ffc658" },
    { name: "Academic", value: 15, color: "#ff7300" },
    { name: "Other", value: 5, color: "#00ff00" },
  ];

  const dailyActivity = [
    { day: "Mon", publications: 4, forumPosts: 23, views: 450 },
    { day: "Tue", publications: 6, forumPosts: 31, views: 520 },
    { day: "Wed", publications: 3, forumPosts: 28, views: 380 },
    { day: "Thu", publications: 8, forumPosts: 42, views: 680 },
    { day: "Fri", publications: 5, forumPosts: 35, views: 590 },
    { day: "Sat", publications: 2, forumPosts: 18, views: 320 },
    { day: "Sun", publications: 1, forumPosts: 12, views: 280 },
  ];

  const topContent = [
    {
      title: "Annual Science Fair Results",
      type: "Publication",
      views: 1250,
      engagement: "High",
      category: "Science",
    },
    {
      title: "Student Art Exhibition 2024",
      type: "Publication",
      views: 2100,
      engagement: "Very High",
      category: "Arts",
    },
    {
      title: "Tips for Better Study Habits",
      type: "Forum Topic",
      views: 145,
      engagement: "Medium",
      category: "Academic",
    },
    {
      title: "Basketball Season Highlights",
      type: "Publication",
      views: 1850,
      engagement: "High",
      category: "Sports",
    },
  ];

  const engagementColors = {
    "Very High": "bg-green-100 text-green-800",
    High: "bg-blue-100 text-blue-800",
    Medium: "bg-yellow-100 text-yellow-800",
    Low: "bg-red-100 text-red-800",
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Track performance and engagement across the platform
          </p>
        </div>
        <Select defaultValue="30days">
          <SelectTrigger className="w-48">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7days">Last 7 days</SelectItem>
            <SelectItem value="30days">Last 30 days</SelectItem>
            <SelectItem value="90days">Last 90 days</SelectItem>
            <SelectItem value="1year">Last year</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {overviewStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {stat.description}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <div className="flex items-center gap-1">
                    {stat.trend === "up" ? (
                      <TrendingUp className="h-3 w-3 text-green-600" />
                    ) : (
                      <TrendingDown className="h-3 w-3 text-red-600" />
                    )}
                    <span
                      className={`text-xs font-medium ${
                        stat.trend === "up" ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {stat.change}
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="engagement">Engagement</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Trends */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Activity</CardTitle>
                <CardDescription>
                  Publications, forum posts, and user growth over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="publications"
                      stroke="#8884d8"
                      name="Publications"
                    />
                    <Line
                      type="monotone"
                      dataKey="forumPosts"
                      stroke="#82ca9d"
                      name="Forum Posts"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Category Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Content Categories</CardTitle>
                <CardDescription>
                  Distribution of content by category
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={categoryData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) =>
                        `${name} ${((percent ?? 0) * 100).toFixed(0)}%`
                      }
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {categoryData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Daily Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Activity</CardTitle>
              <CardDescription>
                Daily breakdown of platform activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Bar
                    dataKey="publications"
                    fill="#8884d8"
                    name="Publications"
                  />
                  <Bar dataKey="forumPosts" fill="#82ca9d" name="Forum Posts" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Content</CardTitle>
              <CardDescription>
                Most viewed and engaged content this month
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topContent.map((content, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-medium">{content.title}</h3>
                        <Badge variant="outline">{content.type}</Badge>
                        <Badge variant="secondary">{content.category}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {content.views} views
                      </p>
                    </div>
                    <Badge
                      className={
                        engagementColors[
                          content.engagement as keyof typeof engagementColors
                        ]
                      }
                    >
                      {content.engagement}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Growth</CardTitle>
              <CardDescription>
                Monthly active users and growth trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="users"
                    stroke="#8884d8"
                    fill="#8884d8"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="engagement" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Page Views</CardTitle>
              <CardDescription>
                Daily page views and engagement metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={dailyActivity}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area
                    type="monotone"
                    dataKey="views"
                    stroke="#82ca9d"
                    fill="#82ca9d"
                    fillOpacity={0.6}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
