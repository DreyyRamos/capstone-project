"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { X, Flag, AlertTriangle } from "lucide-react";
import Cookies from "js-cookie";

// Complete content types - ALL LEVELS including reply-to-reply (children)
type ContentType =
  | "FORUM_POST"
  | "FORUM_COMMENT"
  | "FORUM_REPLY"
  | "FORUM_REPLY_TO_REPLY" // Children of forum replies
  | "PUBLICATION"
  | "PUBLICATION_COMMENT"
  | "PUBLICATION_REPLY"
  | "PUBLICATION_REPLY_TO_REPLY"; // Children of publication replies

interface ReportModalProps {
  isOpen: boolean;
  onClose: () => void;
  contentType: ContentType;
  contentId: string;
  contentTitle?: string;
  reportedUserId?: string; // ID of user who created the content
}

const reportReasons = [
  {
    id: "Spam or unwanted content",
    label: "Spam or unwanted content",
    description: "Repetitive, irrelevant, or promotional content",
  },
  {
    id: "Harassment or bullying",
    label: "Harassment or bullying",
    description: "Content that targets or intimidates individuals",
  },
  {
    id: "Inappropriate Language",
    label: "Inappropriate content",
    description: "Content not suitable for a school environment",
  },
  {
    id: "Misinformation",
    label: "False or misleading information",
    description: "Content that spreads incorrect information",
  },
  {
    id: "Copyright violation",
    label: "Copyright violation",
    description: "Unauthorized use of copyrighted material",
  },
  {
    id: "Hate Speech",
    label: "Hate speech or discrimination",
    description: "Content that promotes hatred based on identity",
  },
  {
    id: "Other",
    label: "Other",
    description: "Something else that violates community guidelines",
  },
];

export function ReportModal({
  isOpen,
  onClose,
  contentType,
  contentId,
  contentTitle,
  reportedUserId,
}: ReportModalProps) {
  const [selectedReason, setSelectedReason] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const token = Cookies.get("token") || "";

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason) return;

    setIsSubmitting(true);

    // Prepare data for your complete schema
    const reportData = {
      contentType,
      reportedContent: contentTitle || "Content reported",
      reportReason: selectedReason,
      description: additionalDetails || undefined,
      reportedUserId,

      // Map contentId to the appropriate field based on ALL content types
      ...(contentType === "FORUM_POST" && { forumId: contentId }),
      ...(contentType === "FORUM_COMMENT" && { forumCommentId: contentId }),
      ...(contentType === "FORUM_REPLY" && { forumReplyId: contentId }),
      ...(contentType === "FORUM_REPLY_TO_REPLY" && {
        forumReplyToReplyId: contentId,
      }),

      ...(contentType === "PUBLICATION" && { pubId: contentId }),
      ...(contentType === "PUBLICATION_COMMENT" && { pubCommentId: contentId }),
      ...(contentType === "PUBLICATION_REPLY" && { pubReplyId: contentId }),
      ...(contentType === "PUBLICATION_REPLY_TO_REPLY" && {
        pubReplyToReplyId: contentId,
      }),
    };

    try {
      const response = await fetch("/api/reports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(reportData),
      });

      if (response.ok) {
        setIsSubmitted(true);
        // Auto close after 2 seconds
        setTimeout(() => {
          handleClose();
        }, 2000);
      } else {
        console.error("Failed to submit report");
        // Handle error
      }
    } catch (error) {
      console.error("Error submitting report:", error);
      // Handle error
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setAdditionalDetails("");
    setIsSubmitted(false);
    setIsSubmitting(false);
    onClose();
  };

  const getContentTypeLabel = () => {
    switch (contentType) {
      case "PUBLICATION":
        return "publication";
      case "FORUM_POST":
        return "forum post";
      case "FORUM_COMMENT":
      case "PUBLICATION_COMMENT":
        return "comment";
      case "FORUM_REPLY":
      case "PUBLICATION_REPLY":
        return "reply";
      case "FORUM_REPLY_TO_REPLY":
      case "PUBLICATION_REPLY_TO_REPLY":
        return "nested reply";
      default:
        return "content";
    }
  };

  const getContentHierarchy = () => {
    switch (contentType) {
      case "FORUM_POST":
      case "PUBLICATION":
        return "Main content";
      case "FORUM_COMMENT":
      case "PUBLICATION_COMMENT":
        return "Comment";
      case "FORUM_REPLY":
      case "PUBLICATION_REPLY":
        return "Reply to comment";
      case "FORUM_REPLY_TO_REPLY":
      case "PUBLICATION_REPLY_TO_REPLY":
        return "Reply to reply";
      default:
        return "Content";
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <div className="flex items-center gap-2">
            <Flag className="h-5 w-5 text-red-600" />
            <CardTitle className="text-lg">
              Report {getContentTypeLabel()}
            </CardTitle>
          </div>
          <Button variant="ghost" size="sm" onClick={handleClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>

        <CardContent>
          {isSubmitted ? (
            <div className="text-center py-8">
              <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-4">
                <Flag className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Report Submitted</h3>
              <p className="text-muted-foreground">
                Thank you for helping keep our community safe. We'll review your
                report and take appropriate action.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              {contentTitle && (
                <div className="p-3 bg-muted rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm text-muted-foreground">Reporting:</p>
                    <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                      {getContentHierarchy()}
                    </span>
                  </div>
                  <p className="font-medium text-sm">{contentTitle}</p>
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <Label className="text-base font-medium">
                    Why are you reporting this {getContentTypeLabel()}?
                  </Label>
                  <p className="text-sm text-muted-foreground mb-4">
                    Select the reason that best describes the issue
                  </p>
                </div>

                <RadioGroup
                  value={selectedReason}
                  onValueChange={setSelectedReason}
                >
                  {reportReasons.map((reason) => (
                    <div
                      key={reason.id}
                      className="flex items-start space-x-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem
                        value={reason.id}
                        id={reason.id}
                        className="mt-1"
                      />
                      <div className="flex-1">
                        <Label
                          htmlFor={reason.id}
                          className="font-medium cursor-pointer"
                        >
                          {reason.label}
                        </Label>
                        <p className="text-sm text-muted-foreground mt-1">
                          {reason.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="details">Additional details (optional)</Label>
                <Textarea
                  id="details"
                  placeholder="Provide any additional context that might help us understand the issue..."
                  value={additionalDetails}
                  onChange={(e) => setAdditionalDetails(e.target.value)}
                  rows={3}
                />
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-amber-800 mb-1">
                      Please note:
                    </p>
                    <p className="text-amber-700">
                      False reports may result in restrictions on your account.
                      Only report content that genuinely violates our community
                      guidelines.
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClose}
                  className="flex-1 bg-transparent"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!selectedReason || isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? "Submitting..." : "Submit Report"}
                </Button>
              </div>
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

// Complete usage examples for ALL content levels:
/*
// Forum post
<ReportModal
  contentType="FORUM_POST"
  contentId="forum_123"
  contentTitle="Forum post title"
  reportedUserId="user_456"
/>

// Forum comment
<ReportModal
  contentType="FORUM_COMMENT"
  contentId="comment_789"
  contentTitle="Comment content preview"
  reportedUserId="user_456"
/>

// Forum reply (first level)
<ReportModal
  contentType="FORUM_REPLY"
  contentId="reply_321"
  contentTitle="Reply content preview"
  reportedUserId="user_789"
/>

// Forum reply-to-reply (children/nested level)
<ReportModal
  contentType="FORUM_REPLY_TO_REPLY"
  contentId="replyToReply_654"
  contentTitle="Nested reply content preview"
  reportedUserId="user_123"
/>

// Publication comment
<ReportModal
  contentType="PUBLICATION_COMMENT"
  contentId="pubComment_987"
  contentTitle="Publication comment content"
  reportedUserId="user_456"
/>

// Publication reply-to-reply (children)
<ReportModal
  contentType="PUBLICATION_REPLY_TO_REPLY"
  contentId="pubReplyToReply_555"
  contentTitle="Nested publication reply"
  reportedUserId="user_888"
/>
*/
