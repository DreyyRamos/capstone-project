import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchAllUsers,
  fetchAllUserAdmissions,
  approveAdmission,
} from "@/services/admin";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
}

// Main hook for working with all posts
export const useAdminQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["admin-side-users"],
    queryFn: async () => await fetchAllUsers(token),
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });

  // Mutation to delete a reported content
  //   const deleteReported = useMutation({
  //     mutationFn: async ({
  //       contentType,
  //       contentId,
  //       reportId,
  //       userId,
  //     }: {
  //       contentType: any;
  //       contentId: any;
  //       reportId: any;
  //       userId: any;
  //     }) =>
  //       await deleteReportedContent(
  //         contentType,
  //         contentId,
  //         reportId,
  //         userId,
  //         token
  //       ),
  //     onSuccess: (data, variables) => {
  //       // Always invalidate reports
  //       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

  //       // Only invalidate specific content type queries
  //       if (variables.contentType.includes("PUBLICATION")) {
  //         queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       } else if (variables.contentType.includes("FORUM")) {
  //         queryClient.invalidateQueries({ queryKey: ["forums"] });
  //       }
  //     },
  //   });

  //   const restoreReported = useMutation({
  //     mutationFn: async (reportId: string) =>
  //       await restoreReportedContent(reportId, token),
  //     onSuccess: (data, variables) => {
  //       // Always invalidate reports
  //       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

  //       // Only invalidate specific content type queries
  //       // if (variables.contentType.includes("PUBLICATION")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       // } else if (variables.contentType.includes("FORUM")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["forums"] });
  //       // }
  //     },
  //   });

  //   const cleanupReport = useMutation({
  //     mutationFn: async () => await cleanupReports(token),
  //     onSuccess: (data, variables) => {
  //       // Always invalidate reports
  //       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

  //       // Only invalidate specific content type queries
  //       // if (variables.contentType.includes("PUBLICATION")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       // } else if (variables.contentType.includes("FORUM")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["forums"] });
  //       // }
  //     },
  //   });

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
    // deleteReportedContent: deleteReported.mutate,
    // isDeleting: deleteReported.isPending,
    // // createError: mutation.error,
    // deleteSuccess: deleteReported.isSuccess,
    // // createReset: mutation.reset,

    // // restore mutation function
    // restoreContent: restoreReported.mutate,
    // isRestoring: restoreReported.isPending,
    // restoreSuccess: restoreReported.isSuccess,
    // // archiveError: archiveMutation.error,
    // // archiveReset: archiveMutation.reset,

    // cleanupReport: cleanupReport.mutate,
    // isCleaningUp: cleanupReport.isPending,
    // cleanUpSuccess: cleanupReport.isSuccess,

    // restoreArchive: restoreArchiveMutation.mutate,
    // isRestoring: restoreArchiveMutation.isPending,
    // restoringError: restoreArchiveMutation.error,
    // restoringSuccess: restoreArchiveMutation.isSuccess,
    // restoringReset: restoreArchiveMutation.reset,
  };
};

export const useAdminUserAdmissionsQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["user-admissions"],
    queryFn: async () => await fetchAllUserAdmissions(token),
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
    // refetchOnReconnect: false,
    // refetchInterval: false,
  });

  // Mutation to approve admission
  const approveUser = useMutation({
    mutationFn: async ({
      admission_id,
      ...payload
    }: {
      admission_id: string;
      user_email: string;
      firstName: string;
      lastName: string;
      password: string;
      profileImage: string;
      id_picture: string;
      bio: string;
      contactNumber: string;
      location: string;
      interests: string[];
    }) => approveAdmission(token!, admission_id, payload),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-admissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-side-users"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
    },
  });

  //   const restoreReported = useMutation({
  //     mutationFn: async (reportId: string) =>
  //       await restoreReportedContent(reportId, token),
  //     onSuccess: (data, variables) => {
  //       // Always invalidate reports
  //       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

  //       // Only invalidate specific content type queries
  //       // if (variables.contentType.includes("PUBLICATION")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       // } else if (variables.contentType.includes("FORUM")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["forums"] });
  //       // }
  //     },
  //   });

  //   const cleanupReport = useMutation({
  //     mutationFn: async () => await cleanupReports(token),
  //     onSuccess: (data, variables) => {
  //       // Always invalidate reports
  //       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
  //       queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });

  //       // Only invalidate specific content type queries
  //       // if (variables.contentType.includes("PUBLICATION")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //       // } else if (variables.contentType.includes("FORUM")) {
  //       //   queryClient.invalidateQueries({ queryKey: ["forums"] });
  //       // }
  //     },
  //   });

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
    approveUser: approveUser.mutate,
    isApproving: approveUser.isPending,
    // createError: mutation.error,
    isApproved: approveUser.isSuccess,
    // createReset: mutation.reset,

    // // restore mutation function
    // restoreContent: restoreReported.mutate,
    // isRestoring: restoreReported.isPending,
    // restoreSuccess: restoreReported.isSuccess,
    // // archiveError: archiveMutation.error,
    // // archiveReset: archiveMutation.reset,

    // cleanupReport: cleanupReport.mutate,
    // isCleaningUp: cleanupReport.isPending,
    // cleanUpSuccess: cleanupReport.isSuccess,

    // restoreArchive: restoreArchiveMutation.mutate,
    // isRestoring: restoreArchiveMutation.isPending,
    // restoringError: restoreArchiveMutation.error,
    // restoringSuccess: restoreArchiveMutation.isSuccess,
    // restoringReset: restoreArchiveMutation.reset,
  };
};

// export const useFetchUsersModerator = (token: string) => {
//   const queryClient = useQueryClient();
//   // Query to fetch all posts
//   const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
//     queryKey: ["moderator-users"],
//     queryFn: async () => await fetchUsers(token),
//     // refetchOnWindowFocus: false,
//     refetchOnMount: true,
//     refetchOnReconnect: false,
//     refetchInterval: false,
//   });

//   const triggerUserStatus = useMutation({
//     mutationFn: async ({ userId, reportId }: { userId: any; reportId: any }) =>
//       await triggerAction(token, userId, reportId),
//     onSuccess: (data, variables) => {
//       // Always invalidate reports
//       queryClient.invalidateQueries({ queryKey: ["reported-contents"] });
//       queryClient.invalidateQueries({ queryKey: ["to-review"] });
//       queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
//       queryClient.invalidateQueries({ queryKey: ["users"] });
//     },
//   });

//   return {
//     // Query results
//     data,
//     error,
//     isLoading,
//     isError,
//     isSuccess,
//     refetch,

//     // Mutation functions
//     triggerBan: triggerUserStatus.mutate,
//     isBanning: triggerUserStatus.isPending,
//     // createError: mutation.error,
//     banSuccess: triggerUserStatus.isSuccess,
//     // createReset: mutation.reset,
//   };
// };
