import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { fetchUserLeaderboard } from "@/services/publicData";

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
