"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MessageSquare,
  Pin,
  TrendingUp,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { timeAgo } from "@/lib/timeAgo";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role?: string;
}

interface ForumTopic {
  forumId: string;
  topicTitle: string;
  description: string;
  authorId: string;
  author: Author;
  imageUrl: string | null;
  tags: string[];
  category: string;
  createdAt: Date;
  updatedAt: Date;
  forumLikes?: any[];
  forumComments?: any[];
  views?: number;
  isPinned?: boolean;
  isHot?: boolean;
}

interface RecentProps {
  topic: ForumTopic;
}

const Recents = ({ topic }: RecentProps) => {
  return (
    <Card key={topic.forumId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div
          id="recents-flex-1"
          data-testId="recents-flex-1"
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4"
        >
          <div
            id="recents-div-2"
            data-testId="recents-div-2"
            className="flex-1 min-w-0"
          >
            <div
              id="recents-flex-3"
              data-testId="recents-flex-3"
              className="flex items-center gap-2 mb-2 flex-wrap"
            >
              {topic.isPinned && (
                <Pin className="h-4 w-4 text-blue-600 shrink-0" />
              )}
              {topic.isHot && (
                <TrendingUp className="h-4 w-4 text-red-600 shrink-0" />
              )}
              <h3 className="text-lg font-semibold min-w-0">
                <Link
                  id="recents-link-1"
                  data-testId="recents-link-1"
                  href={`/forum/topic/${topic.forumId}`}
                  className="hover:text-blue-600 line-clamp-2"
                >
                  {topic?.topicTitle}
                </Link>
              </h3>
            </div>

            {/* Topic description preview */}
            {topic.description && (
              <p className="text-muted-foreground mb-3 line-clamp-2 text-sm md:text-base">
                {topic.description.length > 150
                  ? topic.description.slice(0, 150) + "..."
                  : topic.description}
              </p>
            )}

            {/* Tags */}
            {topic.tags && topic.tags.length > 0 && (
              <div
                id="recents-flex-4"
                data-testId="recents-flex-4"
                className="flex flex-wrap gap-1 mb-3"
              >
                {topic.tags.slice(0, 3).map((tag, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {topic.tags.length > 3 && (
                  <Badge variant="outline" className="text-xs">
                    +{topic.tags.length - 3}
                  </Badge>
                )}
              </div>
            )}

            <div
              id="recents-flex-5"
              data-testId="recents-flex-5"
              className="flex flex-col sm:flex-row sm:items-center gap-2 mb-3"
            >
              <div
                id="recents-flex-6"
                data-testId="recents-flex-6"
                className="flex items-center gap-2"
              >
                <Avatar
                  id="recents-a-1"
                  data-testId="recents-a-1"
                  className="h-6 w-6 shrink-0"
                >
                  <AvatarImage src={topic?.author?.profileImage || undefined} />
                  <AvatarFallback
                    id="recents-a-2"
                    data-testId="recents-a-2"
                    className="text-xs"
                  >
                    {topic?.author?.firstName?.charAt(0)}
                    {topic?.author?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  id="recents-span-1"
                  data-testId="recents-span-1"
                  className="text-sm text-muted-foreground truncate"
                >
                  by {topic?.author?.firstName} {topic?.author?.lastName}
                </span>
              </div>
              <div
                id="recents-flex-7"
                data-testId="recents-flex-7"
                className="flex items-center gap-2 flex-wrap"
              >
                {topic?.author?.role && (
                  <Badge variant="outline" className="text-xs">
                    {topic?.author?.role}
                  </Badge>
                )}
                <Badge variant="outline" className="text-xs">
                  {topic?.category}
                </Badge>
              </div>
            </div>

            <div
              id="recents-flex-8"
              data-testId="recents-flex-8"
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground"
            >
              <span
                id="recents-span-2"
                data-testId="recents-span-2"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4 shrink-0" />
                {topic.forumComments?.length || 0} replies
              </span>
              {topic.forumLikes && (
                <span
                  id="recents-span-3"
                  data-testId="recents-span-3"
                  className="flex items-center gap-1"
                >
                  <Heart className="h-4 w-4 shrink-0" />
                  {topic.forumLikes.length} likes
                </span>
              )}
              {topic.views && (
                <span
                  id="recents-span-4"
                  data-testId="recents-span-4"
                  className="flex items-center gap-1"
                >
                  <Eye className="h-4 w-4 shrink-0" />
                  {topic.views} views
                </span>
              )}
              <span
                id="recents-span-5"
                data-testId="recents-span-5"
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4 shrink-0" />
                {timeAgo(new Date(topic.createdAt))}
              </span>
            </div>
          </div>
          <div
            id="recents-div-9"
            data-testId="recents-div-9"
            className="w-full md:w-auto"
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full md:w-auto bg-transparent"
            >
              <Link
                id="recents-link-2"
                data-testId="recents-link-2"
                href={`/forum/topic/${topic.forumId}`}
              >
                View Topic
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Recents;
