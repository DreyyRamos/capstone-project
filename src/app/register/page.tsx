"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  Eye,
  EyeOff,
  BookOpen,
  Users,
  MessageSquare,
  AlertCircle,
  X,
  Plus,
} from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { UploadButton } from "@/utils/uploadthing";
import EmailTrigger from "@/components/email-trigger";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    user_email: "",
    firstName: "",
    lastName: "",
    password: "",
    profileImageUrl: "",
    IDImageUrl: "",
    bio: "",
    contactNumber: "",
    location: "",
    interests: [] as string[],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [newInterest, setNewInterest] = useState("");
  const [fire, setFire] = useState(false);

  const router = useRouter();

  const commonInterests = [
    "Sports",
    "Music",
    "Art",
    "Science",
    "Technology",
    "Reading",
    "Writing",
    "Drama",
    "Photography",
    "Gaming",
    "Cooking",
    "Travel",
    "Volunteering",
    "Environment",
    "Politics",
    "History",
    "Mathematics",
    "Languages",
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!formData.user_email.trim()) newErrors.user_email = "Email is required";
    else if (!formData.user_email.includes("@"))
      newErrors.user_email = "Please enter a valid email";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (
      formData.contactNumber &&
      !/^\+?[\d\s\-$$$$]+$/.test(formData.contactNumber)
    ) {
      newErrors.contactNumber = "Please enter a valid phone number";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Create FormData for file uploads
      const submitData = new FormData();

      // Add all form fields
      submitData.append("firstName", formData.firstName);
      if (formData.lastName) submitData.append("lastName", formData.lastName);
      submitData.append("user_email", formData.user_email);
      submitData.append("password", formData.password);
      if (formData.bio) submitData.append("bio", formData.bio);
      if (formData.contactNumber)
        submitData.append("contactNumber", formData.contactNumber);
      if (formData.location) submitData.append("location", formData.location);
      submitData.append("interests", JSON.stringify(formData.interests));

      // Add files
      if (formData.profileImageUrl)
        submitData.append("profileImage", formData.profileImageUrl);
      if (formData.IDImageUrl)
        submitData.append("id_picture", formData.IDImageUrl);

      const response = await fetch("/api/register", {
        method: "POST",
        body: submitData,
      });

      const data = await response.json();

      if (!response.ok) {
        toast(data.message || "Unable to create account!");
        setErrorMessage(data.message || "Unable to create account!");
      } else {
        toast(data.message);
        setSuccessMessage(
          "Registration successful! Your application is pending admin approval."
        );
        setFire(true);
        setTimeout(() => {
          router.push("/login");
        }, 2000);
      }
    } catch (error: any) {
      setErrorMessage("Registration failed. Please try again later.");
      console.error("Registration failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const addInterest = () => {
    if (
      newInterest.trim() &&
      !formData.interests.includes(newInterest.trim())
    ) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, newInterest.trim()],
      }));
      setNewInterest("");
    }
  };

  const removeInterest = (interest: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.filter((i) => i !== interest),
    }));
  };

  const addCommonInterest = (interest: string) => {
    if (!formData.interests.includes(interest)) {
      setFormData((prev) => ({
        ...prev,
        interests: [...prev.interests, interest],
      }));
    }
  };

  return (
    <div id="page-flex-1" data-testId="page-flex-1" className="min-h-screen flex">
      {/* Left Side - Registration Form */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex-1 flex items-center justify-center p-8">
        <div id="page-div-3" data-testId="page-div-3" className="w-full max-w-2xl space-y-6">
          <div id="page-div-4" data-testId="page-div-4" className="text-center space-y-2">
            <div id="page-flex-5" data-testId="page-flex-5" className="flex items-center justify-center gap-2 mb-4">
              <div id="page-flex-6" data-testId="page-flex-6" className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span id="page-span-1" data-testId="page-span-1" className="text-white font-bold">RS</span>
              </div>
              <span id="page-span-2" data-testId="page-span-2" className="font-bold text-xl">Ramos School</span>
            </div>
            <h1 className="text-2xl font-bold">Join our community</h1>
            <p className="text-muted-foreground">
              Create your account to get started
            </p>
          </div>

          {successMessage && (
            <div id="page-div-7" data-testId="page-div-7" className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
              {successMessage}
            </div>
          )}

          {errorMessage && (
            <div id="page-div-8" data-testId="page-div-8" className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg">
              {errorMessage}
            </div>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Create Account</CardTitle>
              <CardDescription>
                Fill in your information to register
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div id="page-div-9" data-testId="page-div-9" className="space-y-4">
                  <h3 className="text-lg font-semibold">Basic Information</h3>

                  {/* Name Fields */}
                  <div id="page-grid-10" data-testId="page-grid-10" className="grid grid-cols-2 gap-4">
                    <div id="page-div-11" data-testId="page-div-11" className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        placeholder="John"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className={errors.firstName ? "border-red-500" : ""}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-red-600">
                          {errors.firstName}
                        </p>
                      )}
                    </div>
                    <div id="page-div-12" data-testId="page-div-12" className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        placeholder="Doe"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        className={errors.lastName ? "border-red-500" : ""}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-red-600">
                          {errors.lastName}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Email */}
                  <div id="page-div-13" data-testId="page-div-13" className="space-y-2">
                    <Label htmlFor="user_email">Email *</Label>
                    <Input
                      id="user_email"
                      type="email"
                      placeholder="juandelacruz@gmail.com"
                      name="user_email"
                      value={formData.user_email}
                      onChange={handleChange}
                      className={errors.user_email ? "border-red-500" : ""}
                    />
                    {errors.user_email && (
                      <p className="text-xs text-red-600">
                        {errors.user_email}
                      </p>
                    )}
                  </div>

                  {/* Password */}
                  <div id="page-div-14" data-testId="page-div-14" className="space-y-2">
                    <Label htmlFor="password">Password *</Label>
                    <div id="page-div-15" data-testId="page-div-15" className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className={errors.password ? "border-red-500" : ""}
                      />
                      <Button id="page-button-1" data-testId="page-button-1"
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeOff className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </Button>
                    </div>
                    {errors.password && (
                      <p className="text-xs text-red-600">{errors.password}</p>
                    )}
                  </div>
                </div>

                {/* Profile Information */}
                <div id="page-div-16" data-testId="page-div-16" className="space-y-4">
                  <h3 className="text-lg font-semibold">Profile Information</h3>

                  {/* Bio */}
                  <div id="page-div-17" data-testId="page-div-17" className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      placeholder="Tell us about yourself..."
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      rows={3}
                    />
                  </div>

                  {/* Contact Information */}
                  <div id="page-grid-18" data-testId="page-grid-18" className="grid grid-cols-2 gap-4">
                    <div id="page-div-19" data-testId="page-div-19" className="space-y-2">
                      <Label htmlFor="contactNumber">Phone Number</Label>
                      <Input
                        id="contactNumber"
                        placeholder="+1 (555) 123-4567"
                        name="contactNumber"
                        value={formData.contactNumber}
                        onChange={handleChange}
                        className={errors.contactNumber ? "border-red-500" : ""}
                      />
                      {errors.contactNumber && (
                        <p className="text-xs text-red-600">
                          {errors.contactNumber}
                        </p>
                      )}
                    </div>
                    <div id="page-div-20" data-testId="page-div-20" className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="City, State"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {/* Interests */}
                  <div id="page-div-21" data-testId="page-div-21" className="space-y-2">
                    <Label>Interests</Label>
                    <div id="page-div-22" data-testId="page-div-22" className="space-y-3">
                      {/* Current interests */}
                      {formData.interests.length > 0 && (
                        <div id="page-flex-23" data-testId="page-flex-23" className="flex flex-wrap gap-2">
                          {formData.interests.map((interest) => (
                            <Badge
                              key={interest}
                              variant="secondary"
                              className="flex items-center gap-1"
                            >
                              {interest}
                              <button id="page-button-2" data-testId="page-button-2"
                                type="button"
                                onClick={() => {
                                  console.log("clicked X on", interest);
                                  removeInterest(interest);
                                }}
                                className="ml-1 text-xs text-red-500 hover:text-red-700"
                              >
                                ✕
                              </button>
                            </Badge>
                          ))}
                        </div>
                      )}

                      {/* Add custom interest */}
                      <div id="page-flex-24" data-testId="page-flex-24" className="flex gap-2">
                        <Input
                          placeholder="Add an interest..."
                          value={newInterest}
                          onChange={(e) => setNewInterest(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === "Enter") {
                              e.preventDefault();
                              addInterest();
                            }
                          }}
                        />
                        <Button id="page-button-3" data-testId="page-button-3" type="button" onClick={addInterest} size="sm">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      {/* Common interests */}
                      <div id="page-div-25" data-testId="page-div-25" className="space-y-2">
                        <p className="text-sm text-muted-foreground">
                          Or choose from common interests:
                        </p>
                        <div id="page-flex-26" data-testId="page-flex-26" className="flex flex-wrap gap-2">
                          {commonInterests
                            .filter(
                              (interest) =>
                                !formData.interests.includes(interest)
                            )
                            .map((interest) => (
                              <Badge
                                key={interest}
                                variant="outline"
                                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
                                onClick={() => addCommonInterest(interest)}
                              >
                                {interest}
                              </Badge>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* File Uploads */}
                <div id="page-div-27" data-testId="page-div-27" className="space-y-4">
                  <h3 className="text-lg font-semibold">Upload Documents</h3>

                  {/* Profile Image */}
                  <div id="page-div-28" data-testId="page-div-28" className="space-y-2">
                    <Label htmlFor="profileImage">Profile Picture</Label>
                    <div id="page-flex-29" data-testId="page-flex-29" className="flex items-center gap-4">
                      <div id="page-div-30" data-testId="page-div-30" className="flex-1">
                        <UploadButton
                          className="text-white bg-blue-500 h-10 rounded-md w-50"
                          endpoint="imageUploader"
                          onClientUploadComplete={(res) => {
                            console.log("Files: ", res);
                            setFormData({
                              ...formData,
                              profileImageUrl: res[0].ufsUrl,
                            });
                          }}
                          onUploadError={(error) => {
                            alert(`ERROR! ${error.message}`);
                          }}
                        />
                      </div>
                      {formData?.profileImageUrl && (
                        <div id="page-div-31" data-testId="page-div-31" className="w-16 h-16 rounded-full overflow-hidden border-2 border-gray-200">
                          <img
                            src={
                              formData?.profileImageUrl || "/placeholder.svg"
                            }
                            alt="Profile preview"
                            className="w-full h-full object-cover"
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* ID Picture */}
                  <div id="page-div-32" data-testId="page-div-32" className="space-y-2">
                    <Label htmlFor="id_picture">
                      ID Verification (Submit your Student ID)
                    </Label>
                    <div id="page-div-33" data-testId="page-div-33" className="space-y-2">
                      <UploadButton
                        className="text-white bg-blue-500 h-10 rounded-md w-50"
                        endpoint="imageUploader"
                        onClientUploadComplete={(res) => {
                          console.log("Files: ", res);
                          setFormData({
                            ...formData,
                            IDImageUrl: res[0].ufsUrl,
                          });
                        }}
                        onUploadError={(error) => {
                          alert(`ERROR! ${error.message}`);
                        }}
                      />
                      {formData?.IDImageUrl && (
                        <div id="page-div-34" data-testId="page-div-34" className="w-full max-w-md">
                          <img
                            src={formData?.IDImageUrl || "/placeholder.svg"}
                            alt="ID preview"
                            className="w-full h-auto rounded-lg border-2 border-gray-200"
                          />
                        </div>
                      )}
                      <p className="text-xs text-muted-foreground">
                        Upload a clear photo of your student ID for verification
                      </p>
                    </div>
                  </div>
                </div>

                <Button id="page-button-4" data-testId="page-button-4" type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? "Creating Account..." : "Create Account"}
                </Button>
              </form>
              {fire && (
                <EmailTrigger
                  to={formData.user_email}
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  emailType="request"
                  send={fire}
                  onSent={(res) => alert("Sent! " + res.status)}
                  onError={(err) => alert("Error: " + err.text)}
                />
              )}
            </CardContent>
          </Card>

          <div id="page-div-35" data-testId="page-div-35" className="text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link id="page-link-1" data-testId="page-link-1" href="/login" className="text-blue-600 hover:underline">
              Sign in here
            </Link>
          </div>

          {/* Admin Note */}
          <Card className="bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800">
            <CardContent className="pt-4">
              <div id="page-flex-36" data-testId="page-flex-36" className="flex items-start gap-3">
                <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5" />
                <div id="page-div-37" data-testId="page-div-37" className="space-y-1">
                  <p className="text-sm font-medium text-amber-800 dark:text-amber-200">
                    Account Approval Required
                  </p>
                  <p className="text-xs text-amber-700 dark:text-amber-300">
                    New accounts require approval from school administrators.
                    You&apos;ll receive an email confirmation once your account
                    is approved.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Right Side - Features */}
      <div id="page-div-38" data-testId="page-div-38" className="hidden lg:flex flex-1 bg-green-50 dark:bg-green-950/20 items-center justify-center p-8">
        <div id="page-div-39" data-testId="page-div-39" className="max-w-md space-y-8">
          <div id="page-div-40" data-testId="page-div-40" className="text-center">
            <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-4">
              Join Ramos School&apos;s Digital Community
            </h2>
            <p className="text-green-700 dark:text-green-200">
              Connect with students, teachers, and staff in our vibrant online
              community
            </p>
          </div>

          <div id="page-div-41" data-testId="page-div-41" className="space-y-6">
            <div id="page-flex-42" data-testId="page-flex-42" className="flex items-start gap-4">
              <div id="page-div-43" data-testId="page-div-43" className="bg-green-600 p-2 rounded-lg">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-44" data-testId="page-div-44">
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Create & Share
                </h3>
                <p className="text-sm text-green-700 dark:text-green-200">
                  Write articles, share news, and contribute to school
                  publications
                </p>
              </div>
            </div>

            <div id="page-flex-45" data-testId="page-flex-45" className="flex items-start gap-4">
              <div id="page-div-46" data-testId="page-div-46" className="bg-green-600 p-2 rounded-lg">
                <MessageSquare className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-47" data-testId="page-div-47">
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Engage & Discuss
                </h3>
                <p className="text-sm text-green-700 dark:text-green-200">
                  Join conversations, ask questions, and help your peers
                </p>
              </div>
            </div>

            <div id="page-flex-48" data-testId="page-flex-48" className="flex items-start gap-4">
              <div id="page-div-49" data-testId="page-div-49" className="bg-green-600 p-2 rounded-lg">
                <Users className="h-5 w-5 text-white" />
              </div>
              <div id="page-div-50" data-testId="page-div-50">
                <h3 className="font-semibold text-green-900 dark:text-green-100">
                  Build Connections
                </h3>
                <p className="text-sm text-green-700 dark:text-green-200">
                  Network with classmates, teachers, and the broader school
                  community
                </p>
              </div>
            </div>
          </div>

          <div id="page-div-51" data-testId="page-div-51" className="bg-green-100 dark:bg-green-900/30 p-4 rounded-lg">
            <h4 className="font-medium text-green-900 dark:text-green-100 mb-2">
              What happens next?
            </h4>
            <ol className="text-sm text-green-700 dark:text-green-200 space-y-1">
              <li>1. Submit your registration</li>
              <li>2. Wait for admin approval</li>
              <li>3. Receive email confirmation</li>
              <li>4. Start participating!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
}
