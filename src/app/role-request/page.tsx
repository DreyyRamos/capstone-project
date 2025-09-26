"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Search,
  UserCog,
  CheckCircle,
  XCircle,
  Clock,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Cookies from "js-cookie";
import { useAdminRoleChangeRequestsQuery } from "@/hooks/useAdmin";
import { useConfirmation } from "@/components/confirmation-provider";
import { toast } from "sonner";
import RoleRequestsLoading from "./loading";
import RoleRequestList from "@/components/role-requests/role-request-list";

export default function RoleRequestsPage() {
  const token = Cookies.get("token") || "";
  const {
    data: roleChangeRequests,
    isLoading,
    approveRoleChange,
    rejectRoleChange,
  } = useAdminRoleChangeRequestsQuery(token);
  console.log("requests from role change", roleChangeRequests?.roleRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openModal } = useConfirmation();

  // Filter requests based on search and filters
  const filteredRequests = roleChangeRequests?.roleRequests?.filter(
    (request: any) => {
      const matchesSearch =
        request.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.requestedRole.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || request.status === statusFilter;
      const matchesRole =
        roleFilter === "all" || request.requestedRole === roleFilter;

      return matchesSearch && matchesStatus && matchesRole;
    }
  );

  // Calculate statistics
  const stats = {
    total: roleChangeRequests?.roleRequests.length || 0,
    pending:
      roleChangeRequests?.roleRequests.filter(
        (r: any) => r.status === "PENDING"
      ).length || 0,
    approved:
      roleChangeRequests?.roleRequests.filter(
        (r: any) => r.status === "APPROVED"
      ).length || 0,
    rejected:
      roleChangeRequests?.roleRequests.filter(
        (r: any) => r.status === "REJECTED"
      ).length || 0,
  };

  const handleApprove = (request: any) => {
    openModal({
      title: "Approve Role Request",
      description: `Are you sure you want to approve ${request.firstName} ${request.lastName}'s request to become ${request.requestedRole}?`,
      confirmText: "Approve",
      variant: "success",
      icon: "success",
      onConfirm: async () => {
        // Simulate API call
        await approveRoleChange(request?.request_id);
        toast("Role change request approved!");
      },
    });
  };

  const handleReject = (request: any) => {
    openModal({
      title: "Reject Role Request",
      description: `Are you sure you want to reject ${request.firstName} ${request.lastName}'s request to become ${request.requestedRole}?`,
      confirmText: "Reject",
      variant: "destructive",
      icon: "error",
      onConfirm: async () => {
        // Simulate API call
        await rejectRoleChange(request?.request_id);
        toast("Role change request rejected!");
      },
    });
  };

  const handleViewDetails = (request: any) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

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

  if (isLoading) {
    return <RoleRequestsLoading />;
  }

  return (
    <div className="space-y-4 md:space-y-6 p-4 md:p-0">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl md:text-3xl font-bold">Role Change Requests</h1>
        <p className="text-sm md:text-base text-muted-foreground">
          Review and manage user role change requests
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="p-4 md:pt-6">
            <div className="flex items-center space-x-2">
              <UserCog className="h-4 w-4 md:h-5 md:w-5 text-blue-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg md:text-2xl font-bold">{stats.total}</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  Total Requests
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 md:h-5 md:w-5 text-yellow-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg md:text-2xl font-bold">{stats.pending}</p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  Pending
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg md:text-2xl font-bold">
                  {stats.approved}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  Approved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4 md:pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-4 w-4 md:h-5 md:w-5 text-red-600 flex-shrink-0" />
              <div className="min-w-0">
                <p className="text-lg md:text-2xl font-bold">
                  {stats.rejected}
                </p>
                <p className="text-xs md:text-sm text-muted-foreground truncate">
                  Rejected
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:pt-6">
          <div className="space-y-3 md:space-y-0 md:flex md:flex-row md:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 md:flex md:gap-4">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="PENDING">Pending</SelectItem>
                  <SelectItem value="APPROVED">Approved</SelectItem>
                  <SelectItem value="REJECTED">Rejected</SelectItem>
                </SelectContent>
              </Select>

              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="MODERATOR">Moderator</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <CardTitle className="text-lg md:text-xl">
            Role Change Requests
          </CardTitle>
          <CardDescription className="text-sm">
            {filteredRequests?.length || 0} request
            {filteredRequests?.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div className="space-y-3 md:space-y-4">
            {filteredRequests?.map((request: any) => (
              <RoleRequestList
                key={request.request_id}
                request={request}
                handleApprove={handleApprove}
                handleReject={handleReject}
                handleViewDetails={handleViewDetails}
              />
            ))}

            {filteredRequests?.length === 0 && (
              <div className="text-center py-8 md:py-12">
                <UserCog className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-base md:text-lg font-semibold mb-2">
                  No requests found
                </h3>
                <p className="text-sm text-muted-foreground">
                  {searchTerm || statusFilter !== "all" || roleFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No role change requests have been submitted yet"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] mx-4">
          <DialogHeader>
            <DialogTitle>Role Change Request Details</DialogTitle>
            <DialogDescription>
              Review the complete information for this role change request
            </DialogDescription>
          </DialogHeader>

          {selectedRequest && (
            <ScrollArea className="max-h-[60vh]">
              <div className="space-y-6">
                {/* User Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">User Information</h3>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16">
                      <AvatarImage
                        src={selectedRequest.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-lg">
                        {selectedRequest.firstName?.[0]}
                        {selectedRequest.lastName?.[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="space-y-1">
                      <h4 className="text-xl font-semibold">
                        {selectedRequest.firstName} {selectedRequest.lastName}
                      </h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Mail className="h-4 w-4" />
                        {selectedRequest.email}
                      </div>
                      {selectedRequest.userPhone && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Phone className="h-4 w-4" />
                          {selectedRequest.userPhone}
                        </div>
                      )}
                      {selectedRequest.userLocation && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          {selectedRequest.userLocation}
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <Separator />

                {/* User Stats */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    User Other Informations
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Publications
                      </p>
                      <Badge variant="outline">
                        {selectedRequest.user?._count?.publications || 0}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Forums Created
                      </p>
                      <Badge variant="outline">
                        {selectedRequest.user?._count?.forums || 0}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Warning Points
                      </p>
                      <Badge variant="outline">
                        {selectedRequest.user?.warningPoints || 0}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Reputation Points
                      </p>
                      <Badge variant="outline">
                        {selectedRequest.user?.reputationPoints || 0} Points
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Account Status
                      </p>
                      <Badge variant="outline">
                        {selectedRequest.user?.status || "ACTIVE"}
                      </Badge>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Role Change Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Role Change Request</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Current Role
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.currentRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.currentRole}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Requested Role
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.requestedRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.requestedRole}
                      </Badge>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Status
                    </p>
                    <Badge
                      className={getStatusBadgeColor(selectedRequest.status)}
                      variant="secondary"
                    >
                      {selectedRequest.status}
                    </Badge>
                  </div>
                </div>

                <Separator />

                {/* Request Details */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Request Details</h3>
                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-2">
                      Reason for Role Change
                    </p>
                    <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">
                      {selectedRequest.reason}
                    </p>
                  </div>

                  {selectedRequest.additionalInformation && (
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-2">
                        Additional Information
                      </p>
                      <p className="text-sm leading-relaxed bg-muted p-3 rounded-lg">
                        {selectedRequest.additionalInformation}
                      </p>
                    </div>
                  )}
                </div>

                <Separator />

                {/* Timestamps */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Timeline</h3>
                  <div className="grid grid-cols-1 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">
                        Request Date
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                {selectedRequest.status === "PENDING" && (
                  <>
                    <Separator />
                    <div className="flex flex-col sm:flex-row gap-2 pt-4">
                      <Button
                        className="flex-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          handleApprove(selectedRequest);
                        }}
                      >
                        <Check className="h-4 w-4 mr-2" />
                        Approve Request
                      </Button>
                      <Button
                        variant="destructive"
                        className="flex-1"
                        onClick={() => {
                          setIsModalOpen(false);
                          handleReject(selectedRequest);
                        }}
                      >
                        <X className="h-4 w-4 mr-2" />
                        Reject Request
                      </Button>
                    </div>
                  </>
                )}
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
