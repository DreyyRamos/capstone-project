import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchReportedContents,
  deleteReportedContent,
  restoreReportedContent,
  cleanupReports,
  fetchUsers,
} from "@/services/moderation";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

// Main hook for working with all posts
export const useModeratorQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["reported-contents"],
    queryFn: async () => await fetchReportedContents(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to delete a reported content
  const deleteReported = useMutation({
    mutationFn: async ({
      contentType,
      contentId,
      reportId,
      userId,
    }: {
      contentType: any;
      contentId: any;
      reportId: any;
      userId: any;
    }) =>
      await deleteReportedContent(
        contentType,
        contentId,
        reportId,
        userId,
        token
      ),
    onSuccess: (data, variables) => {
      // Always invalidate reports
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });

      // Only invalidate specific content type queries
      if (variables.contentType.includes("PUBLICATION")) {
        queryClient.invalidateQueries({ queryKey: ["pubs"] });
      } else if (variables.contentType.includes("FORUM")) {
        queryClient.invalidateQueries({ queryKey: ["forums"] });
      }
    },
  });

  const restoreReported = useMutation({
    mutationFn: async (reportId: string) =>
      await restoreReportedContent(reportId, token),
    onSuccess: (data, variables) => {
      // Always invalidate reports
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });

      // Only invalidate specific content type queries
      // if (variables.contentType.includes("PUBLICATION")) {
      //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
      // } else if (variables.contentType.includes("FORUM")) {
      //   queryClient.invalidateQueries({ queryKey: ["forums"] });
      // }
    },
  });

  const cleanupReport = useMutation({
    mutationFn: async () => await cleanupReports(token),
    onSuccess: (data, variables) => {
      // Always invalidate reports
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });

      // Only invalidate specific content type queries
      // if (variables.contentType.includes("PUBLICATION")) {
      //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
      // } else if (variables.contentType.includes("FORUM")) {
      //   queryClient.invalidateQueries({ queryKey: ["forums"] });
      // }
    },
  });

  //   const archiveMutation = useMutation({
  //     mutationFn: (postId: string) => archivePost(token, postId),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //       queryClient.invalidateQueries({ queryKey: ["archived-pubs"] });
  //     },
  //   });

  //   const restoreArchiveMutation = useMutation({
  //     mutationFn: async (postId: string) =>
  //       await restoreArchivePost(token, postId),
  //     onSuccess: () => {
  //       queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["users"] });
  //       queryClient.invalidateQueries({ queryKey: ["archived-pubs"] });
  //     },
  //   });

  return {
    // Query results
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    // Mutation functions
    deleteReportedContent: deleteReported.mutate,
    isDeleting: deleteReported.isPending,
    // createError: mutation.error,
    deleteSuccess: deleteReported.isSuccess,
    // createReset: mutation.reset,

    // restore mutation function
    restoreContent: restoreReported.mutate,
    isRestoring: restoreReported.isPending,
    restoreSuccess: restoreReported.isSuccess,
    // archiveError: archiveMutation.error,
    // archiveReset: archiveMutation.reset,

    cleanupReport: cleanupReport.mutate,
    isCleaningUp: cleanupReport.isPending,
    cleanUpSuccess: cleanupReport.isSuccess,

    // restoreArchive: restoreArchiveMutation.mutate,
    // isRestoring: restoreArchiveMutation.isPending,
    // restoringError: restoreArchiveMutation.error,
    // restoringSuccess: restoreArchiveMutation.isSuccess,
    // restoringReset: restoreArchiveMutation.reset,
  };
};

export const useFetchUsersModerator = (token: string) => {
  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["moderator-users"],
    queryFn: async () => await fetchUsers(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
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
