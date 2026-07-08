import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchToReviewPubs,
  approvePost,
  archivePost,
  restoreArchivePost,
  rejectPost,
  deletePost,
} from "@/services/editor";


export const useEditorQuery = (token: string) => {
  const queryClient = useQueryClient();

  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["to-review"],
    queryFn: async () => await fetchToReviewPubs(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: true,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

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

  const deleteArchive = useMutation({
    mutationFn: async (postId: string) => await deletePost(token, postId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["archived-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["rejected-pubs"] });
    },
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
    refetch,

    approve: mutation.mutate,
    isCreating: mutation.isPending,
    createError: mutation.error,
    createSuccess: mutation.isSuccess,
    createReset: mutation.reset,

    reject: rejectMutation.mutate,
    isRejecting: rejectMutation.isPending,
    rejectingError: rejectMutation.error,
    rejectSuccess: rejectMutation.isSuccess,

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

    deleteArchive: deleteArchive.mutate,
    isDeleting: restoreArchiveMutation.isPending,
    deletingError: restoreArchiveMutation.error,
    deleteSSucces: restoreArchiveMutation.isSuccess,
  };
};
