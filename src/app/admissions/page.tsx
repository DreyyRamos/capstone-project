"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
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
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Clock,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  Eye,
  Calendar,
  Mail,
  Phone,
  MapPin,
  GraduationCap,
  Building,
  FileText,
  ImageIcon,
} from "lucide-react";
import { useConfirmation } from "@/components/confirmation-provider";

// Mock data for pending user registrations
const pendingUsers = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@email.com",
    phone: "+1 (555) 123-4567",
    role: "student",
    studentId: "STU2024001",
    department: "Computer Science",
    yearLevel: "3rd Year",
    address: "123 Main St, City, State 12345",
    dateOfBirth: "1999-05-15",
    submittedAt: "2024-01-15T10:30:00Z",
    status: "pending",
    idVerificationImage:
      "/placeholder.svg?height=400&width=600&text=Student+ID+Card",
    documents: [
      { name: "Transcript", url: "#" },
      { name: "Birth Certificate", url: "#" },
    ],
    emergencyContact: {
      name: "Jane Doe",
      relationship: "Mother",
      phone: "+1 (555) 987-6543",
    },
  },
  {
    id: "2",
    firstName: "Sarah",
    lastName: "Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 234-5678",
    role: "teacher",
    employeeId: "EMP2024001",
    department: "Mathematics",
    position: "Assistant Professor",
    address: "456 Oak Ave, City, State 12345",
    dateOfBirth: "1985-08-22",
    submittedAt: "2024-01-14T14:20:00Z",
    status: "pending",
    idVerificationImage:
      "/placeholder.svg?height=400&width=600&text=Government+ID",
    documents: [
      { name: "Resume", url: "#" },
      { name: "Teaching License", url: "#" },
      { name: "Diploma", url: "#" },
    ],
    emergencyContact: {
      name: "Michael Johnson",
      relationship: "Spouse",
      phone: "+1 (555) 876-5432",
    },
  },
  {
    id: "3",
    firstName: "Mike",
    lastName: "Wilson",
    email: "mike.wilson@email.com",
    phone: "+1 (555) 345-6789",
    role: "moderator",
    employeeId: "MOD2024001",
    department: "Student Affairs",
    position: "Content Moderator",
    address: "789 Pine St, City, State 12345",
    dateOfBirth: "1990-12-03",
    submittedAt: "2024-01-13T09:15:00Z",
    status: "pending",
    idVerificationImage:
      "/placeholder.svg?height=400&width=600&text=Driver+License",
    documents: [
      { name: "Background Check", url: "#" },
      { name: "References", url: "#" },
    ],
    emergencyContact: {
      name: "Lisa Wilson",
      relationship: "Sister",
      phone: "+1 (555) 765-4321",
    },
  },
];

const stats = {
  total: pendingUsers.length,
  students: pendingUsers.filter((u) => u.role === "student").length,
  teachers: pendingUsers.filter((u) => u.role === "teacher").length,
  moderators: pendingUsers.filter((u) => u.role === "moderator").length,
};

export default function AdmissionsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [selectedUser, setSelectedUser] = useState<
    (typeof pendingUsers)[0] | null
  >(null);
  const { confirmApprove, confirmReject } = useConfirmation();

  const filteredUsers = pendingUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    return matchesSearch && matchesRole;
  });

  const handleApprove = (user: (typeof pendingUsers)[0]) => {
    confirmApprove(
      `${user.firstName} ${user.lastName}'s registration`,
      async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Approved user: ${user.firstName} ${user.lastName}`);
        // In real app, update user status and send notification
      }
    );
  };

  const handleReject = (user: (typeof pendingUsers)[0]) => {
    confirmReject(
      `${user.firstName} ${user.lastName}'s registration`,
      async () => {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1000));
        console.log(`Rejected user: ${user.firstName} ${user.lastName}`);
        // In real app, update user status and send notification
      }
    );
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "student":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "teacher":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "moderator":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Admissions</h1>
        <p className="text-muted-foreground">
          Review and approve pending user registrations
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Pending</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.total}</div>
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.students}</div>
            <p className="text-xs text-muted-foreground">
              Student applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Teachers</CardTitle>
            <Building className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.teachers}</div>
            <p className="text-xs text-muted-foreground">
              Faculty applications
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Moderators</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.moderators}</div>
            <p className="text-xs text-muted-foreground">Staff applications</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Filter Applications</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by name or email..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="student">Students</SelectItem>
                <SelectItem value="teacher">Teachers</SelectItem>
                <SelectItem value="moderator">Moderators</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <CardTitle>Pending Applications ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src="/placeholder.svg" />
                    <AvatarFallback>
                      {user.firstName[0]}
                      {user.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {user.firstName} {user.lastName}
                      </h3>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {user.email}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(user.submittedAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <Building className="h-3 w-3" />
                        {user.department}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedUser(user)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh]">
                      <DialogHeader>
                        <DialogTitle>Application Review</DialogTitle>
                        <DialogDescription>
                          Review {user.firstName} {user.lastName}'s registration
                          application
                        </DialogDescription>
                      </DialogHeader>
                      <ScrollArea className="max-h-[70vh]">
                        <div className="space-y-6 p-1">
                          {/* Personal Information */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Personal Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Full Name
                                </label>
                                <p>
                                  {user.firstName} {user.lastName}
                                </p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Email
                                </label>
                                <p className="flex items-center gap-1">
                                  <Mail className="h-3 w-3" />
                                  {user.email}
                                </p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Phone
                                </label>
                                <p className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {user.phone}
                                </p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Date of Birth
                                </label>
                                <p>
                                  {new Date(
                                    user.dateOfBirth
                                  ).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <label className="font-medium text-muted-foreground">
                                  Address
                                </label>
                                <p className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {user.address}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Role-specific Information */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              {user.role === "student"
                                ? "Academic"
                                : "Professional"}{" "}
                              Information
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Role
                                </label>
                                <Badge className={getRoleBadgeColor(user.role)}>
                                  {user.role}
                                </Badge>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Department
                                </label>
                                <p>{user.department}</p>
                              </div>
                              {user.role === "student" && (
                                <>
                                  <div>
                                    <label className="font-medium text-muted-foreground">
                                      Student ID
                                    </label>
                                    <p>{user.studentId}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium text-muted-foreground">
                                      Year Level
                                    </label>
                                    <p>{user.yearLevel}</p>
                                  </div>
                                </>
                              )}
                              {(user.role === "teacher" ||
                                user.role === "moderator") && (
                                <>
                                  <div>
                                    <label className="font-medium text-muted-foreground">
                                      Employee ID
                                    </label>
                                    <p>{user.employeeId}</p>
                                  </div>
                                  <div>
                                    <label className="font-medium text-muted-foreground">
                                      Position
                                    </label>
                                    <p>{user.position}</p>
                                  </div>
                                </>
                              )}
                            </div>
                          </div>

                          <Separator />

                          {/* ID Verification */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              ID Verification
                            </h3>
                            <div className="border rounded-lg p-4 bg-muted/20">
                              <div className="flex items-center gap-2 mb-3">
                                <ImageIcon className="h-4 w-4" />
                                <span className="font-medium">
                                  Uploaded ID Document
                                </span>
                              </div>
                              <div className="relative">
                                <img
                                  src={
                                    user.idVerificationImage ||
                                    "/placeholder.svg"
                                  }
                                  alt="ID Verification"
                                  className="w-full max-w-md mx-auto rounded border"
                                />
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Documents */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Supporting Documents
                            </h3>
                            <div className="space-y-2">
                              {user.documents.map((doc, index) => (
                                <div
                                  key={index}
                                  className="flex items-center gap-2 p-2 border rounded"
                                >
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span className="flex-1">{doc.name}</span>
                                  <Button variant="outline" size="sm">
                                    View
                                  </Button>
                                </div>
                              ))}
                            </div>
                          </div>

                          <Separator />

                          {/* Emergency Contact */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Emergency Contact
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Name
                                </label>
                                <p>{user.emergencyContact.name}</p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Relationship
                                </label>
                                <p>{user.emergencyContact.relationship}</p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Phone
                                </label>
                                <p className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {user.emergencyContact.phone}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                      <div className="flex justify-end gap-2 pt-4 border-t">
                        <Button
                          variant="outline"
                          onClick={() => handleReject(user)}
                        >
                          <XCircle className="h-4 w-4 mr-2" />
                          Reject
                        </Button>
                        <Button onClick={() => handleApprove(user)}>
                          <CheckCircle className="h-4 w-4 mr-2" />
                          Approve
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleReject(user)}
                  >
                    <XCircle className="h-4 w-4 mr-2" />
                    Reject
                  </Button>
                  <Button size="sm" onClick={() => handleApprove(user)}>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
            {filteredUsers.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No pending applications found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
