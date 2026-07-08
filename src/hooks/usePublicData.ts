import { useQuery, useQueryClient } from "@tanstack/react-query";
import { fetchUserLeaderboard, fetchUsers } from "@/services/publicData";

export const useFetchLeaderboard = () => {
  const { data, error, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["user-leaderboard"],
    queryFn: async () => await fetchUserLeaderboard(),
  });

  return {
    data,
    error,
    isLoading,
    isError,
    isSuccess,
  };
};

export const useFetchUsers = () => {
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
