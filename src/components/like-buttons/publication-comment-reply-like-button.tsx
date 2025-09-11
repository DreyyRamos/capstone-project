"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCommentReplyPub } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "../auth-modal";

interface ForumCommentLike {
  commentLikeId: string;
  commentId: string;
  userId: string; // Changed from number to string (UUID)
  isLiked: boolean;
  pubId: string | null;
}

interface Author {
  firstName: string;
  lastName: string;
  profileImage: string;
  role: string;
}

interface ForumComment {
  commentId: string;
  comment_content: string;
  forumId: string;
  authorId: string;
  createdAt: string;
  author: Author;
  forumCommentLikes: ForumCommentLike[];
}

interface ForumCommentLikeButtonProps {
  comment: ForumComment;
  token: string;
  forumId?: string;
}

const PublicationCommentReplyLikeButton = ({ reply, token, pubId }: any) => {
  const queryClient = useQueryClient();
  const [currentLikeCommentId, setCurrentLikeCommentId] = useState<
    string | null
  >(null);

  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  const userId = useUserId(token);

  const userLike = useMemo(() => {
    if (
      !userId ||
      !reply?.pubCommentReplyLikes ||
      reply?.pubCommentReplyLikes?.length === 0
    ) {
      console.log("No userId or no likes found for this comment");
      return undefined;
    }

    const found = reply?.pubCommentReplyLikes?.find(
      (like: ForumCommentLike) => {
        return like?.userId === userId; // Compare with decoded user ID
      }
    );

    return found;
  }, [reply?.pubCommentReplyLikes, userId]);

  const likeCount = useMemo(() => {
    const count =
      reply?.pubCommentReplyLikes?.filter(
        (like: ForumCommentLike) => like?.isLiked
      ).length || 0;
    console.log("Like count calculation:", count);
    return count;
  }, [reply?.pubCommentReplyLikes]);

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (commentId: string) => {
        return await likeCommentReplyPub(
          pubId || reply.forumId,
          commentId,
          reply?.replyId,
          token
        );
      },
      [pubId, reply?.forumId, token]
    ),
    onMutate: (replyId: string) => {
      setCurrentLikeCommentId(replyId);
    },
    onSuccess: () => {
      setCurrentLikeCommentId(null);
      const currentCommentId = reply?.commentId || reply.forumId;

      // Invalidate the specific forum query first
      queryClient.invalidateQueries({
        queryKey: ["forum", currentCommentId],
      });

      // Also invalidate broader forum queries
      queryClient.invalidateQueries({
        predicate: (query) => {
          const shouldInvalidate =
            query.queryKey[0] === "pub" || query.queryKey[0] === "pubs";
          console.log(
            "Query key:",
            query.queryKey,
            "Should invalidate:",
            shouldInvalidate
          );
          return shouldInvalidate;
        },
      });
    },
    onError: (error: Error) => {
      console.error("Error liking comment:", error);
      setCurrentLikeCommentId(null);
    },
  });

  const handleLikeToggle = useCallback(async () => {
    if (requireAuth("to like this reply")) {
      if (!likeMutation.isPending) {
        try {
          await likeMutation.mutateAsync(reply?.replyId);
        } catch (error) {
          console.error("Failed to toggle like:", error);
        }
      }
    }
  }, [likeMutation, reply?.replyId]);

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      <Button
        variant={"ghost"}
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending}
        className={`flex items-center space-x-2 ${
          likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div className="relative group">
          {currentLikeCommentId === reply?.replyId ? (
            <Loader className="animate-spin" />
          ) : userLike && userLike?.isLiked ? (
            <HeartOff className="text-red-500" />
          ) : (
            <Heart className="text-gray-500" />
          )}
          <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            {userLike && userLike?.isLiked ? "Unlike" : "Like"}
          </span>
        </div>
        <span className="text-gray-100 ml-1">{likeCount}</span>
      </Button>
    </>
  );
};

export default PublicationCommentReplyLikeButton;
