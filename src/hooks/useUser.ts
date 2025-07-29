import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchCurrentUser, EditCurrentUser } from "@/services/user";

interface User {
  name: string;
  profileImage: string;
  email: string;
}

export const useUserQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch user data
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchCurrentUser(token),
  });

  // Mutation to edit user data
  const mutation = useMutation({
    mutationFn: (userData: User) => EditCurrentUser(token, userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pub"] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
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
    updateUser: mutation.mutate,
    isUpdating: mutation.isPending,
    updateError: mutation.error,
    updateSuccess: mutation.isSuccess,
    updateReset: mutation.reset,
  };
};
