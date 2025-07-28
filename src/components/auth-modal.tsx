"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus } from "lucide-react";
import { useRouter } from "next/navigation";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  action?: string;
  redirectTo?: string;
}

export function AuthModal({
  isOpen,
  onClose,
  action = "perform this action",
  redirectTo,
}: AuthModalProps) {
  const router = useRouter();

  const handleSignIn = () => {
    const currentPath = window.location.pathname + window.location.search;
    const redirect = redirectTo || currentPath;
    router.push(`/login?redirect=${encodeURIComponent(redirect)}`);
    onClose();
  };

  const handleRegister = () => {
    // temporary lang, redirect to sa registration page
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <LogIn className="h-5 w-5" />
            Sign in required
          </DialogTitle>
          <DialogDescription>
            You need to be signed in to {action}. Please sign in to your account
            or contact your administrator for access.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-950/20 p-4 rounded-lg">
            <h4 className="font-medium text-blue-900 dark:text-blue-100 mb-2">
              What you can do after signing in:
            </h4>
            <ul className="text-sm text-blue-700 dark:text-blue-200 space-y-1">
              <li>• Create and publish articles</li>
              <li>• Comment on publications</li>
              <li>• Participate in forum discussions</li>
              <li>• Like and share content</li>
              <li>• Connect with the school community</li>
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <Button onClick={handleSignIn} className="w-full">
              <LogIn className="mr-2 h-4 w-4" />
              Sign In
            </Button>

            <Button
              variant="outline"
              onClick={handleRegister}
              className="w-full bg-transparent"
            >
              <UserPlus className="mr-2 h-4 w-4" />
              Need an Account?
            </Button>
          </div>

          <div className="text-center">
            <Button variant="ghost" onClick={onClose} className="text-sm">
              Continue browsing without signing in
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
