"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, Clock, Heart } from "lucide-react";
import ContentDisplay from "@/components/content-display";
import Link from "next/link";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: string;
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
  forumLikes: any[];
  forumComments: any[];
  isPinned: boolean;
}

interface TopicListProps {
  topic: ForumTopic;
}

const TopicList = ({ topic }: TopicListProps) => {
  const truncate = (str: string, max = 100) =>
    str?.length > max ? str.slice(0, max) + "…" : str;
  return (
    <Card key={topic?.forumId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div
          id="topic-list-flex-1"
          data-testId="topic-list-flex-1"
          className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 min-w-0"
        >
          <div
            id="topic-list-div-2"
            data-testId="topic-list-div-2"
            className="flex-1 min-w-0 space-y-3"
          >
            <div
              id="topic-list-div-3"
              data-testId="topic-list-div-3"
              className="flex-1 min-w-0 items-center gap-2 w-full"
            >
              <h3 className="text-lg font-semibold leading-tight truncate break-all">
                <Link
                  id="topic-list-link-1"
                  data-testId="topic-list-link-1"
                  href={`/forum/topic/${topic?.forumId}`}
                  className="hover:text-blue-600 leading-tight break-all"
                >
                  {topic?.topicTitle}
                </Link>
              </h3>
            </div>

            {/* <p className="text-muted-foreground text-sm md:text-base line-clamp-3 truncate break-words"> */}
            <ContentDisplay htmlContent={truncate(topic?.description, 150)} />
            {/* </p> */}

            {topic.tags && topic.tags.length > 0 && (
              <div
                id="topic-list-flex-4"
                data-testId="topic-list-flex-4"
                className="flex flex-wrap gap-1"
              >
                {topic.tags.slice(0, 2).map((tag, index) => (
                  <Badge
                    key={index}
                    variant="outline"
                    className="text-xs px-2 py-1"
                  >
                    {tag}
                  </Badge>
                ))}
                {topic.tags.length > 2 && (
                  <Badge variant="outline" className="text-xs px-2 py-1">
                    +{topic.tags.length - 2}
                  </Badge>
                )}
              </div>
            )}

            <div
              id="topic-list-flex-5"
              data-testId="topic-list-flex-5"
              className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
            >
              <div
                id="topic-list-flex-6"
                data-testId="topic-list-flex-6"
                className="flex items-center gap-2"
              >
                <Avatar
                  id="topic-list-a-1"
                  data-testId="topic-list-a-1"
                  className="h-6 w-6"
                >
                  <AvatarImage src={topic?.author?.profileImage ?? undefined} />
                  <AvatarFallback
                    id="topic-list-a-2"
                    data-testId="topic-list-a-2"
                    className="text-xs"
                  >
                    {topic?.author?.firstName?.charAt(0)}
                    {topic?.author?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <span
                  id="topic-list-span-1"
                  data-testId="topic-list-span-1"
                  className="text-sm text-muted-foreground"
                >
                  by {topic?.author?.firstName} {topic?.author?.lastName}
                </span>
                <Badge variant="outline" className="text-xs">
                  {topic?.author?.role}
                </Badge>
              </div>
              <span
                id="topic-list-span-2"
                data-testId="topic-list-span-2"
                className="text-sm text-muted-foreground"
              >
                {new Date(topic.createdAt).toLocaleDateString()}
              </span>
            </div>

            <div
              id="topic-list-flex-7"
              data-testId="topic-list-flex-7"
              className="flex flex-wrap items-center gap-3 md:gap-4 text-sm text-muted-foreground"
            >
              <span
                id="topic-list-span-3"
                data-testId="topic-list-span-3"
                className="flex items-center gap-1"
              >
                <MessageSquare className="h-4 w-4" />
                {topic?.forumComments?.length || 0} replies
              </span>
              <span
                id="topic-list-span-4"
                data-testId="topic-list-span-4"
                className="flex items-center gap-1"
              >
                <Heart className="h-4 w-4" />
                {topic?.forumLikes?.length || 0} likes
              </span>
              <span
                id="topic-list-span-5"
                data-testId="topic-list-span-5"
                className="flex items-center gap-1"
              >
                <Clock className="h-4 w-4" />
                Updated {new Date(topic.updatedAt).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div
            id="topic-list-flex-8"
            data-testId="topic-list-flex-8"
            className="flex md:flex-col items-stretch md:items-end"
          >
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full md:w-auto bg-transparent"
            >
              <Link
                id="topic-list-link-2"
                data-testId="topic-list-link-2"
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

export default TopicList;
