"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Eye,
  MessageSquare,
  User,
  Calendar,
  MoreHorizontal,
  Ban,
  FileText,
  XCircle,
} from "lucide-react";

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

interface ReportsProps {
  report: TransformedReport;
  handleViewContent: (report: TransformedReport) => void;
  confirmAction: (title: string, content: string, func: () => void) => void;
  confirmDelete: (title: string, func: () => void) => void;
  handleDelete: (
    contentType: string,
    contentId: string,
    id: string,
    reportUserObjId: string
  ) => void;
  handleRestoreContent: (id: string) => void;
}

const ReportsList = ({
  report,
  handleViewContent,
  confirmAction,
  confirmDelete,
  handleDelete,
  handleRestoreContent,
}: ReportsProps) => {
  const typeIcons = {
    forum_post: MessageSquare,
    publication: FileText,
    comment: MessageSquare,
    user_behavior: User,
  };

  const priorityColors = {
    LOW: "bg-green-100 text-green-800",
    MEDIUM: "bg-yellow-100 text-yellow-800",
    HIGH: "bg-red-100 text-red-800",
    URGENT: "bg-violet-700 text-white",
  };

  const statusColors = {
    PENDING: "bg-orange-100 text-orange-800",
    RESOLVED: "bg-green-100 text-green-800",
    DISMISSED: "bg-gray-100 text-gray-800",
    RESTORED: "bg-blue-100 text-blue-800",
    DELETED: "bg-red-100 text-red-800",
    UNDER_REVIEW: "bg-gray-400 text-gray-800",
  };

  const TypeIcon =
    typeIcons[report.contentType as keyof typeof typeIcons] || MessageSquare;
  return (
    <Card key={report.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div id="reports-list-flex-1" data-testId="reports-list-flex-1" className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div id="reports-list-div-2" data-testId="reports-list-div-2" className="flex-1 min-w-0">
            <div id="reports-list-flex-3" data-testId="reports-list-flex-3" className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3">
              <div id="reports-list-flex-4" data-testId="reports-list-flex-4" className="flex items-center gap-2">
                <TypeIcon className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                <h3 className="text-sm sm:text-lg font-semibold truncate">
                  {report.title}
                </h3>
              </div>
              <div id="reports-list-flex-5" data-testId="reports-list-flex-5" className="flex flex-wrap gap-1">
                <Badge
                  className={
                    statusColors[report.status as keyof typeof statusColors]
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
            </div>

            <div id="reports-list-div-6" data-testId="reports-list-div-6" className="bg-muted p-3 rounded-md mb-3">
              <p className="text-sm italic break-words">
                &quot;{report.contentPreview}&quot;
              </p>
            </div>

            <p className="text-sm text-muted-foreground mb-3 break-words">
              {report.description}
            </p>

            {/* Mobile-friendly info layout */}
            <div id="reports-list-div-7" data-testId="reports-list-div-7" className="space-y-2">
              <div id="reports-list-grid-8" data-testId="reports-list-grid-8" className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-muted-foreground">
                <div id="reports-list-flex-9" data-testId="reports-list-flex-9" className="flex items-start gap-1">
                  <span className="font-medium flex-shrink-0">
                    Reported By:
                  </span>
                  <span className="truncate">{report.reportedBy}</span>
                </div>
                <div id="reports-list-flex-10" data-testId="reports-list-flex-10" className="flex items-start gap-1">
                  <span className="font-medium flex-shrink-0">Against:</span>
                  <span className="truncate">{report.reportedUser}</span>
                </div>
                <div id="reports-list-flex-11" data-testId="reports-list-flex-11" className="flex items-start gap-1">
                  <span className="font-medium flex-shrink-0">Reason:</span>
                  <span className="truncate">{report.reason}</span>
                </div>
                <div id="reports-list-flex-12" data-testId="reports-list-flex-12" className="flex items-start gap-1">
                  <span className="font-medium flex-shrink-0">Category:</span>
                  <span className="truncate">{report.category}</span>
                </div>
              </div>
              <div id="reports-list-flex-13" data-testId="reports-list-flex-13" className="flex items-center gap-1 text-xs sm:text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 flex-shrink-0" />
                <span>{new Date(report.createdAt).toLocaleDateString()}</span>
              </div>
            </div>
          </div>

          <div id="reports-list-div-14" data-testId="reports-list-div-14" className="flex-shrink-0">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-9 w-auto px-1 sm:h-10 sm:w-10 sm:px-0.5 text-xs sm:text-sm font-medium hover:border-accent-foreground"
                >
                  <span className="sm:hidden sm:hover:border-accent-foreground sm:border-accent">
                    Take Action
                  </span>
                  <MoreHorizontal className="hidden sm:block h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => handleViewContent(report)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Content
                </DropdownMenuItem>
                {!["RESTORED", "RESOLVED", "DELETED"].includes(
                  report.status
                ) && (
                  <>
                    <DropdownMenuItem
                      onClick={() =>
                        confirmAction(
                          "Dismiss Report",
                          "This will restore the reported content",
                          () => handleRestoreContent(report.id)
                        )
                      }
                    >
                      <XCircle className="mr-2 h-4 w-4" />
                      Dismiss Report
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-red-600"
                      onClick={() =>
                        confirmDelete(
                          "reported content",
                          async () =>
                            await handleDelete(
                              report.contentType.toUpperCase(),
                              report.contentId,
                              report.id,
                              report?.reportedUserObj?.id
                            )
                        )
                      }
                    >
                      <Ban className="mr-2 h-4 w-4" />
                      Delete this content
                    </DropdownMenuItem>
                  </>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ReportsList;
