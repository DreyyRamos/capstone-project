import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchCurrentUser,
  editCurrentUser,
  fetchCurrentUserActivity,
  fetchVisitUser,
  fetchVisitingUserActivity,
} from "@/services/user";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  bio: string;
  location: string;
  profileImage: string;
  interests: string[];
}

export const useUserQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch user data
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["users", token],
    queryFn: async () => await fetchCurrentUser(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    refetchInterval: false,
  });

  // Mutation to edit user data
  const mutation = useMutation({
    mutationFn: async (userData: User) =>
      await editCurrentUser(token, userData),
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

export const useUserActivityQuery = (token: string) => {
  // Query to fetch user data
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["user-activity", token],
    queryFn: async () => await fetchCurrentUserActivity(token),
    // refetchOnWindowFocus: false,
    refetchOnMount: false,
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

export const useUserVisitorQuery = (id: string) => {
  const queryClient = useQueryClient();

  // Query to fetch user data
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["visit-user"],
    queryFn: async () => await fetchVisitUser(id),
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
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

export const useUserVisitingUserActivityQuery = (id: string) => {
  const queryClient = useQueryClient();

  // Query to fetch user data
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["visit-user-activity"],
    queryFn: async () => await fetchVisitingUserActivity(id),
    // refetchOnWindowFocus: false,
    // refetchOnMount: false,
    // refetchOnReconnect: false,
    // refetchInterval: false,
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
