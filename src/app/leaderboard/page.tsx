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
          <span className="text-lg font-bold h-6 w-6 text-yellow-500">
            #{position}
          </span>
        );
      case 2:
        return (
          <span className="text-lg font-bold h-6 w-6 text-gray-500">
            #{position}
          </span>
        );
      case 3:
        return (
          <span className="text-lg font-bold h-6 w-6 text-amber-600">
            #{position}
          </span>
        );
      default:
        return (
          <span className="text-lg font-bold text-muted-foreground">
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Leaderboard</h1>
          <p className="text-muted-foreground">
            Top contributors ranked by reputation points
          </p>
        </div>
      </div>

      {/* Reputation System Info */}
      <Alert>
        <Info className="h-4 w-4" />
        <AlertTitle>How Reputation Points Work</AlertTitle>
        <AlertDescription className="mt-2">
          <div className="space-y-2">
            <p className="text-sm">
              Reputation points are earned through positive contributions to the
              school publication community:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4 text-green-600" />
                  <span>
                    <strong>+50 points</strong> - Publishing an article
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4 text-green-600" />
                  <span>
                    <strong>+15 points</strong> - Creating a forum topic
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Plus className="h-4 w-4 text-green-600" />
                  <span>
                    <strong>+10 points</strong> - Helpful comment/reply
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Heart className="h-4 w-4 text-red-500" />
                  <span>
                    <strong>+8 points</strong> - Receiving likes on contents,
                    comments and replies
                  </span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm">
                  <Eye className="h-4 w-4 text-purple-600" />
                  <span>
                    <strong>+1 point</strong> - Daily login
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MessageCircle className="h-4 w-4 text-indigo-600" />
                  <span>
                    <strong>+1 point</strong> - Participating in discussions
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Minus className="h-4 w-4 text-red-600" />
                  <span>
                    <strong>-5 points</strong> - Content violations
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Minus className="h-4 w-4 text-red-600" />
                  <span>
                    <strong>-10 points</strong> - Spam or inappropriate behavior
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AlertDescription>
      </Alert>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
                <div>
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Second Place */}
              <div className="order-2 md:order-1">
                <Card className="bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200 dark:from-gray-900/20 dark:to-gray-800/20 dark:border-gray-700">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Medal className="h-12 w-12 text-gray-400" />
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage
                        src={sortedUsers[1]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-lg">
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
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-gray-600">
                        {sortedUsers[1]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[1]?._count?.publications || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[1]?._count?.forums || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[1])}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        {sortedUsers[1]?._count?.likesReceived || 0}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* First Place */}
              <div className="order-1 md:order-2">
                <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200 dark:from-yellow-900/20 dark:to-yellow-800/20 dark:border-yellow-700 transform md:scale-105">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Trophy className="h-16 w-16 text-yellow-500" />
                    </div>
                    <Avatar className="h-20 w-20 mx-auto mb-4 ring-4 ring-yellow-200">
                      <AvatarImage
                        src={sortedUsers[0]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-xl">
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
                    <div className="mt-4">
                      <p className="text-4xl font-bold text-yellow-600">
                        {sortedUsers[0]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[0]?._count?.publications || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[0]?._count?.forums || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[0])}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        {sortedUsers[0]?._count?.likesReceived || 0}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Third Place */}
              <div className="order-3">
                <Card className="bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200 dark:from-amber-900/20 dark:to-amber-800/20 dark:border-amber-700">
                  <CardContent className="pt-6 text-center">
                    <div className="flex justify-center mb-4">
                      <Award className="h-12 w-12 text-amber-600" />
                    </div>
                    <Avatar className="h-16 w-16 mx-auto mb-4">
                      <AvatarImage
                        src={sortedUsers[2]?.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback className="text-lg">
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
                    <div className="mt-4">
                      <p className="text-3xl font-bold text-amber-600">
                        {sortedUsers[2]?.reputationPoints}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        reputation points
                      </p>
                    </div>
                    <div className="flex justify-center gap-4 mt-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        {sortedUsers[2]?._count?.publications || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {sortedUsers[2]?._count?.forums || 0}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        {getTotalComments(sortedUsers[2])}
                      </div>
                      <div className="flex items-center gap-1">
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
          <div className="space-y-2">
            {sortedUsers.map((user: any, index: number) => {
              const position = index + 1;
              return (
                <div
                  key={user.id}
                  className={`flex items-center justify-between p-4 border rounded-lg transition-colors ${getRankStyle(
                    position
                  )}`}
                >
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12">
                      {getRankIcon(position)}
                    </div>
                    <Avatar className="h-12 w-12">
                      <AvatarImage
                        src={user.profileImage || "/placeholder.svg"}
                      />
                      <AvatarFallback>
                        {user.firstName?.charAt(0)}
                        {user.lastName?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold">
                          {user.firstName} {user.lastName}
                        </h3>
                        <Badge
                          className={
                            roleColors[user.role as keyof typeof roleColors]
                          }
                          variant="secondary"
                        >
                          {user.role}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {user.email}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          Joined {new Date(user.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-6">
                    <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{user._count?.publications || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        <span>{user._count?.forums || 0}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-4 w-4" />
                        <span>{getTotalComments(user)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span>{user._count?.likesReceived || 0}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        {user.reputationPoints}
                      </p>
                      <p className="text-xs text-muted-foreground">points</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
