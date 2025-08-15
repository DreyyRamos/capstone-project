"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePub } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";

interface Like {
  userId: number;
  isLiked: boolean;
}

interface Post {
  pubId: string;
  title: string;
  content: string;
  imageUrl: string;
  pubLikes: Like[];
}

interface LikeButtonProps {
  post: Post;
  token: string;
}

const LikeButton = ({ post, token }: LikeButtonProps) => {
  const queryClient = useQueryClient();
  const [currentLikePostId, setCurrentLikePostId] = useState<string | null>(
    null
  );

  const userLike = useMemo(
    () => post?.pubLikes?.find((like) => like?.userId === parseInt(token)),
    [post?.pubLikes, token]
  );

  const likeCount = useMemo(
    () => post?.pubLikes?.filter((like) => like?.isLiked).length,
    [post?.pubLikes]
  );

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (postId: string) => {
        return await likePub(postId, token);
      },
      [token]
    ),
    onMutate: (postId: string) => {
      setCurrentLikePostId(postId);
    },
    onSuccess: () => {
      setCurrentLikePostId(null);
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "pub" ||
          query.queryKey[0] === "pubs" ||
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
        await likeMutation.mutateAsync(post?.pubId);
      } catch (error) {
        console.error("Failed to toggle like:", error);
      }
    }
  }, [likeMutation, post?.pubId]);

  console.log("publication check for like", post);

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
        {currentLikePostId === post?.pubId ? (
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

export default LikeButton;
