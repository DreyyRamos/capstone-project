import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { makeIsFeatured } from "@/services/publication";

export const useIsFeatured = (token: string) => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (id: string) => makeIsFeatured(token, id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["pub"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
    },
  });

  return {
    // Mutation functions
    makeFeatured: mutation.mutate,
    isLoading: mutation.isPending,
    createError: mutation.error,
    createSuccess: mutation.isSuccess,
    createReset: mutation.reset,
  };
};
