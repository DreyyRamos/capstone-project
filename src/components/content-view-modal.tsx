"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Clock,
  MessageSquare,
  FileText,
  Flag,
  Heart,
  Eye,
  AlertTriangle,
} from "lucide-react";

interface ContentViewModalProps {
  isOpen: boolean;
  onClose: () => void;
  report: any;
}

export function ContentViewModal({
  isOpen,
  onClose,
  report,
}: ContentViewModalProps) {
  console.log("report from modal", report);

  // Get content info based on report data
  const getContentInfo = () => {
    if (!report) return null;

    const baseInfo = {
      contentId: report.contentId,
      contentType: report.type,
      createdAt: report.createdAt || new Date().toISOString(),
      reportedContent:
        report.contentPreview ||
        report.reportedContent ||
        "No content available",
      bodyOfContent: report?.forum?.description || report?.publication?.content,
      reportedUser: {
        name: `${report.reportedUser || "Unknown"}`,
        role: report.reportedUserObj?.role,
        avatar: report.reportedUserObj?.profileImage || "/placeholder.svg",
      },
    };

    // Return appropriate content structure based on type
    switch (report.type || report.contentType) {
      case "forum_post":
      case "FORUM_POST":
        return {
          ...baseInfo,
          type: "forum_post",
          title: report.title || "Forum Post",
          category: report.category || "General",
          icon: MessageSquare,
          iconColor: "text-blue-600",
        };

      case "publication":
      case "PUBLICATION":
        return {
          ...baseInfo,
          type: "publication",
          title: report.title || "Publication",
          category: report.category || "General",
          icon: FileText,
          iconColor: "text-green-600",
        };

      case "publication_comment":
      case "PUBLICATION_COMMENT":
        return {
          ...baseInfo,
          type: "publication_comment",
          title: report.title || "Publication Comment",
          category: report.category || "General",
          icon: MessageSquare,
          iconColor: "text-purple-600",
        };

      default:
        return {
          ...baseInfo,
          type: "content",
          title: report.title || "Reported Content",
          category: report.category || "General",
          icon: FileText,
          iconColor: "text-gray-600",
        };
    }
  };

  const content = getContentInfo();

  if (!report || !content) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl w-[95vw] max-h-[95vh] flex flex-col p-0">
        <DialogHeader className="shrink-0 p-6 pb-4">
          <DialogTitle className="flex items-center gap-2">
            <Eye className="h-5 w-5" />
            Content Review
          </DialogTitle>
          <DialogDescription>
            Viewing reported content for moderation review
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="flex-1 px-6 overflow-y-auto h-full">
          <div className="space-y-6 pb-6">
            {/* Report Information */}
            <div className="border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20 rounded-lg p-4">
              <h3 className="text-lg font-semibold flex items-center gap-2 text-red-800 dark:text-red-300 mb-4">
                <AlertTriangle className="h-5 w-5" />
                Report Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300 mb-1">
                    Report Reason:
                  </p>
                  <p className="text-red-800 dark:text-red-400">
                    {report.reason || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300 mb-1">
                    Priority:
                  </p>
                  <Badge
                    className={`${
                      report.priority === "HIGH" || report.priority === "URGENT"
                        ? "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                        : report.priority === "MEDIUM"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        : "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    }`}
                  >
                    {report.priority || "MEDIUM"}
                  </Badge>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300 mb-1">
                    Reported User:
                  </p>
                  <p className="text-red-800 dark:text-red-400">
                    {report?.reportedUser}
                  </p>
                </div>
                <div>
                  <p className="font-medium text-red-700 dark:text-red-300 mb-1">
                    Status:
                  </p>
                  <Badge
                    variant="outline"
                    className="text-red-600 border-red-300 dark:text-red-400 dark:border-red-600"
                  >
                    {report.status || "PENDING"}
                  </Badge>
                </div>
              </div>
              {(report.description || report.reason) && (
                <div className="mt-4">
                  <p className="font-medium text-red-700 dark:text-red-300 mb-1">
                    Additional Details:
                  </p>
                  <p className="text-red-800 dark:text-red-400 text-sm leading-relaxed">
                    {report.description ||
                      `Report for ${content.contentType?.replace("_", " ")}`}
                  </p>
                </div>
              )}
            </div>

            <Separator />

            {/* Main Content Card */}
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-4">
                  <content.icon className={`h-5 w-5 ${content.iconColor}`} />
                  <Badge variant="secondary">
                    {content.type
                      .replace("_", " ")
                      .replace(/\b\w/g, (l: string) => l.toUpperCase())}
                  </Badge>
                  {content.category && (
                    <Badge variant="outline">{content.category}</Badge>
                  )}
                </div>

                <h2 className="text-xl font-semibold mb-4">{content.title}</h2>

                <div className="flex items-center gap-3 mb-6">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={content.reportedUser.avatar} />
                    <AvatarFallback>
                      {content.reportedUser.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium text-sm">
                      {content.reportedUser.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {content.reportedUser.role}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground ml-auto">
                    <Clock className="h-3 w-3" />
                    {new Date(content.createdAt).toLocaleDateString()}
                  </div>
                </div>

                {/* Reported Content Section */}
                <div className="border border-red-200 bg-red-50/50 dark:border-red-800 dark:bg-red-950/20 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Flag className="h-4 w-4 text-red-600 mt-0.5 shrink-0" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                        Reported Content:
                      </p>
                      <div className="text-red-700 dark:text-red-400 leading-relaxed mb-2">
                        "{content.reportedContent}"
                      </div>
                      {content?.bodyOfContent && (
                        <>
                          <Separator />
                          <p className="text-sm font-medium text-red-800 dark:text-red-300 mb-2">
                            Reported Content Body:
                          </p>
                          <div
                            className="prose prose-lg max-w-none dark:prose-invert"
                            dangerouslySetInnerHTML={{
                              __html: content?.bodyOfContent,
                            }}
                          />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Context Information */}
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Content Context</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Content Type:</span>
                    <span className="font-medium">{content.contentType}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Reported By:</span>
                    <span className="font-medium">
                      {report.reportedBy || "System"}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Report Date:</span>
                    <span className="font-medium">
                      {new Date(content.createdAt).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Content ID:</span>
                    <code className="bg-muted px-2 py-1 rounded text-xs font-mono">
                      {content.contentId || "N/A"}
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </ScrollArea>

        <div className="shrink-0 p-6 pt-4 border-t bg-background flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button variant="destructive">Take Action</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
