"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeReplyToReplyForum } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "../auth-modal";

interface ForumReplyToReplyLike {
  replyToReplyLikeId: string;
  replyToReplyId: string;
  userId: string;
  isLiked: boolean;
  forumId: string | null;
}

interface ReplyAuthor {
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
}

interface ForumReplyToReply {
  replyToReplyId: string;
  replyToReply_content: string;
  parentReplyId: string;
  reply_authorId: string;
  createdAt: string;
  reply_author: ReplyAuthor;
  forumCommentReplyToReplyLikes: ForumReplyToReplyLike[];
}

interface ForumReplyToReplyLikeButtonProps {
  replyToReply: ForumReplyToReply;
  token: string;
  forumId: string;
  commentId: string;
}

const ForumReplyToReplyLikeButton = ({
  replyToReply,
  token,
  forumId,
  commentId,
}: ForumReplyToReplyLikeButtonProps) => {
  const queryClient = useQueryClient();
  const [currentLikeReplyToReplyId, setCurrentLikeReplyToReplyId] = useState<
    string | null
  >(null);

  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  const userId = useUserId(token);

  const userLike = useMemo(() => {
    if (
      !userId ||
      !replyToReply?.forumCommentReplyToReplyLikes ||
      replyToReply?.forumCommentReplyToReplyLikes?.length === 0
    ) {
      return undefined;
    }

    const found = replyToReply?.forumCommentReplyToReplyLikes?.find(
      (like: ForumReplyToReplyLike) => {
        return like?.userId === userId;
      },
    );

    return found;
  }, [replyToReply?.forumCommentReplyToReplyLikes, userId]);

  const likeCount = useMemo(() => {
    const count =
      replyToReply?.forumCommentReplyToReplyLikes?.filter(
        (like: ForumReplyToReplyLike) => like?.isLiked,
      ).length || 0;
    return count;
  }, [replyToReply?.forumCommentReplyToReplyLikes]);

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (replyToReplyId: string) => {
        return await likeReplyToReplyForum(
          forumId,
          commentId,
          replyToReply.parentReplyId,
          replyToReplyId,
          token,
        );
      },
      [forumId, commentId, replyToReply.parentReplyId, token],
    ),
    onMutate: (replyToReplyId: string) => {
      setCurrentLikeReplyToReplyId(replyToReplyId);
    },
    onSuccess: () => {
      setCurrentLikeReplyToReplyId(null);

      // Invalidate the specific forum query
      queryClient.invalidateQueries({
        queryKey: ["forum", forumId],
      });

      queryClient.invalidateQueries({
        predicate: (query) => {
          const shouldInvalidate =
            query.queryKey[0] === "forum" || query.queryKey[0] === "forums";
          return shouldInvalidate;
        },
      });
    },
    onError: (error: Error) => {
      console.error("Error liking reply to reply:", error);
      setCurrentLikeReplyToReplyId(null);
    },
  });

  const handleLikeToggle = useCallback(async () => {
    if (requireAuth("like this reply")) {
      if (!likeMutation.isPending) {
        try {
          await likeMutation.mutateAsync(replyToReply?.replyToReplyId);
        } catch (error) {
          console.error("Failed to toggle like:", error);
        }
      }
    }
  }, [likeMutation, replyToReply?.replyToReplyId]);

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      <Button
        id="forum-replyToReply-like-button-button-1"
        data-testId="forum-replyToReply-like-button-button-1"
        variant={"ghost"}
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending}
        className={`flex items-center space-x-2 ${
          likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div
          id="forum-replyToReply-like-button-div-1"
          data-testId="forum-replyToReply-like-button-div-1"
          className="relative group"
        >
          {currentLikeReplyToReplyId === replyToReply?.replyToReplyId ? (
            <Loader className="animate-spin" />
          ) : userLike && userLike?.isLiked ? (
            <HeartOff className="text-red-500" />
          ) : (
            <Heart className="text-gray-500" />
          )}
          <span
            id="forum-replyToReply-like-button-span-1"
            data-testId="forum-replyToReply-like-button-span-1"
            className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10"
          >
            {userLike && userLike?.isLiked ? "Unlike" : "Like"}
          </span>
        </div>
        <span
          id="forum-replyToReply-like-button-span-2"
          data-testId="forum-replyToReply-like-button-span-2"
          className="text-gray-100 ml-1"
        >
          {likeCount}
        </span>
      </Button>
    </>
  );
};

export default ForumReplyToReplyLikeButton;
