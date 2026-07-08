"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Search, Users, UserPlus } from "lucide-react";
import Cookies from "js-cookie";
import { useAdminQuery } from "@/hooks/useAdmin";
import { useConfirmationModal } from "@/hooks/use-confirmation-modal";
import { toast } from "sonner";
import UsersLoading from "./loading";
import UsersList from "@/components/users/users-list";
import Link from "next/link";
import { useRoleGate } from "@/utils/userRoleGate";

export default function UsersPage() {
  const token = Cookies.get("token") || "";
  useRoleGate(["ADMIN"], token);
  const { data: users, isLoading, refetch, updateRole } = useAdminQuery(token);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState("");
  const [reason, setReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { openModal: openConfirmation } = useConfirmationModal();

  const stats = [
    {
      label: "Total Users",
      value: users?.users?.length?.toString() || "0",
      icon: Users,
      change: "+12%",
    },
  ];

  const filteredUsers =
    users?.users?.filter((user: any) => {
      if (!user) return false;

      const matchesSearch =
        searchQuery === "" ||
        user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email?.toLowerCase().includes(searchQuery.toLowerCase());

      const userRole = user.role;
      const matchesRole = roleFilter === "all" || userRole.includes(roleFilter);

      const matchesStatus =
        statusFilter === "all" || user.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    }) || [];

  const handleEditPermissions = (user: any) => {
    setSelectedUser(user);
    setNewRole(user.role);
    setReason("");
    setIsEditRoleOpen(true);
  };

  const handleRoleUpdate = async (user: any) => {
    if (!selectedUser || !newRole || !reason.trim()) {
      toast.error("Please select a role and provide a reason");
      return;
    }

    setIsUpdating(true);
    try {
      await updateRole({ id: user.id, newRole });

      await refetch();

      toast.success(`User role updated to ${newRole} successfully!`);
      setIsEditRoleOpen(false);
      setSelectedUser(null);
      setNewRole("");
      setReason("");
    } catch (error) {
      console.error("Failed to update user role:", error);
      toast.error("Failed to update user role. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSuspendUser = (user: any) => {
    openConfirmation({
      title: "Suspend User",
      description: `Are you sure you want to suspend ${user.firstName} ${user.lastName}? They will lose access to the platform.`,
      confirmText: "Suspend",
      variant: "destructive",
      icon: "error",
      onConfirm: async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 1000));
          toast.success("User suspended successfully!");
          await refetch();
        } catch (error) {
          toast.error("Failed to suspend user.");
        }
      },
    });
  };

  if (isLoading) {
    return <UsersLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="space-y-6">
      {/* Header */}
      <div
        id="page-flex-2"
        data-testId="page-flex-2"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div id="page-div-3" data-testId="page-div-3">
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button asChild>
          <Link id="page-link-1" data-testId="page-link-1" href={"/admissions"}>
            <UserPlus className="mr-2 h-4 w-4" />
            User Admissions
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div
        id="page-grid-4"
        data-testId="page-grid-4"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div
                id="page-flex-5"
                data-testId="page-flex-5"
                className="flex items-center justify-between"
              >
                <div id="page-div-6" data-testId="page-div-6">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div
                  id="page-flex-7"
                  data-testId="page-flex-7"
                  className="flex items-center gap-2"
                >
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs text-green-600">
                    {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div
            id="page-flex-8"
            data-testId="page-flex-8"
            className="flex flex-col sm:flex-row gap-4"
          >
            <div
              id="page-div-9"
              data-testId="page-div-9"
              className="relative flex-1"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="ADMIN">Admin</SelectItem>
                <SelectItem value="MODERATOR">Moderator</SelectItem>
                <SelectItem value="STUDENT">Student</SelectItem>
                <SelectItem value="EDITOR">Editor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="WARNED">Warned</SelectItem>
                <SelectItem value="SUSPENDED">Suspended</SelectItem>
                <SelectItem value="BANNED">Banned</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="page-div-10" data-testId="page-div-10" className="space-y-4">
            {filteredUsers?.map((user: any) => (
              <UsersList
                key={user.id}
                user={user}
                handleEditPermissions={handleEditPermissions}
                handleSuspendUser={handleSuspendUser}
              />
            ))}

            {filteredUsers?.length === 0 && (
              <div
                id="page-div-11"
                data-testId="page-div-11"
                className="text-center py-12"
              >
                <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No users found</h3>
                <p className="text-muted-foreground">
                  {searchQuery || roleFilter !== "all" || statusFilter !== "all"
                    ? "Try adjusting your search or filters"
                    : "No users have been added yet"}
                </p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Edit Role Dialog */}
      <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Role</DialogTitle>
            <DialogDescription>
              Change the role for {selectedUser?.firstName}{" "}
              {selectedUser?.lastName}
            </DialogDescription>
          </DialogHeader>
          <div
            id="page-grid-12"
            data-testId="page-grid-12"
            className="grid gap-4 py-4"
          >
            <div
              id="page-grid-13"
              data-testId="page-grid-13"
              className="grid gap-2"
            >
              <Label htmlFor="role">New Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="STUDENT">Student</SelectItem>
                  <SelectItem value="EDITOR">Editor</SelectItem>
                  <SelectItem value="MODERATOR">Moderator</SelectItem>
                  <SelectItem value="ADMIN">Admin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div
              id="page-grid-14"
              data-testId="page-grid-14"
              className="grid gap-2"
            >
              <Label htmlFor="reason">Reason for change (optional)</Label>
              <Textarea
                id="reason"
                placeholder="Please provide a reason for this role change..."
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              id="page-button-1"
              data-testId="page-button-1"
              variant="outline"
              onClick={() => setIsEditRoleOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
              id="page-button-2"
              data-testId="page-button-2"
              onClick={() => handleRoleUpdate(selectedUser)}
              disabled={!newRole || !reason.trim() || isUpdating}
            >
              {isUpdating ? "Updating..." : "Update Role"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
