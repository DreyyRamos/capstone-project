"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Trophy,
  Medal,
  Award,
  Crown,
  Star,
  TrendingUp,
  Users,
  BookOpen,
  MessageSquare,
  Calendar,
  Info,
  Plus,
  Minus,
  MessageCircle,
  Eye,
  Heart,
} from "lucide-react";
import { useFetchLeaderboard } from "@/hooks/usePublicData";
import LeaderboardLoading from "./loading";
import FullLeaderboard from "@/components/leaderboard/full-leaderboard";

export default function LeaderboardPage() {
  const { data: users, isLoading } = useFetchLeaderboard();

  // Sort users by reputation points in descending order
  const sortedUsers =
    users?.users?.sort(
      (a: any, b: any) => b.reputationPoints - a.reputationPoints
    ) || [];

  const roleColors = {
    ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    MODERATOR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    STUDENT:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    EDITOR:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };

  // Calculate total comments for a user
  const getTotalComments = (user: any) => {
    const counts = user._count || {};
    return (
      (counts.pubComments || 0) +
      (counts.forumComments || 0) +
      (counts.publicationCommentReplies || 0) +
      (counts.forumCommentReplies || 0) +
      (counts.publicationCommentReplyToReplies || 0) +
      (counts.forumCommentReplyToReplies || 0)
    );
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return (
          <span id="page-span-1" data-testId="page-span-1" className="text-lg font-bold h-6 w-6 text-yellow-500">
            #{position}
          </span>
        );
      case 2:
        return (
          <span id="page-span-2" data-testId="page-span-2" className="text-lg font-bold h-6 w-6 text-gray-500">
            #{position}
          </span>
        );
      case 3:
        return (
          <span id="page-span-3" data-testId="page-span-3" className="text-lg font-bold h-6 w-6 text-amber-600">
            #{position}
          </span>
        );
      default:
        return (
          <span id="page-span-4" data-testId="page-span-4" className="text-lg font-bold text-muted-foreground">
            #{position}
          </span>
        );
    }
  };

  const getRankStyle = (position: number) => {
    switch (position) {
      case 1:
        return "bg-gradient-to-r from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700";
      case 2:
        return "bg-gradient-to-r from-gray-50 to-gray-100 border-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 dark:border-gray-700";
      case 3:
        return "bg-gradient-to-r from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700";
      default:
        return "hover:bg-muted/50";
    }
  };

  const stats = [
    {
      label: "Total Users",
      value: sortedUsers.length.toString(),
      icon: Users,
      color: "text-blue-600",
    },
    {
      label: "Highest Score",
      value: sortedUsers[0]?.reputationPoints?.toString() || "0",
      icon: Crown,
      color: "text-yellow-600",
    },
    {
      label: "Average Score",
      value: Math.round(
        sortedUsers.reduce(
          (acc: number, user: any) => acc + user.reputationPoints,
          0
        ) / sortedUsers.length || 0
      ).toString(),
      icon: TrendingUp,
      color: "text-green-600",
    },
    {
      label: "Active Contributors",
      value: sortedUsers
        .filter((user: any) => user.reputationPoints > 100)
        .length.toString(),
      icon: Star,
      color: "text-purple-600",
    },
  ];

  if (isLoading) {
    return <LeaderboardLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="space-y-6">
      {/* Header */}
      <div
        id="page-flex-2"
        data-testId="page-flex-2"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div id="page-div-3" data-testId="page-div-3">
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors ranked by reputation points
          </p>
        </div>
      </div>

      {/* Reputation System Info */}
      <Alert id="page-a-1" data-testId="page-a-1">
        <Info className="h-4 w-4" />
        <AlertTitle id="page-a-2" data-testId="page-a-2">
          How Reputation Points Work
        </AlertTitle>
        <AlertDescription id="page-a-3" data-testId="page-a-3" className="mt-2">
          <div id="page-div-4" data-testId="page-div-4" className="space-y-2">
            <p className="text-sm">
              Reputation points are earned through positive contributions to the
              school publication community:
            </p>
            <div
              id="page-grid-5"
              data-testId="page-grid-5"
              className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3"
            >
              <div
                id="page-div-6"
                data-testId="page-div-6"
                className="space-y-2"
              >
                <div
                  id="page-flex-7"
                  data-testId="page-flex-7"
                  className="flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4 text-green-600" />
                  <span id="page-span-5" data-testId="page-span-5">
                    <strong>+50 points</strong> - Publishing an article
                  </span>
                </div>
                <div
                  id="page-flex-8"
                  data-testId="page-flex-8"
                  className="flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4 text-green-600" />
                  <span id="page-span-6" data-testId="page-span-6">
                    <strong>+15 points</strong> - Creating a forum topic
                  </span>
                </div>
                <div
                  id="page-flex-9"
                  data-testId="page-flex-9"
                  className="flex items-center gap-2 text-sm"
                >
                  <Plus className="h-4 w-4 text-green-600" />
                  <span id="page-span-7" data-testId="page-span-7">
                    <strong>+10 points</strong> - Helpful comment/reply
                  </span>
                </div>
                <div
                  id="page-flex-10"
                  data-testId="page-flex-10"
                  className="flex items-center gap-2 text-sm"
                >
                  <Heart className="h-4 w-4 text-red-500" />
                  <span id="page-span-8" data-testId="page-span-8">
                    <strong>+8 points</strong> - Receiving likes on contents,
                    comments and replies
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div
        id="page-grid-11"
        data-testId="page-grid-11"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div
                id="page-flex-12"
                data-testId="page-flex-12"
                className="flex items-center space-x-2"
              >
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div id="page-div-13" data-testId="page-div-13">
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top 3 Podium */}
      {sortedUsers.length >= 3 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trophy className="h-5 w-5 text-yellow-500" />
              Top Contributors
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div
              id="page-grid-14"
              data-testId="page-grid-14"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              {/* Second Place */}
              <div
                id="page-div-15"
                data-testId="page-div-15"
                className="order-2 md:order-1"
              >
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 dark:border-gray-700">
                  <CardContent className="pt-6 text-center">
                    <div
                      id="page-flex-16"
                      data-testId="page-flex-16"
                      className="flex justify-center mb-4"
                    >
                      <Medal className="h-12 w-12 text-gray-400" />
                    </div>
                    <Avatar
                      id="page-a-4"
                      data-testId="page-a-4"
                      className="h-16 w-16 mx-auto mb-4"
                    >
                      <AvatarImage
                        src={sortedUsers[1]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback
                        id="page-a-5"
                        data-testId="page-a-5"
                        className="text-lg"
                      >
                        {sortedUsers[1]?.firstName?.charAt(0)}
                        {sortedUsers[1]?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-2">
                      {sortedUsers[1]?.firstName} {sortedUsers[1]?.lastName}
                    </h3>
                    <Badge
                      className={
                        roleColors[
                          sortedUsers[1]?.role as keyof typeof roleColors
                        ]
                      }
                      variant="secondary"
                    >
                      {sortedUsers[1]?.role}
                    </Badge>
                    <div
                      id="page-div-17"
                      data-testId="page-div-17"
                      className="mt-4"
                    >
                      <p className="text-3xl font-bold text-gray-600">
                        {sortedUsers[1]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div
                      id="page-flex-18"
                      data-testId="page-flex-18"
                      className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground"
                    >
                      <div
                        id="page-flex-19"
                        data-testId="page-flex-19"
                        className="flex items-center gap-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[1]?._count?.publications || 0}
                      </div>
                      <div
                        id="page-flex-20"
                        data-testId="page-flex-20"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[1]?._count?.forums || 0}
                      </div>
                      <div
                        id="page-flex-21"
                        data-testId="page-flex-21"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[1])}
                      </div>
                      <div
                        id="page-flex-22"
                        data-testId="page-flex-22"
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4 text-red-500" />
                        {sortedUsers[1]?._count?.likesReceived || 0}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* First Place */}
              <div
                id="page-div-23"
                data-testId="page-div-23"
                className="order-1 md:order-2"
              >
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700 transform md:scale-105">
                  <CardContent className="pt-6 text-center">
                    <div
                      id="page-flex-24"
                      data-testId="page-flex-24"
                      className="flex justify-center mb-4"
                    >
                      <Trophy className="h-16 w-16 text-yellow-500" />
                    </div>
                    <Avatar
                      id="page-a-6"
                      data-testId="page-a-6"
                      className="h-20 w-20 mx-auto mb-4 ring-4 ring-yellow-200"
                    >
                      <AvatarImage
                        src={sortedUsers[0]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback
                        id="page-a-7"
                        data-testId="page-a-7"
                        className="text-xl"
                      >
                        {sortedUsers[0]?.firstName?.charAt(0)}
                        {sortedUsers[0]?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-bold text-xl mb-2">
                      {sortedUsers[0]?.firstName} {sortedUsers[0]?.lastName}
                    </h3>
                    <Badge
                      className={
                        roleColors[
                          sortedUsers[0]?.role as keyof typeof roleColors
                        ]
                      }
                      variant="secondary"
                    >
                      {sortedUsers[0]?.role}
                    </Badge>
                    <div
                      id="page-div-25"
                      data-testId="page-div-25"
                      className="mt-4"
                    >
                      <p className="text-4xl font-bold text-yellow-600">
                        {sortedUsers[0]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div
                      id="page-flex-26"
                      data-testId="page-flex-26"
                      className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground"
                    >
                      <div
                        id="page-flex-27"
                        data-testId="page-flex-27"
                        className="flex items-center gap-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[0]?._count?.publications || 0}
                      </div>
                      <div
                        id="page-flex-28"
                        data-testId="page-flex-28"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[0]?._count?.forums || 0}
                      </div>
                      <div
                        id="page-flex-29"
                        data-testId="page-flex-29"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[0])}
                      </div>
                      <div
                        id="page-flex-30"
                        data-testId="page-flex-30"
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4 text-red-500" />
                        {sortedUsers[0]?._count?.likesReceived || 0}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third Place */}
              <div
                id="page-div-31"
                data-testId="page-div-31"
                className="order-3"
              >
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700">
                  <CardContent className="pt-6 text-center">
                    <div
                      id="page-flex-32"
                      data-testId="page-flex-32"
                      className="flex justify-center mb-4"
                    >
                      <Award className="h-12 w-12 text-amber-600" />
                    </div>
                    <Avatar
                      id="page-a-8"
                      data-testId="page-a-8"
                      className="h-16 w-16 mx-auto mb-4"
                    >
                      <AvatarImage
                        src={sortedUsers[2]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback
                        id="page-a-9"
                        data-testId="page-a-9"
                        className="text-lg"
                      >
                        {sortedUsers[2]?.firstName?.charAt(0)}
                        {sortedUsers[2]?.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <h3 className="font-semibold text-lg mb-2">
                      {sortedUsers[2]?.firstName} {sortedUsers[2]?.lastName}
                    </h3>
                    <Badge
                      className={
                        roleColors[
                          sortedUsers[2]?.role as keyof typeof roleColors
                        ]
                      }
                      variant="secondary"
                    >
                      {sortedUsers[2]?.role}
                    </Badge>
                    <div
                      id="page-div-33"
                      data-testId="page-div-33"
                      className="mt-4"
                    >
                      <p className="text-3xl font-bold text-amber-600">
                        {sortedUsers[2]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div
                      id="page-flex-34"
                      data-testId="page-flex-34"
                      className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground"
                    >
                      <div
                        id="page-flex-35"
                        data-testId="page-flex-35"
                        className="flex items-center gap-1"
                      >
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[2]?._count?.publications || 0}
                      </div>
                      <div
                        id="page-flex-36"
                        data-testId="page-flex-36"
                        className="flex items-center gap-1"
                      >
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[2]?._count?.forums || 0}
                      </div>
                      <div
                        id="page-flex-37"
                        data-testId="page-flex-37"
                        className="flex items-center gap-1"
                      >
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[2])}
                      </div>
                      <div
                        id="page-flex-38"
                        data-testId="page-flex-38"
                        className="flex items-center gap-1"
                      >
                        <Heart className="h-4 w-4 text-red-500" />
                        {sortedUsers[2]?._count?.likesReceived || 0}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Full Leaderboard */}
      <Card>
        <CardHeader>
          <CardTitle>Full Rankings</CardTitle>
        </CardHeader>
        <CardContent>
          <div id="page-div-39" data-testId="page-div-39" className="space-y-2">
            {sortedUsers.map((user: any, index: number) => {
              const position = index + 1;
              return (
                <FullLeaderboard
                  key={user.id}
                  user={user}
                  position={position}
                />
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

