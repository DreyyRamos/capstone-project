"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Moon,
  Sun,
  LogIn,
  AlertTriangle,
} from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import Cookies from "js-cookie";
import { useState } from "react";
import SearchBar from "./search-bar";

import { useUserQuery } from "@/hooks/useUser";
import { timeAgo } from "@/lib/timeAgo";
import { useNotificationQuery } from "@/hooks/useNotification";
import { useConfirmation } from "./confirmation-provider";

export function Header() {
  const { setTheme, theme } = useTheme();
  const { confirmAction } = useConfirmation();
  const [isBanModalOpen, setIsBanModalOpen] = useState(false);
  const [selectedBanNotification, setSelectedBanNotification] =
    useState<any>(null);

  const token = Cookies.get("token") || "";
  const { data: user } = useUserQuery(token);
  const { markAsRead, markAllAsRead } = useNotificationQuery(token);

  console.log("current user", user);

  const handleMarkAllAsRead = () => {
    if (markAllAsRead) {
      markAllAsRead.mutate();
    }
  };

  const unreadNotifications =
    user?.userData?.notifications?.filter((n: any) => !n.isRead) || [];
  const unreadCount = unreadNotifications.length;

  const handleLogout = () => {
    Cookies.remove("token");
    window.location.href = "/login";
  };

  const handleNotificationClick = (notif: any) => {
    if (notif.notifType === "reports") {
      setSelectedBanNotification(notif);
      setIsBanModalOpen(true);
      markAsRead(notif.notifId);
    } else {
      // Handle other notifications normally
      markAsRead(notif.notifId);
      if (notif.pubNotifId) {
        window.location.href = `/publications/${notif.pubNotifId}`;
      }
    }
  };

  const handleBanModalClose = () => {
    setIsBanModalOpen(false);
    setSelectedBanNotification(null);
  };

  const getStatusBadgeClasses = (status: any) => {
    const baseClasses =
      "text-xs px-1 py-0 h-4 min-w-0 text-[10px] leading-tight";

    switch (status) {
      case "ACTIVE":
        return `${baseClasses} bg-green-500 hover:bg-green-600 text-white`;
      case "WARNED":
        return `${baseClasses} bg-yellow-500 hover:bg-yellow-600 text-white`;
      case "SUSPENDED":
        return `${baseClasses} bg-orange-500 hover:bg-orange-600 text-white`;
      case "BANNED":
        return `${baseClasses} bg-red-500 hover:bg-red-600 text-white`;
      default:
        return `${baseClasses} bg-gray-500 hover:bg-gray-600 text-white`;
    }
  };

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div id="header-flex-1" data-testId="header-flex-1" className="max-w-7xl mx-auto flex h-16 items-center justify-between px-6">
          <Link href="/" className="flex items-center gap-2">
            <div id="header-flex-2" data-testId="header-flex-2" className="h-8 w-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">RS</span>
            </div>
            <span className="font-bold text-lg">Ramos School</span>
          </Link>

          <div id="header-flex-3" data-testId="header-flex-3" className="flex items-center gap-4">
            <div id="header-div-4" data-testId="header-div-4" className="relative hidden md:block">
              <SearchBar className="hidden md:block" />
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>

            {user ? (
              <>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="relative">
                      <Bell className="h-4 w-4" />
                      {unreadCount > 0 && (
                        <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {unreadCount}
                        </Badge>
                      )}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-80">
                    <div id="header-flex-5" data-testId="header-flex-5" className="flex items-center justify-between px-2 py-1.5">
                      <DropdownMenuLabel className="p-0">
                        Notifications
                      </DropdownMenuLabel>
                      {unreadCount > 0 && (
                        <Button
                          variant="link"
                          className="h-auto p-0 text-xs"
                          onClick={handleMarkAllAsRead}
                        >
                          Mark all as read
                        </Button>
                      )}
                    </div>
                    <DropdownMenuSeparator />
                    {unreadCount > 0 ? (
                      unreadNotifications.reverse().map((notif: any) => (
                        <DropdownMenuItem
                          key={notif.notifId}
                          onClick={() => handleNotificationClick(notif)}
                          className="w-full cursor-pointer"
                        >
                          <div id="header-flex-6" data-testId="header-flex-6" className="flex flex-col gap-1 w-full">
                            <div id="header-flex-7" data-testId="header-flex-7" className="flex items-center gap-2">
                              {(notif.notifType === "reports" ||
                                notif.notifTitle
                                  ?.toLowerCase()
                                  .includes("report") ||
                                notif.notifTitle
                                  ?.toLowerCase()
                                  .includes("ban")) && (
                                <AlertTriangle className="h-4 w-4 text-red-500" />
                              )}
                              <p className="text-sm font-medium flex-1">
                                {notif.notifTitle}
                              </p>
                            </div>
                            <p className="text-xs text-muted-foreground">
                              {notif.notifContent} – {timeAgo(notif.createdAt)}
                            </p>
                          </div>
                        </DropdownMenuItem>
                      ))
                    ) : (
                      <DropdownMenuItem disabled>
                        <p className="text-sm text-muted-foreground">
                          No new notifications
                        </p>
                      </DropdownMenuItem>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-auto w-auto rounded-full flex flex-col items-center gap-0.5 py-0.5 px-1"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={
                            user?.userData?.profileImage || "/placeholder.svg"
                          }
                        />
                        <AvatarFallback>
                          {user?.userData?.firstName?.[0]}
                          {user?.userData?.lastName?.[0]}
                        </AvatarFallback>
                      </Avatar>
                      <Badge
                        className={getStatusBadgeClasses(
                          user?.userData?.status
                        )}
                      >
                        {user?.userData?.status}
                      </Badge>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div id="header-flex-8" data-testId="header-flex-8" className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user?.userData?.firstName || "User"}{" "}
                          {user?.userData?.lastName || "Lastname"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user?.userData?.email || "user@example.com"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/request-role-change">
                        <User className="mr-2 h-4 w-4" />
                        <span>Role Change Request</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() =>
                        confirmAction(
                          "Logout",
                          "Are you sure you want to logout?",
                          handleLogout
                        )
                      }
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild>
                <Link href="/login">
                  <LogIn className="mr-2 h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
          </div>
        </div>
      </header>

      {/* Ban Notification Modal */}
      <Dialog open={isBanModalOpen} onOpenChange={handleBanModalClose}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Account Restriction Notice
            </DialogTitle>
            <DialogDescription className="text-left space-y-3">
              <p>
                Your account has been flagged due to reported content
                violations.
              </p>
              {selectedBanNotification && (
                <div id="header-div-9" data-testId="header-div-9" className="bg-red-50 dark:bg-red-950 p-3 rounded-md border border-red-200 dark:border-red-800">
                  <p className="font-medium text-red-800 dark:text-red-200">
                    {selectedBanNotification.notifTitle}
                  </p>
                  <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                    {selectedBanNotification.notifContent}
                  </p>
                  <p className="text-xs text-red-600 dark:text-red-400 mt-2">
                    {timeAgo(selectedBanNotification.createdAt)}
                  </p>
                </div>
              )}
              <p className="text-sm">
                This action was taken to maintain community standards. If you
                believe this was done in error, you may contact the
                administration for review.
              </p>
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="flex gap-2 sm:gap-0">
            {/* <Button
              variant="outline"
              className="mx-1.5"
              onClick={() => {
                handleBanModalClose();
                // Optionally redirect to contact/appeal page
                window.location.href = "/contact";
              }}
            >
              Contact Admin
            </Button> */}
            <Button onClick={handleBanModalClose}>I Understand</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

