"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Search,
  Flag,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  MessageSquare,
  User,
  Calendar,
  MoreHorizontal,
  Shield,
  Ban,
  FileText,
} from "lucide-react"
import Link from "next/link"
import { useModeratorQuery } from "@/hooks/useModerator";
import Cookies from "js-cookie";

export default function ModerationPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const token = Cookies.get("token") || "";

  const { data: reportedContents } = useModeratorQuery(token);
  console.log("reported contents", reportedContents);

  // Transform API data to match UI expectations
  const transformedReports =
    reportedContents?.reports?.map((report: any) => ({
      id: report.reportId,
      type: report.contentType?.toLowerCase().replace("_", "_"),
      title: getReportTitle(report),
      reportedBy: `${report.reportedBy?.firstName || "Unknown"} ${
        report.reportedBy?.lastName || "User"
      }`,
      reportedUser: `${report.reportedUser?.firstName || "Unknown"} ${
        report.reportedUser?.lastName || "User"
      }`,
      reason: report.reportReason,
      description:
        report.description ||
        `Report for ${report.contentType?.toLowerCase().replace("_", " ")}`,
      status: report?.status || "pending",
      priority: report?.priority || "medium",
      createdAt: report?.createdAt || new Date().toISOString(),
      contentPreview: report.reportedContent || "No content preview available",
      category: getContentCategory(report),
      reportedUserId: report.reportedUserId,
      contentId: getContentId(report),
    })) || [];

  function getReportTitle(report: any) {
    const contentType = report.contentType?.toLowerCase();
    const reason = report.reportReason || "Content violation";

    switch (contentType) {
      case "forum_post":
        return `Forum post reported for: ${reason}`;
      case "publication":
        return `Publication reported for: ${reason}`;
      case "comment":
        return `Comment reported for: ${reason}`;
      default:
        return `Content reported for: ${reason}`;
    }
  }

  function getContentCategory(report: any) {
    if (report.forumId) return "Forum";
    if (report.pubId) return "Publication";
    return "General";
  }

  function getContentId(report: any) {
    return (
      report.forumId ||
      report.pubId ||
      report.forumCommentId ||
      report.pubCommentId ||
      "unknown"
    );
  }

  // Filter reports based on search and filters
  const filteredReports = transformedReports.filter((report: any) => {
    const matchesSearch =
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reportedBy.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.reason.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus =
      statusFilter === "all" || report.status === statusFilter;
    const matchesType = typeFilter === "all" || report.type === typeFilter;

    return matchesSearch && matchesStatus && matchesType;
  });

  // Calculate stats from real data
  const stats = [
    {
      label: "Pending Reports",
      value: transformedReports
        .filter((r: any) => r.status === "PENDING")
        .length.toString(),
      icon: Flag,
      color: "text-orange-600",
    },
    {
      label: "Resolved Today",
      value: transformedReports
        .filter(
          (r: any) =>
            r.status === "resolved" &&
            new Date(r.createdAt).toDateString() === new Date().toDateString()
        )
        .length.toString(),
      icon: CheckCircle,
      color: "text-green-600",
    },
    {
      label: "High Priority",
      value: transformedReports
        .filter((r: any) => ["URGENT", "HIGH"].includes(r.priority))
        .length.toString(),
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      label: "Total Reports",
      value: transformedReports.length.toString(),
      icon: Ban,
      color: "text-red-600",
    },
  ];

  const moderationActions = [
    {
      id: 1,
      action: "Post Removed",
      moderator: "Current User",
      target: "Forum Post: Study Tips Discussion",
      reason: "Inappropriate language",
      timestamp: "2024-01-20T15:30:00Z",
      type: "content_removal",
    },
    {
      id: 2,
      action: "User Warned",
      moderator: "Current User",
      target: "User: Alex Chen",
      reason: "Violation of community guidelines",
      timestamp: "2024-01-20T15:25:00Z",
      type: "user_warning",
    },
    {
      id: 3,
      action: "Publication Approved",
      moderator: "Jane Smith",
      target: "Publication: Science Fair Results",
      reason: "Content review completed",
      timestamp: "2024-01-20T14:00:00Z",
      type: "content_approval",
    },
  ];

  const priorityColors = {
    low: "bg-green-100 text-green-800",
    medium: "bg-yellow-100 text-yellow-800",
    high: "bg-red-100 text-red-800",
  };

  const statusColors = {
    pending: "bg-orange-100 text-orange-800",
    resolved: "bg-green-100 text-green-800",
    dismissed: "bg-gray-100 text-gray-800",
  };

  const typeIcons = {
    forum_post: MessageSquare,
    publication: FileText,
    comment: MessageSquare,
    user_behavior: User,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Moderation Center</h1>
          <p className="text-muted-foreground">
            Review reports, manage content, and maintain community standards
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/moderation/guidelines">
              <Shield className="mr-2 h-4 w-4" />
              Guidelines
            </Link>
          </Button>
          <Button asChild>
            <Link href="/moderation/reports/new">
              <Flag className="mr-2 h-4 w-4" />
              Create Report
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">
            Reports ({transformedReports.length})
          </TabsTrigger>
          <TabsTrigger value="actions">Recent Actions</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="resolved">Resolved</SelectItem>
                    <SelectItem value="dismissed">Dismissed</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="forum_post">Forum Posts</SelectItem>
                    <SelectItem value="publication">Publications</SelectItem>
                    <SelectItem value="comment">Comments</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Reports List */}
          <div className="space-y-4">
            {filteredReports.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <Flag className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">
                    No reports found
                  </h3>
                  <p className="text-muted-foreground">
                    {transformedReports.length === 0
                      ? "No reports have been submitted yet."
                      : "No reports match your current filters."}
                  </p>
                </CardContent>
              </Card>
            ) : (
              filteredReports.map((report: any) => {
                const TypeIcon =
                  typeIcons[report.type as keyof typeof typeIcons] ||
                  MessageSquare;
                return (
                  <Card
                    key={report.id}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <TypeIcon className="h-4 w-4 text-muted-foreground" />
                            <h3 className="text-lg font-semibold">
                              {report.title}
                            </h3>
                            <Badge
                              className={
                                statusColors[
                                  report.status as keyof typeof statusColors
                                ]
                              }
                            >
                              {report.status}
                            </Badge>
                            <Badge
                              className={
                                priorityColors[
                                  report.priority as keyof typeof priorityColors
                                ]
                              }
                            >
                              {report.priority} priority
                            </Badge>
                          </div>
                          <div className="bg-muted p-3 rounded-md mb-3">
                            <p className="text-sm italic">
                              "{report.contentPreview}"
                            </p>
                          </div>
                          <p className="text-muted-foreground mb-3">
                            {report.description}
                          </p>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Reported By: {report.reportedBy}</span>
                            <span>•</span>
                            <span>Against: {report.reportedUser}</span>
                            <span>•</span>
                            <span>Reason: {report.reason}</span>
                            <span>•</span>
                            <span>Category: {report.category}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              {new Date(report.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                              <Eye className="mr-2 h-4 w-4" />
                              View Content
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <CheckCircle className="mr-2 h-4 w-4" />
                              Resolve Report
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <XCircle className="mr-2 h-4 w-4" />
                              Dismiss Report
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-red-600">
                              <Ban className="mr-2 h-4 w-4" />
                              Take Action
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Moderation Actions</CardTitle>
              <CardDescription>
                Track all moderation activities and decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {moderationActions.map((action) => (
                  <div
                    key={action.id}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <Shield className="h-4 w-4" />
                      </div>
                      <div>
                        <p className="font-medium">{action.action}</p>
                        <p className="text-sm text-muted-foreground">
                          {action.target}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Reason: {action.reason}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium">{action.moderator}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(action.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user warnings, suspensions, and bans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>AC</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">Alex Chen</p>
                      <p className="text-sm text-muted-foreground">
                        alex.chen@lincolnhigh.edu
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Student
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-yellow-100 text-yellow-800">
                      1 Warning
                    </Badge>
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm">
                          <AlertTriangle className="mr-2 h-4 w-4" />
                          Warn User
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Issue Warning</AlertDialogTitle>
                          <AlertDialogDescription>
                            Send a warning to this user for violating community
                            guidelines.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <Textarea placeholder="Reason for warning..." />
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction>Send Warning</AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>JS</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">John Smith</p>
                      <p className="text-sm text-muted-foreground">
                        john.smith@lincolnhigh.edu
                      </p>
                      <Badge variant="secondary" className="text-xs">
                        Student
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="bg-red-100 text-red-800">Suspended</Badge>
                    <Button variant="outline" size="sm">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Lift Suspension
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
