"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, MoreHorizontal, Eye, Check, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface RequestsProps {
  request: any;
  handleApprove: (req: any) => void;
  handleReject: (req: any) => void;
  handleViewDetails: (req: any) => void;
}

const RoleRequestList = ({
  request,
  handleApprove,
  handleReject,
  handleViewDetails,
}: RequestsProps) => {
  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "MODERATOR":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "EDITOR":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "STUDENT":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "APPROVED":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "REJECTED":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "PENDING":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };
  return (
    <div id="role-request-list-div-1" data-testId="role-request-list-div-1"
      key={request.request_id}
      className="border rounded-lg p-3 md:p-4 hover:bg-muted/50 transition-colors"
    >
      {/* Mobile Layout */}
      <div id="role-request-list-div-2" data-testId="role-request-list-div-2" className="block md:hidden space-y-3">
        {/* User Info */}
        <div id="role-request-list-flex-3" data-testId="role-request-list-flex-3" className="flex items-start space-x-3">
          <Avatar className="h-10 w-10 flex-shrink-0">
            <AvatarImage src={request.profileImage || "/placeholder.svg"} />
            <AvatarFallback className="text-sm">
              {request.firstName?.[0]}
              {request.lastName?.[0]}
            </AvatarFallback>
          </Avatar>
          <div id="role-request-list-div-4" data-testId="role-request-list-div-4" className="flex-1 min-w-0">
            <div id="role-request-list-flex-5" data-testId="role-request-list-flex-5" className="flex items-center gap-2 mb-1">
              <h3 className="font-semibold text-sm truncate">
                {request.firstName} {request.lastName}
              </h3>
              <Badge
                className={`${getStatusBadgeColor(
                  request.status
                )} text-xs px-2 py-0.5`}
                variant="secondary"
              >
                {request.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground truncate mb-2">
              {request.userEmail}
            </p>
            <div id="role-request-list-flex-6" data-testId="role-request-list-flex-6" className="flex items-center gap-1 text-xs mb-2">
              <Badge
                className={`${getRoleBadgeColor(
                  request.currentRole
                )} text-xs px-1.5 py-0.5`}
                variant="outline"
              >
                {request.currentRole}
              </Badge>
              <ArrowRight className="h-3 w-3 text-muted-foreground" />
              <Badge
                className={`${getRoleBadgeColor(
                  request.requestedRole
                )} text-xs px-1.5 py-0.5`}
                variant="outline"
              >
                {request.requestedRole}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">
              {new Date(request.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Reason */}
        <div id="role-request-list-div-7" data-testId="role-request-list-div-7" className="pl-0">
          <p className="text-xs text-muted-foreground line-clamp-2">
            <span className="font-medium">Reason:</span> {request.reason}
          </p>
        </div>

        {/* Actions */}
        <div id="role-request-list-flex-8" data-testId="role-request-list-flex-8" className="flex items-center justify-between pt-2 border-t">
          {request.status === "PENDING" ? (
            <div id="role-request-list-flex-9" data-testId="role-request-list-flex-9" className="flex gap-2 flex-1">
              <Button
                size="sm"
                variant="outline"
                className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent flex-1 text-xs h-8"
                onClick={() => handleApprove(request)}
              >
                <Check className="h-3 w-3 mr-1" />
                Approve
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent flex-1 text-xs h-8"
                onClick={() => handleReject(request)}
              >
                <X className="h-3 w-3 mr-1" />
                Reject
              </Button>
            </div>
          ) : (
            <div id="role-request-list-div-10" data-testId="role-request-list-div-10" className="flex-1" />
          )}

          <Button
            variant="ghost"
            size="sm"
            className="h-8 w-8 p-0 ml-2"
            onClick={() => handleViewDetails(request)}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Desktop Layout */}
      <div id="role-request-list-div-11" data-testId="role-request-list-div-11" className="hidden md:block">
        <div id="role-request-list-flex-12" data-testId="role-request-list-flex-12" className="flex items-center justify-between">
          <div id="role-request-list-flex-13" data-testId="role-request-list-flex-13" className="flex items-center space-x-4 flex-1">
            <Avatar className="h-12 w-12">
              <AvatarImage src={request.profileImage || "/placeholder.svg"} />
              <AvatarFallback>
                {request.firstName?.[0]}
                {request.lastName?.[0]}
              </AvatarFallback>
            </Avatar>

            <div id="role-request-list-div-14" data-testId="role-request-list-div-14" className="flex-1 min-w-0">
              <div id="role-request-list-flex-15" data-testId="role-request-list-flex-15" className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">
                  {request.firstName} {request.lastName}
                </h3>
                <Badge
                  className={getStatusBadgeColor(request.status)}
                  variant="secondary"
                >
                  {request.status}
                </Badge>
              </div>

              <p className="text-sm text-muted-foreground mb-2">
                {request.userEmail}
              </p>

              <div id="role-request-list-flex-16" data-testId="role-request-list-flex-16" className="flex items-center gap-2 text-sm">
                <Badge
                  className={getRoleBadgeColor(request.currentRole)}
                  variant="outline"
                >
                  {request.currentRole}
                </Badge>
                <ArrowRight className="h-4 w-4 text-muted-foreground" />
                <Badge
                  className={getRoleBadgeColor(request.requestedRole)}
                  variant="outline"
                >
                  {request.requestedRole}
                </Badge>
              </div>
            </div>
          </div>

          <div id="role-request-list-flex-17" data-testId="role-request-list-flex-17" className="flex items-center gap-2">
            <div id="role-request-list-div-18" data-testId="role-request-list-div-18" className="text-right text-sm text-muted-foreground mr-4">
              <p>{new Date(request.createdAt).toLocaleDateString()}</p>
            </div>

            {request.status === "PENDING" && (
              <div id="role-request-list-flex-19" data-testId="role-request-list-flex-19" className="flex gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="text-green-600 border-green-600 hover:bg-green-50 bg-transparent"
                  onClick={() => handleApprove(request)}
                >
                  <Check className="h-4 w-4 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  className="text-red-600 border-red-600 hover:bg-red-50 bg-transparent"
                  onClick={() => handleReject(request)}
                >
                  <X className="h-4 w-4 mr-1" />
                  Reject
                </Button>
              </div>
            )}

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => handleViewDetails(request)}>
                  <Eye className="mr-2 h-4 w-4" />
                  View Details
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div id="role-request-list-div-20" data-testId="role-request-list-div-20" className="mt-3 pl-16">
          <p className="text-sm text-muted-foreground line-clamp-2">
            <span className="font-medium">Reason:</span> {request.reason}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RoleRequestList;
