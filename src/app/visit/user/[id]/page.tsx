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
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Star,
  FileText,
} from "lucide-react";
import {
  useUserVisitorQuery,
  useUserVisitingUserActivityQuery,
} from "@/hooks/useUser";
import ProfilePageLoading from "./loading";
import RecentActivities from "@/components/visit-user/recent-activities";
import UserPublication from "@/components/visit-user/user-publication";
import UserForum from "@/components/visit-user/user-forum";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function ProfilePage({ params }: PageProps) {
  const { id } = use(params);
  const { data: user, isLoading } = useUserVisitorQuery(id);
  const { data: userActivity } = useUserVisitingUserActivityQuery(id);

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

  if (isLoading) {
    return <ProfilePageLoading />;
  }

  return (
    <div
      id="page-div-1"
      data-testId="page-div-1"
      className="max-w-4xl mx-auto space-y-6"
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
                  className="h-32 w-32"
                >
                  <AvatarImage
                    src={
                      user?.userData?.profileImage ||
                      "/placeholder.svg?height=128&width=128"
                    }
                  />
                  <AvatarFallback
                    id="page-a-2"
                    data-testId="page-a-2"
                    className="text-2xl"
                  >
                    {user?.userData?.firstName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </div>

              <Badge className={getRoleColor(rawRole)} variant="secondary">
                {displayRole}
              </Badge>
            </div>

            <div
              id="page-div-5"
              data-testId="page-div-5"
              className="flex-1 space-y-4"
            >
              <div
                id="page-flex-6"
                data-testId="page-flex-6"
                className="flex items-center justify-between"
              >
                <h1 className="text-3xl font-bold">
                  {user?.userData?.firstName} {user?.userData?.lastName}
                </h1>
              </div>

              <p className="text-muted-foreground">{user?.userData?.bio}</p>

              <div
                id="page-grid-7"
                data-testId="page-grid-7"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm"
              >
                <div
                  id="page-flex-8"
                  data-testId="page-flex-8"
                  className="flex items-center gap-2"
                >
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span id="page-span-1" data-testId="page-span-1">
                    {user?.userData?.email}
                  </span>
                </div>
                <div
                  id="page-flex-9"
                  data-testId="page-flex-9"
                  className="flex items-center gap-2"
                >
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span id="page-span-2" data-testId="page-span-2">
                    {user?.userData?.contactNumber}
                  </span>
                </div>
                <div
                  id="page-flex-10"
                  data-testId="page-flex-10"
                  className="flex items-center gap-2"
                >
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span id="page-span-3" data-testId="page-span-3">
                    {user?.userData?.location}
                  </span>
                </div>
                <div
                  id="page-flex-11"
                  data-testId="page-flex-11"
                  className="flex items-center gap-2"
                >
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span id="page-span-4" data-testId="page-span-4">
                    Joined{" "}
                    {user?.userData?.createdAt
                      ? new Date(user?.userData?.createdAt).toLocaleDateString()
                      : "N/A"}
                  </span>
                </div>
              </div>

              <div
                id="page-flex-12"
                data-testId="page-flex-12"
                className="flex flex-wrap gap-2"
              >
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
      <div
        id="page-grid-13"
        data-testId="page-grid-13"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        <Card>
          <CardContent className="pt-6">
            <div
              id="page-flex-14"
              data-testId="page-flex-14"
              className="flex items-center space-x-2"
            >
              <FileText className="h-5 w-5 text-blue-600" />
              <div id="page-div-15" data-testId="page-div-15">
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
            <div
              id="page-flex-16"
              data-testId="page-flex-16"
              className="flex items-center space-x-2"
            >
              <MessageSquare className="h-5 w-5 text-green-600" />
              <div id="page-div-17" data-testId="page-div-17">
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
            <div
              id="page-flex-18"
              data-testId="page-flex-18"
              className="flex items-center space-x-2"
            >
              <Star className="h-5 w-5 text-yellow-600" />
              <div id="page-div-19" data-testId="page-div-19">
                <p className="text-2xl font-bold">
                  {user?.userData?.reputationPoints}
                </p>
                <p className="text-sm text-muted-foreground">Reputation</p>
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
              <div
                id="page-div-20"
                data-testId="page-div-20"
                className="space-y-4"
              >
                {userActivity?.map((activity: any, index: any) => (
                  <RecentActivities
                    key={index}
                    index={index}
                    activity={activity}
                    userActivity={userActivity}
                  />
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
              <div
                id="page-div-21"
                data-testId="page-div-21"
                className="space-y-4"
              >
                {user?.userData?.publications?.map((pub: any, index: any) => (
                  <UserPublication
                    key={pub?.pubId}
                    index={index}
                    pub={pub}
                    user={user}
                  />
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
              <div
                id="page-div-22"
                data-testId="page-div-22"
                className="space-y-4"
              >
                {user?.userData?.forums?.map((forum: any, index: any) => (
                  <UserForum
                    key={forum?.forumId}
                    forum={forum}
                    index={index}
                    user={user}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
