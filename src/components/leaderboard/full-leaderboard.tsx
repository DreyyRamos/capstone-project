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

interface LeaderboardProps {
  user: any;
  position: number;
}

const FullLeaderboard = ({ user, position }: LeaderboardProps) => {
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
          <span id="full-leaderboard-span-1" data-testId="full-leaderboard-span-1" className="text-lg font-bold h-6 w-6 text-yellow-500">
            #{position}
          </span>
        );
      case 2:
        return (
          <span id="full-leaderboard-span-2" data-testId="full-leaderboard-span-2" className="text-lg font-bold h-6 w-6 text-gray-500">
            #{position}
          </span>
        );
      case 3:
        return (
          <span id="full-leaderboard-span-3" data-testId="full-leaderboard-span-3" className="text-lg font-bold h-6 w-6 text-amber-600">
            #{position}
          </span>
        );
      default:
        return (
          <span id="full-leaderboard-span-4" data-testId="full-leaderboard-span-4" className="text-lg font-bold text-muted-foreground">
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
  const roleColors = {
    ADMIN: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
    MODERATOR: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    STUDENT:
      "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    EDITOR:
      "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
  };
  return (
    <div
      id="full-leaderboard-div-1"
      data-testId="full-leaderboard-div-1"
      key={user.id}
      className={`flex items-center justify-between p-3 sm:p-4 border rounded-lg transition-colors ${getRankStyle(
        position,
      )}`}
    >
      <div
        id="full-leaderboard-flex-2"
        data-testId="full-leaderboard-flex-2"
        className="flex items-center gap-2 sm:gap-4 min-w-0 flex-1"
      >
        <div
          id="full-leaderboard-flex-3"
          data-testId="full-leaderboard-flex-3"
          className="flex items-center justify-center w-8 h-8 sm:w-12 sm:h-12 flex-shrink-0"
        >
          {getRankIcon(position)}
        </div>
        <Avatar
          id="full-leaderboard-a-1"
          data-testId="full-leaderboard-a-1"
          className="h-10 w-10 sm:h-12 sm:w-12 flex-shrink-0"
        >
          <AvatarImage src={user.profileImage || "/placeholder.svg"} />
          <AvatarFallback
            id="full-leaderboard-a-2"
            data-testId="full-leaderboard-a-2"
          >
            {user.firstName?.charAt(0)}
            {user.lastName?.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div
          id="full-leaderboard-div-4"
          data-testId="full-leaderboard-div-4"
          className="min-w-0 flex-1"
        >
          <div
            id="full-leaderboard-flex-5"
            data-testId="full-leaderboard-flex-5"
            className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2 mb-1"
          >
            <h3 className="font-semibold text-sm sm:text-base truncate">
              {user.firstName} {user.lastName}
            </h3>
            <Badge
              className={roleColors[user.role as keyof typeof roleColors]}
              variant="secondary"
              // size="sm"
            >
              {user.role}
            </Badge>
          </div>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {user.email}
          </p>
          <div
            id="full-leaderboard-flex-6"
            data-testId="full-leaderboard-flex-6"
            className="flex items-center text-xs text-muted-foreground mt-1"
          >
            <Calendar className="h-3 w-3 mr-1 flex-shrink-0" />
            <span
              id="full-leaderboard-span-5"
              data-testId="full-leaderboard-span-5"
              className="truncate"
            >
              Joined {new Date(user.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      <div
        id="full-leaderboard-flex-7"
        data-testId="full-leaderboard-flex-7"
        className="flex flex-col items-end gap-2 flex-shrink-0"
      >
        {/* Mobile stats - show only on small screens */}
        <div
          id="full-leaderboard-flex-8"
          data-testId="full-leaderboard-flex-8"
          className="flex sm:hidden items-center gap-2 text-xs text-muted-foreground"
        >
          <div
            id="full-leaderboard-flex-9"
            data-testId="full-leaderboard-flex-9"
            className="flex items-center gap-1"
          >
            <BookOpen className="h-3 w-3" />
            <span
              id="full-leaderboard-span-6"
              data-testId="full-leaderboard-span-6"
            >
              {user._count?.publications || 0}
            </span>
          </div>
          <div
            id="full-leaderboard-flex-10"
            data-testId="full-leaderboard-flex-10"
            className="flex items-center gap-1"
          >
            <MessageSquare className="h-3 w-3" />
            <span
              id="full-leaderboard-span-7"
              data-testId="full-leaderboard-span-7"
            >
              {user._count?.forums || 0}
            </span>
          </div>
          <div
            id="full-leaderboard-flex-11"
            data-testId="full-leaderboard-flex-11"
            className="flex items-center gap-1"
          >
            <Heart className="h-3 w-3 text-red-500" />
            <span
              id="full-leaderboard-span-8"
              data-testId="full-leaderboard-span-8"
            >
              {user._count?.likesReceived || 0}
            </span>
          </div>
        </div>

        {/* Desktop stats - show only on larger screens */}
        <div
          id="full-leaderboard-div-12"
          data-testId="full-leaderboard-div-12"
          className="hidden sm:flex items-center gap-4 text-sm text-muted-foreground"
        >
          <div
            id="full-leaderboard-flex-13"
            data-testId="full-leaderboard-flex-13"
            className="flex items-center gap-1"
          >
            <BookOpen className="h-4 w-4" />
            <span
              id="full-leaderboard-span-9"
              data-testId="full-leaderboard-span-9"
            >
              {user._count?.publications || 0}
            </span>
          </div>
          <div
            id="full-leaderboard-flex-14"
            data-testId="full-leaderboard-flex-14"
            className="flex items-center gap-1"
          >
            <MessageSquare className="h-4 w-4" />
            <span
              id="full-leaderboard-span-10"
              data-testId="full-leaderboard-span-10"
            >
              {user._count?.forums || 0}
            </span>
          </div>
          <div
            id="full-leaderboard-flex-15"
            data-testId="full-leaderboard-flex-15"
            className="flex items-center gap-1"
          >
            <MessageCircle className="h-4 w-4" />
            <span
              id="full-leaderboard-span-11"
              data-testId="full-leaderboard-span-11"
            >
              {getTotalComments(user)}
            </span>
          </div>
          <div
            id="full-leaderboard-flex-16"
            data-testId="full-leaderboard-flex-16"
            className="flex items-center gap-1"
          >
            <Heart className="h-4 w-4 text-red-500" />
            <span
              id="full-leaderboard-span-12"
              data-testId="full-leaderboard-span-12"
            >
              {user._count?.likesReceived || 0}
            </span>
          </div>
        </div>

        <div
          id="full-leaderboard-div-17"
          data-testId="full-leaderboard-div-17"
          className="text-right"
        >
          <p className="text-xl sm:text-2xl font-bold">
            {user.reputationPoints}
          </p>
          <p className="text-xs text-muted-foreground">points</p>
        </div>
      </div>
    </div>
  );
};

export default FullLeaderboard;
