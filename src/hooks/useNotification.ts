import { useQueryClient, useMutation } from "@tanstack/react-query";
import { markAsRead, markAllAsRead } from "@/services/notification";

export const useNotificationQuery = (token: string) => {
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: (notificationId: string) => markAsRead(notificationId, token),
    onSuccess: () => {
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

  const markAllAsReadMutation = useMutation({
    mutationFn: () => markAllAsRead(token),
    onSuccess: () => {
      // toast.success("All notifications marked as read.");
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
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation,
  };
};
