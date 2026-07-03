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
import { Edit2, Trash2, FileText, MoreVertical } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";

interface UserPublicationProps {
  pub: any;
  index: number;
  user: any;
  handleDeletePublication: (pubId: string, title: string) => void;
}

const ProfilePublications = ({
  pub,
  index,
  user,
  handleDeletePublication,
}: UserPublicationProps) => {
  return (
    <div id="publications-div-1" data-testId="publications-div-1" key={pub?.pubId}>
      <div id="publications-flex-2" data-testId="publications-flex-2" className="flex items-start space-x-3 sm:space-x-4">
        <div id="publications-div-3" data-testId="publications-div-3" className="p-2 bg-muted rounded-lg flex-shrink-0">
          <FileText className="h-4 w-4" />
        </div>
        <div id="publications-div-4" data-testId="publications-div-4" className="flex-1 min-w-0">
          <p className="text-sm">
            You <span id="publications-span-1" data-testId="publications-span-1" className="font-medium">published</span>{" "}
            <span id="publications-span-2" data-testId="publications-span-2" className="font-medium break-words">{pub?.title}</span>
          </p>
          <div id="publications-flex-5" data-testId="publications-flex-5" className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {pub?.category}
            </Badge>
            <span id="publications-span-3" data-testId="publications-span-3">{timeAgo(pub?.createdAt)}</span>
            <span id="publications-span-4" data-testId="publications-span-4">{pub?.pubComments?.length || 0} comments</span>
            <span id="publications-span-5" data-testId="publications-span-5">{pub?.pubLikes?.length || 0} likes</span>
          </div>
        </div>
        <div id="publications-flex-6" data-testId="publications-flex-6" className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 text-xs"
          >
            {pub?.status || "Published"}
          </Badge>

          {/* Dropdown Menu for Publications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button id="publications-button-1" data-testId="publications-button-1"
                variant="ghost"
                size="sm"
                className="h-8 w-8 p-0 flex-shrink-0"
              >
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link id="publications-link-1" data-testId="publications-link-1" href={`/profile/publication/${pub?.pubId}/update`}>
                  <Edit2 className="h-4 w-4 mr-2" />
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => handleDeletePublication(pub?.pubId, pub?.title)}
                className="text-red-600"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {index < user?.userData?.publications?.length - 1 && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default ProfilePublications;
