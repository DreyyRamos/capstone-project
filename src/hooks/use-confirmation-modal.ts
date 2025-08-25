"use client";

import { useState, useCallback } from "react";

export interface ConfirmationOptions {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: "warning" | "success" | "error" | "info" | "delete" | "none";
  onConfirm?: () => void | Promise<void>;
}

export function useConfirmationModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmationOptions>({});
  const [isLoading, setIsLoading] = useState(false);

  const openModal = useCallback((confirmationOptions: ConfirmationOptions) => {
    setOptions(confirmationOptions);
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setIsLoading(false);
    // Clear options after a delay to prevent flash of old content
    setTimeout(() => setOptions({}), 200);
  }, []);

  const handleConfirm = useCallback(async () => {
    if (!options.onConfirm) return;

    setIsLoading(true);
    try {
      await options.onConfirm();
      closeModal();
    } catch (error) {
      console.error("Confirmation action failed:", error);
      setIsLoading(false);
    }
  }, [options.onConfirm, closeModal]);

  // Predefined confirmation types for common use cases
  const confirmDelete = useCallback(
    (itemName: string, onConfirm: () => void | Promise<void>) => {
      openModal({
        title: `Delete ${itemName}?`,
        description: `Are you sure you want to delete this ${itemName.toLowerCase()}? This action cannot be undone.`,
        confirmText: "Delete",
        cancelText: "Cancel",
        variant: "destructive",
        icon: "delete",
        onConfirm,
      });
    },
    [openModal]
  );

  const confirmAction = useCallback(
    (
      action: string,
      description: string,
      onConfirm: () => void | Promise<void>,
      variant: "default" | "destructive" | "success" | "warning" = "default"
    ) => {
      openModal({
        title: `${action}?`,
        description,
        confirmText: action,
        cancelText: "Cancel",
        variant,
        icon: variant === "destructive" ? "warning" : "info",
        onConfirm,
      });
    },
    [openModal]
  );

  const confirmApprove = useCallback(
    (itemName: string, onConfirm: () => void | Promise<void>) => {
      openModal({
        title: `Approve ${itemName}?`,
        description: `Are you sure you want to approve this ${itemName.toLowerCase()}?`,
        confirmText: "Approve",
        cancelText: "Cancel",
        variant: "success",
        icon: "success",
        onConfirm,
      });
    },
    [openModal]
  );

  const confirmReject = useCallback(
    (itemName: string, onConfirm: () => void | Promise<void>) => {
      openModal({
        title: `Reject ${itemName}?`,
        description: `Are you sure you want to reject this ${itemName.toLowerCase()}?`,
        confirmText: "Reject",
        cancelText: "Cancel",
        variant: "destructive",
        icon: "error",
        onConfirm,
      });
    },
    [openModal]
  );

  return {
    isOpen,
    isLoading,
    options,
    openModal,
    closeModal,
    handleConfirm,
    // Predefined helpers
    confirmDelete,
    confirmAction,
    confirmApprove,
    confirmReject,
  };
}
