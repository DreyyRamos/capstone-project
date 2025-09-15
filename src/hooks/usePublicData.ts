import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchUserLeaderboard, fetchUsers } from "@/services/publicData";

// Main hook for working with all posts
export const useFetchLeaderboard = () => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user-leaderboard"],
    queryFn: async () => await fetchUserLeaderboard(),
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
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
  };
};

// Main hook for working with all posts
export const useFetchUsers = () => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["users"],
    queryFn: async () => await fetchUsers(),
    // refetchOnWindowFocus: false,
    // refetchOnMount: true,
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
  };
};
