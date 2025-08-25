"use client";

import { createContext, useContext, type ReactNode } from "react";
import { ConfirmationModal } from "./confirmation-modal";
import {
  useConfirmationModal,
  type ConfirmationOptions,
} from "@/hooks/use-confirmation-modal";

interface ConfirmationContextType {
  openModal: (options: ConfirmationOptions) => void;
  confirmDelete: (
    itemName: string,
    onConfirm: () => void | Promise<void>
  ) => void;
  confirmAction: (
    action: string,
    description: string,
    onConfirm: () => void | Promise<void>,
    variant?: "default" | "destructive" | "success" | "warning"
  ) => void;
  confirmApprove: (
    itemName: string,
    onConfirm: () => void | Promise<void>
  ) => void;
  confirmReject: (
    itemName: string,
    onConfirm: () => void | Promise<void>
  ) => void;
}

const ConfirmationContext = createContext<ConfirmationContextType | undefined>(
  undefined
);

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const {
    isOpen,
    isLoading,
    options,
    closeModal,
    handleConfirm,
    openModal,
    confirmDelete,
    confirmAction,
    confirmApprove,
    confirmReject,
  } = useConfirmationModal();

  return (
    <ConfirmationContext.Provider
      value={{
        openModal,
        confirmDelete,
        confirmAction,
        confirmApprove,
        confirmReject,
      }}
    >
      {children}
      <ConfirmationModal
        isOpen={isOpen}
        onClose={closeModal}
        onConfirm={handleConfirm}
        isLoading={isLoading}
        {...options}
      />
    </ConfirmationContext.Provider>
  );
}

export function useConfirmation() {
  const context = useContext(ConfirmationContext);
  if (context === undefined) {
    throw new Error(
      "useConfirmation must be used within a ConfirmationProvider"
    );
  }
  return context;
}
