import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchReportedContents,
  deleteReportedContent,
  restoreReportedContent,
  cleanupReports,
  fetchUsers,
  triggerLiftSuspension,
  triggerAction,
  fetchReportCount,
} from "@/services/moderation";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

export const useModeratorQuery = (token: string) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["reported-contents"],
    queryFn: async () => await fetchReportedContents(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

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
        token,
      ),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

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
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
    },
  });

  const cleanupReport = useMutation({
    mutationFn: async () => await cleanupReports(token),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

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
  };
};

export const useFetchUsersModerator = (token: string) => {
  const queryClient = useQueryClient();
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["moderator-users"],
    queryFn: async () => await fetchUsers(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  const triggerUserStatus = useMutation({
    mutationFn: async ({ userId, reportId }: { userId: any; reportId: any }) =>
      await triggerAction(token, userId, reportId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  const triggerLiftSuspensionAccount = useMutation({
    mutationFn: async (userId) => await triggerLiftSuspension(token, userId),
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    triggerBan: triggerUserStatus.mutate,
    isBanning: triggerUserStatus.isPending,
    // createError: mutation.error,
    banSuccess: triggerUserStatus.isSuccess,
    // createReset: mutation.reset,

    triggerLiftSuspension: triggerLiftSuspensionAccount.mutate,
    isTriggering: triggerLiftSuspensionAccount.isPending,
    // createError: mutation.error,
    triggerSuccess: triggerLiftSuspensionAccount.isSuccess,
    // createReset: mutation.reset,
  };
};

export const useFetchReportCountQuery = (token: string) => {
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["report-count"],
    queryFn: async () => await fetchReportCount(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
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
