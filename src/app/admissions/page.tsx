"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Users, Search } from "lucide-react";
import { useConfirmation } from "@/components/confirmation-provider";
import Cookies from "js-cookie";
import { useAdminUserAdmissionsQuery } from "@/hooks/useAdmin";
import type { Role, AdmissionStatus } from "@/generated/prisma";
import EmailTrigger from "@/components/email-trigger";
import { toast } from "sonner";
import ApplicationList from "@/components/admissions/application-list";
import { useRoleGate } from "@/utils/userRoleGate";
import { useTokenUser } from "@/hooks/useTokenUser";

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
  useRoleGate(["ADMIN"], token);
  const {
    data: pendingAdmissions,
    approveUser,
    rejectUser,
  } = useAdminUserAdmissionsQuery(token);
  const [searchTerm, setSearchTerm] = useState("");
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

      return matchesSearch;
    }
  );

  const pendingOnly =
    filteredAdmissions?.filter((a: any) => a.status === "PENDING") ?? [];
  const pendingCount = pendingOnly.length;

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
            <CardTitle className="text-sm font-medium">
              {pendingCount} Total Pending
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            {/* <div className="text-2xl font-bold">{stats.total}</div> */}
            <p className="text-xs text-muted-foreground">Awaiting approval</p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle>Search Applications</CardTitle>
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
              <ApplicationList
                key={admission.admission_id}
                admission={admission}
                setSelectedAdmission={setSelectedAdmission}
                handleReject={handleReject}
                handleApprove={handleApprove}
              />
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
