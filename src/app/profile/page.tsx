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
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import Link from "next/link";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  Edit2,
  Trash2,
  MessageSquare,
  Trophy,
  Star,
  FileText,
  Users,
  Award,
  Camera,
  MoreVertical,
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
import { timeAgo } from "@/lib/timeAgo";
import ProfilePageLoading from "./loading";
import Activities from "@/components/profile/activities";
import ProfilePublications from "@/components/profile/publications";
import UserForums from "@/components/profile/forums";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  bio: string;
  location: string;
  profileImage: string;
  interests: string[];
}

export default function ProfilePage() {
  const token = Cookies.get("token") || "";
  const { confirmDelete } = useConfirmation();
  const { data: userActivity } = useUserActivityQuery(token);
  const { data: user, updateUser, isLoading } = useUserQuery(token);
  const { deletePub, isDeletingPub } = useUserPublicationQuery(token);
  const { deleteForum, isDeletingForum } = useUserForumQuery(token);
  console.log("user profile", user);

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

  // Pagination state for recent activity
  const [visibleActivityCount, setVisibleActivityCount] = useState(5);
  const ACTIVITY_INCREMENT = 5;

  // Update profileData when user data changes
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

      // NEW: keep local editing array in sync
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
      interests.filter((interest) => interest !== interestsToRemove)
    );
  };

  // Fixed: Use consistent field names that match your state
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

  const handleDeletePublication = (pubId: string, title: string) => {
    confirmDelete("publication", () => {
      deletePub(pubId);
    });
  };

  const handleDeleteForum = (forumId: string, title: string) => {
    confirmDelete("forum", () => {
      deleteForum(forumId);
    });
  };

  const handleLoadMoreActivity = () => {
    setVisibleActivityCount((prev) => prev + ACTIVITY_INCREMENT);
  };

  const stats = {
    publications: 24,
    forumPosts: 156,
    reputation: 892,
    achievements: 8,
  };

  const handleSave = () => {
    // Save to backend - need to pass the updated data
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

  // Get visible activities for pagination
  const visibleActivities = userActivity?.slice(0, visibleActivityCount) || [];
  const hasMoreActivities =
    userActivity && userActivity.length > visibleActivityCount;

  if (isLoading) {
    return <ProfilePageLoading />;
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-0">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-24 w-24 sm:h-32 sm:w-32">
                  {profileData.profileImage.length ? (
                    <AvatarImage
                      src={
                        profileData.profileImage ||
                        "/placeholder.svg?height=128&width=128"
                      }
                    />
                  ) : null}
                  <AvatarFallback className="text-xl sm:text-2xl">
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

                        // container: "flex justify-center",
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

            <div className="flex-1 space-y-4">
              {!isEditing ? (
                <>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <h1 className="text-2xl sm:text-3xl font-bold">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <Button
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

                  <div className="grid grid-cols-1 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span className="break-all">{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{profileData.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      <span>
                        Joined{" "}
                        {profileData.createdAt
                          ? new Date(profileData.createdAt).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
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
                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={profileData.firstName}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        value={profileData.lastName}
                        name="lastName"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        name="email"
                        onChange={handleChange}
                        disabled={true} // Keep disabled if email shouldn't be editable
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="contactNumber">Phone</Label>
                      <Input
                        id="contactNumber"
                        value={profileData.contactNumber}
                        name="contactNumber"
                        onChange={handleChange}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={profileData.location}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      value={profileData.bio}
                      name="bio"
                      onChange={handleTextAreaChange}
                      rows={3}
                    />
                  </div>

                  <div className="flex gap-2">
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
                    <Button type="button" onClick={handleAddInterest} size="sm">
                      Add
                    </Button>
                  </div>

                  {interests.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {interests.map((interest) => (
                        <Badge
                          key={interest}
                          variant="secondary"
                          className="flex items-center gap-1 text-xs"
                        >
                          {interest}
                          <button
                            onClick={() => handleRemoveTag(interest)}
                            className="ml-1 hover:text-destructive"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  )}

                  <div className="flex flex-col sm:flex-row gap-2">
                    <Button onClick={handleSave} className="w-full sm:w-auto">
                      Save Changes
                    </Button>
                    <Button
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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card>
          <CardContent className="pt-4 sm:pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-blue-600" />
              <div>
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
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-4 w-4 sm:h-5 sm:w-5 text-green-600" />
              <div>
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
            <div className="flex items-center space-x-2">
              <Star className="h-4 w-4 sm:h-5 sm:w-5 text-yellow-600" />
              <div>
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
              <div className="space-y-4">
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
                  <div className="flex justify-center pt-4">
                    <Button
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
                    <div className="text-center py-8 text-muted-foreground">
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
              <div className="space-y-4">
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
                    <div className="text-center py-8 text-muted-foreground">
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
              <div className="space-y-4">
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
                    <div className="text-center py-8 text-muted-foreground">
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
