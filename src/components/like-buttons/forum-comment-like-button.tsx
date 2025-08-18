

"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCommentForum } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";
import { jwtDecode } from "jwt-decode";
import { useUserId } from "@/hooks/useUserId";

interface ForumCommentLike {
  commentLikeId: string;
  commentId: string;
  userId: string; // Changed from number to string (UUID)
  isLiked: boolean;
  forumId: string | null;
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

const ForumCommentLikeButton = ({
  comment,
  token,
  forumId,
}: ForumCommentLikeButtonProps) => {
  console.log("forum from like button", comment);
  const queryClient = useQueryClient();
  const [currentLikeCommentId, setCurrentLikeCommentId] = useState<
    string | null
  >(null);

  const userId = useUserId(token);

  const userLike = useMemo(() => {
    if (
      !userId ||
      !comment?.forumCommentLikes ||
      comment.forumCommentLikes.length === 0
    ) {
      console.log("No userId or no likes found for this comment");
      return undefined;
    }

    const found = comment?.forumCommentLikes?.find((like: ForumCommentLike) => {
      return like?.userId === userId; // Compare with decoded user ID
    });

    return found;
  }, [comment?.forumCommentLikes, userId]);

  const likeCount = useMemo(() => {
    const count =
      comment?.forumCommentLikes?.filter(
        (like: ForumCommentLike) => like?.isLiked
      ).length || 0;
    console.log("Like count calculation:", count);
    return count;
  }, [comment?.forumCommentLikes]);

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (commentId: string) => {
        return await likeCommentForum(
          forumId || comment.forumId,
          commentId,
          token
        );
      },
      [forumId, comment.forumId, token]
    ),
    onMutate: (commentId: string) => {
      setCurrentLikeCommentId(commentId);
    },
    onSuccess: () => {
      setCurrentLikeCommentId(null);
      const currentForumId = forumId || comment.forumId;

      // Invalidate the specific forum query first
      queryClient.invalidateQueries({
        queryKey: ["forum", currentForumId],
      });

      queryClient.invalidateQueries({
        predicate: (query) => {
          const shouldInvalidate =
            query.queryKey[0] === "forum" || query.queryKey[0] === "forums";
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
    if (!likeMutation.isPending) {
      try {
        await likeMutation.mutateAsync(comment.commentId);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    }
  }, [likeMutation, comment.commentId]);

  return (
    <Button
      variant={"ghost"}
      onClick={handleLikeToggle}
      disabled={likeMutation.isPending}
      className={`flex items-center space-x-2 ${
        likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      <div className="relative group">
        {currentLikeCommentId === comment?.commentId ? (
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
  );
};

export default ForumCommentLikeButton;
