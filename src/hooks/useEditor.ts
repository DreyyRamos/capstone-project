import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchToReviewPubs, approvePost } from "@/services/editor";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

// Main hook for working with all posts
export const useEditorQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["to-review"],
    queryFn: async () => await fetchToReviewPubs(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to create a new post
  const mutation = useMutation({
    mutationFn: async (postId: string) => await approvePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
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
    approve: mutation.mutate,
    isCreating: mutation.isPending,
    createError: mutation.error,
    createSuccess: mutation.isSuccess,
    createReset: mutation.reset,
  };

  // export const useFeaturedPostsQuery = () => {
  //   const { data, isLoading, isError, error, refetch } = useQuery({
  //     // A unique query key to cache this data separately from all posts
  //     queryKey: ["featured-pubs"],

  //     // The query function is the service you already created
  //     queryFn: fetchFeaturedPubs,

  //     // refetchOnWindowFocus: false,
  //     // refetchOnMount: false,
  //     // refetchOnReconnect: false,
  //     // refetchInterval: false,
  //   });

  //   return { data, isLoading, isError, error, refetch };
  // };

  // // Separate hook for fetching a single post by ID

  // export const useFetchOnePostQuery = (postId: string) => {
  //   const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
  //     queryKey: ["post", postId],
  //     queryFn: () => fetchPubById(postId),
  //     enabled: !!postId,
  //   });

  //   return {
  //     data,
  //     error,
  //     isLoading,
  //     isError,
  //     isSuccess,
  //     refetch,
  //   };
  // };

  // export const usePostByIdQuery = (token: string, postId: string) => {
  //   const queryClient = useQueryClient();
  //   // const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
  //   //   queryKey: ["post", postId],
  //   //   queryFn: () => fetchPubById(token, postId),
  //   //   enabled: !!postId && !!token,
  //   // });

  //   const updateMutation = useMutation({
  //     mutationFn: (postData: Publication) => updatePost(token, postId, postData),
  //     onSuccess: () => {
  //       // Invalidate both the specific post and the posts list
  //       queryClient.invalidateQueries({ queryKey: ["pub", postId] });
  //       queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //     },
  //   });

  //   const deleteMutation = useMutation({
  //     mutationFn: () => deletePost(token, postId),
  //     onSuccess: () => {
  //       // Invalidate both the specific post and the posts list
  //       queryClient.invalidateQueries({ queryKey: ["pub", postId] });
  //       queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //     },
  //   });

  //   const addComments = useMutation({
  //     mutationFn: async (comment: any) =>
  //       await addCommentPub(token, postId, comment),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["post", postId] });
  //       queryClient.invalidateQueries({ queryKey: ["posts"] });
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //     },
  //   });

  //   return {
  //     // Query results
  //     // data,
  //     // error,
  //     // isLoading,
  //     // isError,
  //     // isSuccess,
  //     // refetch,

  //     // Mutation functions
  //     updatePost: updateMutation.mutate,
  //     isUpdating: updateMutation.isPending,
  //     updateError: updateMutation.error,
  //     updateSuccess: updateMutation.isSuccess,

  //     deletePostByUser: deleteMutation.mutate,
  //     isDeleting: deleteMutation.isPending,

  //     //Comment functions
  //     commentToPost: addComments.mutate,
  //     isCommenting: addComments.isPending,
  //   };
};
