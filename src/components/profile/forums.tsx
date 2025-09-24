"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { Edit2, Trash2, MessageSquare, MoreVertical } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";

interface UserForumProps {
  forum: any;
  index: number;
  user: any;
  handleDeleteForum: (forumId: string, title: string) => void;
}

const UserForums = ({
  forum,
  index,
  user,
  handleDeleteForum,
}: UserForumProps) => {
  return (
    <div key={forum?.forumId}>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="p-2 bg-muted rounded-lg flex-shrink-0">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            You <span className="font-medium">created a forum titled </span>{" "}
            <span className="font-medium break-words">
              <b>{forum?.topicTitle}</b>
            </span>
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {forum?.category}
            </Badge>
            <span>{timeAgo(forum?.createdAt)}</span>
            <span>{forum?.forumComments?.length || 0} comments</span>
            <span>{forum?.forumLikes?.length || 0} likes</span>
          </div>
        </div>

        {/* Dropdown Menu for Forums */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 p-0 flex-shrink-0"
            >
              <MoreVertical className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem
              asChild
              // onClick={() => handleEditForum(forum?.forumId)}
            >
              <Link href={`/profile/forums/${forum?.forumId}/update`}>
                <Edit2 className="h-4 w-4 mr-2" />
                Edit
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() =>
                handleDeleteForum(forum?.forumId, forum?.topicTitle)
              }
              className="text-red-600"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {index < user?.userData?.forums?.length - 1 && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default UserForums;
