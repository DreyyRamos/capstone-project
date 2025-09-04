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
import { useConfirmationModal } from "@/hooks/use-confirmation-modal";
import Cookies from "js-cookie";
import { useAdminRoleChangeRequestsQuery } from "@/hooks/useAdmin";

// interface RoleRequest {
//   id: string;
//   userId: string;
//   userName: string;
//   userEmail: string;
//   userPhone?: string;
//   userLocation?: string;
//   userAvatar?: string;
//   currentRole: string;
//   requestedRole: string;
//   reason: string;
//   additionalInfo?: string;
//   status: "PENDING" | "APPROVED" | "REJECTED";
//   requestDate: string;
//   updatedAt: string;
// }

export default function RoleRequestsPage() {
  const token = Cookies.get("token") || "";
  const { data: roleChangeRequests } = useAdminRoleChangeRequestsQuery(token);
  console.log("requests from role change", roleChangeRequests?.roleRequests);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { openModal } = useConfirmationModal();

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
    total: roleChangeRequests?.roleRequests.length,
    pending: roleChangeRequests?.roleRequests.filter(
      (r: any) => r.status === "PENDING"
    ).length,
    approved: roleChangeRequests?.roleRequests.filter(
      (r: any) => r.status === "APPROVED"
    ).length,
    rejected: roleChangeRequests?.roleRequests.filter(
      (r: any) => r.status === "REJECTED"
    ).length,
  };

  const handleApprove = (request: any) => {
    openModal({
      title: "Approve Role Request",
      description: `Are you sure you want to approve ${request.userName}'s request to become a ${request.requestedRole}?`,
      confirmText: "Approve",
      variant: "success",
      icon: "success",
      onConfirm: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        //   setRequests((prev: any) =>
        //     prev.map((r: any) =>
        //       r.id === request.id
        //         ? {
        //             ...r,
        //             status: "approved" as const,
        //             updatedAt: new Date().toISOString(),
        //           }
        //         : r
        //     )
        //   );
        // },
      },
    });
  };

  const handleReject = (request: any) => {
    openModal({
      title: "Reject Role Request",
      description: `Are you sure you want to reject ${request.userName}'s request to become a ${request.requestedRole}?`,
      confirmText: "Reject",
      variant: "destructive",
      icon: "error",
      onConfirm: async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));

        // setRequests((prev: any) =>
        //   prev.map((r: any) =>
        //     r.id === request.id
        //       ? {
        //           ...r,
        //           status: "rejected" as const,
        //           updatedAt: new Date().toISOString(),
        //         }
        //       : r
        //   )
        // );
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
      case "approved":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "rejected":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Role Change Requests</h1>
          <p className="text-muted-foreground">
            Review and manage user role change requests
          </p>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <UserCog className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">{stats.total}</p>
                <p className="text-sm text-muted-foreground">Total Requests</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.pending}</p>
                <p className="text-sm text-muted-foreground">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <CheckCircle className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.approved}</p>
                <p className="text-sm text-muted-foreground">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <XCircle className="h-5 w-5 text-red-600" />
              <div>
                <p className="text-2xl font-bold">{stats.rejected}</p>
                <p className="text-sm text-muted-foreground">Rejected</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  placeholder="Search by name, email, or requested role..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>

            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader>
          <CardTitle>Role Change Requests</CardTitle>
          <CardDescription>
            {filteredRequests?.length} request
            {filteredRequests?.length !== 1 ? "s" : ""} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredRequests?.map((request: any) => (
              <div
                key={request.request_id}
                className="border rounded-lg p-4 hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={request.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {request.firstName
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>

                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
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

                      <div className="flex items-center gap-2 text-sm">
                        <Badge
                          className={getRoleBadgeColor(request.currentRole)}
                          variant="outline"
                        >
                          {request.currentRole.charAt(0).toUpperCase() +
                            request.currentRole.slice(1)}
                        </Badge>
                        <ArrowRight className="h-4 w-4 text-muted-foreground" />
                        <Badge
                          className={getRoleBadgeColor(request.requestedRole)}
                          variant="outline"
                        >
                          {request.requestedRole.charAt(0).toUpperCase() +
                            request.requestedRole.slice(1)}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <div className="text-right text-sm text-muted-foreground mr-4">
                      <p>{new Date(request.createdAt).toLocaleDateString()}</p>
                    </div>

                    {request.status === "PENDING" && (
                      <div className="flex gap-2">
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
                        <DropdownMenuItem
                          onClick={() => handleViewDetails(request)}
                        >
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="mt-3 pl-16">
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    <span className="font-medium">Reason:</span>{" "}
                    {request.reason}
                  </p>
                </div>
              </div>
            ))}

            {filteredRequests?.length === 0 && (
              <div className="text-center py-12">
                <UserCog className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">
                  No requests found
                </h3>
                <p className="text-muted-foreground">
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
        <DialogContent className="max-w-2xl max-h-[90vh]">
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
                        {selectedRequest.firstName
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
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

                {/* Role Change Information */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">
                    Requester Other Details
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Publications that published.
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.currentRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.user?._count?.publications}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Forums created
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.requestedRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.user?._count?.forums}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Warning(s).
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.currentRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.user?.warningPoints}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Account Status.
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.currentRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.user?.status}
                      </Badge>
                    </div>
                    {/* Copy tong nasa baba pag may idadagdag na details ng user sa request prolly reputation points or something like that. */}
                    {/* <div>
                      <p className="text-sm font-medium text-muted-foreground mb-1">
                        Account Status.
                      </p>
                      <Badge
                        className={getRoleBadgeColor(
                          selectedRequest.currentRole
                        )}
                        variant="outline"
                      >
                        {selectedRequest.user?.status}
                      </Badge>
                    </div> */}
                  </div>

                  <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">
                      Status
                    </p>
                    <Badge
                      className={getStatusBadgeColor(selectedRequest.status)}
                      variant="secondary"
                    >
                      {selectedRequest.status.charAt(0).toUpperCase() +
                        selectedRequest.status.slice(1)}
                    </Badge>
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
                        {selectedRequest.currentRole.charAt(0).toUpperCase() +
                          selectedRequest.currentRole.slice(1)}
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
                        {selectedRequest.requestedRole.charAt(0).toUpperCase() +
                          selectedRequest.requestedRole.slice(1)}
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
                      {selectedRequest.status.charAt(0).toUpperCase() +
                        selectedRequest.status.slice(1)}
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
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="font-medium text-muted-foreground mb-1">
                        Request Date
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(selectedRequest.createdAt).toLocaleString()}
                      </div>
                    </div>
                    {/* <div>
                      <p className="font-medium text-muted-foreground mb-1">
                        Last Updated
                      </p>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        {new Date(selectedRequest.updatedAt).toLocaleString()}
                      </div>
                    </div> */}
                  </div>
                </div>

                {/* Actions */}
                {selectedRequest.status === "PENDING" && (
                  <>
                    <Separator />
                    <div className="flex gap-2 pt-4">
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
