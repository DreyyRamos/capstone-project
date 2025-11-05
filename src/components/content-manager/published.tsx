"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  MoreHorizontal,
  Calendar,
  User,
  Heart,
  MessageCircle,
} from "lucide-react";
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

interface PublishedPublicationsProps {
  content: Publication;
  handleArchive: (p: string) => void;
}

const Published = ({ content, handleArchive }: PublishedPublicationsProps) => {
  return (
    <Card key={content.pubId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 sm:p-6">
        <div className="space-y-3">
          <div className="flex items-start justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h3 className="text-lg font-semibold truncate mb-2">
                {content?.title}
              </h3>
              <div className="flex flex-wrap items-center gap-1 mb-2">
                <Badge className="bg-green-100 text-green-800">
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Published
                </Badge>
                <Badge variant="outline">{content?.category}</Badge>
                {content.isFeatured && (
                  <Badge className="bg-yellow-100 text-yellow-800">
                    Featured
                  </Badge>
                )}
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
                    href={`/publications/${content?.pubId}`}
                    className="flex items-center"
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    View
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/publications/${content?.pubId}/update`}
                    className="flex items-center"
                  >
                    <Edit className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  className="text-red-600"
                  onClick={() => handleArchive(content?.pubId)}
                >
                  <XCircle className="mr-2 h-4 w-4" />
                  Unpublish
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Tags */}
          {content.tags && content.tags.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {content.tags.slice(0, 2).map((tag, index) => (
                <Badge key={index} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
              {content.tags.length > 2 && (
                <Badge variant="outline" className="text-xs">
                  +{content.tags.length - 2}
                </Badge>
              )}
            </div>
          )}

          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-2 min-w-0">
              <User className="h-4 w-4 shrink-0" />
              <span className="truncate">
                {content?.author?.firstName} {content?.author?.lastName}
              </span>
              <Badge variant="secondary" className="text-xs shrink-0">
                {content?.author?.role}
              </Badge>
            </div>
            <span className="flex items-center gap-1 shrink-0">
              <Calendar className="h-4 w-4" />
              {new Date(content.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
            {content.views && (
              <span className="flex items-center gap-1">
                <Eye className="h-4 w-4" />
                {content.views} views
              </span>
            )}
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {content?.pubLikes?.length || 0} likes
            </span>
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {content?.pubComments?.length || 0} comments
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Published;
