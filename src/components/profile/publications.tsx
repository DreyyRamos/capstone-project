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
    <div key={pub?.pubId}>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="p-2 bg-muted rounded-lg flex-shrink-0">
          <FileText className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            You <span className="font-medium">published</span>{" "}
            <span className="font-medium break-words">{pub?.title}</span>
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline" className="text-xs">
              {pub?.category}
            </Badge>
            <span>{timeAgo(pub?.createdAt)}</span>
            <span>{pub?.pubComments?.length || 0} comments</span>
            <span>{pub?.pubLikes?.length || 0} likes</span>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-end sm:items-center gap-2">
          <Badge
            variant="secondary"
            className="bg-green-100 text-green-800 text-xs"
          >
            {pub?.status || "Published"}
          </Badge>

          {/* Dropdown Menu for Publications */}
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
              <DropdownMenuItem asChild>
                <Link href={`/profile/publication/${pub?.pubId}/update`}>
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
