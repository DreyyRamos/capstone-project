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
  };
};
