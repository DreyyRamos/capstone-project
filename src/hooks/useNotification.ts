import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { markAsRead, markAllAsRead } from "@/services/notification";

export const useNotificationQuery = (token: string) => {
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => markAsRead(notificationId, token),
    onSuccess: () => {
      // Invalidate the user query to refetch user data (including notifications)
      queryClient.invalidateQueries({ queryKey: ["users", token] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
    },
    onError: (error) => {
      // toast.error("Failed to mark notification as read.");
      console.error(error);
    },
  });

  // Create a new mutation for marking all as read
  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllAsRead(token),
    onSuccess: () => {
      // toast.success("All notifications marked as read.");
      // Invalidate the user query to refetch the user and their notifications
      queryClient.invalidateQueries({ queryKey: ["users", token] });
      queryClient.invalidateQueries({ queryKey: ["pubs"] });
      queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
      queryClient.invalidateQueries({ queryKey: ["to-review"] });
    },
    onError: (error) => {
      // toast.error("Failed to mark all notifications as read.");
      console.error(error);
    },
  });

  return {
    markAsRead: markAsReadMutation.mutate, // Keep existing function
    markAllAsRead: markAllAsReadMutation, // Expose the new mutation object
  };

  // const mutation = useMutation({
  //   mutationFn: (id: string) => markAsRead(id, token),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //     queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
  //     queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //   },
  // });

  // const markAll = useMutation({
  //   mutationFn: (userId: string) => markAllAsRead(userId, token),
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({ queryKey: ["users"] });
  //     queryClient.invalidateQueries({ queryKey: ["pubs"] });
  //     queryClient.invalidateQueries({ queryKey: ["featured-pubs"] });
  //     queryClient.invalidateQueries({ queryKey: ["to-review"] });
  //   },
  // });

  // return {
  //   // Query results
  //   // data,
  //   // error,
  //   // isLoading,
  //   // isError,
  //   // isSuccess,
  //   // refetch,

  //   // Mutation functions
  //   markAsRead: mutation.mutate,
  //   markAllAsRead: markAll.mutate,
  //   isCreating: mutation.isPending,
  //   createError: mutation.error,
  //   createSuccess: mutation.isSuccess,
  //   createReset: mutation.reset,
  // };
};

