"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MessageSquare, Users, Clock } from "lucide-react";
import Link from "next/link";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role?: string;
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
  forumLikes?: any[];
  forumComments?: any[];
  views?: number;
  isPinned?: boolean;
  isHot?: boolean;
}

interface Category {
  id: string;
  name: string;
  description: string;
  topics: number;
  replies: number;
  createdAt: string;
  color: string;
  forums?: ForumTopic[];
}

interface CategoryProps {
  category: Category;
}

const Categories = ({ category }: CategoryProps) => {
  return (
    <Card key={category.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4 md:p-6">
        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 mb-2">
              <h3 className="text-lg font-semibold truncate">
                <Link
                  href={`/forum/category/${encodeURIComponent(category.name)}`}
                  className="hover:text-blue-600"
                >
                  {category.name}
                </Link>
              </h3>
              <Badge variant="outline" className="text-xs w-fit">
                {category.topics} topics
              </Badge>
            </div>
            <p className="text-muted-foreground mb-3 text-sm md:text-base">
              {category.description}
            </p>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageSquare className="h-4 w-4 shrink-0" />
                {category.topics} topics
              </span>
              <span className="flex items-center gap-1">
                <Users className="h-4 w-4 shrink-0" />
                {category.replies} replies
              </span>
              <span className="flex items-center gap-1">
                <Clock className="h-4 w-4 shrink-0" />
                Last topic created: {category.createdAt}
              </span>
            </div>
          </div>
          <div className="w-full md:w-auto">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full md:w-auto bg-transparent"
            >
              <Link
                href={`/forum/category/${encodeURIComponent(category.name)}`}
              >
                View Category
              </Link>
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Categories;
