import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchAllPubs,
  fetchPubById,
  fetchFeaturedPubs,
  fetchArchivedPubs,
  likePub,
  addCommentPub,
  createPost,
  updatePost,
  deletePost,
  replyToCommentPub,
  replyToReplyCommentPub,
  editCommentPub,
  deleteCommentPub,
  editReplyPub,
  deleteReplyPub,
  editReplyToReplyPub,
  deleteReplyToReplyPub,
  fetchCountPubs,
} from "@/services/publication";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

// Main hook for working with all posts
export const usePostQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["pubs"],
    queryFn: async () => await fetchAllPubs(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to create a new post
  const mutation = useMutation({
    mutationFn: async (postData: Publication) =>
      await createPost(token, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  return {
    // Query results
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    // Mutation functions
    createPost: mutation.mutate,
    isCreating: mutation.isPending,
    createError: mutation.error,
    createSuccess: mutation.isSuccess,
    createReset: mutation.reset,
  };
};

export const useFeaturedPostsQuery = () => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    // A unique query key to cache this data separately from all posts
    queryKey: ["featured-pubs"],

    // The query function is the service you already created
    queryFn: fetchFeaturedPubs,

    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });

  return { data, isLoading, isError, error, refetch };
};

export const useArchivedPostsQuery = (token: string) => {
  const { data, isLoading, isError, error, refetch } = useQuery({
    // A unique query key to cache this data separately from all posts
    queryKey: ["archived-pubs"],

    // The query function is the service you already created
    queryFn: async () => await fetchArchivedPubs(token),

    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });

  return { data, isLoading, isError, error, refetch };
};

// Separate hook for fetching a single post by ID

export const useFetchOnePostQuery = (postId: string) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["pub", postId],
    queryFn: () => fetchPubById(postId),
    enabled: !!postId,
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

export const usePostByIdQuery = (token: string, postId: string) => {
  const queryClient = useQueryClient();
  // const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
  //   queryKey: ["post", postId],
  //   queryFn: () => fetchPubById(token, postId),
  //   enabled: !!postId && !!token,
  // });

  const updateMutation = useMutation({
    mutationFn: (postData: Publication) => updatePost(token, postId, postData),
    onSuccess: () => {
      // Invalidate both the specific post and the posts list
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(token, postId),
    onSuccess: () => {
      // Invalidate both the specific post and the posts list
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  const addComments = useMutation({
    mutationFn: async (comment: any) =>
      await addCommentPub(token, postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  const editComment = useMutation({
    mutationFn: async (vars: { comment: string; commentId: string }) =>
      await editCommentPub(token, postId, vars.commentId, vars.comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  const deleteComment = useMutation({
    mutationFn: async (vars: { commentId: string }) =>
      await deleteCommentPub(token, postId, vars.commentId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  const editReply = useMutation({
    mutationFn: async (vars: {
      comment: string;
      commentId: string;
      replyId: string;
    }) =>
      await editReplyPub(
        token,
        postId,
        vars.commentId,
        vars.replyId,
        vars.comment
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  const deleteReply = useMutation({
    mutationFn: async (vars: { commentId: string; replyId: string }) =>
      await deleteReplyPub(token, postId, vars.commentId, vars.replyId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  const editReplyToReply = useMutation({
    mutationFn: async (vars: {
      comment: string;
      commentId: string;
      replyId: string;
      childId: string;
    }) =>
      await editReplyToReplyPub(
        token,
        postId,
        vars.commentId,
        vars.replyId,
        vars.childId,
        vars.comment
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  const deleteReplyToReply = useMutation({
    mutationFn: async (vars: {
      commentId: string;
      replyId: string;
      childId: string;
    }) =>
      await deleteReplyToReplyPub(
        token,
        postId,
        vars.commentId,
        vars.replyId,
        vars.childId
      ),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
    },
  });

  return {
    // Query results
    // data,
    // error,
    // isLoading,
    // isError,
    // isSuccess,
    // refetch,

    // Mutation functions
    updatePost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    updateSuccess: updateMutation.isSuccess,

    deletePostByUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    //Comment functions
    commentToPost: addComments.mutate,
    isCommenting: addComments.isPending,

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


export const useCountPubsQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["count-pubs"],
    queryFn: async () => await fetchCountPubs(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  return {
    // Query results
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,
  };
};



export function useAddTopReply(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      pubId: string;
      commentId: string;
    }) =>
      fetch(
        `/api/publications/${vars.pubId}/comments/${vars.commentId}/replies`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ reply_content: vars.content }),
        }
      ).then((r) => r.json()),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["pubs"] });
      qc.invalidateQueries({ queryKey: ["pub"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["featured-pubs"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["user-activity"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
      qc.invalidateQueries({ queryKey: ["visit-user"] });
      qc.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });
}

export function useAddNestedReply(token: string) {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (vars: {
      content: string;
      //   authorId: string;
      pubId: string;
      replyId: string;
      commentId: string;
    }) =>
      fetch(
        `/api/publications/${vars.pubId}/comments/${vars.commentId}/replies/${vars.replyId}/children`,
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
      qc.invalidateQueries({ queryKey: ["pubs"] });
      qc.invalidateQueries({ queryKey: ["pub"] });
      qc.invalidateQueries({ queryKey: ["replies"] });
      qc.invalidateQueries({ queryKey: ["featured-pubs"] });
      qc.invalidateQueries({ queryKey: ["users"] });
      qc.invalidateQueries({ queryKey: ["to-review"] });
      qc.invalidateQueries({ queryKey: ["user-activity"] });
      qc.invalidateQueries({ queryKey: ["visit-user"] });
      qc.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });
}
