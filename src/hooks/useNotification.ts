import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { markAsRead } from "@/services/notification";

export const useNotificationQuery = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => markAsRead(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
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
    markAsRead: mutation.mutate,
    isCreating: mutation.isPending,
    createError: mutation.error,
    createSuccess: mutation.isSuccess,
    createReset: mutation.reset,
  };
};
