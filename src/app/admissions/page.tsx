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
  Phone,
  MapPin,
  GraduationCap,
  Building,
  ImageIcon,
  Heart,
} from "lucide-react";
import { useConfirmation } from "@/components/confirmation-provider";
import Cookies from "js-cookie";
import { useAdminUserAdmissionsQuery } from "@/hooks/useAdmin";
import type { Role, AdmissionStatus } from "@/generated/prisma";
import EmailTrigger from "@/components/email-trigger";
import { toast } from "sonner";

interface Admission {
  admission_id: string;
  user_email: string;
  firstName: string;
  lastName: string;
  password: string;
  profileImage: string;
  id_picture: string;
  bio: string;
  contactNumber: string;
  location: string;
  interests: string[];
  role: Role;
  createdAt: Date;
  status: AdmissionStatus;
}

export default function AdmissionsPage() {
  const token = Cookies.get("token") || "";
  const {
    data: pendingAdmissions,
    approveUser,
    rejectUser,
  } = useAdminUserAdmissionsQuery(token);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [_selectedAdmission, setSelectedAdmission] = useState<
    (typeof pendingAdmissions)[0] | null
  >(null);
  const { confirmApprove, confirmReject } = useConfirmation();

  const filteredAdmissions = pendingAdmissions?.users?.filter(
    (admission: Admission) => {
      const fullName = `${admission.firstName} ${
        admission.lastName || ""
      }`.trim();
      const matchesSearch =
        fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        admission.user_email.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesRole = roleFilter === "all" || admission.role === roleFilter;

      return matchesSearch && matchesRole;
    }
  );

  const handleApprove = (admission: Admission) => {
    const displayName = `${admission.firstName} ${admission.lastName || ""}`;
    confirmApprove(`${displayName}'s admission application`, async () => {
      await approveUser(
        {
          admission_id: admission.admission_id,
          user_email: admission.user_email,
          firstName: admission.firstName,
          lastName: admission.lastName,
          password: admission.password,
          profileImage: admission.profileImage,
          id_picture: admission.id_picture,
          bio: admission.bio,
          contactNumber: admission.contactNumber,
          location: admission.location,
          interests: admission.interests,
        },
        {
          onSuccess: () => {
            // runs after the server call succeeds
            setSubmitSuccess(true);
          },
        }
      );
    });
  };

  const handleReject = (admission: (typeof pendingAdmissions)[0]) => {
    const displayName = `${admission.firstName} ${admission.lastName || ""}`;
    confirmReject(`${displayName}'s admission application`, async () => {
      await rejectUser(admission.admission_id);
      toast(
        `Rejected admission for ${displayName}, Admission ID: ${admission.admission_id}`
      );
      console.log(`Rejected admission: ${admission.admission_id}`);
    });
  };

  const getRoleBadgeColor = (role: Role) => {
    switch (role) {
      case "STUDENT":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "MODERATOR":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "ADMIN":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200";
      case "EDITOR":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusBadgeColor = (status: AdmissionStatus) => {
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">User Admissions</h1>
        <p className="text-muted-foreground">
          Review and approve pending admission applications
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
            {/* <div className="text-2xl font-bold">{stats.total}</div> */}
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Students</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{stats.students}</div> */}
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
            {/* <div className="text-2xl font-bold">{stats.teachers}</div> */}
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
            {/* <div className="text-2xl font-bold">{stats.moderators}</div> */}
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
          <CardTitle>Applications ({filteredAdmissions?.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredAdmissions?.map((admission: Admission) => (
              <div
                key={admission.admission_id}
                className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage
                      src={admission.profileImage || "/placeholder.svg"}
                    />
                    <AvatarFallback>
                      {admission.firstName[0]}
                      {admission.lastName?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">
                        {admission.firstName} {admission.lastName || ""}
                      </h3>
                      <Badge className={getStatusBadgeColor(admission.status)}>
                        {admission.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {admission.user_email}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(admission.createdAt).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {admission.location || "Location not provided"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedAdmission(admission)}
                      >
                        <Eye className="h-4 w-4 mr-2" />
                        Review
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[92vh]">
                      <DialogHeader>
                        <DialogTitle>Admission Application Review</DialogTitle>
                        <DialogDescription>
                          Review {admission.firstName}{" "}
                          {admission.lastName || ""}&apos;s admission
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
                                  Admission ID
                                </label>
                                <code className="block bg-muted px-2 py-1 rounded text-xs font-mono mt-1">
                                  {admission.admission_id}
                                </code>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Full Name
                                </label>
                                <p>
                                  {admission.firstName}{" "}
                                  {admission.lastName ||
                                    "(No last name provided)"}
                                </p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Email
                                </label>
                                <p className="flex items-center gap-1">
                                  {admission.user_email}
                                </p>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Contact Number
                                </label>
                                <p className="flex items-center gap-1">
                                  <Phone className="h-3 w-3" />
                                  {admission.contactNumber || "Not provided"}
                                </p>
                              </div>
                              <div className="col-span-2">
                                <label className="font-medium text-muted-foreground">
                                  Location
                                </label>
                                <p className="flex items-center gap-1">
                                  <MapPin className="h-3 w-3" />
                                  {admission.location || "Not provided"}
                                </p>
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Profile Information */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Profile Information
                            </h3>
                            <div className="space-y-4">
                              <div className="flex items-start gap-4">
                                <Avatar className="h-16 w-16">
                                  <AvatarImage
                                    src={
                                      admission.profileImage ||
                                      "/placeholder.svg" ||
                                      "/placeholder.svg"
                                    }
                                  />
                                  <AvatarFallback className="text-lg">
                                    {admission.firstName[0]}
                                    {admission.lastName?.[0] || ""}
                                  </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                  <label className="font-medium text-muted-foreground">
                                    Bio
                                  </label>
                                  <p className="text-sm leading-relaxed mt-1">
                                    {admission.bio || "No bio provided"}
                                  </p>
                                </div>
                              </div>

                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Interests
                                </label>
                                <div className="flex flex-wrap gap-2 mt-2">
                                  {admission.interests &&
                                  admission.interests.length > 0 ? (
                                    admission.interests.map(
                                      (interest, index) => (
                                        <Badge
                                          key={index}
                                          variant="secondary"
                                          className="text-xs"
                                        >
                                          <Heart className="h-3 w-3 mr-1" />
                                          {interest}
                                        </Badge>
                                      )
                                    )
                                  ) : (
                                    <p className="text-sm text-muted-foreground">
                                      No interests specified
                                    </p>
                                  )}
                                </div>
                              </div>
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
                                {admission.id_picture ? (
                                  <img
                                    src={
                                      admission.id_picture || "/placeholder.svg"
                                    }
                                    alt="ID Verification"
                                    className="w-full max-w-md mx-auto rounded border"
                                  />
                                ) : (
                                  <div className="w-full max-w-md mx-auto h-48 bg-muted rounded border flex items-center justify-center">
                                    <p className="text-muted-foreground">
                                      No ID picture uploaded
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>

                          <Separator />

                          {/* Application Details */}
                          <div>
                            <h3 className="text-lg font-semibold mb-3">
                              Application Details
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                              <div>
                                <label className="font-medium text-muted-foreground mr-1">
                                  Role:
                                </label>
                                <Badge
                                  className={getRoleBadgeColor(admission?.role)}
                                >
                                  {admission?.role}
                                </Badge>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground mr-1">
                                  Status:
                                </label>
                                <Badge
                                  className={getStatusBadgeColor(
                                    admission.status
                                  )}
                                >
                                  {admission.status}
                                </Badge>
                              </div>
                              <div>
                                <label className="font-medium text-muted-foreground">
                                  Submitted:
                                </label>
                                <p>
                                  {new Date(
                                    admission.createdAt
                                  ).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </ScrollArea>
                      {/* Only show action buttons if status is PENDING */}
                      {admission.status === "PENDING" && (
                        <div className="flex justify-end gap-2 pt-4 border-t mb-2">
                          <Button
                            variant="outline"
                            onClick={() => handleReject(admission)}
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                          <Button onClick={() => handleApprove(admission)}>
                            <CheckCircle className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                        </div>
                      )}
                    </DialogContent>
                  </Dialog>
                  {/* Only show action buttons if status is PENDING */}
                  {admission.status === "PENDING" && (
                    <>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(admission)}
                      >
                        <XCircle className="h-4 w-4 mr-2" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(admission)}
                      >
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Approve
                      </Button>
                    </>
                  )}
                </div>
              </div>
            ))}
            {filteredAdmissions?.length === 0 && (
              <div className="text-center py-8 text-muted-foreground">
                No applications found.
              </div>
            )}
          </div>
          {submitSuccess && (
            <EmailTrigger
              to={filteredAdmissions[0]?.user_email}
              firstName={filteredAdmissions[0]?.firstName}
              lastName={filteredAdmissions[0]?.lastName}
              send={true}
              emailType="confirmation"
              onSent={(res) => {
                toast("Email Sent! " + res.status);
                setSubmitSuccess(false); // unmount the trigger
              }}
              onError={(err) => {
                toast("Error Sent: " + err.text);
                setSubmitSuccess(false);
              }}
            />
          )}
        </CardContent>
      </Card>
    </div>
  );
}
