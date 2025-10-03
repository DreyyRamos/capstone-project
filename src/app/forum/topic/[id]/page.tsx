"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { MessageCircle, Share2, Flag, ArrowLeft, Clock } from "lucide-react";
import ForumLikeButton from "@/components/like-buttons/forum-like-button";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useFetchForumById } from "@/hooks/useForum";
import {
  useForumAddComment,
  useForumAddTopReplyForum,
  useForumAddNestedReply,
} from "@/hooks/useForum";
import Cookies from "js-cookie";
import { ReportModal } from "@/components/report-modal";
import { useReportModal } from "@/hooks/use-report-modal";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import { useUserQuery } from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import ForumTopicLoading from "./loading";
import CommentList from "@/components/forum/topic-with-id/comment-list";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ForumTopicPage({ params }: PageProps) {
  const { confirmDelete } = useConfirmation();
  const token = Cookies.get("token") || "";
  const { id } = use(params);
  const [comment_content, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyingToSecondLevel, setReplyingToSecondLevel] = useState<
    string | null
  >(null);
  const [secondLevelReplyContent, setSecondLevelReplyContent] = useState("");

  // Edit states
  const [editingComment, setEditingComment] = useState<string | null>(null);
  const [editCommentContent, setEditCommentContent] = useState("");
  const [editingReply, setEditingReply] = useState<string | null>(null);
  const [editReplyContent, setEditReplyContent] = useState("");
  const [editingNestedReply, setEditingNestedReply] = useState<string | null>(
    null
  );
  const [editNestedReplyContent, setEditNestedReplyContent] = useState("");

  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const {
    isModalOpen,
    contentType,
    contentId,
    contentTitle,
    openReportModal,
    closeReportModal,
    reportedUserId,
  } = useReportModal();
  const { mutate: commentToPost } = useForumAddComment(token);
  const { mutate: addTopReply } = useForumAddTopReplyForum(token);
  const { mutate: addNestedReply } = useForumAddNestedReply(token);

  const { data: currentUser } = useUserQuery(token);

  const { StatusModal, checkComment, checkLike, checkShare, checkAndExecute } =
    useUserStatusCheck(currentUser?.userData?.status, {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    });

  const {
    data: topic,
    isLoading,
    editComment,
    deleteComment,
    editReply,
    deleteReply,
    editReplyToReply,
    deleteReplyToReply,
  } = useFetchForumById(token, id);

  console.log("forum to check", topic);

  // Helper function to check if current user owns the content
  const isCurrentUserContent = (authorId: string) => {
    return currentUser?.userData?.id === authorId;
  };

  // Edit handlers
  const handleEditComment = (comment: any) => {
    setEditingComment(comment.commentId);
    setEditCommentContent(comment.comment_content);
  };

  const handleEditReply = (reply: any) => {
    setEditingReply(reply.replyId);
    setEditReplyContent(reply.reply_content);
  };

  const handleEditNestedReply = (nestedReply: any) => {
    setEditingNestedReply(nestedReply.replyToReplyId);
    setEditNestedReplyContent(nestedReply.replyToReply_content);
  };

  const handleSaveEditComment = async (commentId: string) => {
    if (editCommentContent.trim()) {
      try {
        editComment({ comment: editCommentContent, commentId });
        console.log("Updating comment:", commentId, editCommentContent);

        setEditingComment(null);
        setEditCommentContent("");
        toast.success("Comment updated successfully!");
      } catch (error) {
        toast.error("Failed to update comment");
        console.error("Error updating comment:", error);
      }
    }
  };

  const handleSaveEditReply = async (replyId: string, commentId: string) => {
    if (editReplyContent.trim()) {
      try {
        editReply({ comment: editReplyContent, commentId, replyId });
        console.log("Updating reply:", replyId, editReplyContent);

        setEditingReply(null);
        setEditReplyContent("");
        toast.success("Reply updated successfully!");
      } catch (error) {
        toast.error("Failed to update reply");
        console.error("Error updating reply:", error);
      }
    }
  };

  const handleSaveEditNestedReply = async (
    nestedReplyId: string,
    commentId: string,
    replyId: string,
    childId: string
  ) => {
    if (editNestedReplyContent.trim()) {
      try {
        editReplyToReply({
          comment: editNestedReplyContent,
          commentId,
          replyId,
          childId,
        });
        console.log(
          "Updating nested reply:",
          nestedReplyId,
          editNestedReplyContent
        );

        setEditingNestedReply(null);
        setEditNestedReplyContent("");
        toast.success("Reply updated successfully!");
      } catch (error) {
        toast.error("Failed to update reply");
        console.error("Error updating nested reply:", error);
      }
    }
  };

  const handleCancelEdit = () => {
    setEditingComment(null);
    setEditCommentContent("");
    setEditingReply(null);
    setEditReplyContent("");
    setEditingNestedReply(null);
    setEditNestedReplyContent("");
  };

  // Delete handlers
  const handleDeleteComment = async (commentId: string) => {
    try {
      deleteComment({ commentId });
      console.log("Deleting comment:", commentId);

      toast.success("Comment deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReply = async (replyId: string, commentId: string) => {
    try {
      deleteReply({ commentId, replyId });
      console.log("Deleting reply:", replyId);

      toast.success("Reply deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete reply");
      console.error("Error deleting reply:", error);
    }
  };

  const handleDeleteNestedReply = async (
    nestedReplyId: string,
    commentId: string,
    replyId: string
  ) => {
    try {
      deleteReplyToReply({ commentId, replyId, childId: nestedReplyId });
      console.log("Deleting nested reply:", nestedReplyId);

      toast.success("Reply deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete reply");
      console.error("Error deleting nested reply:", error);
    }
  };

  const handleComment = async (forumId: string) => {
    checkComment(async () => {
      if (requireAuth("comment on this publication")) {
        if (comment_content.trim()) {
          console.log("Adding comment:", comment_content);
          try {
            await commentToPost(
              { content: comment_content, forumId },
              {
                onSuccess: () => {
                  toast.success("Comment added successfully!");
                },
              }
            );
            setCommentContent("");
            toast.success("Sending comment...");
          } catch (error) {
            toast.error("Failed to add comment");
            console.error("Error adding comment:", error);
          }
        }
      }
    });
  };

  const handleReply = (commentId: string) => {
    checkAndExecute("reply", () => {
      if (requireAuth("reply to this comment")) {
        if (replyingTo === commentId) {
          setReplyingTo(null);
          setReplyContent("");
        } else {
          setReplyingTo(commentId);
          setReplyContent("");
        }
      }
    });
  };

  const handleSecondLevelReply = (replyId: string) => {
    checkAndExecute("reply", () => {
      if (requireAuth("reply to this reply")) {
        if (replyingToSecondLevel === replyId) {
          setReplyingToSecondLevel(null);
          setSecondLevelReplyContent("");
        } else {
          setReplyingToSecondLevel(replyId);
          setSecondLevelReplyContent("");
        }
      }
    });
  };

  const handleSubmitReply = async (forumId: string, commentId: string) => {
    if (requireAuth("submit reply")) {
      if (replyContent.trim()) {
        console.log("Adding reply to comment:", commentId, replyContent);
        try {
          await addTopReply(
            { content: replyContent, forumId, commentId },
            {
              onSuccess: () => {
                toast.success("Comment added successfully!");
              },
            }
          );
          setReplyContent("");
          setReplyingTo(null);
          toast.success("Sending comment...");
        } catch (error) {
          toast.error("Failed to add reply");
          console.error("Error adding reply:", error);
        }
      }
    }
  };

  const handleSubmitSecondLevelReply = async (
    replyId: string,
    commentId: string
  ) => {
    if (requireAuth("submit second-level reply")) {
      if (secondLevelReplyContent.trim()) {
        console.log(
          "Adding second-level reply to reply:",
          replyId,
          secondLevelReplyContent
        );
        try {
          await addNestedReply(
            {
              content: secondLevelReplyContent,
              forumId: id,
              replyId,
              commentId,
            },
            {
              onSuccess: () => {
                toast.success("Comment added successfully!");
              },
            }
          );
          setSecondLevelReplyContent("");
          setReplyingToSecondLevel(null);
          toast.success("Sending comment...");
        } catch (error) {
          console.error("Error adding second-level reply:", error);
        }
      }
    }
  };

  const handleCancelReply = () => {
    setReplyingTo(null);
    setReplyContent("");
  };

  const handleCancelSecondLevelReply = () => {
    setReplyingToSecondLevel(null);
    setSecondLevelReplyContent("");
  };

  const handleReplyDislike = (replyId: number) => {
    requireAuth("dislike this reply");
  };

  const handleReportTopic = () => {
    checkAndExecute("report", () => {
      if (requireAuth("report this forum")) {
        openReportModal(
          "FORUM_POST",
          topic?.forumId,
          topic?.topicTitle,
          topic?.authorId
        );
      }
    });
  };

  const handleReportForumComment = (
    commentId: string,
    commentContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", () => {
      if (requireAuth("report this comment")) {
        openReportModal("FORUM_COMMENT", commentId, commentContent, authorId);
      }
    });
  };

  const handleReportForumReply = (
    replyId: string,
    replyContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", () => {
      if (requireAuth("report this comment")) {
        openReportModal("FORUM_REPLY", replyId, replyContent, authorId);
      }
    });
  };

  const handleReportForumNestedReply = (
    nestedReplyId: string,
    nestedReplyContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", () => {
      if (requireAuth("report this comment")) {
        openReportModal(
          "FORUM_REPLY_TO_REPLY",
          nestedReplyId,
          nestedReplyContent,
          authorId
        );
      }
    });
  };

  const [showAll, setShowAll] = useState(false);

  const allComments = topic?.forumComments?.slice().reverse() || [];
  const visibleComments = showAll
    ? allComments.reverse()
    : allComments.slice(0, 3).reverse();

  if (isLoading) {
    return <ForumTopicLoading />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      <ReportModal
        isOpen={isModalOpen}
        onClose={closeReportModal}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
        reportedUserId={reportedUserId}
      />
      <StatusModal />

      {/* Back Button */}
      <Button asChild variant="ghost">
        <Link href="/forum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>

      {/* Topic Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {/* {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />} */}
              <Badge variant="secondary">{topic?.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {/* {topic.views} views */}
              </span>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <span>Tags: </span>
              {topic?.tags?.map((tag: any) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>

            <h1 className="text-3xl font-bold">{topic?.topicTitle}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={topic?.author?.profileImage || "/placeholder.svg"}
                  />
                  <AvatarFallback>
                    {topic?.author?.firstName
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">
                    {topic?.author?.firstName} {topic?.author?.lastName}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {topic?.author?.role}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(topic?.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <ForumLikeButton forum={topic} token={token} forumId={id} />
                <Button variant="outline" size="sm" onClick={handleReportTopic}>
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-lg leading-relaxed">{topic?.description}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {topic?.forumComments?.length} replies
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">
          Replies ({topic?.forumComments?.length || 0})
        </h2>

        {topic?.forumComments?.length > 3 && (
          <div className="group relative">
            <span
              className="text-muted-foreground text-sm cursor-pointer"
              onClick={() => setShowAll(!showAll)}
            >
              {showAll
                ? `Hide replies`
                : `View all ${topic?.forumComments?.length} replies.`}
            </span>
            {!showAll && (
              <div className="absolute hidden bg-gray-100 p-2 rounded shadow">
                Click to view all replies.
              </div>
            )}
          </div>
        )}

        {visibleComments.map((comment: any) => (
          <CommentList
            key={comment.commentId}
            token={token}
            id={id}
            topic={topic}
            comment={comment}
            isCurrentUserContent={isCurrentUserContent}
            editingComment={editingComment}
            editingReply={editingReply}
            editReplyContent={editReplyContent}
            editCommentContent={editCommentContent}
            replyContent={replyContent}
            replyingTo={replyingTo}
            replyingToSecondLevel={replyingToSecondLevel}
            secondLevelReplyContent={secondLevelReplyContent}
            editingNestedReply={editingNestedReply}
            editNestedReplyContent={editNestedReplyContent}
            handleEditComment={handleEditComment}
            confirmDelete={confirmDelete}
            handleDeleteComment={handleDeleteComment}
            setEditCommentContent={setEditCommentContent}
            setEditNestedReplyContent={setEditNestedReplyContent}
            setSecondLevelReplyContent={setSecondLevelReplyContent}
            setReplyContent={setReplyContent}
            setEditReplyContent={setEditReplyContent}
            handleSaveEditReply={handleSaveEditReply}
            handleSaveEditComment={handleSaveEditComment}
            handleCancelEdit={handleCancelEdit}
            handleReply={handleReply}
            handleReportForumComment={handleReportForumComment}
            handleCancelReply={handleCancelReply}
            handleSubmitReply={handleSubmitReply}
            handleEditReply={handleEditReply}
            handleDeleteReply={handleDeleteReply}
            handleReplyDislike={handleReplyDislike}
            handleSecondLevelReply={handleSecondLevelReply}
            handleReportForumReply={handleReportForumReply}
            handleCancelSecondLevelReply={handleCancelSecondLevelReply}
            handleSubmitSecondLevelReply={handleSubmitSecondLevelReply}
            handleEditNestedReply={handleEditNestedReply}
            handleDeleteNestedReply={handleDeleteNestedReply}
            handleSaveEditNestedReply={handleSaveEditNestedReply}
            handleReportForumNestedReply={handleReportForumNestedReply}
          />
        ))}
      </div>

      {/* Reply Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add a Reply</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts or advice..."
              value={comment_content}
              onChange={(e) => setCommentContent(e.target.value)}
              rows={4}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Be respectful and constructive in your responses
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setCommentContent("")}>
                  Cancel
                </Button>
                <Button
                  onClick={() => handleComment(topic?.forumId)}
                  disabled={!comment_content.trim()}
                >
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
