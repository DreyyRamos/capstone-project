import { useState, useCallback } from "react";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { AlertTriangle, Mail } from "lucide-react";
import { UserStatus } from "@/generated/prisma";

interface UseUserStatusCheckOptions {
  onBlocked?: (action: string, status: UserStatus) => void;
}

export const useUserStatusCheck = (
  userStatus: UserStatus | null,
  options: UseUserStatusCheckOptions = {}
) => {
  const { onBlocked } = options;
  const [showModal, setShowModal] = useState(false);
  const [modalContent, setModalContent] = useState<{
    title: string;
    description: string;
    action: string;
    variant: "BANNED" | "SUSPENDED";
  } | null>(null);

  const checkAndExecute = useCallback(
    (action: string, callback: () => void | Promise<void>) => {
      if (!userStatus) {
        callback();
        return;
      }

      if (userStatus === "BANNED") {
        setModalContent({
          title: "Action Blocked - Account Banned",
          description: `You cannot ${action} because your account has been banned. Please contact the administrator for more information.`,
          action,
          variant: "BANNED",
        });
        setShowModal(true);
        onBlocked?.(action, userStatus);
        return;
      }

      if (userStatus === "SUSPENDED") {
        setModalContent({
          title: "Action Blocked - Account Suspended",
          description: `You cannot ${action} because your account has been temporarily suspended. Please contact the administrator if you believe this is an error.`,
          action,
          variant: "SUSPENDED",
        });
        setShowModal(true);
        onBlocked?.(action, userStatus);
        return;
      }

      // User is active, execute the action
      callback();
    },
    [userStatus, onBlocked]
  );

  // Helper functions for common actions
  const checkComment = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("comment on this post", callback);
    },
    [checkAndExecute]
  );

  const checkLike = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("like this post", callback);
    },
    [checkAndExecute]
  );

  const checkPost = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("create a post", callback);
    },
    [checkAndExecute]
  );

  const checkShare = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("share this post", callback);
    },
    [checkAndExecute]
  );

  const checkFollow = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("follow this user", callback);
    },
    [checkAndExecute]
  );

  const checkMessage = useCallback(
    (callback: () => void | Promise<void>) => {
      checkAndExecute("send a message", callback);
    },
    [checkAndExecute]
  );

  const handleModalClose = () => {
    setShowModal(false);
  };

  const StatusModal = () => {
    if (!modalContent) return null;

    return (
      <AlertDialog open={showModal} onOpenChange={setShowModal}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <div id="useUserStatusCheck-flex-1" data-testId="useUserStatusCheck-flex-1" className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertDialogTitle className="text-destructive">
                {modalContent.title}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription className="text-left">
              {modalContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col gap-2 sm:flex-row">
            <AlertDialogAction
              onClick={() => {
                window.location.href =
                  "mailto:admin@yourapp.com?subject=Account Status Inquiry";
              }}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Contact Administrator
            </AlertDialogAction>
            <AlertDialogAction onClick={handleModalClose}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return {
    StatusModal,
    checkAndExecute, // Generic function for any action
    checkComment, // Helper for commenting
    checkLike, // Helper for liking
    checkPost, // Helper for posting
    checkShare, // Helper for sharing
    checkFollow, // Helper for following
    checkMessage, // Helper for messaging
    isBlocked: userStatus === "BANNED" || userStatus === "SUSPENDED",
    userStatus: userStatus || "ACTIVE",
    showModal,
    setShowModal,
  };
};
