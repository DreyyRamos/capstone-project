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
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Edit3,
  BookOpen,
  MessageSquare,
  Trophy,
  Star,
  FileText,
  Users,
  Award,
  Target,
  Camera,
} from "lucide-react";
// import { useRole } from "@/contexts/role-context"
import { UploadButton } from "@/utils/uploadthing";
import Cookies from "js-cookie";
import { useUserQuery } from "@/hooks/useUser";

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
  const { data: user, updateUser } = useUserQuery(token);
  console.log("user from profile", user);

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

  const stats = {
    publications: 24,
    forumPosts: 156,
    reputation: 892,
    achievements: 8,
  };

  const recentActivity = [
    {
      id: 1,
      type: "publication",
      title: "Spring Sports Highlights",
      action: "published",
      date: "2 hours ago",
      engagement: { views: 234, comments: 12 },
    },
    {
      id: 2,
      type: "forum",
      title: "Upcoming School Events Discussion",
      action: "replied to",
      date: "5 hours ago",
      engagement: { replies: 8, likes: 15 },
    },
    {
      id: 3,
      type: "publication",
      title: "Student Council Election Results",
      action: "published",
      date: "1 day ago",
      engagement: { views: 567, comments: 28 },
    },
  ];

  const publications = [
    {
      id: 1,
      title: "Spring Sports Highlights",
      category: "Sports",
      date: "2 hours ago",
      status: "Published",
      views: 234,
      comments: 12,
    },
    {
      id: 2,
      title: "Student Council Election Results",
      category: "News",
      date: "1 day ago",
      status: "Published",
      views: 567,
      comments: 28,
    },
    {
      id: 3,
      title: "Art Show Preview",
      category: "Arts",
      date: "3 days ago",
      status: "Published",
      views: 189,
      comments: 7,
    },
  ];

  const achievements = [
    {
      id: 1,
      title: "Top Contributor",
      description: "Published 20+ articles",
      icon: Trophy,
      earned: true,
      date: "March 2024",
    },
    {
      id: 2,
      title: "Community Builder",
      description: "100+ forum posts",
      icon: Users,
      earned: true,
      date: "February 2024",
    },
    {
      id: 3,
      title: "Rising Star",
      description: "500+ reputation points",
      icon: Star,
      earned: true,
      date: "January 2024",
    },
    {
      id: 4,
      title: "Expert Writer",
      description: "50+ published articles",
      icon: Award,
      earned: false,
      progress: "24/50",
    },
  ];

  const handleSave = () => {
    // Save to backend - you'll need to pass the updated data
    updateUser({
      ...profileData,
      interests,
    });
    setIsEditing(false);
    console.log("Profile saved:", profileData);
  };

  // Removed unused handleInputChange function

  const getRoleColor = (role: string) => {
    switch (role.toLowerCase()) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "editor":
        return "bg-blue-100 text-blue-800";
      case "moderator":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const rawRole = Array.isArray(user?.userData?.role)
    ? user.userData.role[0]
    : user?.userData?.role || "student";

  const displayRole =
    String(rawRole).charAt(0).toUpperCase() + String(rawRole).slice(1);

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  {profileData.profileImage.length ? (
                    <AvatarImage
                      src={
                        profileData.profileImage ||
                        "/placeholder.svg?height=128&width=128"
                      }
                    />
                  ) : null}
                  <AvatarFallback className="text-2xl">
                    {profileData.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <UploadButton
                  endpoint="imageUploader"
                  className="absolute -bottom-2 -right-2"
                  appearance={{
                    button:
                      "h-8 w-8 rounded-full p-0 bg-tranparent text-gray-600 border border-gray-500 hover:bg-gray-300 transition-colors shadow-sm !important",
                    allowedContent: "hidden",
                    container: "absolute -bottom-2 -right-2",
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
              </div>

              <Badge className={getRoleColor(rawRole)} variant="secondary">
                {displayRole}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              {!isEditing ? (
                <>
                  <div className="flex items-center justify-between">
                    <h1 className="text-3xl font-bold">
                      {profileData.firstName} {profileData.lastName}
                    </h1>
                    <Button
                      onClick={() => setIsEditing(true)}
                      variant="outline"
                    >
                      <Edit3 className="mr-2 h-4 w-4" />
                      Edit Profile
                    </Button>
                  </div>

                  <p className="text-muted-foreground">{profileData.bio}</p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.contactNumber}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span>{profileData.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
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
                      <Badge key={interest} variant="secondary">
                        {interest}
                      </Badge>
                    ))}
                  </div>
                </>
              ) : (
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <div className="space-y-2">
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
                          className="flex items-center gap-1"
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

                  <div className="flex gap-2">
                    <Button onClick={handleSave}>Save Changes</Button>
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(false)}
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <FileText className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-2xl font-bold">
                  {user?.userData?.publications?.length || 0}
                </p>
                <p className="text-sm text-muted-foreground">Publications</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div>
                <p className="text-2xl font-bold">{stats.forumPosts}</p>
                <p className="text-sm text-muted-foreground">Forum Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Star className="h-5 w-5 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold">{stats.reputation}</p>
                <p className="text-sm text-muted-foreground">Reputation</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-2xl font-bold">{stats.achievements}</p>
                <p className="text-sm text-muted-foreground">Achievements</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>
                Your latest contributions and interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={activity.id}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        {activity.type === "publication" ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          You{" "}
                          <span className="font-medium">{activity.action}</span>{" "}
                          <span className="font-medium">{activity.title}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>{activity.date}</span>
                          {activity.type === "publication" ? (
                            <>
                              <span>{activity.engagement.views} views</span>
                              <span>
                                {activity.engagement.comments} comments
                              </span>
                            </>
                          ) : (
                            <>
                              <span>{activity.engagement.replies} replies</span>
                              <span>{activity.engagement.likes} likes</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < recentActivity.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Publications</CardTitle>
              <CardDescription>
                Articles and content you've published
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {publications.map((pub, index) => (
                  <div key={pub.id}>
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-medium">{pub.title}</h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <Badge variant="outline">{pub.category}</Badge>
                          <span>{pub.date}</span>
                          <span>{pub.views} views</span>
                          <span>{pub.comments} comments</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {pub.status}
                      </Badge>
                    </div>
                    {index < publications.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
              <CardDescription>
                Your milestones and accomplishments
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 border rounded-lg ${
                      achievement.earned
                        ? "bg-green-50 border-green-200"
                        : "bg-gray-50 border-gray-200"
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className={`p-2 rounded-lg ${
                          achievement.earned
                            ? "bg-green-100 text-green-600"
                            : "bg-gray-100 text-gray-400"
                        }`}
                      >
                        <achievement.icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium">{achievement.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {achievement.description}
                        </p>
                        {achievement.earned ? (
                          <p className="text-xs text-green-600 mt-1">
                            Earned {achievement.date}
                          </p>
                        ) : (
                          <p className="text-xs text-muted-foreground mt-1">
                            Progress: {achievement.progress}
                          </p>
                        )}
                      </div>
                    </div>
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
