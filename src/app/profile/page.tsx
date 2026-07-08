"use client";

import { useState, useEffect } from "react";
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
import { X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  MessageSquare,
  Star,
  FileText,
  Camera,
} from "lucide-react";
import { UploadButton } from "@/utils/uploadthing";
import Cookies from "js-cookie";
import {
  useUserQuery,
  useUserActivityQuery,
  useUserPublicationQuery,
} from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import { useUserForumQuery } from "@/hooks/useUser";
import ProfilePageLoading from "./loading";
import Activities from "@/components/profile/activities";
import ProfilePublications from "@/components/profile/publications";
import UserForums from "@/components/profile/forums";

export default function ProfilePage() {
  const token = Cookies.get("token") || "";
  const { confirmDelete } = useConfirmation();
  const { data: userActivity } = useUserActivityQuery(token);
  const { data: user, updateUser, isLoading } = useUserQuery(token);
  const { deletePub } = useUserPublicationQuery(token);
  const { deleteForum } = useUserForumQuery(token);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contactNumber: "",
    bio: "",
    location: "",
    createdAt: "",
    profileImage: "",
    interests: [],
  });

  const [visibleActivityCount, setVisibleActivityCount] = useState(5);
  const ACTIVITY_INCREMENT = 5;

  useEffect(() => {
    if (user?.userData) {
      setProfileData({
        firstName: user.userData.firstName || "",
        lastName: user.userData.lastName || "",
        email: user.userData.email || "",
        contactNumber: user.userData.contactNumber || "",
        bio: user.userData.bio || "",
        location: user.userData.location || "",
        createdAt: user.userData.createdAt || "",
        profileImage: user.userData.profileImage || "",
        interests: user.userData.interests || [],
      });

      setInterests(user.userData.interests || []);
    }
  }, [user]);

  const [interests, setInterests] = useState<string[]>([]);
  const [newInterests, setNewInterests] = useState("");

  const handleAddInterest = () => {
    if (newInterests.trim() && !interests.includes(newInterests.trim())) {
      setInterests([...interests, newInterests.trim()]);
      setNewInterests("");
    }
  };

  const handleRemoveTag = (interestsToRemove: string) => {
    setInterests(
      interests.filter((interest) => interest !== interestsToRemove),
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDeletePublication = (pubId: string) => {
    confirmDelete("publication", () => {
      deletePub(pubId);
    });
  };

  const handleDeleteForum = (forumId: string) => {
    confirmDelete("forum", () => {
      deleteForum(forumId);
    });
  };

  const handleLoadMoreActivity = () => {
    setVisibleActivityCount((prev) => prev + ACTIVITY_INCREMENT);
  };

  const handleSave = () => {
    updateUser({
      ...profileData,
      interests,
    });
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  const getRoleColor = (role: string) => {
    switch (role.toUpperCase()) {
      case "ADMIN":
        return "bg-red-100 text-red-800";
      case "EDITOR":
        return "bg-blue-100 text-blue-800";
      case "MODERATOR":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const rawRole = user?.userData?.role || "STUDENT";

  const displayRole =
    String(rawRole).charAt(0).toUpperCase() + String(rawRole).slice(1);

  const visibleActivities = userActivity?.slice(0, visibleActivityCount) || [];
  const hasMoreActivities =
    userActivity && userActivity.length > visibleActivityCount;

  if (isLoading) {
    return <ProfilePageLoading />;
  }

  return (
    <div
      id="page-div-1"
      data-testId="page-div-1"
      className="max-w-4xl mx-auto space-y-6 p-4 sm:p-0"
    >
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div
            id="page-flex-2"
            data-testId="page-flex-2"
            className="flex flex-col md:flex-row gap-6"
          >
            <div
              id="page-flex-3"
              data-testId="page-flex-3"
              className="flex flex-col items-center space-y-4"
            >
              <div
                id="page-div-4"
                data-testId="page-div-4"
                className="relative"
              >
                <Avatar
                  id="page-a-1"
                  data-testId="page-a-1"
                  className="h-24 w-24 sm:h-32 sm:w-32"
                >
                  {profileData.profileImage.length ? (
                    <AvatarImage
                      src={
                        profileData.profileImage ||
                        "/placeholder.svg?height=128&width=128"
                      }
                    />
                  ) : null}
                  <AvatarFallback
                    id="page-a-2"
                    data-testId="page-a-2"
                    className="text-xl sm:text-2xl"
                  >
                    {profileData.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              {isEditing && (
                <Tooltip>
                  <TooltipTrigger>
                    <UploadButton
                      endpoint="imageUploader"
                      className="mt-2"
                      appearance={{
                        button:
                          "h-8 w-8 rounded-full p-0 bg-transparent text-gray-600 border border-gray-500 hover:bg-gray-300 transition-colors shadow-sm",
                        allowedContent: "hidden",
                      }}
                      content={{
                        button: <Camera className="h-4 w-4" />,
                      }}
                      onClientUploadComplete={(res) => {
                        console.log("Files: ", res);
                        setProfileData((prev) => ({
                          ...prev,
                          profileImage: res[0].ufsUrl,
                        }));
                        updateUser({
                          ...profileData,
                          profileImage: res[0].ufsUrl,
                        });
                      }}
                      onUploadError={(error) => {
                        console.error(`Upload failed: ${error.message}`);
                      }}
                    />
                    <TooltipContent>
                      <p>Upload a profile picture.</p>
                    </TooltipContent>
                  </TooltipTrigger>
                </Tooltip>
              )}

              <Badge className={getRoleColor(rawRole)} variant="secondary">
                {displayRole}
              </Badge>
            </div>

            <div
              id="page-div-5"
              data-testId="page-div-5"
              className="flex-1 space-y-4"
            >
              {!isEditing ? (
                <>
                  <div
                    id="page-flex-6"
                    data-testId="page-flex-6"
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2"
                  >
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <Button
                      id="page-button-1"
                      data-testId="page-button-1"
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                      size="sm"
                      className="w-full sm:w-auto"
                    >
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>

                  <p className="text-muted-foreground text-sm sm:text-base">
                    {profileData.bio}
                  </p>

                  <div
                    id="page-grid-7"
                    data-testId="page-grid-7"
                    className="grid grid-cols-1 gap-3 text-sm"
                  >
                    <div
                      id="page-flex-8"
                      data-testId="page-flex-8"
                      className="flex items-center gap-2"
                    >
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span
                        id="page-span-1"
                        data-testId="page-span-1"
                        className="break-all"
                      >
                        {profileData.email}
                      </span>
                    </div>
                    <div
                      id="page-flex-9"
                      data-testId="page-flex-9"
                      className="flex items-center gap-2"
                    >
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span id="page-span-2" data-testId="page-span-2">
                        {profileData.contactNumber}
                      </span>
                    </div>
                    <div
                      id="page-flex-10"
                      data-testId="page-flex-10"
                      className="flex items-center gap-2"
                    >
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span id="page-span-3" data-testId="page-span-3">
                        {profileData.location}
                      </span>
                    </div>
                    <div
                      id="page-flex-11"
                      data-testId="page-flex-11"
                      className="flex items-center gap-2"
                    >
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span id="page-span-4" data-testId="page-span-4">
                        Joined{" "}
                        {profileData.createdAt
                          ? new Date(profileData.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div
                    id="page-flex-12"
                    data-testId="page-flex-12"
                    className="flex flex-wrap gap-2"
                  >
                    {profileData.interests?.map((interest) => (
                      <Badge
                        key={interest}
                        variant="secondary"
                        className="text-xs"
                      >
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </>
              ) : (
                <div
                  id="page-div-13"
                  data-testId="page-div-13"
                  className="space-y-4"
                >
                  <div
                    id="page-grid-14"
                    data-testId="page-grid-14"
                    className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                  >
                    <div
                      id="page-div-15"
                      data-testId="page-div-15"
                      className="space-y-2"
                    >
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      id="page-div-16"
                      data-testId="page-div-16"
                      className="space-y-2"
                    >
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        name="lastName"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      id="page-div-17"
                      data-testId="page-div-17"
                      className="space-y-2 sm:col-span-2"
                    >
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        name="email"
                        onChange={handleChange}
                        disabled={true}
                      />
                    </div>
                    <div
                      id="page-div-18"
                      data-testId="page-div-18"
                      className="space-y-2"
                    >
                      <Label htmlFor="contactNumber">Phone</Label>
                      <Input
                        id="contactNumber"
                        value={profileData.contactNumber}
                        name="contactNumber"
                        onChange={handleChange}
                      />
                    </div>
                    <div
                      id="page-div-19"
                      data-testId="page-div-19"
                      className="space-y-2"
                    >
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div
                    id="page-div-20"
                    data-testId="page-div-20"
                    className="space-y-2"
                  >
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      name="bio"
                      onChange={handleTextAreaChange}
                      rows={3}
                    />
                  </div>

                  <div
                    id="page-flex-21"
                    data-testId="page-flex-21"
                    className="flex gap-2"
                  >
                    <Input
                      placeholder="Add your interests..."
                      value={newInterests}
                      onChange={(e) => setNewInterests(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddInterest();
                        }
                      }}
                    />
                    <Button
                      id="page-button-2"
                      data-testId="page-button-2"
                      type="button"
                      onClick={handleAddInterest}
                      size="sm"
                    >
                      Add
                    </Button>
                  </div>

                  {interests.length > 0 && (
                    <div
                      id="page-flex-22"
                      data-testId="page-flex-22"
                      className="flex flex-wrap gap-2"
                    >
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          {interest}
                          <button
                            id="page-button-3"
                            data-testId="page-button-3"
                            onClick={() => handleRemoveTag(interest)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div
                    id="page-flex-23"
                    data-testId="page-flex-23"
                    className="flex flex-col sm:flex-row gap-2"
                  >
                    <Button
                      id="page-button-4"
                      data-testId="page-button-4"
                      onClick={handleSave}
                      className="w-full sm:w-auto"
                    >
                      Save Changes
                    </Button>
                    <Button
                      id="page-button-5"
                      data-testId="page-button-5"
                      variant="outline"
                      onClick={() => setIsEditing(false)}
                      className="w-full sm:w-auto"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div
        id="page-grid-24"
        data-testId="page-grid-24"
        className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4"
      >
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div
              id="page-flex-25"
              data-testId="page-flex-25"
              className="flex items-center space-x-2"
            >
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <div id="page-div-26" data-testId="page-div-26">
                <p className="text-xl sm:text-2xl font-bold">
                  {user?.userData?.publications?.length || 0}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Publications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div
              id="page-flex-27"
              data-testId="page-flex-27"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div id="page-div-28" data-testId="page-div-28">
                <p className="text-xl sm:text-2xl font-bold">
                  {user?.userData?.forums?.length || 0}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Forum Posts
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div
              id="page-flex-29"
              data-testId="page-flex-29"
              className="flex items-center space-x-2"
            >
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              <div id="page-div-30" data-testId="page-div-30">
                <p className="text-xl sm:text-2xl font-bold">
                  {user?.userData?.reputationPoints}
                </p>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Reputation Points
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3 text-xs sm:text-sm">
          <TabsTrigger value="activity" className="px-2 sm:px-4">
            Activity
          </TabsTrigger>
          <TabsTrigger value="publications" className="px-2 sm:px-4">
            Publications
          </TabsTrigger>
          <TabsTrigger value="forums" className="px-2 sm:px-4">
            Forums
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Recent Activity
              </CardTitle>
              <CardDescription>
                Your latest contributions and interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="page-div-31"
                data-testId="page-div-31"
                className="space-y-4"
              >
                {visibleActivities.map((activity: any, index: number) => (
                  <Activities
                    key={index}
                    index={index}
                    activity={activity}
                    visibleActivities={visibleActivities}
                  />
                ))}

                {/* Load More Button */}
                {hasMoreActivities && (
                  <div
                    id="page-flex-32"
                    data-testId="page-flex-32"
                    className="flex justify-center pt-4"
                  >
                    <Button
                      id="page-button-6"
                      data-testId="page-button-6"
                      variant="outline"
                      onClick={handleLoadMoreActivity}
                      className="w-full sm:w-auto"
                    >
                      Load More Activities
                    </Button>
                  </div>
                )}

                {/* Show message if no activities */}
                {!userActivity ||
                  (userActivity.length === 0 && (
                    <div
                      id="page-div-33"
                      data-testId="page-div-33"
                      className="text-center py-8 text-muted-foreground"
                    >
                      <p>No recent activity to display.</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">
                Your Publications
              </CardTitle>
              <CardDescription>
                Articles and content you&apos;ve published
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="page-div-34"
                data-testId="page-div-34"
                className="space-y-4"
              >
                {user?.userData?.publications?.map((pub: any, index: any) => (
                  <ProfilePublications
                    key={index}
                    index={index}
                    user={user}
                    handleDeletePublication={handleDeletePublication}
                    pub={pub}
                  />
                ))}

                {/* Show message if no publications */}
                {!user?.userData?.publications ||
                  (user.userData.publications.length === 0 && (
                    <div
                      id="page-div-35"
                      data-testId="page-div-35"
                      className="text-center py-8 text-muted-foreground"
                    >
                      <p>No publications to display.</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg sm:text-xl">Your Forums</CardTitle>
              <CardDescription>Forums you&apos;ve joined in.</CardDescription>
            </CardHeader>
            <CardContent>
              <div
                id="page-div-36"
                data-testId="page-div-36"
                className="space-y-4"
              >
                {user?.userData?.forums?.map((forum: any, index: any) => (
                  <UserForums
                    key={forum?.forumId}
                    index={index}
                    handleDeleteForum={handleDeleteForum}
                    forum={forum}
                    user={user}
                  />
                ))}

                {/* Show message if no forums */}
                {!user?.userData?.forums ||
                  (user.userData.forums.length === 0 && (
                    <div
                      id="page-div-37"
                      data-testId="page-div-37"
                      className="text-center py-8 text-muted-foreground"
                    >
                      <p>No forums to display.</p>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
