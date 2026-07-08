"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likePub } from "@/services/publication";
import { Button } from "@/components/ui/button";
import { Heart, HeartOff, Loader } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "../auth-modal";

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
  pubId: string;
}

const LikeButton = ({ post, token, pubId }: LikeButtonProps) => {
  const queryClient = useQueryClient();
  const [currentLikePostId, setCurrentLikePostId] = useState<string | null>(
    null
  );

  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  const userId = useUserId(token);

  const userLike = useMemo(() => {
    if (!userId || !post?.pubLikes || post?.pubLikes?.length === 0) {
      return undefined;
    }

    const found = post?.pubLikes.find((like: any) => {
      return like?.userId === userId;
    });

    return found;
  }, [post?.pubLikes, userId]);

  const likeCount = useMemo(() => {
    const count =
      post?.pubLikes?.filter((like: any) => like?.isLiked).length || 0;
    return count;
  }, [post?.pubLikes]);

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (pubId: string) => {
        return await likePub(pubId, token);
      },
      [pubId, post?.pubId, token]
    ),
    onMutate: (commentId: string) => {
      setCurrentLikePostId(commentId);
    },
    onSuccess: () => {
      setCurrentLikePostId(null);
      const currentForumId = pubId || post.pubId;

      queryClient.invalidateQueries({
        queryKey: ["forum", currentForumId],
      });

      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "pub" ||
          query.queryKey[0] === "pubs" ||
          query.queryKey[0] === "users",
      });
    },
    onError: (error: Error) => {
      console.error("Error liking comment:", error);
      setCurrentLikePostId(null);
    },
  });

  const handleLikeToggle = useCallback(async () => {
    if (requireAuth("like this publication")) {
      if (!likeMutation.isPending) {
        try {
          await likeMutation.mutateAsync(post.pubId);
        } catch (error) {
          console.error("Failed to toggle like:", error);
        }
      }
    }
  }, [likeMutation, post?.pubId]);

  return (
    <>
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      <Button id="publication-like-button-button-1" data-testId="publication-like-button-button-1"
        variant={"ghost"}
        onClick={handleLikeToggle}
        disabled={likeMutation.isPending}
        className={`flex items-center space-x-2 ${
          likeMutation.isPending ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        <div id="publication-like-button-div-1" data-testId="publication-like-button-div-1" className="relative group">
          {currentLikePostId === post?.pubId ? (
            <Loader className="animate-spin" />
          ) : userLike && userLike?.isLiked ? (
            <HeartOff className="text-red-500" />
          ) : (
            <Heart className="text-gray-500" />
          )}
          <span id="publication-like-button-span-1" data-testId="publication-like-button-span-1" className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 whitespace-nowrap z-10">
            {userLike && userLike?.isLiked ? "Unlike" : "Like"}
          </span>
        </div>
        <span id="publication-like-button-span-2" data-testId="publication-like-button-span-2" className="text-gray-100 ml-1">{likeCount}</span>
      </Button>
    </>
  );
};

export default LikeButton;
