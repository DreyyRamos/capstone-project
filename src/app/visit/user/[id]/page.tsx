"use client";

import { use } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Trophy,
  Star,
  FileText,
  Users,
  Award,
} from "lucide-react";
import Cookies from "js-cookie";
import {
  useUserVisitorQuery,
  useUserVisitingUserActivityQuery,
} from "@/hooks/useUser";
import { timeAgo } from "@/lib/timeAgo";

type PageProps = {
  params: Promise<{ id: string }>;
};

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

export default function ProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const { data: user } = useUserVisitorQuery(id);
  const { data: userActivity } = useUserVisitingUserActivityQuery(id);
  console.log("user from visit", user);
  console.log("user activity from visit", userActivity);

  const stats = {
    publications: 24,
    forumPosts: 156,
    reputation: 892,
    achievements: 8,
  };

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

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage
                    src={
                      user?.userData?.profileImage ||
                      "/placeholder.svg?height=128&width=128"
                    }
                  />
                  <AvatarFallback className="text-2xl">
                    {user?.userData?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Badge className={getRoleColor(rawRole)} variant="secondary">
                {displayRole}
              </Badge>
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <h1 className="text-3xl font-bold">
                  {user?.userData?.firstName} {user?.userData?.lastName}
                </h1>
              </div>

              <p className="text-muted-foreground">{user?.userData?.bio}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.userData?.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.userData?.contactNumber}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span>{user?.userData?.location}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>
                    Joined{" "}
                    {user?.userData?.createdAt
                      ? new Date(user?.userData?.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {user?.userData?.interests?.map((interest: any) => (
                  <Badge key={interest} variant="secondary">
                    {interest}
                  </Badge>
                ))}
              </div>
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
                <p className="text-2xl font-bold">
                  {user?.userData?.forums?.length || 0}
                </p>
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
          <TabsTrigger value="forums">Forums</TabsTrigger>
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
                {userActivity?.map((activity: any, index: any) => (
                  <div key={index}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        {activity.type === "PUBLISHED" ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          {activity.type === "PUBLISHED" && (
                            <>
                              This user{" "}
                              <span className="font-medium">published</span>{" "}
                              <span className="font-medium">
                                {activity.title}
                              </span>
                            </>
                          )}
                          {activity.type === "REPLIED" && (
                            <>
                              This user{" "}
                              <span className="font-medium">replied to</span>{" "}
                              <span className="font-medium">
                                {activity.parentTitle}
                              </span>
                            </>
                          )}
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <span>
                            {new Date(activity.createdAt).toLocaleString()}
                          </span>
                          {activity.type === "PUBLISHED" ? (
                            <>
                              <span>{activity.likeCounts || 0} likes</span>
                              <span>{activity.commentCount || 0} comments</span>
                            </>
                          ) : (
                            <>
                              <span>{activity.replyCount || 0} replies</span>
                              <span>{activity.likeCount || 0} likes</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    {index < userActivity.length - 1 && (
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
                Articles and content you&apos;ve published
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.userData?.publications?.map((pub: any, index: any) => (
                  <div key={pub?.pubId}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          You <span className="font-medium">published</span>{" "}
                          <span className="font-medium">{pub?.title}</span>
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <Badge variant="outline">{pub?.category}</Badge>
                          <span>{timeAgo(pub?.createdAt)}</span>
                          <span>{pub?.pubComments?.length || 0} comments</span>
                          <span>{pub?.pubLikes?.length || 0} likes</span>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-green-100 text-green-800"
                      >
                        {pub?.status || "Published"}
                      </Badge>
                    </div>
                    {index < user?.userData?.publications?.length - 1 && (
                      <Separator className="mt-4" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Your Forums</CardTitle>
              <CardDescription>Forums you&apos;ve joined in.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {user?.userData?.forums?.map((forum: any, index: any) => (
                  <div key={forum?.forumId}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm">
                          You{" "}
                          <span className="font-medium">
                            created a forum titled{" "}
                          </span>{" "}
                          <span className="font-medium">
                            <b>{forum?.topicTitle}</b>
                          </span>
                        </p>
                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                          <Badge variant="outline">{forum?.category}</Badge>
                          <span>{timeAgo(forum?.createdAt)}</span>
                          <span>
                            {forum?.forumComments?.length || 0} comments
                          </span>
                          <span>{forum?.forumLikes?.length || 0} likes</span>
                        </div>
                      </div>
                    </div>
                    {index < user?.userData?.forums?.length - 1 && (
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
