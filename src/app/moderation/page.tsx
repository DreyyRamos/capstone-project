"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Search,
  Flag,
  AlertTriangle,
  User,
  Shield,
  Ban,
  TriangleAlert,
  Filter,
} from "lucide-react";
import Link from "next/link";
import {
  useModeratorQuery,
  useFetchUsersModerator,
  useFetchReportCountQuery,
} from "@/hooks/useModerator";
import Cookies from "js-cookie";
import { useRoleGate } from "@/utils/userRoleGate";
import { ContentViewModal } from "@/components/content-view-modal";
import { useConfirmation } from "@/components/confirmation-provider";
import ModerationLoading from "./loading";
import { ContentType } from "@/generated/prisma";
import ReportsList from "@/components/moderation/reports-list";
import ActionsTakenLists from "@/components/moderation/actions-taken-lists";
import ReportedUsers from "@/components/moderation/reported-users";

interface TransformedReport {
  id: string;
  contentType: string;
  title: string;
  reportedBy: string;
  reportedUser: string;
  reportedByUser: any;
  reportedUserObj: any;
  reason: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  contentPreview: string;
  category: string;
  reportedUserId: string;
  contentId: string;
  actionTaken?: string;
  forum?: any;
  publication?: any;
  originalReport: any;
}

export default function ModerationPage() {
  const { confirmDelete, confirmAction } = useConfirmation();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("PENDING");
  const [typeFilter, setTypeFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedReport, setSelectedReport] = useState<any>(null);
  const [isContentModalOpen, setIsContentModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("reports");

  const token = Cookies.get("token") || "";
  useRoleGate(["ADMIN", "MODERATOR"], token);

  const {
    data: reportedContents,
    isLoading,
    deleteReportedContent,
    restoreContent,
    cleanupReport,
  } = useModeratorQuery(token);
  console.log("reported contents", reportedContents);
  const { data: reportCount } = useFetchReportCountQuery(token);
  console.log("report count: ", reportCount);

  const { data: usersModerator, triggerBan } = useFetchUsersModerator(token);
  console.log("users for moderation", usersModerator);

  // Transform API data to match UI expectations
  const transformedReports: TransformedReport[] = useMemo(() => {
    return (
      reportedContents?.reports?.map((report: any) => ({
        id: report.reportId,
        contentType: report.contentType,
        title: getReportTitle(report),
        reportedBy: `${report.reportedBy?.firstName || "Unknown"} ${
          report.reportedBy?.lastName || "User"
        }`,
        reportedUser: `${report.reportedUser?.firstName || "Unknown"} ${
          report.reportedUser?.lastName || "User"
        }`,
        // Keep the full objects for the modal
        reportedByUser: report.reportedBy,
        reportedUserObj: report.reportedUser,
        reason: report.reportReason,
        description:
          report.description ||
          `Report for ${report.contentType?.toLowerCase().replace("_", " ")}`,
        status: report?.status || "PENDING",
        priority: report?.priority || "MEDIUM",
        createdAt: report?.createdAt || new Date().toISOString(),
        contentPreview:
          report.reportedContent || "No content preview available",
        category: getContentCategory(report),
        reportedUserId: report.reportedUserId,
        contentId: getContentId(report),
        actionTaken: report?.actionTaken,
        forum: report?.forum,
        publication: report?.publication,
        // Pass through all original report data
        originalReport: report,
      })) || []
    );
  }, [reportedContents?.reports]);

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
      report.forumReplyId ||
      report.pubReplyId ||
      report.forumReplyToReplyId ||
      report.pubReplyToReplyId ||
      "unknown"
    );
  }

  // Enhanced filtering and sorting logic
  const filteredAndSortedReports = useMemo(() => {
    if (!transformedReports.length) return [];

    // Filter the reports
    const filtered = transformedReports.filter((report: TransformedReport) => {
      const searchLower = searchQuery.toLowerCase();

      // Enhanced search across relevant fields
      const matchesSearch =
        searchQuery === "" ||
        report.title?.toLowerCase().includes(searchLower) ||
        report.reason?.toLowerCase().includes(searchLower) ||
        report.description?.toLowerCase().includes(searchLower) ||
        report.reportedBy?.toLowerCase().includes(searchLower) ||
        report.reportedUser?.toLowerCase().includes(searchLower) ||
        report.contentPreview?.toLowerCase().includes(searchLower) ||
        report.category?.toLowerCase().includes(searchLower);

      // Status filter
      const matchesStatus =
        statusFilter === "all" || report.status === statusFilter;

      // Type filter
      const matchesType =
        typeFilter === "all" || report.contentType === typeFilter;

      // Priority filter
      const matchesPriority =
        priorityFilter === "all" || report.priority === priorityFilter;

      return matchesSearch && matchesStatus && matchesType && matchesPriority;
    });

    // Sort the filtered results
    return filtered.sort((a: TransformedReport, b: TransformedReport) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "priority":
          const priorityOrder = { URGENT: 4, HIGH: 3, MEDIUM: 2, LOW: 1 };
          const aPriority =
            priorityOrder[a.priority as keyof typeof priorityOrder] || 0;
          const bPriority =
            priorityOrder[b.priority as keyof typeof priorityOrder] || 0;
          return bPriority - aPriority;
        case "status":
          return a.status.localeCompare(b.status);
        case "reporter":
          return a.reportedBy.localeCompare(b.reportedBy);
        case "reported_user":
          return a.reportedUser.localeCompare(b.reportedUser);
        case "type":
          return a.contentType.localeCompare(b.contentType);
        case "alphabetical":
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });
  }, [
    transformedReports,
    searchQuery,
    statusFilter,
    typeFilter,
    priorityFilter,
    sortBy,
  ]);

  // Filtered users for user management tab
  const filteredUsers = useMemo(() => {
    if (!usersModerator?.users) return [];

    if (!searchQuery) return usersModerator.users;

    const searchLower = searchQuery.toLowerCase();
    return usersModerator.users.filter(
      (user: any) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        user.email?.toLowerCase().includes(searchLower) ||
        user.role?.toLowerCase().includes(searchLower)
    );
  }, [usersModerator?.users, searchQuery]);

  // Filtered actions
  const filteredActions = useMemo(() => {
    const actionsReports = transformedReports.filter(
      (report) => report.actionTaken
    );

    if (!searchQuery) return actionsReports;

    const searchLower = searchQuery.toLowerCase();
    return actionsReports.filter(
      (report) =>
        report.actionTaken?.toLowerCase().includes(searchLower) ||
        report.title?.toLowerCase().includes(searchLower) ||
        report.reportedBy?.toLowerCase().includes(searchLower) ||
        report.reason?.toLowerCase().includes(searchLower)
    );
  }, [transformedReports, searchQuery]);

  console.log("filtered reports", filteredAndSortedReports);

  // Calculate stats from real data
  const reportsWithoutAction = transformedReports.filter(
    (r: TransformedReport) => !r.actionTaken
  );

  const commentTypes = Object.values(ContentType).filter(
    (v) => v.includes("COMMENT") || v.includes("REPLY")
  );

  const stats = [
    {
      label: "Pending Reports",
      value: reportsWithoutAction
        .filter((r: TransformedReport) => r.status === "PENDING")
        .length.toString(),
      icon: Flag,
      color: "text-orange-600",
    },
    {
      label: "High Priority",
      value: reportsWithoutAction
        .filter((r: TransformedReport) =>
          ["URGENT", "HIGH"].includes(r.priority)
        )
        .length.toString(),
      icon: AlertTriangle,
      color: "text-yellow-600",
    },
    {
      label: "Total Pending Reports",
      value: reportsWithoutAction.length.toString(),
      icon: Ban,
      color: "text-red-600",
    },
  ];

  const handleViewContent = (report: any) => {
    setSelectedReport(report);
    setIsContentModalOpen(true);
  };

  const handleDelete = async (
    contentType: any,
    contentId: any,
    reportId: any,
    userId: any
  ) => {
    deleteReportedContent({ contentType, contentId, reportId, userId });
  };

  const handleRestoreContent = (reportId: string) => {
    restoreContent(reportId);
  };

  const handleCleanUp = () => {
    cleanupReport();
  };

  const handleBan = (userId: any, reportId: any) => {
    if (!userId) {
      console.error("Cannot trigger action without userId");
      return;
    }
    triggerBan({ userId, reportId: reportId ?? null });
  };

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("PENDING");
    setTypeFilter("all");
    setPriorityFilter("all");
    setSortBy("newest");
  };

  const hasActiveFilters =
    searchQuery ||
    statusFilter !== "PENDING" ||
    typeFilter !== "all" ||
    priorityFilter !== "all" ||
    sortBy !== "newest";

  if (isLoading) {
    return <ModerationLoading />;
  }

  return (
    <div className="space-y-6">
      <ContentViewModal
        isOpen={isContentModalOpen}
        onClose={() => setIsContentModalOpen(false)}
        report={selectedReport}
      />
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Moderation Center</h1>
          <p className="text-muted-foreground">
            Review reports, manage content, and maintain community standards
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() =>
              // confirmDelete("or clean-up reported contents", handleCleanUp)
              alert("this is currently disabled, but this works!")
            }
            className="text-xs sm:text-sm"
          >
            <TriangleAlert className="mr-2 h-4 w-4" />
            <span className="hidden sm:inline">Clean Up Reported Contents</span>
            <span className="sm:hidden">Clean Up</span>
          </Button>
        </div>
      </div>

      <Tabs
        defaultValue="reports"
        className="space-y-6"
        onValueChange={setActiveTab}
      >
        <div className="overflow-x-auto">
          <TabsList className="w-full sm:w-auto">
            <TabsTrigger value="reports" className="text-xs sm:text-sm">
              Reports ({transformedReports.length})
              {activeTab === "reports" && hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                  {filteredAndSortedReports.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="actions" className="text-xs sm:text-sm">
              Recent Actions
              {activeTab === "actions" && searchQuery && (
                <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                  {filteredActions.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="users" className="text-xs sm:text-sm">
              User Management
              {activeTab === "users" && searchQuery && (
                <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                  {filteredUsers.length}
                </Badge>
              )}
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="reports" className="space-y-6">
          {/* Enhanced Filters */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="space-y-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search reports, users, reasons, or content..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                  {hasActiveFilters && (
                    <Button
                      variant="outline"
                      onClick={clearFilters}
                      className="shrink-0"
                    >
                      <Filter className="mr-2 h-4 w-4" />
                      Clear Filters
                    </Button>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="RESTORED">Restored</SelectItem>
                      <SelectItem value="RESOLVED">Resolved</SelectItem>
                      <SelectItem value="DELETED">Deleted</SelectItem>
                      <SelectItem value="UNDER_REVIEW">Under Review</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value={ContentType.FORUM_POST}>
                        Forum Posts
                      </SelectItem>
                      <SelectItem value={ContentType.PUBLICATION}>
                        Publications
                      </SelectItem>
                      {commentTypes.map((t) => (
                        <SelectItem key={t} value={t}>
                          {t.replace(/_/g, " ")}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <Select
                    value={priorityFilter}
                    onValueChange={setPriorityFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priority</SelectItem>
                      <SelectItem value="URGENT">Urgent</SelectItem>
                      <SelectItem value="HIGH">High</SelectItem>
                      <SelectItem value="MEDIUM">Medium</SelectItem>
                      <SelectItem value="LOW">Low</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger>
                      <SelectValue placeholder="Sort by" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="newest">Newest First</SelectItem>
                      <SelectItem value="oldest">Oldest First</SelectItem>
                      <SelectItem value="priority">By Priority</SelectItem>
                      <SelectItem value="status">By Status</SelectItem>
                      <SelectItem value="reporter">By Reporter</SelectItem>
                      <SelectItem value="reported_user">
                        By Reported User
                      </SelectItem>
                      <SelectItem value="type">By Type</SelectItem>
                      <SelectItem value="alphabetical">Alphabetical</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results Summary */}
          {hasActiveFilters && (
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>
                Showing {filteredAndSortedReports.length} of{" "}
                {transformedReports.length} reports
              </span>
            </div>
          )}

          {/* Reports List */}
          <div className="space-y-4">
            {filteredAndSortedReports.length === 0 ? (
              <Card>
                <CardContent className="p-8 text-center">
                  <div className="space-y-4">
                    <Flag className="h-12 w-12 text-muted-foreground mx-auto" />
                    <h3 className="text-lg font-semibold">No reports found</h3>
                    <p className="text-muted-foreground">
                      {transformedReports.length === 0
                        ? "No reports have been submitted yet."
                        : hasActiveFilters
                        ? "No reports match your current filters."
                        : "No reports available."}
                    </p>
                    {hasActiveFilters && (
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              filteredAndSortedReports.map((report: TransformedReport) => {
                return (
                  <ReportsList
                    key={report.id}
                    report={report}
                    confirmAction={confirmAction}
                    confirmDelete={confirmDelete}
                    handleDelete={handleDelete}
                    handleRestoreContent={handleRestoreContent}
                    handleViewContent={handleViewContent}
                  />
                );
              })
            )}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          {/* Search for actions */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search moderation actions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Moderation Actions</CardTitle>
              <CardDescription>
                Track all moderation activities and decisions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredActions.length === 0 ? (
                  <div className="text-center py-8">
                    <Shield className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No moderation actions match your search."
                        : "No moderation actions taken yet."}
                    </p>
                  </div>
                ) : (
                  filteredActions.map((reportActions: TransformedReport) => (
                    <ActionsTakenLists
                      key={reportActions?.id}
                      reportActions={reportActions}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          {/* Search for users */}
          <Card>
            <CardContent className="p-4 sm:p-6">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search users by name, email, or role..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
              <CardDescription>
                Manage user warnings, suspensions, and bans
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.length === 0 ? (
                  <div className="text-center py-8">
                    <User className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      {searchQuery
                        ? "No users match your search criteria."
                        : "No users available for moderation."}
                    </p>
                  </div>
                ) : (
                  filteredUsers.map((user: any) => (
                    <ReportedUsers
                      key={user.id}
                      user={user}
                      confirmAction={confirmAction}
                      handleBan={handleBan}
                    />
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Stats */}
      <h1 className="text-2xl font-bold">Moderator Statistics</h1>
      <p className="text-muted-foreground">
        Number of pending reports that the mods taken actions.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-3 sm:p-6">
              <div className="flex items-center gap-2 sm:gap-4">
                <div className="p-2 sm:p-3 bg-muted rounded-lg flex-shrink-0">
                  <stat.icon
                    className={`h-4 w-4 sm:h-6 sm:w-6 ${stat.color}`}
                  />
                </div>
                <div className="min-w-0">
                  <p className="text-lg sm:text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground truncate">
                    {stat.label}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
