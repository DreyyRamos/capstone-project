import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  createForum,
  fetchAllForums,
  fetchForumByCategory,
  fetchForumById,
} from "@/services/forum";

interface Forum {
  topicTitle: string;
  description: string;
  tags: string[];
  category: string;
}

// Main hook for working with all posts
export const useForumQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["forum"],
    queryFn: async () => await fetchAllForums(token),
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to create a new post
  const createForumQuery = useMutation({
    mutationFn: async (postData: Forum) => await createForum(token, postData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["forum"] });
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
    createForum: createForumQuery.mutate,
    isCreatingForum: createForumQuery.isPending,
    forumCreationError: createForumQuery.error,
    forumCreationSuccess: createForumQuery.isSuccess,
  };
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

// export const useArchivedPostsQuery = (token: string) => {
//   const { data, isLoading, isError, error, refetch } = useQuery({
//     // A unique query key to cache this data separately from all posts
//     queryKey: ["archived-pubs"],

//     // The query function is the service you already created
//     queryFn: async () => await fetchArchivedPubs(token),

//     // refetchOnWindowFocus: false,
//     // refetchOnMount: false,
//     // refetchOnReconnect: false,
//     // refetchInterval: false,
//   });

//   return { data, isLoading, isError, error, refetch };
// };

// Separate hook for fetching a single post by ID

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

export const useFetchForumById = (forumId: string) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["forum", forumId],
    queryFn: () => fetchForumById(forumId!),
    enabled: Boolean(forumId),
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

// export const usePostByIdQuery = (token: string, postId: string) => {
//   const queryClient = useQueryClient();
//   // const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
//   //   queryKey: ["post", postId],
//   //   queryFn: () => fetchPubById(token, postId),
//   //   enabled: !!postId && !!token,
//   // });

//   const updateMutation = useMutation({
//     mutationFn: (postData: Forum) => updatePost(token, postId, postData),
//     onSuccess: () => {
//       // Invalidate both the specific post and the posts list
//       queryClient.invalidateQueries({ queryKey: ["pub", postId] });
//       queryClient.invalidateQueries({ queryKey: ["pubs"] });
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["to-review"] });
//       queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
//     },
//   });

//   const deleteMutation = useMutation({
//     mutationFn: () => deletePost(token, postId),
//     onSuccess: () => {
//       // Invalidate both the specific post and the posts list
//       queryClient.invalidateQueries({ queryKey: ["pub", postId] });
//       queryClient.invalidateQueries({ queryKey: ["pubs"] });
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["to-review"] });
//     },
//   });

//   const addComments = useMutation({
//     mutationFn: async (comment: any) =>
//       await addCommentPub(token, postId, comment),
//     onSuccess: () => {
//       queryClient.invalidateQueries({ queryKey: ["pub", postId] });
//       queryClient.invalidateQueries({ queryKey: ["pubs"] });
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//       queryClient.invalidateQueries({ queryKey: ["to-review"] });
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
// };
