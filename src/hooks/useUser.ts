import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchCurrentUser,
  editCurrentUser,
  fetchCurrentUserActivity,
  fetchVisitUser,
  fetchVisitingUserActivity,
  requestRoleChange,
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

enum Roles {
  ADMIN,
  STUDENT,
  MODERATOR,
  EDITOR,
}

interface RoleChange {
  userId: string;
  firstName: string;
  lastName: string;
  userEmail: string;
  currentRole: Roles;
  requestedRole: Roles;
  reason: string;
  additionalInfo: string;
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

  const roleChange = useMutation({
    mutationFn: async (
      newData: any // Changed from User type to any
    ) => await requestRoleChange(token, newData),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["pub"] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      // Optional: You might want to show success message here
      console.log("Role change request submitted successfully:", data);
    },
    onError: (error: Error) => {
      console.error("Role change request failed:", error);
      // Handle error state in your component
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

    roleChange: roleChange.mutate,
    isRequestingChange: roleChange.isPending,
    isRequestingError: roleChange.error,
    isRequestingSuccess: roleChange.isSuccess,
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
