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

      callback();
    },
    [userStatus, onBlocked]
  );

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
      <AlertDialog
        data-testId="useUserStatusCheck-a-1"
        open={showModal}
        onOpenChange={setShowModal}
      >
        <AlertDialogContent
          id="useUserStatusCheck-a-2"
          data-testId="useUserStatusCheck-a-2"
          className="max-w-md"
        >
          <AlertDialogHeader
            id="useUserStatusCheck-a-3"
            data-testId="useUserStatusCheck-a-3"
          >
            <div
              id="useUserStatusCheck-flex-1"
              data-testId="useUserStatusCheck-flex-1"
              className="flex items-center gap-2"
            >
              <AlertTriangle className="h-5 w-5 text-destructive" />
              <AlertDialogTitle
                id="useUserStatusCheck-a-4"
                data-testId="useUserStatusCheck-a-4"
                className="text-destructive"
              >
                {modalContent.title}
              </AlertDialogTitle>
            </div>
            <AlertDialogDescription
              id="useUserStatusCheck-a-5"
              data-testId="useUserStatusCheck-a-5"
              className="text-left"
            >
              {modalContent.description}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter
            id="useUserStatusCheck-a-6"
            data-testId="useUserStatusCheck-a-6"
            className="flex-col gap-2 sm:flex-row"
          >
            <AlertDialogAction
              id="useUserStatusCheck-a-7"
              data-testId="useUserStatusCheck-a-7"
              onClick={() => {
                window.location.href =
                  "mailto:admin@yourapp.com?subject=Account Status Inquiry";
              }}
              className="flex items-center gap-2"
            >
              <Mail className="h-4 w-4" />
              Contact Administrator
            </AlertDialogAction>
            <AlertDialogAction
              id="useUserStatusCheck-a-8"
              data-testId="useUserStatusCheck-a-8"
              onClick={handleModalClose}
            >
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    );
  };

  return {
    StatusModal,
    checkAndExecute,
    checkComment,
    checkLike,
    checkPost,
    checkShare,
    checkFollow,
    checkMessage,
    isBlocked: userStatus === "BANNED" || userStatus === "SUSPENDED",
    userStatus: userStatus || "ACTIVE",
    showModal,
    setShowModal,
  };
};
