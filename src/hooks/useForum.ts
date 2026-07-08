import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createForum,
  fetchAllForums,
  fetchForumByCategory,
  fetchForumById,
  editCommentForum,
  deleteCommentForum,
  editReplyForum,
  deleteReplyForum,
  editReplyToReplyForum,
  deleteReplyToReplyForum,
} from "@/services/forum";

interface Forum {
  topicTitle: string;
  description: string;
  tags: string[];
  category: string;
}

export const useForumQuery = (token: string) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["forum"],
    queryFn: async () => await fetchAllForums(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const createForumQuery = useMutation({
    mutationFn: async (postData: Forum) => await createForum(token, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    createForum: createForumQuery.mutate,
    isCreatingForum: createForumQuery.isPending,
    forumCreationError: createForumQuery.error,
    forumCreationSuccess: createForumQuery.isSuccess,
  };
};


export const useFetchForumByCategory = (slug: string) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["forum", slug],
    queryFn: () => fetchForumByCategory(slug!),
    enabled: Boolean(slug),
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};

export const useFetchForumById = (token: string, forumId: string) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["forum", forumId],
    queryFn: () => fetchForumById(forumId!),
    enabled: Boolean(forumId),
  });

  const editComment = useMutation({
    mutationFn: async (vars: { comment: string; commentId: string }) =>
      await editCommentForum(token, forumId, vars.commentId, vars.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (vars: { commentId: string }) =>
      await deleteCommentForum(token, forumId, vars.commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  const editReply = useMutation({
    mutationFn: async (vars: {
      comment: string;
      commentId: string;
      replyId: string;
    }) =>
      await editReplyForum(
        token,
        forumId,
        vars.commentId,
        vars.replyId,
        vars.comment
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  const deleteReply = useMutation({
    mutationFn: async (vars: { commentId: string; replyId: string }) =>
      await deleteReplyForum(token, forumId, vars.commentId, vars.replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  const editReplyToReply = useMutation({
    mutationFn: async (vars: {
      comment: string;
      commentId: string;
      replyId: string;
      childId: string;
    }) =>
      await editReplyToReplyForum(
        token,
        forumId,
        vars.commentId,
        vars.replyId,
        vars.childId,
        vars.comment
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  const deleteReplyToReply = useMutation({
    mutationFn: async (vars: {
      commentId: string;
      replyId: string;
      childId: string;
    }) =>
      await deleteReplyToReplyForum(
        token,
        forumId,
        vars.commentId,
        vars.replyId,
        vars.childId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum", forumId] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    //Edit comment
    editComment: editComment.mutate,
    isEditingComment: editComment.isPending,

    //Delete comment
    deleteComment: deleteComment.mutate,
    isDeletingComment: deleteComment.isPending,

    //Edit reply
    editReply: editReply.mutate,
    isEditingReply: editReply.isPending,

    //Delete reply
    deleteReply: deleteReply.mutate,
    isDeletingReply: deleteReply.isPending,

    //Edit reply to reply
    editReplyToReply: editReplyToReply.mutate,
    isEditingReplyToReply: editReplyToReply.isPending,

    //Delete reply to reply
    deleteReplyToReply: deleteReplyToReply.mutate,
    isDeletingReplyToReply: deleteReplyToReply.isPending,
  };
};



export function useForumAddComment(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
    }) =>
      fetch(`/api/forums/${vars.forumId}/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ comment_content: vars.content }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user-activity"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}

export function useForumAddTopReplyForum(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
      commentId: string;
    }) =>
      fetch(`/api/forums/${vars.forumId}/comments/${vars.commentId}/replies`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ reply_content: vars.content }),
      }).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user-activity"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}

export function useForumAddNestedReply(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      forumId: string;
      replyId: string;
      commentId: string;
    }) =>
      fetch(
        `/api/forums/${vars.forumId}/comments/${vars.commentId}/replies/${vars.replyId}/children`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vars),
        }
      ).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["forums"] });
      qc.invalidateQueries({ queryKey: ["forum", token] });
      qc.invalidateQueries({ queryKey: ["forum"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user-activity"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
    },
  });
}
