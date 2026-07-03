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
    <div id="forums-div-1" data-testId="forums-div-1" key={forum?.forumId}>
      <div id="forums-flex-2" data-testId="forums-flex-2" className="flex items-start space-x-3 sm:space-x-4">
        <div id="forums-div-3" data-testId="forums-div-3" className="p-2 bg-muted rounded-lg flex-shrink-0">
          <MessageSquare className="h-4 w-4" />
        </div>
        <div id="forums-div-4" data-testId="forums-div-4" className="flex-1 min-w-0">
          <p className="text-sm">
            You <span id="forums-span-1" data-testId="forums-span-1" className="font-medium">created a forum titled </span>{" "}
            <span id="forums-span-2" data-testId="forums-span-2" className="font-medium break-words">
              <b>{forum?.topicTitle}</b>
            </span>
          </p>
          <div id="forums-flex-5" data-testId="forums-flex-5" className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {forum?.category}
            </Badge>
            <span id="forums-span-3" data-testId="forums-span-3">{timeAgo(forum?.createdAt)}</span>
            <span id="forums-span-4" data-testId="forums-span-4">{forum?.forumComments?.length || 0} comments</span>
            <span id="forums-span-5" data-testId="forums-span-5">{forum?.forumLikes?.length || 0} likes</span>
          </div>
        </div>

        {/* Dropdown Menu for Forums */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button id="forums-button-1" data-testId="forums-button-1"
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
              <Link id="forums-link-1" data-testId="forums-link-1" href={`/profile/forums/${forum?.forumId}/update`}>
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
