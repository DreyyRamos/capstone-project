"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeForum } from "@/services/publication";
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
  forumLikes: Like[];
}

interface LikeButtonProps {
  forum: Forum;
  token: string;
}

const ForumLikeButton = ({ forum, token }: LikeButtonProps) => {
  console.log("forum from like button", forum);
  const queryClient = useQueryClient();
  const [currentLikePostId, setCurrentLikePostId] = useState<string | null>(
    null
  );

  const userLike = useMemo(
    () => forum?.forumLikes?.find((like) => like?.userId === parseInt(token)),
    [forum?.forumLikes, token]
  );

  const likeCount = useMemo(
    () => forum?.forumLikes?.filter((like) => like?.isLiked).length,
    [forum?.forumLikes]
  );

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (forumId: string) => {
        return await likeForum(forumId, token);
      },
      [token]
    ),
    onMutate: (forumId: string) => {
      setCurrentLikePostId(forumId);
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
        await likeMutation.mutateAsync(forum?.forumId);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    }
  }, [likeMutation, forum?.forumId]);

  console.log("publication check for like", forum);

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleLikeToggle}
      className={
        likeMutation.isPending ? "bg-red-50 text-red-600 border-red-200" : ""
      }
      //   onClick={handleLikeToggle}
      //   aria-label={userLike && userLike?.isLiked ? "unlike" : "like"}
      //   className={`flex items-center space-x-2 p-2 rounded-full transition-colors ${
      //     likeMutation.isPending
      //       ? "opacity-50 cursor-not-allowed"
      //       : "hover:bg-gray-100"
      //   }`}
      //   disabled={likeMutation.isPending}
    >
      <div className="relative group">
        {currentLikePostId === forum?.forumId ? (
          <Loader className="animate-spin" />
        ) : userLike && userLike?.isLiked ? (
          <HeartOff className="text-red-500" />
        ) : (
          <Heart className="text-gray-500" />
        )}
        <span className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2">
          {userLike && userLike?.isLiked ? "Unlike" : "Like"}
        </span>
      </div>
      <span className="text-gray-100">{likeCount}</span>
    </Button>
  );
};

export default ForumLikeButton;
