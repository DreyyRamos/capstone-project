import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  fetchAllUsers,
  fetchAllUserAdmissions,
  fetchRoleChangeRequests,
  approveAdmission,
  rejectAdmission,
  approveRoleChangeRequest,
  rejectRoleChangeRequest,
  updateRole,
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
  });

  const updateUserRole = useMutation({
    mutationFn: async ({ id, newRole }: { id: string; newRole: string }) =>
      updateRole(token, id, newRole),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-side-users"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
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

    updateRole: updateUserRole.mutate,
    isUpdating: updateUserRole.isPending,
    // createError: mutation.error,
    updateSuccess: updateUserRole.isSuccess,
    // createReset: mutation.reset,
  };
};

export const useAdminUserAdmissionsQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["user-admissions"],
    queryFn: async () => await fetchAllUserAdmissions(token),
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

  const rejectUser = useMutation({
    mutationFn: async (admission_id: string) =>
      rejectAdmission(token, admission_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user-admissions"] });
      queryClient.invalidateQueries({ queryKey: ["admin-side-users"] });
      queryClient.invalidateQueries({ queryKey: ["moderator-users"] });
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
    approveUser: approveUser.mutate,
    isApproving: approveUser.isPending,
    // createError: mutation.error,
    isApproved: approveUser.isSuccess,
    // createReset: mutation.reset,

    rejectUser: rejectUser.mutate,
    isRejecting: rejectUser.isPending,
    // createError: mutation.error,
    isRejected: rejectUser.isSuccess,
  };
};

export const useAdminRoleChangeRequestsQuery = (token: string) => {
  const queryClient = useQueryClient();

  // Query to fetch all posts
  const { data, error, isLoading, isError, isSuccess, refetch } = useQuery({
    queryKey: ["role-change-requests"],
    queryFn: async () => await fetchRoleChangeRequests(token),
  });

  const approveRoleChange = useMutation({
    mutationFn: async (request_id: string) =>
      approveRoleChangeRequest(token, request_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-change-requests"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-side-users"] });
    },
  });

  const rejectRoleChange = useMutation({
    mutationFn: async (request_id: string) =>
      rejectRoleChangeRequest(token, request_id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["role-change-requests"] });
      queryClient.invalidateQueries({ queryKey: ["users"] });
      queryClient.invalidateQueries({ queryKey: ["admin-side-users"] });
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
    approveRoleChange: approveRoleChange.mutate,
    isApproving: approveRoleChange.isPending,
    // createError: mutation.error,
    isApproved: approveRoleChange.isSuccess,
    // createReset: mutation.reset,

    rejectRoleChange: rejectRoleChange.mutate,
    isRejecting: rejectRoleChange.isPending,
    // createError: mutation.error,
    isRejected: rejectRoleChange.isSuccess,
    // createReset: mutation.reset,
  };
};
