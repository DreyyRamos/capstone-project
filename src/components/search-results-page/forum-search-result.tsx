// app/search/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as SearchUser } from "@/hooks/useSearch";
import Link from "next/link";

interface ForumProps {
  forum: any;
}

const ForumSearchResult = ({ forum }: ForumProps) => {
  const getDisplayName = (user: SearchUser | any) => {
    if (!user) return "Unknown User";
    return (
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    );
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };
  return (
    <Card key={forum.forumId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <Link href={`/forum/topic/${forum.forumId}`}>
          <div id="forum-search-result-flex-1" data-testId="forum-search-result-flex-1" className="flex gap-4">
            {forum.imageUrl && (
              <img
                src={forum.imageUrl}
                alt=""
                className="h-24 w-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div id="forum-search-result-div-2" data-testId="forum-search-result-div-2" className="flex-1 min-w-0">
              <h3 className="font-semibold text-xl mb-2 truncate">
                {forum.topicTitle}
              </h3>
              <p className="text-muted-foreground line-clamp-4 mb-4">
                {forum.description}
              </p>
              <div id="forum-search-result-flex-3" data-testId="forum-search-result-flex-3" className="flex items-center justify-between text-sm text-muted-foreground">
                <div id="forum-search-result-flex-4" data-testId="forum-search-result-flex-4" className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={forum.author?.profileImage || ""} />
                    <AvatarFallback className="text-xs">
                      {getDisplayName(forum.author).charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>by {getDisplayName(forum.author)}</span>
                  <span>•</span>
                  <span>{formatDate(forum.updatedAt)}</span>
                </div>
                <div id="forum-search-result-flex-5" data-testId="forum-search-result-flex-5" className="flex items-center gap-4">
                  <span>{forum._count.forumLikes} likes</span>
                  <span>{forum._count.forumComments} comments</span>
                </div>
              </div>
              {forum.tags.length > 0 && (
                <div id="forum-search-result-flex-6" data-testId="forum-search-result-flex-6" className="flex gap-1 mt-3 flex-wrap">
                  {forum.tags.map((tag: any) => (
                    <Badge key={tag} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ForumSearchResult;
