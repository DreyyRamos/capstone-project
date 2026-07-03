"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { AlertTriangle, Ban, X } from "lucide-react";

interface ReportedUsersProps {
  user: any;
  confirmAction: (title: string, content: string, func: () => void) => void;
  handleBan: (id: string, reportId: string) => void;
  triggerLiftSuspension: (id: string) => void;
}

const ReportedUsers = ({
  user,
  confirmAction,
  handleBan,
  triggerLiftSuspension,
}: ReportedUsersProps) => {
  return (
    <div id="reported-users-div-1" data-testId="reported-users-div-1" key={user.id}>
      <div id="reported-users-flex-2" data-testId="reported-users-flex-2" className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4">
        <div id="reported-users-flex-3" data-testId="reported-users-flex-3" className="flex items-center gap-4 min-w-0 flex-1">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={user.profileImage} />
            <AvatarFallback>
              {user.firstName?.[0]}
              {user.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div id="reported-users-div-4" data-testId="reported-users-div-4" className="min-w-0 flex-1">
            <p className="font-medium text-sm sm:text-base truncate">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs sm:text-sm text-muted-foreground truncate">
              {user.email}
            </p>
            <Badge variant="secondary" className="text-xs">
              {user.role}
            </Badge>
          </div>
        </div>
        <div id="reported-users-flex-5" data-testId="reported-users-flex-5" className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 flex-shrink-0">
          <Badge className="bg-yellow-100 text-yellow-800 text-xs text-center">
            {user.warningPoints || 0} Warning(s)
          </Badge>

          {/* Show Warn button only if user has 3 or more warning points */}
          {user.warningPoints >= 3 && user.warningPoints < 5 && (
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() =>
                confirmAction("Warn user", "This will warn the user.", () =>
                  handleBan(user.id, user?.reportsAgainst?.[0]?.reportId),
                )
              }
            >
              <AlertTriangle className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Warn User</span>
              <span className="sm:hidden">Warn</span>
            </Button>
          )}

          {/* Show Ban button only if user has 10 or more warning points */}
          {user.warningPoints >= 10 && (
            <Button
              variant="destructive"
              size="sm"
              className="text-xs"
              onClick={() =>
                confirmAction("Ban this user", "This will ban the user.", () =>
                  handleBan(user?.id, user?.reportsAgainst?.[0]?.reportId),
                )
              }
            >
              <X className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
              <span className="hidden sm:inline">Ban User</span>
              <span className="sm:hidden">Ban</span>
            </Button>
          )}

          {/* Show Suspend button only if user has 5 or more warning points */}
          {user.warningPoints >= 5 && user.warningPoints < 10 && (
            <div id="reported-users-div-6" data-testId="reported-users-div-6">
              <Button
                variant="destructive"
                size="sm"
                className="text-xs"
                onClick={() =>
                  confirmAction(
                    "Suspend user",
                    "This will suspend the user.",
                    () =>
                      handleBan(user?.id, user?.reportsAgainst?.[0]?.reportId),
                  )
                }
              >
                <Ban className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Suspend User</span>
                <span className="sm:hidden">Suspend</span>
              </Button>
              <Button
                variant="secondary"
                size="sm"
                className="text-xs"
                onClick={() =>
                  confirmAction(
                    "Lift Suspension",
                    "This will lift the suspension to user.",
                    () => triggerLiftSuspension(user?.id),
                  )
                }
              >
                <Ban className="mr-1 h-3 w-3 sm:mr-2 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Lift Suspension</span>
                <span className="sm:hidden">Lift</span>
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReportedUsers;
