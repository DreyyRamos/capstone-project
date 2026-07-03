"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar, Heart, MessageCircle } from "lucide-react";
import Link from "next/link";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
}

interface Publication {
  pubId: string;
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
  author: Author;
  createdAt: Date;
  pubLikes: string[];
  pubComments: string[];
  isFeatured?: boolean;
  // views?: number;
}

interface PublicationProps {
  publication: Publication;
}

const PublicationGrid = ({ publication }: PublicationProps) => {
  return (
    <Card
      key={publication.pubId}
      className="overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div
        id="publication-grid-div-1"
        data-testId="publication-grid-div-1"
        className="relative"
      >
        <img
          src={publication.imageUrl || "/placeholder.svg"}
          alt={publication.title}
          className="w-full h-48 object-cover"
        />
        {publication.isFeatured && (
          <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
            Featured
          </Badge>
        )}
        <Badge variant="secondary" className="absolute top-2 right-2">
          {publication.category}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold mb-2 line-clamp-2">
          <Link
            id="publication-grid-link-1"
            data-testId="publication-grid-link-1"
            href={`/publications/${publication.pubId}`}
            className="hover:text-blue-600"
          >
            {publication.title}
          </Link>
        </h3>
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {publication.excerpt}
        </p>

        {/* Tags */}
        {publication.tags && publication.tags.length > 0 && (
          <div
            id="publication-grid-flex-2"
            data-testId="publication-grid-flex-2"
            className="flex flex-wrap gap-1 mb-4"
          >
            {publication.tags.slice(0, 3).map((tag, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {publication.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{publication.tags.length - 3}
              </Badge>
            )}
          </div>
        )}

        <div
          id="publication-grid-flex-3"
          data-testId="publication-grid-flex-3"
          className="flex items-center gap-2 mb-4"
        >
          <Avatar
            id="publication-grid-a-1"
            data-testId="publication-grid-a-1"
            className="h-8 w-8"
          >
            <AvatarImage
              src={
                publication.author?.profileImage ||
                "/placeholder.svg?height=128&width=128"
              }
            />
            <AvatarFallback
              id="publication-grid-a-2"
              data-testId="publication-grid-a-2"
            >
              {publication.author?.firstName?.charAt(0)}
              {publication.author?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div id="publication-grid-div-4" data-testId="publication-grid-div-4">
            <p className="text-sm font-medium">
              {publication?.author?.firstName} {publication?.author?.lastName}
            </p>
            <p className="text-xs text-muted-foreground flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(publication?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div
          id="publication-grid-flex-5"
          data-testId="publication-grid-flex-5"
          className="flex items-center justify-between text-sm text-muted-foreground"
        >
          <div
            id="publication-grid-flex-6"
            data-testId="publication-grid-flex-6"
            className="flex items-center gap-4"
          >
            {/* {publication.views && (
                        <span id="publication-grid-span-1" data-testId="publication-grid-span-1" className="flex items-center gap-1">
                          <Eye className="h-4 w-4" />
                          {publication.views}
                        </span>
                      )} */}
            <span
              id="publication-grid-span-2"
              data-testId="publication-grid-span-2"
              className="flex items-center gap-1"
            >
              <Heart className="h-4 w-4" />
              {publication?.pubLikes?.length || 0}
            </span>
            <span
              id="publication-grid-span-3"
              data-testId="publication-grid-span-3"
              className="flex items-center gap-1"
            >
              <MessageCircle className="h-4 w-4" />
              {publication?.pubComments?.length || 0}
            </span>
          </div>
          <Button asChild variant="outline" size="sm">
            <Link
              id="publication-grid-link-2"
              data-testId="publication-grid-link-2"
              href={`/publications/${publication.pubId}`}
            >
              Read More
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationGrid;
