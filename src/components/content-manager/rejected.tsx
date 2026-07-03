"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  CircleOff,
} from "lucide-react";
import { useConfirmation } from "../confirmation-provider";
import { toast } from "sonner";
import Link from "next/link";

enum Status {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2,
  PENDING_REVIEW = 3,
  REJECTED = 4,
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: string;
}

interface Publication {
  pubId: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  author: Author;
  category: string;
  tags: string[];
  status: keyof typeof Status;
  createdAt: Date;
  updatedAt: Date;
  pubLikes: any[];
  pubComments: any[];
  views?: number;
  isFeatured?: boolean;
}

interface RejectedPublicationsProps {
  publication: Publication;
  //   restoreArchive: (p: string) => void;
  deleteArchive: (p: string) => void;
}

const Rejected = ({
  publication,
  deleteArchive,
}: //   restoreArchive,
RejectedPublicationsProps) => {
  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-800",
    PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
    PUBLISHED: "bg-green-100 text-green-800",
    ARCHIVED: "bg-red-100 text-red-300",
    REJECTED: "bg-red-100 text-red-900",
  };

  const statusIcons = {
    DRAFT: Clock,
    PENDING_REVIEW: Eye,
    PUBLISHED: CheckCircle,
    ARCHIVED: XCircle,
    REJECTED: CircleOff,
  };

  const { openModal } = useConfirmation();

  const StatusIcon = statusIcons[publication.status];
  return (
    <Card key={publication.pubId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div id="rejected-div-1" data-testId="rejected-div-1" className="space-y-3">
          <div id="rejected-flex-2" data-testId="rejected-flex-2" className="flex items-start justify-between gap-2">
            <div id="rejected-div-3" data-testId="rejected-div-3" className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate mb-2">
                {publication.title}
              </h3>
              <div id="rejected-flex-4" data-testId="rejected-flex-4" className="flex flex-wrap items-center gap-1 mb-2">
                <Badge className={statusColors[publication.status]}>
                  <StatusIcon className="h-3 w-3 mr-1" />
                  {publication?.status.replace("_", " ")}
                </Badge>
                <Badge variant="outline">{publication.category}</Badge>
              </div>
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="shrink-0">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link
                    href={`/publications/${publication.pubId}`}
                    className="flex items-center"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/publications/${publication.pubId}/update`}
                    className="flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                {/* <DropdownMenuItem
                  onClick={() => restoreArchive(publication.pubId)}
                >
                  <CheckCircle className="mr-2 h-4 w-4" />
                  Restore for Review
                </DropdownMenuItem> */}
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onClick={() => {
                    openModal({
                      title: "Delete Rejected Publication",
                      description: `Are you sure you want to delete this rejected publication?`,
                      confirmText: "Reject",
                      variant: "destructive",
                      icon: "error",
                      onConfirm: async () => {
                        await deleteArchive(publication.pubId);
                        toast("Rejected Publication Deleted!");
                      },
                    });
                  }}
                  className="text-red-600"
                >
                  <Trash2 className="mr-2 h-4 w-4" />
                  Delete Publication
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <p className="text-muted-foreground text-sm line-clamp-2">
            {publication.excerpt}
          </p>

          {/* Tags */}
          {publication.tags && publication.tags.length > 0 && (
            <div id="rejected-flex-5" data-testId="rejected-flex-5" className="flex flex-wrap gap-1">
              {publication.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {publication.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{publication.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          <div id="rejected-flex-6" data-testId="rejected-flex-6" className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div id="rejected-flex-7" data-testId="rejected-flex-7" className="flex items-center gap-2 min-w-0">
              <Avatar className="h-6 w-6 shrink-0">
                <AvatarFallback className="text-xs">
                  {publication?.author?.firstName?.charAt(0)}
                  {publication?.author?.lastName?.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="truncate">
                {publication?.author?.firstName} {publication?.author?.lastName}
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">
                {publication?.author?.role}
              </Badge>
            </div>
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="h-4 w-4" />
              {new Date(publication.updatedAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Rejected;
