"use client";

import { useState, use, useEffect } from "react";
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
} from "lucide-react";
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

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ForumTopicPage({ params }: PageProps) {
  const token = Cookies.get("token") || "";
  const { id } = use(params);
  const [comment_content, setCommentContent] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyingToSecondLevel, setReplyingToSecondLevel] = useState<
    string | null
  >(null);
  const [secondLevelReplyContent, setSecondLevelReplyContent] = useState("");
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

  const { data: topic } = useFetchForumById(id);

  const handleComment = async (forumId: string) => {
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
  };

  const handleReply = (commentId: string) => {
    if (requireAuth("reply to this comment")) {
      if (replyingTo === commentId) {
        setReplyingTo(null);
        setReplyContent("");
      } else {
        setReplyingTo(commentId);
        setReplyContent("");
      }
    }
  };

  const handleSecondLevelReply = (replyId: string) => {
    if (requireAuth("reply to this reply")) {
      if (replyingToSecondLevel === replyId) {
        setReplyingToSecondLevel(null);
        setSecondLevelReplyContent("");
      } else {
        setReplyingToSecondLevel(replyId);
        setSecondLevelReplyContent("");
      }
    }
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

        {topic?.forumComments?.map((comment: any) => (
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
                    </div>
                    <p className="leading-relaxed">{comment.comment_content}</p>
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
                  <div className="ml-14 space-y-3">
                    <div className="border-l-2 border-muted pl-4">
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
                  <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                    {comment.replies.map((reply: any) => (
                      <div
                        key={reply.replyId}
                        className="flex items-start gap-4"
                      >
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={
                              reply.reply_author.profileImage ||
                              "/placeholder.svg"
                            }
                          />
                          <AvatarFallback>
                            {reply.reply_author.firstName[0]}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-2">
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
                          <p className="text-sm leading-relaxed">
                            {reply.reply_content}
                          </p>
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
                            <div className="ml-6 space-y-3">
                              <div className="border-l-2 border-muted pl-4">
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
                            <div className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4">
                              {reply.children.map((childReply: any) => (
                                <div
                                  key={childReply.replyId}
                                  className="flex items-start gap-4"
                                >
                                  <Avatar className="h-8 w-8">
                                    <AvatarImage
                                      src={
                                        childReply.reply_author.profileImage ||
                                        "/placeholder.svg"
                                      }
                                    />
                                    <AvatarFallback>
                                      {childReply.reply_author.firstName[0]}
                                    </AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1 space-y-2">
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
                                    <p className="text-sm leading-relaxed">
                                      {childReply.replyToReply_content}
                                    </p>
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
