"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Loader2,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Info,
  Trash2,
} from "lucide-react";

export interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "success" | "warning";
  icon?: "warning" | "success" | "error" | "info" | "delete" | "none";
  isLoading?: boolean;
  disabled?: boolean;
}

const variantStyles = {
  default: {
    confirmButton: "bg-primary hover:bg-primary/90",
    iconColor: "text-blue-600",
    titleColor: "text-foreground",
  },
  destructive: {
    confirmButton:
      "bg-destructive hover:bg-destructive/90 text-destructive-foreground",
    iconColor: "text-red-600",
    titleColor: "text-red-600",
  },
  success: {
    confirmButton: "bg-green-600 hover:bg-green-700 text-white",
    iconColor: "text-green-600",
    titleColor: "text-green-600",
  },
  warning: {
    confirmButton: "bg-yellow-600 hover:bg-yellow-700 text-white",
    iconColor: "text-yellow-600",
    titleColor: "text-yellow-600",
  },
};

const iconMap = {
  warning: AlertTriangle,
  success: CheckCircle,
  error: XCircle,
  info: Info,
  delete: Trash2,
  none: null,
};

export function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  icon = "warning",
  isLoading = false,
  disabled = false,
}: ConfirmationModalProps) {
  const [isProcessing, setIsProcessing] = useState(false);

  const styles = variantStyles[variant];
  const IconComponent = iconMap[icon];

  const handleConfirm = async () => {
    if (disabled || isProcessing) return;

    setIsProcessing(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Confirmation action failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleClose = () => {
    if (isProcessing || isLoading) return;
    onClose();
  };

  const showLoading = isLoading || isProcessing;

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="text-center sm:text-left">
          <div id="confirmation-modal-flex-1" data-testId="confirmation-modal-flex-1" className="flex items-center gap-3 mb-2">
            {IconComponent && (
              <div id="confirmation-modal-div-2" data-testId="confirmation-modal-div-2" className={`p-2 rounded-full bg-gray-100 dark:bg-gray-800`}>
                <IconComponent className={`h-6 w-6 ${styles.iconColor}`} />
              </div>
            )}
            <DialogTitle
              className={`text-lg font-semibold ${styles.titleColor}`}
            >
              {title}
            </DialogTitle>
          </div>
          <DialogDescription className="text-sm text-muted-foreground leading-relaxed">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="flex flex-col-reverse sm:flex-row gap-2 mt-6">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={showLoading}
            className="w-full sm:w-auto bg-transparent"
          >
            {cancelText}
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={disabled || showLoading}
            className={`w-full sm:w-auto ${styles.confirmButton}`}
          >
            {showLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
