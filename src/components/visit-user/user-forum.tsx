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
    <div id="user-forum-div-1" data-testId="user-forum-div-1" key={forum?.forumId}>
      <div id="user-forum-flex-2" data-testId="user-forum-flex-2" className="flex items-start space-x-4">
        <div id="user-forum-div-3" data-testId="user-forum-div-3" className="p-2 bg-muted rounded-lg">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div id="user-forum-div-4" data-testId="user-forum-div-4" className="flex-1 min-w-0">
          <p className="text-sm">
            This user{" "}
            <span id="user-forum-span-1" data-testId="user-forum-span-1" className="font-medium">created a forum titled </span>{" "}
            <span id="user-forum-span-2" data-testId="user-forum-span-2" className="font-medium break-words">
              <b>{forum?.topicTitle}</b>
            </span>
          </p>
          <div id="user-forum-flex-5" data-testId="user-forum-flex-5" className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline">{forum?.category}</Badge>
            <span id="user-forum-span-3" data-testId="user-forum-span-3">{timeAgo(forum?.createdAt)}</span>
            <span id="user-forum-span-4" data-testId="user-forum-span-4">{forum?.forumComments?.length || 0} comments</span>
            <span id="user-forum-span-5" data-testId="user-forum-span-5">{forum?.forumLikes?.length || 0} likes</span>
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
