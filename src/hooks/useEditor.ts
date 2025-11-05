import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchToReviewPubs,
  approvePost,
  archivePost,
  restoreArchivePost,
  rejectPost,
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
      queryClient.invalidateQueries({ queryKey: ["visit-user"] });
      queryClient.invalidateQueries({ queryKey: ["visit-user-activity"] });
    },
  });

  const rejectMutation = useMutation({
    mutationFn: (postId: string) => rejectPost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["rejected-pubs"] });
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

    reject: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
    rejectingError: rejectMutation.error,
    rejectSuccess: rejectMutation.isSuccess,

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
};
