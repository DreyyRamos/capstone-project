"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  UserCog,
  ArrowRight,
  CheckCircle,
  AlertCircle,
  Info,
  Send,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Cookies from "js-cookie";
import { useUserQuery } from "@/hooks/useUser";
import RoleRequestLoading from "./loading";

export default function RoleRequestPage() {
  const router = useRouter();
  const token = Cookies.get("token") || "";
  const {
    data: user,
    roleChange,
    isLoading: isUserLoading,
  } = useUserQuery(token);
  console.log("user from request", user);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    requestedRole: "",
    reason: "",
    additionalInfo: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const roleOptions = [
    {
      value: "EDITOR",
      label: "Editor",
      description: "Create, edit, and manage publications",
    },
    {
      value: "MODERATOR",
      label: "Moderator",
      description: "Moderate forums and user content",
    },
    {
      value: "ADMIN",
      label: "Administrator",
      description: "Full system administration access",
    },
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.requestedRole) {
      newErrors.requestedRole = "Please select a role";
    }

    if (!formData.reason.trim()) {
      newErrors.reason = "Please provide a reason for your request";
    } else if (formData.reason.trim().length < 50) {
      newErrors.reason =
        "Please provide a more detailed reason (at least 50 characters)";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const requestData = {
        userId: user?.userData?.id,
        firstName: user?.userData?.firstName,
        lastName: user?.userData?.lastName,
        profileImage: user?.userData?.profileImage,
        userEmail: user?.userData?.email,
        currentRole: user?.userData?.role,
        requestedRole: formData.requestedRole,
        reason: formData.reason,
        additionalInfo: formData.additionalInfo,
      };

      // Use the mutation properly
      await roleChange(requestData, {
        onSuccess: () => {
          toast(
            "Your role change request has been submitted successfully! You will receive an email notification once it's reviewed by an administrator."
          );
          router.push("/");
        },
      });

      setSuccessMessage(
        "Your role change request has been submitted successfully! You will receive an email notification once it's reviewed by an administrator."
      );

      // Reset form
      setFormData({
        requestedRole: "",
        reason: "",
        additionalInfo: "",
      });

      // Redirect after a delay
      // setTimeout(() => {
      //   router.push("/profile");
      // }, 3000);
    } catch (error: any) {
      setErrorMessage(
        error.message ||
          "Failed to submit your request. Please try again later."
      );
      console.error("Role request error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
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

  const selectedRoleInfo = roleOptions.find(
    (role) => role.value === formData.requestedRole
  );

  if (isUserLoading) {
    return <RoleRequestLoading />;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-2 mb-4">
          <div className="h-12 w-12 bg-blue-600 rounded-lg flex items-center justify-center">
            <UserCog className="h-6 w-6 text-white" />
          </div>
        </div>
        <h1 className="text-3xl font-bold">Request Role Change</h1>
        <p className="text-muted-foreground">
          Submit a request to change your role and gain additional permissions
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <Alert className="border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/20">
          <CheckCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-200">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {errorMessage && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      {/* Current Role Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Current Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">
                  {user?.userData?.firstName} {user?.userData?.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {user?.userData?.email}
                </p>
              </div>
              <Badge
                className={getRoleBadgeColor(user?.userData?.role || "STUDENT")}
                variant="outline"
              >
                {user?.userData?.role || "Student"}
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Request Form */}
      <Card>
        <CardHeader>
          <CardTitle>Role Change Request</CardTitle>
          <CardDescription>
            Please provide detailed information about why you want to change
            your role
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Role Selection */}
            <div className="space-y-2">
              <Label htmlFor="requestedRole">Requested Role *</Label>
              <Select
                value={formData.requestedRole}
                onValueChange={(value) =>
                  handleInputChange("requestedRole", value)
                }
              >
                <SelectTrigger
                  className={errors.requestedRole ? "border-red-500" : ""}
                >
                  <SelectValue placeholder="Select the role you want to request" />
                </SelectTrigger>
                <SelectContent>
                  {roleOptions.map((role) => (
                    <SelectItem key={role.value} value={role.value}>
                      <div className="flex flex-col">
                        <span className="font-medium">{role.label}</span>
                        <span className="text-xs text-muted-foreground">
                          {role.description}
                        </span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.requestedRole && (
                <p className="text-xs text-red-600">{errors.requestedRole}</p>
              )}
            </div>

            {/* Role Transition Preview */}
            {formData.requestedRole && (
              <div className="bg-muted p-4 rounded-lg">
                <p className="text-sm font-medium mb-2">Role Change Preview:</p>
                <div className="flex items-center gap-2">
                  <Badge
                    className={getRoleBadgeColor(
                      user?.userData?.role || "student"
                    )}
                    variant="outline"
                  >
                    {user?.userData?.role
                      ? user?.userData?.role.charAt(0).toUpperCase() +
                        user?.userData?.role.slice(1)
                      : "Student"}
                  </Badge>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <Badge
                    className={getRoleBadgeColor(formData.requestedRole)}
                    variant="outline"
                  >
                    {formData.requestedRole.charAt(0).toUpperCase() +
                      formData.requestedRole.slice(1)}
                  </Badge>
                </div>
                {selectedRoleInfo && (
                  <p className="text-xs text-muted-foreground mt-2">
                    {selectedRoleInfo.description}
                  </p>
                )}
              </div>
            )}

            {/* Reason */}
            <div className="space-y-2">
              <Label htmlFor="reason">Reason for Role Change *</Label>
              <Textarea
                id="reason"
                placeholder="Please explain why you want this role change. Include your relevant experience, qualifications, and how you plan to contribute in this new role..."
                value={formData.reason}
                onChange={(e) => handleInputChange("reason", e.target.value)}
                className={errors.reason ? "border-red-500" : ""}
                rows={5}
              />
              <div className="flex justify-between items-center">
                {errors.reason && (
                  <p className="text-xs text-red-600">{errors.reason}</p>
                )}
                <p className="text-xs text-muted-foreground ml-auto">
                  {formData.reason.length}/500 characters (minimum 50)
                </p>
              </div>
            </div>

            {/* Additional Information */}
            <div className="space-y-2">
              <Label htmlFor="additionalInfo">Additional Information</Label>
              <Textarea
                id="additionalInfo"
                placeholder="Any additional information that supports your request (optional)..."
                value={formData.additionalInfo}
                onChange={(e) =>
                  handleInputChange("additionalInfo", e.target.value)
                }
                rows={3}
              />
              <p className="text-xs text-muted-foreground">
                Optional: Include any certifications, achievements, or other
                relevant information
              </p>
            </div>

            {/* Submit Button */}
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Submitting Request...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Submit Role Change Request
                </>
              )}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
                What happens next?
              </p>
              <ol className="text-xs text-blue-700 dark:text-blue-300 space-y-1 list-decimal list-inside">
                <li>Your request will be reviewed by school administrators</li>
                <li>
                  You&apos;ll receive an email notification about the decision
                </li>
                <li>
                  If approved, you need to logout and login again to reflect the
                  changes.
                </li>
              </ol>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
