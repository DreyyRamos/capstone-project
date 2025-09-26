"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { MessageSquare } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";

interface ForumProps {
  forum: any;
  index: number;
  user: any;
}

const UserForum = ({ forum, index, user }: ForumProps) => {
  return (
    <div key={forum?.forumId}>
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-muted rounded-lg">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            You <span className="font-medium">created a forum titled </span>{" "}
            <span className="font-medium">
              <b>{forum?.topicTitle}</b>
            </span>
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline">{forum?.category}</Badge>
            <span>{timeAgo(forum?.createdAt)}</span>
            <span>{forum?.forumComments?.length || 0} comments</span>
            <span>{forum?.forumLikes?.length || 0} likes</span>
          </div>
        </div>
      </div>
      {index < user?.userData?.forums?.length - 1 && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default UserForum;
