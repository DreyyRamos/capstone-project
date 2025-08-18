"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
  ArrowLeft,
  Clock,
  Eye,
  Star,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import LikeButton from "@/components/like-buttons/publication-like-button";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useFetchOnePostQuery, usePostByIdQuery } from "@/hooks/usePost";
import { useTokenUser } from "@/hooks/useTokenUser";
import { useIsFeatured } from "@/hooks/useIsFeatured";
import {
  useAddTopReply,
  useAddNestedReply,
  // useReplies,
} from "@/hooks/usePublicationReplies";
import Cookies from "js-cookie";
import PublicationCommentLikeButton from "@/components/like-buttons/publication-comment-like-button";
import PublicationCommentReplyLikeButton from "@/components/like-buttons/publication-comment-reply-like-button";
import PublicationReplyToReplyLikeButton from "@/components/like-buttons/publication-replyToReply-like-button";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function PublicationDetailPage({ params }: PageProps) {
  const [comment_content, setCommentContent] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyContent, setReplyContent] = useState("");
  const [replyingToSecondLevel, setReplyingToSecondLevel] = useState<
    string | null
  >(null);
  const [secondLevelReplyContent, setSecondLevelReplyContent] = useState("");
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  const { id } = use(params);

  const token = Cookies.get("token") || "";
  const { data: publication, isLoading, isError } = useFetchOnePostQuery(id);
  const { makeFeatured, isLoading: isCurrentlyLoading } = useIsFeatured(token);
  const { commentToPost } = usePostByIdQuery(token, publication?.pubId);
  const { mutate: addTopReply } = useAddTopReply(token);
  const { mutate: addNestedReply } = useAddNestedReply(token);
  const { user, isAuthenticated } = useTokenUser();
  const userRoles = user?.roles || user?.role || [];

  console.log("publication to check", publication);

  const handleLike = () => {
    if (requireAuth("like this publication")) {
      setIsLiked(!isLiked);
    }
  };

  const handleMakeFeature = (id: string) => {
    if (requireAuth("feature this publication")) {
      makeFeatured(id);
    }
  };

  const handleComment = async () => {
    if (requireAuth("comment on this publication")) {
      if (comment_content.trim()) {
        console.log("Adding comment:", comment_content);
        try {
          await commentToPost(comment_content);
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

  const handleSubmitReply = async (commentId: string, pubId: string) => {
    if (requireAuth("submit reply")) {
      if (replyContent.trim()) {
        console.log("Adding reply to comment:", commentId, replyContent);
        try {
          await addTopReply({ content: replyContent, pubId, commentId });
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
    pubId: string,
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
            pubId,
            replyId,
            commentId,
            // replyId,
          });
          setSecondLevelReplyContent("");
          setReplyingToSecondLevel(null);
          toast.success("Reply added successfully!");
        } catch (error) {
          toast.error("Failed to add reply");
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

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading publication.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />

      <Button asChild variant="ghost">
        <Link href="/publications">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Publications
        </Link>
      </Button>

      <article className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {publication?.tags?.map((tag: any) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            {publication?.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {publication?.author?.firstName}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{publication?.author.firstName}</p>
                <p className="text-sm text-muted-foreground">
                  {publication?.author.role}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(publication?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <LikeButton post={publication} token={token} pubId={id} />
              {(userRoles?.includes("EDITOR") ||
                userRoles?.includes("ADMIN")) &&
                !["DRAFT", "PENDING_REVIEW", "ARCHIVED"].includes(
                  publication?.status
                ) && (
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        disabled={isCurrentlyLoading}
                        onClick={() => {
                          if (publication?.isFeatured) {
                            handleMakeFeature(publication.pubId);
                            toast(
                              "Publication has been removed from featured!"
                            );
                          } else {
                            handleMakeFeature(publication.pubId);
                            toast("Publication has been marked as featured!");
                          }
                        }}
                        className={
                          isBookmarked
                            ? "bg-blue-50 text-blue-600 border-blue-200"
                            : ""
                        }
                      >
                        <Star
                          className={`h-4 w-4 ${
                            publication?.isFeatured ? "fill-current" : ""
                          }`}
                        />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Add to Features</p>
                    </TooltipContent>
                  </Tooltip>
                )}
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {publication?.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={publication?.imageUrl || "/placeholder.svg"}
              alt={publication?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: publication?.content }}
        />

        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {publication?.pubLikes?.length ?? 0} likes
            </span>
          </div>
        </div>
      </article>

      <div className="space-y-6">
        {/* <h2 className="text-2xl font-bold">Comments ({comments.length})</h2> */}

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about this publication..."
                value={comment_content}
                onChange={(e) => setCommentContent(e.target.value)}
                rows={3}
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Be respectful and constructive in your comments
                </p>
                <Button
                  onClick={handleComment}
                  disabled={!comment_content.trim()}
                >
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          {publication?.pubComments.map((comment: any) => (
            <Card key={comment.commentId}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment?.author?.profileImage} />
                      <AvatarFallback>
                        {comment?.author?.firstName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">
                          {comment?.author?.firstName}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {comment?.author?.role}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment?.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {comment?.comment_content}
                      </p>
                      <div className="flex items-center gap-4">
                        <PublicationCommentLikeButton
                          comment={comment}
                          token={token}
                          forumId={id}
                        />
                        {/* <Button variant="ghost" size="sm" onClick={handleLike}>
                          <Heart className="mr-1 h-3 w-3" />
                          {comment.likes}
                        </Button> */}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleReply(comment.commentId)}
                        >
                          {replyingTo === comment.commentId
                            ? "Cancel"
                            : "Reply"}
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
                              handleSubmitReply(
                                comment.commentId,
                                publication.pubId
                              )
                            }
                            disabled={!replyContent.trim()}
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {comment?.replies && comment?.replies?.length > 0 && (
                    <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                      {comment?.replies?.map((reply: any) => (
                        <div
                          key={reply.replyId}
                          className="flex items-start gap-4"
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage
                              src={reply?.reply_author?.profileImage}
                            />
                            <AvatarFallback>
                              {reply?.reply_author?.firstName?.[0]}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {reply?.reply_author?.firstName}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {reply?.reply_author?.role}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(
                                  reply?.createdAt
                                ).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {reply.reply_content}
                            </p>
                            <div className="flex items-center gap-4">
                              <PublicationCommentReplyLikeButton
                                reply={reply}
                                token={token}
                                pubId={id}
                              />
                              {/* <Button
                                variant="ghost"
                                size="sm"
                                onClick={handleLike}
                              >
                                <Heart className="mr-1 h-3 w-3" />
                                {reply.likes}
                              </Button> */}
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
                                          publication.pubId,
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

                            {/* Render nested children */}
                            {reply?.children && reply.children.length > 0 && (
                              <div className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4">
                                {reply.children.map((childReply: any) => (
                                  <div
                                    key={childReply.replyId}
                                    className="flex items-start gap-4"
                                  >
                                    <Avatar className="h-8 w-8">
                                      <AvatarImage
                                        src={
                                          childReply?.reply_author?.profileImage
                                        }
                                      />
                                      <AvatarFallback>
                                        {
                                          childReply?.reply_author
                                            ?.firstName?.[0]
                                        }
                                      </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1 space-y-2">
                                      <div className="flex items-center gap-2">
                                        <p className="font-medium text-sm">
                                          {childReply?.reply_author?.firstName}
                                        </p>
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {childReply?.reply_author?.role}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground">
                                          {new Date(
                                            childReply?.createdAt
                                          ).toLocaleDateString()}
                                        </span>
                                      </div>
                                      <p className="text-sm leading-relaxed">
                                        {childReply?.replyToReply_content}
                                      </p>
                                      <div className="flex items-center gap-4">
                                        <PublicationReplyToReplyLikeButton
                                          replyToReply={childReply}
                                          token={token}
                                          pubId={id}
                                          commentId={reply.commentId}
                                        />
                                        {/* <Button
                                          variant="ghost"
                                          size="sm"
                                          onClick={handleLike}
                                        >
                                          <Heart className="mr-1 h-3 w-3" />
                                          {childReply.likes}
                                        </Button> */}
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

        <div className="text-center">
          <Button variant="outline">Load More Comments</Button>
        </div>
      </div>
    </div>
  );
}

