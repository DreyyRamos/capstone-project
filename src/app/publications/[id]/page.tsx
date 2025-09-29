"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  Flag,
  ArrowLeft,
  Clock,
  Star,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
} from "@/hooks/usePublicationReplies";
import Cookies from "js-cookie";
import PublicationCommentLikeButton from "@/components/like-buttons/publication-comment-like-button";
import PublicationCommentReplyLikeButton from "@/components/like-buttons/publication-comment-reply-like-button";
import PublicationReplyToReplyLikeButton from "@/components/like-buttons/publication-replyToReply-like-button";
import { ReportModal } from "@/components/report-modal";
import { useReportModal } from "@/hooks/use-report-modal";
import ContentDisplay from "@/components/content-display";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import { useUserQuery } from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import PublicationDetailLoading from "./loading";
import PublicationCommentsSection from "@/components/publication/publication-comments";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function PublicationDetailPage({ params }: PageProps) {
  const { confirmDelete } = useConfirmation();
  const [comment_content, setCommentContent] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
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

  const { id } = use(params);

  const token = Cookies.get("token") || "";
  const { data: currentUser } = useUserQuery(token);
  console.log("current user", currentUser);
  const { data: publication, isLoading, isError } = useFetchOnePostQuery(id);
  const { makeFeatured, isLoading: isCurrentlyLoading } = useIsFeatured(token);
  const {
    commentToPost,
    editComment,
    deleteComment,
    editReply,
    deleteReply,
    editReplyToReply,
    deleteReplyToReply,
  } = usePostByIdQuery(token, publication?.pubId);
  const { mutate: addTopReply } = useAddTopReply(token);
  const { mutate: addNestedReply } = useAddNestedReply(token);
  const { user } = useTokenUser();
  const userRole = user?.role || "STUDENT";
  const { StatusModal, checkComment, checkLike, checkShare, checkAndExecute } =
    useUserStatusCheck(currentUser?.userData?.status, {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    });

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
        // Add your API call to update comment here
        // await updateComment(commentId, editCommentContent);
        editComment({ comment: editCommentContent, commentId });
        console.log("Updating comment:", commentId, editCommentContent);

        setEditingComment(null);
        setEditCommentContent("");
        toast.success("Comment updated successfully!");

        // Refresh the data or update local state
      } catch (error) {
        toast.error("Failed to update comment");
        console.error("Error updating comment:", error);
      }
    }
  };

  const handleSaveEditReply = async (replyId: string, commentId: string) => {
    if (editReplyContent.trim()) {
      try {
        // Add your API call to update reply here
        // await updateReply(replyId, editReplyContent);
        editReply({ comment: editReplyContent, commentId, replyId });
        console.log("Updating reply:", replyId, editReplyContent);

        setEditingReply(null);
        setEditReplyContent("");
        toast.success("Reply updated successfully!");

        // Refresh the data or update local state
      } catch (error) {
        toast.error("Failed to update reply");
        console.error("Error updating reply:", error);
      }
    }
  };

  const handleSaveEditNestedReply = async (
    nestedReplyId: string,
    commentId: string,
    replyId: string
  ) => {
    if (editNestedReplyContent.trim()) {
      try {
        // Add your API call to update nested reply here
        // await updateNestedReply(nestedReplyId, editNestedReplyContent);
        editReplyToReply({
          comment: editNestedReplyContent,
          commentId,
          replyId,
          childId: nestedReplyId,
        });
        console.log(
          "Updating nested reply:",
          nestedReplyId,
          editNestedReplyContent
        );

        setEditingNestedReply(null);
        setEditNestedReplyContent("");
        toast.success("Reply updated successfully!");

        // Refresh the data or update local state
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
      // Add your API call to delete comment here
      // await deleteComment(commentId);
      deleteComment({ commentId });
      console.log("Deleting comment:", commentId);

      toast.success("Comment deleted successfully!");

      // Refresh the data or update local state
    } catch (error) {
      toast.error("Failed to delete comment");
      console.error("Error deleting comment:", error);
    }
  };

  const handleDeleteReply = async (replyId: string, commentId: string) => {
    try {
      // Add your API call to delete reply here
      // await deleteReply(replyId);
      deleteReply({ commentId, replyId });
      console.log("Deleting reply:", replyId);

      toast.success("Reply deleted successfully!");

      // Refresh the data or update local state
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
      // Add your API call to delete nested reply here
      // await deleteNestedReply(nestedReplyId);
      deleteReplyToReply({ commentId, replyId, childId: nestedReplyId });
      console.log("Deleting nested reply:", nestedReplyId);

      toast.success("Reply deleted successfully!");

      // Refresh the data or update local state
    } catch (error) {
      toast.error("Failed to delete reply");
      console.error("Error deleting nested reply:", error);
    }
  };

  const handleMakeFeature = (id: string) => {
    if (requireAuth("feature this publication")) {
      makeFeatured(id);
    }
  };

  const handleComment = async () => {
    checkAndExecute("comment", async () => {
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

  const handleReportPublication = () => {
    checkAndExecute("report", async () => {
      if (requireAuth("report this publication.")) {
        openReportModal(
          "PUBLICATION",
          publication?.pubId,
          publication?.title,
          publication?.authorId
        );
      }
    });
  };

  const handleReportPublicationComment = (
    commentId: string,
    commentContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", async () => {
      if (requireAuth("report this comment")) {
        openReportModal(
          "PUBLICATION_COMMENT",
          commentId,
          commentContent.substring(0, 50) + "...",
          authorId
        );
      }
    });
  };

  const handleReportPublicationReply = (
    replyId: string,
    replyContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", async () => {
      if (requireAuth("report this comment")) {
        openReportModal(
          "PUBLICATION_REPLY",
          replyId,
          replyContent.substring(0, 50) + "...",
          authorId
        );
      }
    });
  };

  const handleReportPublicationNestedReply = (
    nestedReplyId: string,
    nestedReplyContent: string,
    authorId?: string
  ) => {
    checkAndExecute("report", async () => {
      if (requireAuth("report this comment.")) {
        openReportModal(
          "PUBLICATION_REPLY_TO_REPLY",
          nestedReplyId,
          nestedReplyContent.substring(0, 50) + "...",
          authorId
        );
      }
    });
  };

  const [showAll, setShowAll] = useState(false);

  const allComments = publication?.pubComments?.slice().reverse() || [];
  const visibleComments = showAll
    ? allComments.reverse()
    : allComments.slice(0, 3).reverse();

  if (isLoading) {
    return <PublicationDetailLoading />;
  }
  if (isError) return <div>Error loading publication.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <StatusModal />
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
                <AvatarImage
                  src={publication.author?.profileImage || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {publication.author?.firstName?.[0]}
                  {publication.author?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {publication?.author.firstName} {publication?.author.lastName}
                </p>
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
              {(userRole === "EDITOR" || userRole === "ADMIN") &&
                !["DRAFT", "PENDING_REVIEW", "ARCHIVED"].includes(
                  publication?.status
                ) && (
                  <TooltipProvider>
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
                  </TooltipProvider>
                )}
              <Button
                variant="outline"
                size="sm"
                onClick={handleReportPublication}
              >
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
        <ContentDisplay htmlContent={publication?.content} />

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
          {publication?.pubComments?.length > 3 && (
            <div className="group relative">
              <span
                className="text-muted-foreground text-sm cursor-pointer"
                onClick={() => setShowAll(!showAll)}
              >
                {showAll
                  ? `Hide comments`
                  : `View all ${publication?.pubComments?.length} comments`}
              </span>
              {!showAll && (
                <div className="absolute hidden bg-gray-100 p-2 rounded shadow">
                  Click to view all comments
                </div>
              )}
            </div>
          )}
          {visibleComments.map((comment: any) => (
            <PublicationCommentsSection
              key={comment.commentId}
              token={token}
              id={id}
              publication={publication}
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
              handleReportPublicationComment={handleReportPublicationComment}
              handleCancelReply={handleCancelReply}
              handleSubmitReply={handleSubmitReply}
              handleEditReply={handleEditReply}
              handleDeleteReply={handleDeleteReply}
              handleSecondLevelReply={handleSecondLevelReply}
              handleReportPublicationReply={handleReportPublicationReply}
              handleCancelSecondLevelReply={handleCancelSecondLevelReply}
              handleSubmitSecondLevelReply={handleSubmitSecondLevelReply}
              handleEditNestedReply={handleEditNestedReply}
              handleDeleteNestedReply={handleDeleteNestedReply}
              handleSaveEditNestedReply={handleSaveEditNestedReply}
              handleReportPublicationNestedReply={
                handleReportPublicationNestedReply
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}
