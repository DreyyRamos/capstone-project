"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  MoreHorizontal,
  User,
  Shield,
  MessageSquare,
  BookOpen,
  TrendingUp,
  UserX,
} from "lucide-react";

interface UserProps {
  user: any;
  handleEditPermissions: (user: any) => void;
  handleSuspendUser: (user: any) => void;
}

const UsersList = ({
  user,
  handleEditPermissions,
  handleSuspendUser,
}: UserProps) => {
  const roleColors = {
    ADMIN: "bg-red-100 text-red-800",
    MODERATOR: "bg-blue-100 text-blue-800",
    STUDENT: "bg-green-100 text-green-800",
    EDITOR: "bg-purple-100 text-purple-800",
  };

  const statusColors = {
    ACTIVE: "bg-green-200 text-green-800",
    WARNED: "bg-yellow-100 text-gray-800",
    SUSPENDED: "bg-red-100 text-red-800",
    BANNED: "bg-red-300 text-red-800",
  };
  return (
    <div
      key={user.id}
      className="flex items-center justify-between p-3 sm:p-4 border rounded-lg hover:bg-muted/50"
    >
      <div className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1">
        <Avatar className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0">
          <AvatarImage
            src={user.profileImage || "/placeholder.svg"}
            alt={user.firstName}
          />
          <AvatarFallback>
            {user.firstName
              .split(" ")
              .map((n: any) => n[0])
              .join("")}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1">
            <h3 className="font-semibold text-sm sm:text-base truncate">
              {user.firstName} {user.lastName}
            </h3>
            <div className="flex flex-wrap gap-1">
              <Badge
                className={roleColors[user.role as keyof typeof roleColors]}
                // size="sm"
              >
                {user.role}
              </Badge>
              <Badge
                className={
                  statusColors[user.status as keyof typeof statusColors]
                }
                // size="sm"
              >
                {user.status}
              </Badge>
            </div>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {user.email}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-4 text-xs text-muted-foreground mt-1">
            <span className="truncate">
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </span>
            <span className="hidden sm:inline">•</span>
            <span className="truncate">
              Last active {user.lastActive || "Recently"}
            </span>
          </div>

          {/* Mobile stats - show only on small screens */}
          <div className="flex sm:hidden items-center gap-3 text-xs text-muted-foreground mt-2">
            <div className="flex items-center gap-1">
              <BookOpen className="h-3 w-3" />
              <span>{user._count?.publications || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <MessageSquare className="h-3 w-3" />
              <span>{user._count?.forums || 0}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="h-3 w-3" />
              <span>{user.reputation || 0}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-6 flex-shrink-0">
        {/* Desktop stats - show only on larger screens */}
        <div className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <BookOpen className="h-4 w-4" />
            <span>{user._count?.publications || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <MessageSquare className="h-4 w-4" />
            <span>{user._count?.forums || 0}</span>
          </div>
          <div className="flex items-center gap-1">
            <TrendingUp className="h-4 w-4" />
            <span>{user.reputation || 0}</span>
          </div>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 sm:h-10 sm:w-10"
            >
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={`/visit/user/${user.id}`}>
                <User className="mr-2 h-4 w-4" />
                Visit Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleEditPermissions(user)}>
              <Shield className="mr-2 h-4 w-4" />
              Edit Permissions
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => handleSuspendUser(user)}
            >
              <UserX className="mr-2 h-4 w-4" />
              Suspend User
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default UsersList;
