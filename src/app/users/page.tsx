"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  Users,
  UserPlus,
  MoreHorizontal,
  Mail,
  Shield,
  MessageSquare,
  BookOpen,
  TrendingUp,
  UserCheck,
  UserX,
  Crown,
} from "lucide-react";
import Cookies from "js-cookie";
import { useAdminQuery } from "@/hooks/useAdmin";
import { useConfirmationModal } from "@/hooks/use-confirmation-modal";
import { toast } from "sonner";
import UsersLoading from "./loading";

export default function UsersPage() {
  const token = Cookies.get("token") || "";
  const { data: users, isLoading, refetch, updateRole } = useAdminQuery(token);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Edit role modal state
  const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState("");
  const [reason, setReason] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);

  const { openModal: openConfirmation } = useConfirmationModal();

  console.log("user from admin side", users);

  const stats = [
    {
      label: "Total Users",
      value: users?.users?.length?.toString() || "0",
      icon: Users,
      change: "+12%",
    },
  ];

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

  console.log("selected user: ", selectedUser);

  const handleRoleUpdate = async (user: any) => {
    if (!selectedUser || !newRole || !reason.trim()) {
      toast.error("Please select a role and provide a reason");
      return;
    }

    setIsUpdating(true);
    try {
      // Simulate API call - replace with actual API call
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
          // Simulate API call
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">
            Manage users, roles, and permissions
          </p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="flex items-center gap-2">
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
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
          <div className="space-y-4">
            {filteredUsers?.map((user: any) => (
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
                          className={
                            roleColors[user.role as keyof typeof roleColors]
                          }
                          // size="sm"
                        >
                          {user.role}
                        </Badge>
                        <Badge
                          className={
                            statusColors[
                              user.status as keyof typeof statusColors
                            ]
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
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleEditPermissions(user)}
                      >
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
            ))}

            {filteredUsers?.length === 0 && (
              <div className="text-center py-12">
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
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
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
            <div className="grid gap-2">
              <Label htmlFor="reason">Reason for change</Label>
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
              variant="outline"
              onClick={() => setIsEditRoleOpen(false)}
              disabled={isUpdating}
            >
              Cancel
            </Button>
            <Button
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



// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Textarea } from "@/components/ui/textarea";
// import { Label } from "@/components/ui/label";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Search,
//   Users,
//   UserPlus,
//   MoreHorizontal,
//   Mail,
//   Shield,
//   MessageSquare,
//   BookOpen,
//   TrendingUp,
//   UserCheck,
//   UserX,
//   Crown,
// } from "lucide-react";
// import Cookies from "js-cookie";
// import { useAdminQuery } from "@/hooks/useAdmin";
// import { useConfirmationModal } from "@/hooks/use-confirmation-modal";
// import { toast } from "sonner";
// import UsersLoading from "./loading";

// export default function UsersPage() {
//   const token = Cookies.get("token") || "";
//   const { data: users, isLoading, refetch, updateRole } = useAdminQuery(token);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [roleFilter, setRoleFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   // Edit role modal state
//   const [isEditRoleOpen, setIsEditRoleOpen] = useState(false);
//   const [selectedUser, setSelectedUser] = useState<any>(null);
//   const [newRole, setNewRole] = useState("");
//   const [reason, setReason] = useState("");
//   const [isUpdating, setIsUpdating] = useState(false);

//   const { openModal: openConfirmation } = useConfirmationModal();

//   console.log("user from admin side", users);

//   const stats = [
//     {
//       label: "Total Users",
//       value: users?.users?.length?.toString() || "0",
//       icon: Users,
//       change: "+12%",
//     },
//   ];

//   const roleColors = {
//     ADMIN: "bg-red-100 text-red-800",
//     MODERATOR: "bg-blue-100 text-blue-800",
//     STUDENT: "bg-green-100 text-green-800",
//     EDITOR: "bg-purple-100 text-purple-800",
//   };

//   const statusColors = {
//     ACTIVE: "bg-green-200 text-green-800",
//     WARNED: "bg-yellow-100 text-gray-800",
//     SUSPENDED: "bg-red-100 text-red-800",
//     BANNED: "bg-red-300 text-red-800",
//   };

//   const filteredUsers =
//     users?.users?.filter((user: any) => {
//       if (!user) return false;

//       const matchesSearch =
//         searchQuery === "" ||
//         user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
//         user.email?.toLowerCase().includes(searchQuery.toLowerCase());

//       const userRole = user.role;
//       const matchesRole = roleFilter === "all" || userRole.includes(roleFilter);

//       const matchesStatus =
//         statusFilter === "all" || user.status === statusFilter;

//       return matchesSearch && matchesRole && matchesStatus;
//     }) || [];

//   const handleEditPermissions = (user: any) => {
//     setSelectedUser(user);
//     setNewRole(user.role);
//     setReason("");
//     setIsEditRoleOpen(true);
//   };

//   console.log("selected user: ", selectedUser);

//   const handleRoleUpdate = async (user: any) => {
//     if (!selectedUser || !newRole || !reason.trim()) {
//       toast.error("Please select a role and provide a reason");
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       // Simulate API call - replace with actual API call
//       await updateRole({ id: user.id, newRole });

//       await refetch();

//       toast.success(`User role updated to ${newRole} successfully!`);
//       setIsEditRoleOpen(false);
//       setSelectedUser(null);
//       setNewRole("");
//       setReason("");
//     } catch (error) {
//       console.error("Failed to update user role:", error);
//       toast.error("Failed to update user role. Please try again.");
//     } finally {
//       setIsUpdating(false);
//     }
//   };

//   const handleSuspendUser = (user: any) => {
//     openConfirmation({
//       title: "Suspend User",
//       description: `Are you sure you want to suspend ${user.firstName} ${user.lastName}? They will lose access to the platform.`,
//       confirmText: "Suspend",
//       variant: "destructive",
//       icon: "error",
//       onConfirm: async () => {
//         try {
//           // Simulate API call
//           await new Promise((resolve) => setTimeout(resolve, 1000));
//           toast.success("User suspended successfully!");
//           await refetch();
//         } catch (error) {
//           toast.error("Failed to suspend user.");
//         }
//       },
//     });
//   };

//   if (isLoading) {
//     return <UsersLoading />;
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">User Management</h1>
//           <p className="text-muted-foreground">
//             Manage users, roles, and permissions
//           </p>
//         </div>
//         <Button>
//           <UserPlus className="mr-2 h-4 w-4" />
//           Add User
//         </Button>
//       </div>

//       {/* Stats */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//         {stats.map((stat, index) => (
//           <Card key={index}>
//             <CardContent className="p-6">
//               <div className="flex items-center justify-between">
//                 <div>
//                   <p className="text-2xl font-bold">{stat.value}</p>
//                   <p className="text-sm text-muted-foreground">{stat.label}</p>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <stat.icon className="h-5 w-5 text-muted-foreground" />
//                   <Badge variant="secondary" className="text-xs text-green-600">
//                     {stat.change}
//                   </Badge>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>

//       {/* Filters */}
//       <Card>
//         <CardContent className="p-6">
//           <div className="flex flex-col sm:flex-row gap-4">
//             <div className="relative flex-1">
//               <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//               <Input
//                 placeholder="Search users..."
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 className="pl-10"
//               />
//             </div>
//             <Select value={roleFilter} onValueChange={setRoleFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <SelectValue placeholder="Filter by role" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Roles</SelectItem>
//                 <SelectItem value="ADMIN">Admin</SelectItem>
//                 <SelectItem value="MODERATOR">Moderator</SelectItem>
//                 <SelectItem value="STUDENT">Student</SelectItem>
//                 <SelectItem value="EDITOR">Editor</SelectItem>
//               </SelectContent>
//             </Select>
//             <Select value={statusFilter} onValueChange={setStatusFilter}>
//               <SelectTrigger className="w-full sm:w-48">
//                 <SelectValue placeholder="Filter by status" />
//               </SelectTrigger>
//               <SelectContent>
//                 <SelectItem value="all">All Status</SelectItem>
//                 <SelectItem value="ACTIVE">Active</SelectItem>
//                 <SelectItem value="WARNED">Warned</SelectItem>
//                 <SelectItem value="SUSPENDED">Suspended</SelectItem>
//                 <SelectItem value="BANNED">Banned</SelectItem>
//               </SelectContent>
//             </Select>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Users Table */}
//       <Card>
//         <CardHeader>
//           <CardTitle>Users ({filteredUsers?.length})</CardTitle>
//         </CardHeader>
//         <CardContent>
//           <div className="space-y-4">
//             {filteredUsers?.map((user: any) => (
//               <div
//                 key={user.id}
//                 className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50"
//               >
//                 <div className="flex items-center gap-4">
//                   <Avatar className="h-12 w-12">
//                     <AvatarImage
//                       src={user.profileImage || "/placeholder.svg"}
//                       alt={user.firstName}
//                     />
//                     <AvatarFallback>
//                       {user.firstName
//                         .split(" ")
//                         .map((n: any) => n[0])
//                         .join("")}
//                     </AvatarFallback>
//                   </Avatar>
//                   <div>
//                     <div className="flex items-center gap-2">
//                       <h3 className="font-semibold">
//                         {user.firstName} {user.lastName}
//                       </h3>
//                       <Badge
//                         className={
//                           roleColors[user.role as keyof typeof roleColors]
//                         }
//                       >
//                         {user.role}
//                       </Badge>
//                       <Badge
//                         className={
//                           statusColors[user.status as keyof typeof statusColors]
//                         }
//                       >
//                         {user.status}
//                       </Badge>
//                     </div>
//                     <p className="text-sm text-muted-foreground">
//                       {user.email}
//                     </p>
//                     <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
//                       <span>
//                         Joined {new Date(user.createdAt).toLocaleDateString()}
//                       </span>
//                       <span>•</span>
//                       <span>Last active {user.lastActive || "Recently"}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="flex items-center gap-6">
//                   <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
//                     <div className="flex items-center gap-1">
//                       <BookOpen className="h-4 w-4" />
//                       {user._count?.publications || 0}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <MessageSquare className="h-4 w-4" />
//                       {user._count?.forums || 0}
//                     </div>
//                     <div className="flex items-center gap-1">
//                       <TrendingUp className="h-4 w-4" />
//                       {user.reputation || 0}
//                     </div>
//                   </div>

//                   <DropdownMenu>
//                     <DropdownMenuTrigger asChild>
//                       <Button variant="ghost" size="icon">
//                         <MoreHorizontal className="h-4 w-4" />
//                       </Button>
//                     </DropdownMenuTrigger>
//                     <DropdownMenuContent align="end">
//                       <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem>
//                         <Mail className="mr-2 h-4 w-4" />
//                         Send Message
//                       </DropdownMenuItem>
//                       <DropdownMenuItem
//                         onClick={() => handleEditPermissions(user)}
//                       >
//                         <Shield className="mr-2 h-4 w-4" />
//                         Edit Permissions
//                       </DropdownMenuItem>
//                       <DropdownMenuSeparator />
//                       <DropdownMenuItem
//                         className="text-red-600"
//                         onClick={() => handleSuspendUser(user)}
//                       >
//                         <UserX className="mr-2 h-4 w-4" />
//                         Suspend User
//                       </DropdownMenuItem>
//                     </DropdownMenuContent>
//                   </DropdownMenu>
//                 </div>
//               </div>
//             ))}

//             {filteredUsers?.length === 0 && (
//               <div className="text-center py-12">
//                 <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//                 <h3 className="text-lg font-semibold mb-2">No users found</h3>
//                 <p className="text-muted-foreground">
//                   {searchQuery || roleFilter !== "all" || statusFilter !== "all"
//                     ? "Try adjusting your search or filters"
//                     : "No users have been added yet"}
//                 </p>
//               </div>
//             )}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Edit Role Dialog */}
//       <Dialog open={isEditRoleOpen} onOpenChange={setIsEditRoleOpen}>
//         <DialogContent className="sm:max-w-[425px]">
//           <DialogHeader>
//             <DialogTitle>Edit User Role</DialogTitle>
//             <DialogDescription>
//               Change the role for {selectedUser?.firstName}{" "}
//               {selectedUser?.lastName}
//             </DialogDescription>
//           </DialogHeader>
//           <div className="grid gap-4 py-4">
//             <div className="grid gap-2">
//               <Label htmlFor="role">New Role</Label>
//               <Select value={newRole} onValueChange={setNewRole}>
//                 <SelectTrigger>
//                   <SelectValue placeholder="Select a role" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="STUDENT">Student</SelectItem>
//                   <SelectItem value="EDITOR">Editor</SelectItem>
//                   <SelectItem value="MODERATOR">Moderator</SelectItem>
//                   <SelectItem value="ADMIN">Admin</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//             <div className="grid gap-2">
//               <Label htmlFor="reason">Reason for change</Label>
//               <Textarea
//                 id="reason"
//                 placeholder="Please provide a reason for this role change..."
//                 value={reason}
//                 onChange={(e) => setReason(e.target.value)}
//                 rows={3}
//               />
//             </div>
//           </div>
//           <DialogFooter>
//             <Button
//               variant="outline"
//               onClick={() => setIsEditRoleOpen(false)}
//               disabled={isUpdating}
//             >
//               Cancel
//             </Button>
//             <Button
//               onClick={() => handleRoleUpdate(selectedUser)}
//               disabled={!newRole || !reason.trim() || isUpdating}
//             >
//               {isUpdating ? "Updating..." : "Update Role"}
//             </Button>
//           </DialogFooter>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }