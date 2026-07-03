// app/search/page.tsx
"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { User as SearchUser } from "@/hooks/useSearch";
import Link from "next/link";

interface PubProps {
  publication: any;
}

const PubSearchResult = ({ publication }: PubProps) => {
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
    <Card key={publication.pubId} className="hover:shadow-md transition-shadow">
      <CardContent className="p-6">
        <Link href={`/publications/${publication.pubId}`}>
          <div id="pub-search-result-flex-1" data-testId="pub-search-result-flex-1" className="flex gap-4">
            {publication.imageUrl && (
              <img
                src={publication.imageUrl}
                alt=""
                className="h-24 w-24 object-cover rounded-lg flex-shrink-0"
              />
            )}
            <div id="pub-search-result-div-2" data-testId="pub-search-result-div-2" className="flex-1 min-w-0">
              <div id="pub-search-result-flex-3" data-testId="pub-search-result-flex-3" className="flex items-center gap-2 mb-2">
                <h3 className="font-semibold text-xl truncate">
                  {publication.title}
                </h3>
                {publication.isFeatured && (
                  <Badge className="bg-yellow-500">Featured</Badge>
                )}
              </div>
              <p className="text-muted-foreground line-clamp-4 mb-4">
                {publication.excerpt}
              </p>
              <div id="pub-search-result-flex-4" data-testId="pub-search-result-flex-4" className="flex items-center justify-between text-sm text-muted-foreground">
                <div id="pub-search-result-flex-5" data-testId="pub-search-result-flex-5" className="flex items-center gap-2">
                  <Avatar className="h-6 w-6">
                    <AvatarImage src={publication.author?.profileImage || ""} />
                    <AvatarFallback className="text-xs">
                      {getDisplayName(publication.author)
                        .charAt(0)
                        .toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <span>by {getDisplayName(publication.author)}</span>
                  <span>•</span>
                  <span>{formatDate(publication.updatedAt)}</span>
                </div>
                <div id="pub-search-result-flex-6" data-testId="pub-search-result-flex-6" className="flex items-center gap-4">
                  <span>{publication._count.pubLikes} likes</span>
                  <span>{publication._count.pubComments} comments</span>
                </div>
              </div>
              {publication.tags.length > 0 && (
                <div id="pub-search-result-flex-7" data-testId="pub-search-result-flex-7" className="flex gap-1 mt-3 flex-wrap">
                  {publication.tags.map((tag: any) => (
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

export default PubSearchResult;
