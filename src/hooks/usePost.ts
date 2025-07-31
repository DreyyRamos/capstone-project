import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchAllPubs,
  fetchPubById,
  likePub,
  addCommentPub,
  createPost,
  updatePost,
  deletePost,
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
  });

  // Mutation to create a new post
  const mutation = useMutation({
    mutationFn: (postData: Publication) => createPost(token, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
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

// Separate hook for fetching a single post by ID
export const usePostByIdQuery = (token: string, postId: string) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["post", postId],
    queryFn: () => fetchPubById(token, postId),
    enabled: !!postId && !!token,
  });

  const updateMutation = useMutation({
    mutationFn: (postData: Publication) => updatePost(token, postId, postData),
    onSuccess: () => {
      // Invalidate both the specific post and the posts list
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: () => deletePost(token, postId),
    onSuccess: () => {
      // Invalidate both the specific post and the posts list
      queryClient.invalidateQueries({ queryKey: ["pub", postId] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const addComments = useMutation({
    mutationFn: async (comment: any) =>
      await addCommentPub(token, postId, comment),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["post", postId] });
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
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
    updatePost: updateMutation.mutate,
    isUpdating: updateMutation.isPending,
    updateError: updateMutation.error,
    updateSuccess: updateMutation.isSuccess,

    deletePostByUser: deleteMutation.mutate,
    isDeleting: deleteMutation.isPending,

    //Comment functions
    commentToPost: addComments.mutate,
    isCommenting: addComments.isPending,
  };
};
