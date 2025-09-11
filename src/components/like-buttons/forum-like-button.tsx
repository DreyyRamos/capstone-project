"use client";

import React, { useState, useCallback, useMemo } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { likeForum } from "@/services/publication";
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
  forumId: string;
  title: string;
  content: string;
  imageUrl: string;
  forumLikes: Like[];
}

interface LikeButtonProps {
  forum: Post;
  token: string;
  forumId: string;
}

const LikeButton = ({ forum, token, forumId }: LikeButtonProps) => {
  const queryClient = useQueryClient();
  const [currentLikePostId, setCurrentLikePostId] = useState<string | null>(
    null
  );

  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  //  const [currentLikeCommentId, setCurrentLikeCommentId] = useState<
  //     string | null
  //   >(null);
  const userId = useUserId(token);

  const userLike = useMemo(() => {
    if (!userId || !forum?.forumLikes || forum?.forumLikes?.length === 0) {
      console.log("No userId or no likes found for this comment");
      return undefined;
    }

    const found = forum?.forumLikes.find((like: any) => {
      return like?.userId === userId; // Compare with decoded user ID
    });

    return found;
  }, [forum?.forumLikes, userId]);

  const likeCount = useMemo(() => {
    const count =
      forum?.forumLikes?.filter((like: any) => like?.isLiked).length || 0;
    console.log("Like count calculation:", count);
    return count;
  }, [forum?.forumLikes]);

  const likeMutation = useMutation({
    mutationFn: useCallback(
      async (forumId: string) => {
        return await likeForum(forumId, token);
      },
      [forumId, forum?.forumId, token]
    ),
    onMutate: (commentId: string) => {
      setCurrentLikePostId(commentId);
    },
    onSuccess: () => {
      setCurrentLikePostId(null);
      const currentForumId = forumId || forum?.forumId;

      // Invalidate the specific forum query first
      queryClient.invalidateQueries({
        queryKey: ["forum", currentForumId],
      });

      // Also invalidate broader forum queries
      queryClient.invalidateQueries({
        predicate: (query) =>
          query.queryKey[0] === "forum" ||
          query.queryKey[0] === "forums" ||
          query.queryKey[0] === "users",
      });
    },
    onError: (error: Error) => {
      console.error("Error liking comment:", error);
      setCurrentLikePostId(null);
    },
  });

  const handleLikeToggle = useCallback(async () => {
    if (requireAuth("like this forum")) {
      if (!likeMutation.isPending) {
        try {
          await likeMutation.mutateAsync(forum?.forumId);
        } catch (error) {
          console.error("Failed to toggle like:", error);
        }
      }
    }
  }, [likeMutation, forum?.forumId]);

  console.log("publication check for like", forum);

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
          {currentLikePostId === forum?.forumId ? (
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

export default LikeButton;
