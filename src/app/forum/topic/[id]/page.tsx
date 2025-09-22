"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  MessageCircle,
  Share2,
  Flag,
  ArrowLeft,
  Clock,
  ThumbsDown,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ForumLikeButton from "@/components/like-buttons/forum-like-button";
import ForumCommentLikeButton from "@/components/like-buttons/forum-comment-like-button";
import ForumCommentReplyLikeButton from "@/components/like-buttons/forum-comment-reply-like-button";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useFetchForumById } from "@/hooks/useForum";
import {
  useForumAddNestedReply,
  useForumAddTopReplyForum,
  useForumAddComment,
} from "@/hooks/useForumReplies";
import Cookies from "js-cookie";
import ForumReplyToReplyLikeButton from "@/components/like-buttons/forum-replyToReply-like-button";
import { ReportModal } from "@/components/report-modal";
import { useReportModal } from "@/hooks/use-report-modal";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import { useUserQuery } from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import ForumTopicLoading from "./loading";

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
            await commentToPost({ content: comment_content, forumId });
            setCommentContent("");
            toast.success("Comment added successfully!");
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
          await addTopReply({ content: replyContent, forumId, commentId });
          setReplyContent("");
          setReplyingTo(null);
          toast.success("Reply added successfully!");
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
          await addNestedReply({
            content: secondLevelReplyContent,
            forumId: id,
            replyId,
            commentId,
          });
          setSecondLevelReplyContent("");
          setReplyingToSecondLevel(null);
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
    openReportModal(
      "FORUM_POST",
      topic?.forumId,
      topic?.topicTitle,
      topic?.authorId
    );
  };

  const handleReportForumComment = (
    commentId: string,
    commentContent: string,
    authorId?: string
  ) => {
    openReportModal("FORUM_COMMENT", commentId, commentContent, authorId);
  };

  const handleReportForumReply = (
    replyId: string,
    replyContent: string,
    authorId?: string
  ) => {
    openReportModal("FORUM_REPLY", replyId, replyContent, authorId);
  };

  const handleReportForumNestedReply = (
    nestedReplyId: string,
    nestedReplyContent: string,
    authorId?: string
  ) => {
    openReportModal(
      "FORUM_REPLY_TO_REPLY",
      nestedReplyId,
      nestedReplyContent,
      authorId
    );
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
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
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
          <Card key={comment.commentId}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage
                      src={comment.author.profileImage || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {comment.author.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">
                          {comment.author.firstName} {comment.author.lastName}
                        </p>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            {comment.author.role}
                          </Badge>
                          {comment.isHelpful && (
                            <Badge
                              variant="secondary"
                              className="text-xs bg-green-100 text-green-800"
                            >
                              Helpful
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {new Date(comment.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {/* Dropdown menu for comment owner */}
                      {isCurrentUserContent(comment.authorId) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditComment(comment)}
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                confirmDelete("comment", () =>
                                  handleDeleteComment(comment.commentId)
                                );
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Comment content - editable if in edit mode */}
                    {editingComment === comment.commentId ? (
                      <div className="space-y-2">
                        <Textarea
                          value={editCommentContent}
                          onChange={(e) =>
                            setEditCommentContent(e.target.value)
                          }
                          rows={3}
                        />
                        <div className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleSaveEditComment(comment.commentId)
                            }
                            disabled={!editCommentContent.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="leading-relaxed">
                        {comment.comment_content}
                      </p>
                    )}

                    <div className="flex items-center gap-4">
                      <ForumCommentLikeButton
                        comment={comment}
                        token={token}
                        forumId={id}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReplyDislike(comment.commentId)}
                      >
                        <ThumbsDown className="mr-2 h-4 w-4" />
                        {comment.dislikes}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleReply(comment.commentId)}
                      >
                        {replyingTo === comment.commentId ? "Cancel" : "Reply"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleReportForumComment(
                            comment?.commentId,
                            comment?.comment_content,
                            comment?.authorId
                          )
                        }
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {replyingTo === comment.commentId && (
                  <div className="ml-6 md:ml-14 space-y-3">
                    <div className="border-l-2 border-muted pl-2 md:pl-4">
                      <Textarea
                        placeholder="Write your reply..."
                        value={replyContent}
                        onChange={(e) => setReplyContent(e.target.value)}
                        rows={2}
                        className="resize-none"
                      />
                      <div className="flex items-center justify-end gap-2 mt-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={handleCancelReply}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          onClick={() =>
                            handleSubmitReply(topic?.forumId, comment.commentId)
                          }
                          disabled={!replyContent.trim()}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>
                )}

                {comment.replies && comment.replies.length > 0 && (
                  <div className="ml-6 md:ml-14 space-y-4 border-l-2 border-muted pl-2 md:pl-4">
                    {comment.replies.map((reply: any) => (
                      <div
                        key={reply.replyId}
                        className="flex items-start gap-4"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              reply.reply_author.profileImage ||
                              "/placeholder.svg" ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {reply.reply_author.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {reply.reply_author.firstName}{" "}
                                {reply.reply_author.lastName}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {reply.reply_author.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.createdAt).toLocaleDateString()}
                              </span>
                            </div>

                            {/* Dropdown menu for reply owner */}
                            {isCurrentUserContent(reply.reply_authorId) && (
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button variant="ghost" size="sm">
                                    <MoreVertical className="h-4 w-4" />
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent align="end">
                                  <DropdownMenuItem
                                    onClick={() => handleEditReply(reply)}
                                  >
                                    <Edit2 className="h-4 w-4 mr-2" />
                                    Edit
                                  </DropdownMenuItem>
                                  <DropdownMenuItem
                                    onClick={() => {
                                      confirmDelete("reply", () =>
                                        handleDeleteReply(
                                          reply.replyId,
                                          comment.commentId
                                        )
                                      );
                                    }}
                                    className="text-red-600"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete
                                  </DropdownMenuItem>
                                </DropdownMenuContent>
                              </DropdownMenu>
                            )}
                          </div>

                          {/* Reply content - editable if in edit mode */}
                          {editingReply === reply.replyId ? (
                            <div className="space-y-2">
                              <Textarea
                                value={editReplyContent}
                                onChange={(e) =>
                                  setEditReplyContent(e.target.value)
                                }
                                rows={2}
                              />
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  onClick={() =>
                                    handleSaveEditReply(
                                      reply.replyId,
                                      comment.commentId
                                    )
                                  }
                                  disabled={!editReplyContent.trim()}
                                >
                                  Save
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={handleCancelEdit}
                                >
                                  Cancel
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="text-sm leading-relaxed">
                              {reply.reply_content}
                            </p>
                          )}

                          <div className="flex items-center gap-4">
                            <ForumCommentReplyLikeButton
                              reply={reply}
                              token={token}
                              forumId={id}
                            />
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleReplyDislike(reply.replyId)}
                            >
                              <ThumbsDown className="mr-2 h-4 w-4" />
                              {reply.dislikes}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleSecondLevelReply(reply.replyId)
                              }
                            >
                              {replyingToSecondLevel === reply.replyId
                                ? "Cancel"
                                : "Reply"}
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() =>
                                handleReportForumReply(
                                  reply.replyId,
                                  reply.reply_content,
                                  reply.reply_authorId
                                )
                              }
                            >
                              <Flag className="h-4 w-4" />
                            </Button>
                          </div>

                          {replyingToSecondLevel === reply.replyId && (
                            <div className="ml-3 md:ml-6 space-y-3">
                              <div className="border-l-2 border-muted pl-2 md:pl-4">
                                <Textarea
                                  placeholder="Write your reply..."
                                  value={secondLevelReplyContent}
                                  onChange={(e) =>
                                    setSecondLevelReplyContent(e.target.value)
                                  }
                                  rows={2}
                                  className="resize-none"
                                />
                                <div className="flex items-center justify-end gap-2 mt-2">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCancelSecondLevelReply}
                                  >
                                    Cancel
                                  </Button>
                                  <Button
                                    size="sm"
                                    onClick={() =>
                                      handleSubmitSecondLevelReply(
                                        reply.replyId,
                                        comment.commentId
                                      )
                                    }
                                    disabled={!secondLevelReplyContent.trim()}
                                  >
                                    Reply
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}

                          {reply.children && reply.children.length > 0 && (
                            <div className="ml-3 md:ml-6 space-y-4 border-l-2 border-muted pl-2 md:pl-4 mt-4">
                              {reply.children.map((childReply: any) => (
                                <div
                                  key={childReply.replyToReplyId}
                                  className="flex items-start gap-4"
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={
                                        childReply.reply_author.profileImage ||
                                        "/placeholder.svg" ||
                                        "/placeholder.svg"
                                      }
                                    />
                                    <AvatarFallback>
                                      {childReply.reply_author.firstName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm">
                                          {childReply.reply_author.firstName}{" "}
                                          {childReply.reply_author.lastName}
                                        </p>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {childReply.reply_author.role}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(
                                            childReply.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>

                                      {/* Dropdown menu for nested reply owner */}
                                      {isCurrentUserContent(
                                        childReply.reply_authorId
                                      ) && (
                                        <DropdownMenu>
                                          <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="sm">
                                              <MoreVertical className="h-4 w-4" />
                                            </Button>
                                          </DropdownMenuTrigger>
                                          <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                              onClick={() =>
                                                handleEditNestedReply(
                                                  childReply
                                                )
                                              }
                                            >
                                              <Edit2 className="h-4 w-4 mr-2" />
                                              Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                              onClick={() => {
                                                confirmDelete("reply", () =>
                                                  handleDeleteNestedReply(
                                                    childReply.replyToReplyId,
                                                    comment.commentId,
                                                    reply.replyId
                                                  )
                                                );
                                              }}
                                              className="text-red-600"
                                            >
                                              <Trash2 className="h-4 w-4 mr-2" />
                                              Delete
                                            </DropdownMenuItem>
                                          </DropdownMenuContent>
                                        </DropdownMenu>
                                      )}
                                    </div>

                                    {/* Nested reply content - editable if in edit mode */}
                                    {editingNestedReply ===
                                    childReply.replyToReplyId ? (
                                      <div className="space-y-2">
                                        <Textarea
                                          value={editNestedReplyContent}
                                          onChange={(e) =>
                                            setEditNestedReplyContent(
                                              e.target.value
                                            )
                                          }
                                          rows={2}
                                        />
                                        <div className="flex items-center gap-2">
                                          <Button
                                            size="sm"
                                            onClick={() =>
                                              handleSaveEditNestedReply(
                                                childReply.replyToReplyId,
                                                comment.commentId,
                                                reply.replyId,
                                                childReply.replyToReplyId
                                              )
                                            }
                                            disabled={
                                              !editNestedReplyContent.trim()
                                            }
                                          >
                                            Save
                                          </Button>
                                          <Button
                                            variant="ghost"
                                            size="sm"
                                            onClick={handleCancelEdit}
                                          >
                                            Cancel
                                          </Button>
                                        </div>
                                      </div>
                                    ) : (
                                      <p className="text-sm leading-relaxed">
                                        {childReply.replyToReply_content}
                                      </p>
                                    )}

                                    <div className="flex items-center gap-4">
                                      <ForumReplyToReplyLikeButton
                                        replyToReply={childReply}
                                        token={token}
                                        forumId={id}
                                        commentId={reply?.commentId}
                                      />
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleReplyDislike(childReply.replyId)
                                        }
                                      >
                                        <ThumbsDown className="mr-2 h-4 w-4" />
                                        {childReply.dislikes}
                                      </Button>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() =>
                                          handleReportForumNestedReply(
                                            childReply.replyToReplyId,
                                            childReply.replyToReply_content,
                                            childReply?.reply_authorId
                                          )
                                        }
                                      >
                                        <Flag className="h-4 w-4" />
                                      </Button>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
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

// "use client";

// import { useState, use } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Textarea } from "@/components/ui/textarea";
// import { toast } from "sonner";
// import {
//   MessageCircle,
//   Share2,
//   Flag,
//   ArrowLeft,
//   Clock,
//   ThumbsDown,
//   MoreVertical,
//   Edit2,
//   Trash2,
// } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import ForumLikeButton from "@/components/like-buttons/forum-like-button";
// import ForumCommentLikeButton from "@/components/like-buttons/forum-comment-like-button";
// import ForumCommentReplyLikeButton from "@/components/like-buttons/forum-comment-reply-like-button";
// import Link from "next/link";
// import { AuthModal } from "@/components/auth-modal";
// import { useAuthModal } from "@/hooks/use-auth-modal";
// import { useFetchForumById } from "@/hooks/useForum";
// import {
//   useForumAddNestedReply,
//   useForumAddTopReplyForum,
//   useForumAddComment,
// } from "@/hooks/useForumReplies";
// import Cookies from "js-cookie";
// import ForumReplyToReplyLikeButton from "@/components/like-buttons/forum-replyToReply-like-button";
// import { ReportModal } from "@/components/report-modal";
// import { useReportModal } from "@/hooks/use-report-modal";
// import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
// import { useUserQuery } from "@/hooks/useUser";
// import { useConfirmation } from "@/components/confirmation-provider";
// import ForumTopicLoading from "./loading";

// type PageProps = {
//   params: Promise<{ id: string }>;
// };

// export default function ForumTopicPage({ params }: PageProps) {
//   const { confirmDelete } = useConfirmation();
//   const token = Cookies.get("token") || "";
//   const { id } = use(params);
//   const [comment_content, setCommentContent] = useState("");
//   const [replyingTo, setReplyingTo] = useState<string | null>(null);
//   const [replyContent, setReplyContent] = useState("");
//   const [replyingToSecondLevel, setReplyingToSecondLevel] = useState<
//     string | null
//   >(null);
//   const [secondLevelReplyContent, setSecondLevelReplyContent] = useState("");

//   // Edit states
//   const [editingComment, setEditingComment] = useState<string | null>(null);
//   const [editCommentContent, setEditCommentContent] = useState("");
//   const [editingReply, setEditingReply] = useState<string | null>(null);
//   const [editReplyContent, setEditReplyContent] = useState("");
//   const [editingNestedReply, setEditingNestedReply] = useState<string | null>(
//     null
//   );
//   const [editNestedReplyContent, setEditNestedReplyContent] = useState("");

//   const { isOpen, action, redirectTo, requireAuth, closeModal } =
//     useAuthModal();
//   const {
//     isModalOpen,
//     contentType,
//     contentId,
//     contentTitle,
//     openReportModal,
//     closeReportModal,
//     reportedUserId,
//   } = useReportModal();
//   const { mutate: commentToPost } = useForumAddComment(token);
//   const { mutate: addTopReply } = useForumAddTopReplyForum(token);
//   const { mutate: addNestedReply } = useForumAddNestedReply(token);

//   const { data: currentUser } = useUserQuery(token);

//   const { StatusModal, checkComment, checkLike, checkShare, checkAndExecute } =
//     useUserStatusCheck(currentUser?.userData?.status, {
//       onBlocked: (action, status) => {
//         console.log(`User tried to ${action} but is ${status}`);
//       },
//     });

//   const {
//     data: topic,
//     isLoading,
//     editComment,
//     deleteComment,
//     editReply,
//     deleteReply,
//     editReplyToReply,
//     deleteReplyToReply,
//   } = useFetchForumById(token, id);

//   console.log("forum to check", topic);

//   // Helper function to check if current user owns the content
//   const isCurrentUserContent = (authorId: string) => {
//     return currentUser?.userData?.id === authorId;
//   };

//   // Edit handlers
//   const handleEditComment = (comment: any) => {
//     setEditingComment(comment.commentId);
//     setEditCommentContent(comment.comment_content);
//   };

//   const handleEditReply = (reply: any) => {
//     setEditingReply(reply.replyId);
//     setEditReplyContent(reply.reply_content);
//   };

//   const handleEditNestedReply = (nestedReply: any) => {
//     setEditingNestedReply(nestedReply.replyToReplyId);
//     setEditNestedReplyContent(nestedReply.replyToReply_content);
//   };

//   const handleSaveEditComment = async (commentId: string) => {
//     if (editCommentContent.trim()) {
//       try {
//         editComment({ comment: editCommentContent, commentId });
//         console.log("Updating comment:", commentId, editCommentContent);

//         setEditingComment(null);
//         setEditCommentContent("");
//         toast.success("Comment updated successfully!");
//       } catch (error) {
//         toast.error("Failed to update comment");
//         console.error("Error updating comment:", error);
//       }
//     }
//   };

//   const handleSaveEditReply = async (replyId: string, commentId: string) => {
//     if (editReplyContent.trim()) {
//       try {
//         editReply({ comment: editReplyContent, commentId, replyId });
//         console.log("Updating reply:", replyId, editReplyContent);

//         setEditingReply(null);
//         setEditReplyContent("");
//         toast.success("Reply updated successfully!");
//       } catch (error) {
//         toast.error("Failed to update reply");
//         console.error("Error updating reply:", error);
//       }
//     }
//   };

//   const handleSaveEditNestedReply = async (
//     nestedReplyId: string,
//     commentId: string,
//     replyId: string,
//     childId: string
//   ) => {
//     if (editNestedReplyContent.trim()) {
//       try {
//         editReplyToReply({
//           comment: editNestedReplyContent,
//           commentId,
//           replyId,
//           childId,
//         });
//         console.log(
//           "Updating nested reply:",
//           nestedReplyId,
//           editNestedReplyContent
//         );

//         setEditingNestedReply(null);
//         setEditNestedReplyContent("");
//         toast.success("Reply updated successfully!");
//       } catch (error) {
//         toast.error("Failed to update reply");
//         console.error("Error updating nested reply:", error);
//       }
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingComment(null);
//     setEditCommentContent("");
//     setEditingReply(null);
//     setEditReplyContent("");
//     setEditingNestedReply(null);
//     setEditNestedReplyContent("");
//   };

//   // Delete handlers
//   const handleDeleteComment = async (commentId: string) => {
//     try {
//       deleteComment({ commentId });
//       console.log("Deleting comment:", commentId);

//       toast.success("Comment deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete comment");
//       console.error("Error deleting comment:", error);
//     }
//   };

//   const handleDeleteReply = async (replyId: string, commentId: string) => {
//     try {
//       deleteReply({ commentId, replyId });
//       console.log("Deleting reply:", replyId);

//       toast.success("Reply deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete reply");
//       console.error("Error deleting reply:", error);
//     }
//   };

//   const handleDeleteNestedReply = async (
//     nestedReplyId: string,
//     commentId: string,
//     replyId: string
//   ) => {
//     try {
//       deleteReplyToReply({ commentId, replyId, childId: nestedReplyId });
//       console.log("Deleting nested reply:", nestedReplyId);

//       toast.success("Reply deleted successfully!");
//     } catch (error) {
//       toast.error("Failed to delete reply");
//       console.error("Error deleting nested reply:", error);
//     }
//   };

//   const handleComment = async (forumId: string) => {
//     checkComment(async () => {
//       if (requireAuth("comment on this publication")) {
//         if (comment_content.trim()) {
//           console.log("Adding comment:", comment_content);
//           try {
//             await commentToPost({ content: comment_content, forumId });
//             setCommentContent("");
//             toast.success("Comment added successfully!");
//           } catch (error) {
//             toast.error("Failed to add comment");
//             console.error("Error adding comment:", error);
//           }
//         }
//       }
//     });
//   };

//   const handleReply = (commentId: string) => {
//     checkAndExecute("reply", () => {
//       if (requireAuth("reply to this comment")) {
//         if (replyingTo === commentId) {
//           setReplyingTo(null);
//           setReplyContent("");
//         } else {
//           setReplyingTo(commentId);
//           setReplyContent("");
//         }
//       }
//     });
//   };

//   const handleSecondLevelReply = (replyId: string) => {
//     checkAndExecute("reply", () => {
//       if (requireAuth("reply to this reply")) {
//         if (replyingToSecondLevel === replyId) {
//           setReplyingToSecondLevel(null);
//           setSecondLevelReplyContent("");
//         } else {
//           setReplyingToSecondLevel(replyId);
//           setSecondLevelReplyContent("");
//         }
//       }
//     });
//   };

//   const handleSubmitReply = async (forumId: string, commentId: string) => {
//     if (requireAuth("submit reply")) {
//       if (replyContent.trim()) {
//         console.log("Adding reply to comment:", commentId, replyContent);
//         try {
//           await addTopReply({ content: replyContent, forumId, commentId });
//           setReplyContent("");
//           setReplyingTo(null);
//           toast.success("Reply added successfully!");
//         } catch (error) {
//           toast.error("Failed to add reply");
//           console.error("Error adding reply:", error);
//         }
//       }
//     }
//   };

//   const handleSubmitSecondLevelReply = async (
//     replyId: string,
//     commentId: string
//   ) => {
//     if (requireAuth("submit second-level reply")) {
//       if (secondLevelReplyContent.trim()) {
//         console.log(
//           "Adding second-level reply to reply:",
//           replyId,
//           secondLevelReplyContent
//         );
//         try {
//           await addNestedReply({
//             content: secondLevelReplyContent,
//             forumId: id,
//             replyId,
//             commentId,
//           });
//           setSecondLevelReplyContent("");
//           setReplyingToSecondLevel(null);
//         } catch (error) {
//           console.error("Error adding second-level reply:", error);
//         }
//       }
//     }
//   };

//   const handleCancelReply = () => {
//     setReplyingTo(null);
//     setReplyContent("");
//   };

//   const handleCancelSecondLevelReply = () => {
//     setReplyingToSecondLevel(null);
//     setSecondLevelReplyContent("");
//   };

//   const handleReplyDislike = (replyId: number) => {
//     requireAuth("dislike this reply");
//   };

//   const handleReportTopic = () => {
//     openReportModal(
//       "FORUM_POST",
//       topic?.forumId,
//       topic?.topicTitle,
//       topic?.authorId
//     );
//   };

//   const handleReportForumComment = (
//     commentId: string,
//     commentContent: string,
//     authorId?: string
//   ) => {
//     openReportModal("FORUM_COMMENT", commentId, commentContent, authorId);
//   };

//   const handleReportForumReply = (
//     replyId: string,
//     replyContent: string,
//     authorId?: string
//   ) => {
//     openReportModal("FORUM_REPLY", replyId, replyContent, authorId);
//   };

//   const handleReportForumNestedReply = (
//     nestedReplyId: string,
//     nestedReplyContent: string,
//     authorId?: string
//   ) => {
//     openReportModal(
//       "FORUM_REPLY_TO_REPLY",
//       nestedReplyId,
//       nestedReplyContent,
//       authorId
//     );
//   };

//   const [showAll, setShowAll] = useState(false);

//   const allComments = topic?.forumComments?.slice().reverse() || [];
//   const visibleComments = showAll
//     ? allComments.reverse()
//     : allComments.slice(0, 3).reverse();

//   if (isLoading) {
//     return <ForumTopicLoading />;
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       <AuthModal
//         isOpen={isOpen}
//         onClose={closeModal}
//         action={action}
//         redirectTo={redirectTo}
//       />
//       <ReportModal
//         isOpen={isModalOpen}
//         onClose={closeReportModal}
//         contentType={contentType}
//         contentId={contentId}
//         contentTitle={contentTitle}
//         reportedUserId={reportedUserId}
//       />
//       <StatusModal />

//       {/* Back Button */}
//       <Button asChild variant="ghost">
//         <Link href="/forum">
//           <ArrowLeft className="mr-2 h-4 w-4" />
//           Back to Forum
//         </Link>
//       </Button>

//       {/* Topic Header */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="space-y-4">
//             <div className="flex items-center gap-2">
//               {/* {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />} */}
//               <Badge variant="secondary">{topic?.category}</Badge>
//               <span className="text-sm text-muted-foreground">
//                 {/* {topic.views} views */}
//               </span>
//             </div>
//             <div className="flex items-center gap-2 flex-wrap">
//               <span>Tags: </span>
//               {topic?.tags?.map((tag: any) => (
//                 <Badge key={tag} variant="outline" className="text-xs">
//                   {tag}
//                 </Badge>
//               ))}
//             </div>

//             <h1 className="text-3xl font-bold">{topic?.topicTitle}</h1>

//             <div className="flex items-center justify-between">
//               <div className="flex items-center gap-3">
//                 <Avatar className="h-10 w-10">
//                   <AvatarImage
//                     src={topic?.author?.profileImage || "/placeholder.svg"}
//                   />
//                   <AvatarFallback>
//                     {topic?.author?.firstName
//                       .split(" ")
//                       .map((n: any) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <p className="font-medium">
//                     {topic?.author?.firstName} {topic?.author?.lastName}
//                   </p>
//                   <p className="text-sm text-muted-foreground">
//                     {topic?.author?.role}
//                   </p>
//                   <p className="text-sm text-muted-foreground flex items-center gap-1">
//                     <Clock className="h-3 w-3" />
//                     {new Date(topic?.createdAt).toLocaleString()}
//                   </p>
//                 </div>
//               </div>

//               <div className="flex items-center gap-2">
//                 <ForumLikeButton forum={topic} token={token} forumId={id} />
//                 <Button variant="outline" size="sm">
//                   <Share2 className="mr-2 h-4 w-4" />
//                   Share
//                 </Button>
//                 <Button variant="outline" size="sm" onClick={handleReportTopic}>
//                   <Flag className="h-4 w-4" />
//                 </Button>
//               </div>
//             </div>

//             <div className="pt-4">
//               <p className="text-lg leading-relaxed">{topic?.description}</p>
//             </div>

//             <div className="flex items-center gap-4 text-sm text-muted-foreground">
//               <span className="flex items-center gap-1">
//                 <MessageCircle className="h-4 w-4" />
//                 {topic?.forumComments?.length} replies
//               </span>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Replies */}
//       <div className="space-y-4">
//         <h2 className="text-xl font-semibold">
//           Replies ({topic?.forumComments?.length || 0})
//         </h2>

//         {topic?.forumComments?.length > 3 && (
//           <div className="group relative">
//             <span
//               className="text-muted-foreground text-sm cursor-pointer"
//               onClick={() => setShowAll(!showAll)}
//             >
//               {showAll
//                 ? `Hide replies`
//                 : `View all ${topic?.forumComments?.length} replies.`}
//             </span>
//             {!showAll && (
//               <div className="absolute hidden bg-gray-100 p-2 rounded shadow">
//                 Click to view all replies.
//               </div>
//             )}
//           </div>
//         )}

//         {visibleComments.map((comment: any) => (
//           <Card key={comment.commentId}>
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div className="flex items-start gap-4">
//                   <Avatar className="h-10 w-10">
//                     <AvatarImage
//                       src={comment.author.profileImage || "/placeholder.svg"}
//                     />
//                     <AvatarFallback>
//                       {comment.author.firstName[0]}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="flex-1 space-y-3">
//                     <div className="flex items-center justify-between">
//                       <div>
//                         <p className="font-medium">
//                           {comment.author.firstName} {comment.author.lastName}
//                         </p>
//                         <div className="flex items-center gap-2">
//                           <Badge variant="outline" className="text-xs">
//                             {comment.author.role}
//                           </Badge>
//                           {comment.isHelpful && (
//                             <Badge
//                               variant="secondary"
//                               className="text-xs bg-green-100 text-green-800"
//                             >
//                               Helpful
//                             </Badge>
//                           )}
//                         </div>
//                         <p className="text-sm text-muted-foreground flex items-center gap-1">
//                           <Clock className="h-3 w-3" />
//                           {new Date(comment.createdAt).toLocaleString()}
//                         </p>
//                       </div>

//                       {/* Dropdown menu for comment owner */}
//                       {isCurrentUserContent(comment.authorId) && (
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="sm">
//                               <MoreVertical className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuItem
//                               onClick={() => handleEditComment(comment)}
//                             >
//                               <Edit2 className="h-4 w-4 mr-2" />
//                               Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem
//                               onClick={() => {
//                                 confirmDelete("comment", () =>
//                                   handleDeleteComment(comment.commentId)
//                                 );
//                               }}
//                               className="text-red-600"
//                             >
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       )}
//                     </div>

//                     {/* Comment content - editable if in edit mode */}
//                     {editingComment === comment.commentId ? (
//                       <div className="space-y-2">
//                         <Textarea
//                           value={editCommentContent}
//                           onChange={(e) =>
//                             setEditCommentContent(e.target.value)
//                           }
//                           rows={3}
//                         />
//                         <div className="flex items-center gap-2">
//                           <Button
//                             size="sm"
//                             onClick={() =>
//                               handleSaveEditComment(comment.commentId)
//                             }
//                             disabled={!editCommentContent.trim()}
//                           >
//                             Save
//                           </Button>
//                           <Button
//                             variant="ghost"
//                             size="sm"
//                             onClick={handleCancelEdit}
//                           >
//                             Cancel
//                           </Button>
//                         </div>
//                       </div>
//                     ) : (
//                       <p className="leading-relaxed">
//                         {comment.comment_content}
//                       </p>
//                     )}

//                     <div className="flex items-center gap-4">
//                       <ForumCommentLikeButton
//                         comment={comment}
//                         token={token}
//                         forumId={id}
//                       />
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleReplyDislike(comment.commentId)}
//                       >
//                         <ThumbsDown className="mr-2 h-4 w-4" />
//                         {comment.dislikes}
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() => handleReply(comment.commentId)}
//                       >
//                         {replyingTo === comment.commentId ? "Cancel" : "Reply"}
//                       </Button>
//                       <Button
//                         variant="ghost"
//                         size="sm"
//                         onClick={() =>
//                           handleReportForumComment(
//                             comment?.commentId,
//                             comment?.comment_content,
//                             comment?.authorId
//                           )
//                         }
//                       >
//                         <Flag className="h-4 w-4" />
//                       </Button>
//                     </div>
//                   </div>
//                 </div>

//                 {replyingTo === comment.commentId && (
//                   <div className="ml-14 space-y-3">
//                     <div className="border-l-2 border-muted pl-4">
//                       <Textarea
//                         placeholder="Write your reply..."
//                         value={replyContent}
//                         onChange={(e) => setReplyContent(e.target.value)}
//                         rows={2}
//                         className="resize-none"
//                       />
//                       <div className="flex items-center justify-end gap-2 mt-2">
//                         <Button
//                           variant="ghost"
//                           size="sm"
//                           onClick={handleCancelReply}
//                         >
//                           Cancel
//                         </Button>
//                         <Button
//                           size="sm"
//                           onClick={() =>
//                             handleSubmitReply(topic?.forumId, comment.commentId)
//                           }
//                           disabled={!replyContent.trim()}
//                         >
//                           Reply
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 {comment.replies && comment.replies.length > 0 && (
//                   <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
//                     {comment.replies.map((reply: any) => (
//                       <div
//                         key={reply.replyId}
//                         className="flex items-start gap-4"
//                       >
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage
//                             src={
//                               reply.reply_author.profileImage ||
//                               "/placeholder.svg"
//                             }
//                           />
//                           <AvatarFallback>
//                             {reply.reply_author.firstName[0]}
//                           </AvatarFallback>
//                         </Avatar>
//                         <div className="flex-1 space-y-2">
//                           <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-2">
//                               <p className="font-medium text-sm">
//                                 {reply.reply_author.firstName}{" "}
//                                 {reply.reply_author.lastName}
//                               </p>
//                               <Badge variant="outline" className="text-xs">
//                                 {reply.reply_author.role}
//                               </Badge>
//                               <span className="text-xs text-muted-foreground">
//                                 {new Date(reply.createdAt).toLocaleDateString()}
//                               </span>
//                             </div>

//                             {/* Dropdown menu for reply owner */}
//                             {isCurrentUserContent(reply.reply_authorId) && (
//                               <DropdownMenu>
//                                 <DropdownMenuTrigger asChild>
//                                   <Button variant="ghost" size="sm">
//                                     <MoreVertical className="h-4 w-4" />
//                                   </Button>
//                                 </DropdownMenuTrigger>
//                                 <DropdownMenuContent align="end">
//                                   <DropdownMenuItem
//                                     onClick={() => handleEditReply(reply)}
//                                   >
//                                     <Edit2 className="h-4 w-4 mr-2" />
//                                     Edit
//                                   </DropdownMenuItem>
//                                   <DropdownMenuItem
//                                     onClick={() => {
//                                       confirmDelete("reply", () =>
//                                         handleDeleteReply(
//                                           reply.replyId,
//                                           comment.commentId
//                                         )
//                                       );
//                                     }}
//                                     className="text-red-600"
//                                   >
//                                     <Trash2 className="h-4 w-4 mr-2" />
//                                     Delete
//                                   </DropdownMenuItem>
//                                 </DropdownMenuContent>
//                               </DropdownMenu>
//                             )}
//                           </div>

//                           {/* Reply content - editable if in edit mode */}
//                           {editingReply === reply.replyId ? (
//                             <div className="space-y-2">
//                               <Textarea
//                                 value={editReplyContent}
//                                 onChange={(e) =>
//                                   setEditReplyContent(e.target.value)
//                                 }
//                                 rows={2}
//                               />
//                               <div className="flex items-center gap-2">
//                                 <Button
//                                   size="sm"
//                                   onClick={() =>
//                                     handleSaveEditReply(
//                                       reply.replyId,
//                                       comment.commentId
//                                     )
//                                   }
//                                   disabled={!editReplyContent.trim()}
//                                 >
//                                   Save
//                                 </Button>
//                                 <Button
//                                   variant="ghost"
//                                   size="sm"
//                                   onClick={handleCancelEdit}
//                                 >
//                                   Cancel
//                                 </Button>
//                               </div>
//                             </div>
//                           ) : (
//                             <p className="text-sm leading-relaxed">
//                               {reply.reply_content}
//                             </p>
//                           )}

//                           <div className="flex items-center gap-4">
//                             <ForumCommentReplyLikeButton
//                               reply={reply}
//                               token={token}
//                               forumId={id}
//                             />
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() => handleReplyDislike(reply.replyId)}
//                             >
//                               <ThumbsDown className="mr-2 h-4 w-4" />
//                               {reply.dislikes}
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 handleSecondLevelReply(reply.replyId)
//                               }
//                             >
//                               {replyingToSecondLevel === reply.replyId
//                                 ? "Cancel"
//                                 : "Reply"}
//                             </Button>
//                             <Button
//                               variant="ghost"
//                               size="sm"
//                               onClick={() =>
//                                 handleReportForumReply(
//                                   reply.replyId,
//                                   reply.reply_content,
//                                   reply.reply_authorId
//                                 )
//                               }
//                             >
//                               <Flag className="h-4 w-4" />
//                             </Button>
//                           </div>

//                           {replyingToSecondLevel === reply.replyId && (
//                             <div className="ml-6 space-y-3">
//                               <div className="border-l-2 border-muted pl-4">
//                                 <Textarea
//                                   placeholder="Write your reply..."
//                                   value={secondLevelReplyContent}
//                                   onChange={(e) =>
//                                     setSecondLevelReplyContent(e.target.value)
//                                   }
//                                   rows={2}
//                                   className="resize-none"
//                                 />
//                                 <div className="flex items-center justify-end gap-2 mt-2">
//                                   <Button
//                                     variant="ghost"
//                                     size="sm"
//                                     onClick={handleCancelSecondLevelReply}
//                                   >
//                                     Cancel
//                                   </Button>
//                                   <Button
//                                     size="sm"
//                                     onClick={() =>
//                                       handleSubmitSecondLevelReply(
//                                         reply.replyId,
//                                         comment.commentId
//                                       )
//                                     }
//                                     disabled={!secondLevelReplyContent.trim()}
//                                   >
//                                     Reply
//                                   </Button>
//                                 </div>
//                               </div>
//                             </div>
//                           )}

//                           {reply.children && reply.children.length > 0 && (
//                             <div className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4">
//                               {reply.children.map((childReply: any) => (
//                                 <div
//                                   key={childReply.replyToReplyId}
//                                   className="flex items-start gap-4"
//                                 >
//                                   <Avatar className="h-8 w-8">
//                                     <AvatarImage
//                                       src={
//                                         childReply.reply_author.profileImage ||
//                                         "/placeholder.svg"
//                                       }
//                                     />
//                                     <AvatarFallback>
//                                       {childReply.reply_author.firstName[0]}
//                                     </AvatarFallback>
//                                   </Avatar>
//                                   <div className="flex-1 space-y-2">
//                                     <div className="flex items-center justify-between">
//                                       <div className="flex items-center gap-2">
//                                         <p className="font-medium text-sm">
//                                           {childReply.reply_author.firstName}{" "}
//                                           {childReply.reply_author.lastName}
//                                         </p>
//                                         <Badge
//                                           variant="outline"
//                                           className="text-xs"
//                                         >
//                                           {childReply.reply_author.role}
//                                         </Badge>
//                                         <span className="text-xs text-muted-foreground">
//                                           {new Date(
//                                             childReply.createdAt
//                                           ).toLocaleDateString()}
//                                         </span>
//                                       </div>

//                                       {/* Dropdown menu for nested reply owner */}
//                                       {isCurrentUserContent(
//                                         childReply.reply_authorId
//                                       ) && (
//                                         <DropdownMenu>
//                                           <DropdownMenuTrigger asChild>
//                                             <Button variant="ghost" size="sm">
//                                               <MoreVertical className="h-4 w-4" />
//                                             </Button>
//                                           </DropdownMenuTrigger>
//                                           <DropdownMenuContent align="end">
//                                             <DropdownMenuItem
//                                               onClick={() =>
//                                                 handleEditNestedReply(
//                                                   childReply
//                                                 )
//                                               }
//                                             >
//                                               <Edit2 className="h-4 w-4 mr-2" />
//                                               Edit
//                                             </DropdownMenuItem>
//                                             <DropdownMenuItem
//                                               onClick={() => {
//                                                 confirmDelete("reply", () =>
//                                                   handleDeleteNestedReply(
//                                                     childReply.replyToReplyId,
//                                                     comment.commentId,
//                                                     reply.replyId
//                                                   )
//                                                 );
//                                               }}
//                                               className="text-red-600"
//                                             >
//                                               <Trash2 className="h-4 w-4 mr-2" />
//                                               Delete
//                                             </DropdownMenuItem>
//                                           </DropdownMenuContent>
//                                         </DropdownMenu>
//                                       )}
//                                     </div>

//                                     {/* Nested reply content - editable if in edit mode */}
//                                     {editingNestedReply ===
//                                     childReply.replyToReplyId ? (
//                                       <div className="space-y-2">
//                                         <Textarea
//                                           value={editNestedReplyContent}
//                                           onChange={(e) =>
//                                             setEditNestedReplyContent(
//                                               e.target.value
//                                             )
//                                           }
//                                           rows={2}
//                                         />
//                                         <div className="flex items-center gap-2">
//                                           <Button
//                                             size="sm"
//                                             onClick={() =>
//                                               handleSaveEditNestedReply(
//                                                 childReply.replyToReplyId,
//                                                 comment.commentId,
//                                                 reply.replyId,
//                                                 childReply.replyToReplyId
//                                               )
//                                             }
//                                             disabled={
//                                               !editNestedReplyContent.trim()
//                                             }
//                                           >
//                                             Save
//                                           </Button>
//                                           <Button
//                                             variant="ghost"
//                                             size="sm"
//                                             onClick={handleCancelEdit}
//                                           >
//                                             Cancel
//                                           </Button>
//                                         </div>
//                                       </div>
//                                     ) : (
//                                       <p className="text-sm leading-relaxed">
//                                         {childReply.replyToReply_content}
//                                       </p>
//                                     )}

//                                     <div className="flex items-center gap-4">
//                                       <ForumReplyToReplyLikeButton
//                                         replyToReply={childReply}
//                                         token={token}
//                                         forumId={id}
//                                         commentId={reply?.commentId}
//                                       />
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() =>
//                                           handleReplyDislike(childReply.replyId)
//                                         }
//                                       >
//                                         <ThumbsDown className="mr-2 h-4 w-4" />
//                                         {childReply.dislikes}
//                                       </Button>
//                                       <Button
//                                         variant="ghost"
//                                         size="sm"
//                                         onClick={() =>
//                                           handleReportForumNestedReply(
//                                             childReply.replyToReplyId,
//                                             childReply.replyToReply_content,
//                                             childReply?.reply_authorId
//                                           )
//                                         }
//                                       >
//                                         <Flag className="h-4 w-4" />
//                                       </Button>
//                                     </div>
//                                   </div>
//                                 </div>
//                               ))}
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Reply Form */}
//       <Card>
//         <CardContent className="p-6">
//           <h3 className="text-lg font-semibold mb-4">Add a Reply</h3>
//           <div className="space-y-4">
//             <Textarea
//               placeholder="Share your thoughts or advice..."
//               value={comment_content}
//               onChange={(e) => setCommentContent(e.target.value)}
//               rows={4}
//             />
//             <div className="flex items-center justify-between">
//               <p className="text-sm text-muted-foreground">
//                 Be respectful and constructive in your responses
//               </p>
//               <div className="flex gap-2">
//                 <Button variant="outline" onClick={() => setCommentContent("")}>
//                   Cancel
//                 </Button>
//                 <Button
//                   onClick={() => handleComment(topic?.forumId)}
//                   disabled={!comment_content.trim()}
//                 >
//                   Post Reply
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
