import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchToReviewPubs,
  approvePost,
  archivePost,
  restoreArchivePost,
} from "@/services/editor";

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
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to approve a new post
  const mutation = useMutation({
    mutationFn: async (postId: string) => await approvePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["user-activity"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const archiveMutation = useMutation({
    mutationFn: (postId: string) => archivePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["archived-pubs"] });
    },
  });

  const restoreArchiveMutation = useMutation({
    mutationFn: async (postId: string) =>
      await restoreArchivePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["archived-pubs"] });
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

    // archive mutation function
    archive: archiveMutation.mutate,
    isArchiving: archiveMutation.isPending,
    archiveError: archiveMutation.error,
    archiveSuccess: archiveMutation.isSuccess,
    archiveReset: archiveMutation.reset,

    restoreArchive: restoreArchiveMutation.mutate,
    isRestoring: restoreArchiveMutation.isPending,
    restoringError: restoreArchiveMutation.error,
    restoringSuccess: restoreArchiveMutation.isSuccess,
    restoringReset: restoreArchiveMutation.reset,
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
