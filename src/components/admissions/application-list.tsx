"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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
  CheckCircle,
  XCircle,
  Eye,
  Calendar,
  Phone,
  MapPin,
  ImageIcon,
  Heart,
} from "lucide-react";
import type { Role, AdmissionStatus } from "@/generated/prisma";

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

interface ApplicationListProps {
  admission: Admission;
  setSelectedAdmission: (a: Admission) => void;
  handleReject: (a: Admission) => void;
  handleApprove: (a: Admission) => void;
}

const ApplicationList = ({
  admission,
  setSelectedAdmission,
  handleReject,
  handleApprove,
}: ApplicationListProps) => {
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
    <div
      key={admission.admission_id}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors gap-4"
    >
      <div className="flex items-start sm:items-center gap-4 min-w-0 flex-1">
        <Avatar className="h-12 w-12 shrink-0">
          <AvatarImage src={admission.profileImage || "/placeholder.svg"} />
          <AvatarFallback>
            {admission.firstName[0]}
            {admission.lastName?.[0] || ""}
          </AvatarFallback>
        </Avatar>
        <div className="min-w-0 flex-1">
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 mb-1">
            <h3 className="font-semibold truncate">
              {admission.firstName} {admission.lastName || ""}
            </h3>
            <Badge
              className={`${getStatusBadgeColor(
                admission.status
              )} shrink-0 w-fit`}
            >
              {admission.status}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground truncate mb-2">
            {admission.user_email}
          </p>
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="h-3 w-3" />
              {new Date(admission.createdAt).toLocaleDateString()}
            </span>
            <span className="flex items-center gap-1 truncate">
              <MapPin className="h-3 w-3 shrink-0" />
              <span className="truncate">
                {admission.location || "Location not provided"}
              </span>
            </span>
          </div>
        </div>
      </div>

      <div className="flex flex-row sm:flex-col lg:flex-row items-center gap-2 shrink-0">
        <Dialog>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSelectedAdmission(admission)}
              className="w-full sm:w-auto"
            >
              <Eye className="h-4 w-4 sm:mr-2" />
              <span className="sm:inline">Review</span>
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl max-h-[92vh] mx-4">
            <DialogHeader>
              <DialogTitle className="text-base sm:text-lg">
                Admission Application Review
              </DialogTitle>
              <DialogDescription className="text-sm">
                Review {admission.firstName} {admission.lastName || ""}&apos;s
                admission application
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="max-h-[70vh]">
              <div className="space-y-6 p-1">
                {/* Personal Information */}
                <div>
                  <h3 className="text-lg font-semibold mb-3">
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div>
                      <label className="font-medium text-muted-foreground">
                        Admission ID
                      </label>
                      <code className="block bg-muted px-2 py-1 rounded text-xs font-mono mt-1 break-all">
                        {admission.admission_id}
                      </code>
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">
                        Full Name
                      </label>
                      <p className="break-words">
                        {admission.firstName}{" "}
                        {admission.lastName || "(No last name provided)"}
                      </p>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-medium text-muted-foreground">
                        Email
                      </label>
                      <p className="flex items-center gap-1 break-all">
                        {admission.user_email}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">
                        Contact Number
                      </label>
                      <p className="flex items-center gap-1 break-words">
                        <Phone className="h-3 w-3 shrink-0" />
                        {admission.contactNumber || "Not provided"}
                      </p>
                    </div>
                    <div>
                      <label className="font-medium text-muted-foreground">
                        Location
                      </label>
                      <p className="flex items-center gap-1 break-words">
                        <MapPin className="h-3 w-3 shrink-0" />
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
                    <div className="flex flex-col sm:flex-row items-start gap-4">
                      <Avatar className="h-16 w-16 shrink-0">
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
                      <div className="flex-1 min-w-0">
                        <label className="font-medium text-muted-foreground">
                          Bio
                        </label>
                        <p className="text-sm leading-relaxed mt-1 break-words">
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
                          admission.interests.map((interest, index) => (
                            <Badge
                              key={index}
                              variant="secondary"
                              className="text-xs break-words"
                            >
                              <Heart className="h-3 w-3 mr-1 shrink-0" />
                              {interest}
                            </Badge>
                          ))
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
                      <span className="font-medium">Uploaded ID Document</span>
                    </div>
                    <div className="relative">
                      {admission.id_picture ? (
                        <img
                          src={admission.id_picture || "/placeholder.svg"}
                          alt="ID Verification"
                          className="w-full max-w-md mx-auto rounded border"
                        />
                      ) : (
                        <div className="w-full max-w-md mx-auto h-48 bg-muted rounded border flex items-center justify-center">
                          <p className="text-muted-foreground text-center px-4">
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="font-medium text-muted-foreground">
                        Role:
                      </label>
                      <Badge className={getRoleBadgeColor(admission?.role)}>
                        {admission?.role}
                      </Badge>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                      <label className="font-medium text-muted-foreground">
                        Status:
                      </label>
                      <Badge className={getStatusBadgeColor(admission.status)}>
                        {admission.status}
                      </Badge>
                    </div>
                    <div className="sm:col-span-2">
                      <label className="font-medium text-muted-foreground">
                        Submitted:
                      </label>
                      <p className="break-words">
                        {new Date(admission.createdAt).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </ScrollArea>
            {/* Only show action buttons if status is PENDING */}
            {admission.status === "PENDING" && (
              <div className="flex flex-col sm:flex-row justify-end gap-2 pt-4 border-t mb-2">
                <Button
                  variant="outline"
                  onClick={() => handleReject(admission)}
                  className="w-full sm:w-auto"
                >
                  <XCircle className="h-4 w-4 mr-2" />
                  Reject
                </Button>
                <Button
                  onClick={() => handleApprove(admission)}
                  className="w-full sm:w-auto"
                >
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
              className="w-full sm:w-auto"
            >
              <XCircle className="h-4 w-4 sm:mr-2" />
              <span className="sm:inline">Reject</span>
            </Button>
            <Button
              size="sm"
              onClick={() => handleApprove(admission)}
              className="w-full sm:w-auto"
            >
              <CheckCircle className="h-4 w-4 sm:mr-2" />
              <span className="sm:inline">Approve</span>
            </Button>
          </>
        )}
      </div>
    </div>
  );
};

export default ApplicationList;
