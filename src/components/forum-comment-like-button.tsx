"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeCommentForum } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";

interface Like {
  userId: number;
  isLiked: boolean;
}

interface Forum {
  forumId: string;
  topicTitle: string;
  description: string;
  imageUrl: string;
  forumCommentLikes: Like[];
}

interface LikeButtonProps {
  forum: Forum;
  token: string;
}

const ForumCommentLikeButton = ({ comment, token }: any) => {
  console.log("forum from like button", comment);
  const queryClient = useQueryClient();
  const [currentLikePostId, setCurrentLikePostId] = useState<string | null>(
    null
  );

  const userLike = useMemo(
    () =>
      comment?.forumCommentLikes?.find(
        (like: any) => like?.userId === parseInt(token)
      ),
    [comment?.forumCommentLikes, token]
  );

  const likeCount = useMemo(
    () =>
      comment?.forumCommentLikes?.filter((like: any) => like?.isLiked).length,
    [comment.forumCommentLikes]
  );

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async ({
        forumId,
        commentId,
      }: {
        forumId: string;
        commentId: string;
      }) => {
        return await likeCommentForum(forumId, comment.commentId, token);
      },
      [token]
    ),
    onMutate: (commentId: any) => {
      setCurrentLikePostId(commentId);
    },
    onSuccess: () => {
      setCurrentLikePostId(null);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "forum" ||
          query.queryKey[0] === "forums" ||
          query.queryKey[0] === "users",
      });
    },
    onError: (error: Error) => {
      console.error("Error liking post:", error);
      setCurrentLikePostId(null);
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

  console.log("publication check for like", comment);

  return (
    <Button variant={"ghost"} onClick={handleLikeToggle}>
      <div className="relative group">
        {currentLikePostId === comment?.commentId ? (
          <Loader className="animate-spin" />
        ) : userLike && userLike?.isLiked ? (
          <HeartOff className="text-red-500" />
        ) : (
          <Heart className="text-gray-500" />
        )}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap">
          {userLike && userLike?.isLiked ? "Unlike" : "Like"}
        </span>
      </div>
      <span className="text-gray-100">{likeCount}</span>
    </Button>
  );
};

export default ForumCommentLikeButton;
