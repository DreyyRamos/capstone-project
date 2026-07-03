// app/search/page.tsx
"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Search, User, FileText, MessageSquare, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useSearch, User as SearchUser } from "@/hooks/useSearch";
import Link from "next/link";
import { useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserSearchResult from "@/components/search-results-page/user-search-result";
import PubSearchResult from "@/components/search-results-page/pub-search-result";
import ForumSearchResult from "@/components/search-results-page/forum-search-result";

function SearchResultsContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const initialType = (searchParams.get("type") as any) || "all";

  const [selectedType, setSelectedType] = useState<
    "all" | "users" | "publications" | "forums"
  >(initialType);

  const {
    data: results,
    isLoading,
    error,
  } = useSearch({
    query,
    type: selectedType,
    limit: 20,
  });

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

  if (!query) {
    return (
      <div id="page-container" data-testId="page-container" className="container mx-auto px-4 py-8">
        <div id="page-div-2" data-testId="page-div-2" className="text-center">
          <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h1 className="text-2xl font-bold mb-2">Search</h1>
          <p className="text-muted-foreground">
            Enter a search term to find users, publications, and forums.
          </p>
        </div>
      </div>
    );
  }

  const totalResults = results?.total || 0;
  const usersCount = results?.users.length || 0;
  const publicationsCount = results?.publications.length || 0;
  const forumsCount = results?.forums.length || 0;

  return (
    <div id="page-div-3" data-testId="page-div-3" className="container mx-auto px-4 py-8">
      <div id="page-div-4" data-testId="page-div-4" className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Search Results</h1>
        <p className="text-muted-foreground">
          {isLoading
            ? "Searching..."
            : `${totalResults} results found for "${query}"`}
        </p>
      </div>

      <Tabs
        value={selectedType}
        onValueChange={(value) => setSelectedType(value as any)}
        className="w-full"
      >
        {/* Scrollable tabs container for mobile */}
        <div id="page-div-5" data-testId="page-div-5" className="overflow-x-auto pb-2 -mb-2 scrollbar-hide">
          <TabsList className="inline-flex w-auto min-w-full h-auto p-1 bg-muted/50">
            <TabsTrigger
              value="all"
              className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-background"
            >
              <Filter className="h-4 w-4 shrink-0" />
              <span>All</span>
              <span className="text-xs opacity-70">({totalResults})</span>
            </TabsTrigger>
            <TabsTrigger
              value="users"
              className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-background"
            >
              <User className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Users</span>
              <span className="sm:hidden">User</span>
              <span className="text-xs opacity-70">({usersCount})</span>
            </TabsTrigger>
            <TabsTrigger
              value="publications"
              className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-background"
            >
              <FileText className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Publications</span>
              <span className="sm:hidden">Pubs</span>
              <span className="text-xs opacity-70">({publicationsCount})</span>
            </TabsTrigger>
            <TabsTrigger
              value="forums"
              className="flex items-center gap-2 px-4 py-2 text-sm whitespace-nowrap data-[state=active]:bg-background"
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              <span className="hidden sm:inline">Forums</span>
              <span className="sm:hidden">Forum</span>
              <span className="text-xs opacity-70">({forumsCount})</span>
            </TabsTrigger>
          </TabsList>
        </div>

        {isLoading ? (
          <div id="page-div-6" data-testId="page-div-6" className="mt-8 space-y-4">
            {[...Array(5)].map((_, i) => (
              <Card key={i}>
                <CardHeader>
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-3 w-full mb-2" />
                  <Skeleton className="h-3 w-2/3" />
                </CardContent>
              </Card>
            ))}
          </div>
        ) : error ? (
          <div id="page-div-7" data-testId="page-div-7" className="mt-8 text-center">
            <p className="text-red-500">
              Something went wrong. Please try again.
            </p>
          </div>
        ) : totalResults === 0 ? (
          <div id="page-div-8" data-testId="page-div-8" className="mt-8 text-center">
            <Search className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
            <h2 className="text-xl font-semibold mb-2">No results found</h2>
            <p className="text-muted-foreground">
              Try adjusting your search terms or check for typos.
            </p>
          </div>
        ) : (
          <>
            <TabsContent value="all" className="mt-8">
              <div id="page-div-9" data-testId="page-div-9" className="space-y-6">
                {/* Users Results */}
                {usersCount > 0 && (
                  <div id="page-div-10" data-testId="page-div-10">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <User className="h-5 w-5" />
                      Users ({usersCount})
                    </h2>
                    <div id="page-grid-11" data-testId="page-grid-11" className="grid gap-4 md:grid-cols-2">
                      {results?.users.slice(0, 4).map((user) => (
                        <Card
                          key={user.id}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-4">
                            <Link
                              href={`/visit/user/${user.id}`}
                              className="block"
                            >
                              <div id="page-flex-12" data-testId="page-flex-12" className="flex items-center gap-3">
                                <Avatar className="h-12 w-12">
                                  <AvatarImage src={user.profileImage || ""} />
                                  <AvatarFallback>
                                    {getDisplayName(user)
                                      .charAt(0)
                                      .toUpperCase()}
                                  </AvatarFallback>
                                </Avatar>
                                <div id="page-div-13" data-testId="page-div-13" className="flex-1 min-w-0">
                                  <h3 className="font-medium truncate">
                                    {getDisplayName(user)}
                                  </h3>
                                  <div id="page-flex-14" data-testId="page-flex-14" className="flex items-center gap-2 mt-1">
                                    <Badge variant="secondary">
                                      {user.role}
                                    </Badge>
                                    <span className="text-sm text-muted-foreground">
                                      {user.reputationPoints} reputation points
                                    </span>
                                  </div>
                                  {user.bio && (
                                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                                      {user.bio}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {usersCount > 4 && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSelectedType("users")}
                      >
                        View all {usersCount} users
                      </Button>
                    )}
                  </div>
                )}

                {/* Publications Results */}
                {publicationsCount > 0 && (
                  <div id="page-div-15" data-testId="page-div-15">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <FileText className="h-5 w-5" />
                      Publications ({publicationsCount})
                    </h2>
                    <div id="page-div-16" data-testId="page-div-16" className="space-y-4">
                      {results?.publications.slice(0, 3).map((publication) => (
                        <Card
                          key={publication.pubId}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <Link href={`/publications/${publication.pubId}`}>
                              <div id="page-flex-17" data-testId="page-flex-17" className="flex gap-4">
                                {publication.imageUrl && (
                                  <img
                                    src={publication.imageUrl}
                                    alt=""
                                    className="h-20 w-20 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                                <div id="page-div-18" data-testId="page-div-18" className="flex-1 min-w-0">
                                  <div id="page-flex-19" data-testId="page-flex-19" className="flex items-center gap-2 mb-2">
                                    <h3 className="font-semibold text-lg truncate">
                                      {publication.title}
                                    </h3>
                                    {publication.isFeatured && (
                                      <Badge className="bg-yellow-500 shrink-0">
                                        Featured
                                      </Badge>
                                    )}
                                  </div>
                                  <p className="text-muted-foreground line-clamp-3 mb-3">
                                    {publication.excerpt}
                                  </p>
                                  <div id="page-flex-20" data-testId="page-flex-20" className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-2">
                                    <div id="page-flex-21" data-testId="page-flex-21" className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={
                                            publication.author?.profileImage ||
                                            ""
                                          }
                                        />
                                        <AvatarFallback className="text-xs">
                                          {getDisplayName(publication.author)
                                            .charAt(0)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="truncate max-w-[120px] sm:max-w-none">
                                        by {getDisplayName(publication.author)}
                                      </span>
                                      <span className="hidden sm:inline">
                                        •
                                      </span>
                                      <span className="hidden sm:inline">
                                        {formatDate(publication.updatedAt)}
                                      </span>
                                    </div>
                                    <div id="page-flex-22" data-testId="page-flex-22" className="flex items-center gap-4">
                                      <span>
                                        {publication._count.pubLikes} likes
                                      </span>
                                      <span>
                                        {publication._count.pubComments}{" "}
                                        comments
                                      </span>
                                    </div>
                                  </div>
                                  {publication.tags.length > 0 && (
                                    <div id="page-flex-23" data-testId="page-flex-23" className="flex gap-1 mt-2 flex-wrap">
                                      {publication.tags
                                        .slice(0, 3)
                                        .map((tag) => (
                                          <Badge
                                            key={tag}
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            {tag}
                                          </Badge>
                                        ))}
                                      {publication.tags.length > 3 && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          +{publication.tags.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {publicationsCount > 3 && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSelectedType("publications")}
                      >
                        View all {publicationsCount} publications
                      </Button>
                    )}
                  </div>
                )}

                {/* Forums Results */}
                {forumsCount > 0 && (
                  <div id="page-div-24" data-testId="page-div-24">
                    <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5" />
                      Forums ({forumsCount})
                    </h2>
                    <div id="page-div-25" data-testId="page-div-25" className="space-y-4">
                      {results?.forums.slice(0, 3).map((forum) => (
                        <Card
                          key={forum.forumId}
                          className="hover:shadow-md transition-shadow"
                        >
                          <CardContent className="p-6">
                            <Link href={`/forum/topic/${forum.forumId}`}>
                              <div id="page-flex-26" data-testId="page-flex-26" className="flex gap-4">
                                {forum.imageUrl && (
                                  <img
                                    src={forum.imageUrl}
                                    alt=""
                                    className="h-20 w-20 object-cover rounded-lg flex-shrink-0"
                                  />
                                )}
                                <div id="page-div-27" data-testId="page-div-27" className="flex-1 min-w-0">
                                  <h3 className="font-semibold text-lg mb-2 truncate">
                                    {forum.topicTitle}
                                  </h3>
                                  <p className="text-muted-foreground line-clamp-3 mb-3">
                                    {forum.description}
                                  </p>
                                  <div id="page-flex-28" data-testId="page-flex-28" className="flex items-center justify-between text-sm text-muted-foreground flex-wrap gap-2">
                                    <div id="page-flex-29" data-testId="page-flex-29" className="flex items-center gap-2">
                                      <Avatar className="h-6 w-6">
                                        <AvatarImage
                                          src={forum.author?.profileImage || ""}
                                        />
                                        <AvatarFallback className="text-xs">
                                          {getDisplayName(forum.author)
                                            .charAt(0)
                                            .toUpperCase()}
                                        </AvatarFallback>
                                      </Avatar>
                                      <span className="truncate max-w-[120px] sm:max-w-none">
                                        by {getDisplayName(forum.author)}
                                      </span>
                                      <span className="hidden sm:inline">
                                        •
                                      </span>
                                      <span className="hidden sm:inline">
                                        {formatDate(forum.updatedAt)}
                                      </span>
                                    </div>
                                    <div id="page-flex-30" data-testId="page-flex-30" className="flex items-center gap-4">
                                      <span>
                                        {forum._count.forumLikes} likes
                                      </span>
                                      <span>
                                        {forum._count.forumComments} comments
                                      </span>
                                    </div>
                                  </div>
                                  {forum.tags.length > 0 && (
                                    <div id="page-flex-31" data-testId="page-flex-31" className="flex gap-1 mt-2 flex-wrap">
                                      {forum.tags.slice(0, 3).map((tag) => (
                                        <Badge
                                          key={tag}
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          {tag}
                                        </Badge>
                                      ))}
                                      {forum.tags.length > 3 && (
                                        <Badge
                                          variant="outline"
                                          className="text-xs"
                                        >
                                          +{forum.tags.length - 3} more
                                        </Badge>
                                      )}
                                    </div>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </CardContent>
                        </Card>
                      ))}
                    </div>
                    {forumsCount > 3 && (
                      <Button
                        variant="outline"
                        className="mt-4"
                        onClick={() => setSelectedType("forums")}
                      >
                        View all {forumsCount} forums
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="users" className="mt-8">
              <div id="page-grid-32" data-testId="page-grid-32" className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {results?.users.map((user) => (
                  <UserSearchResult key={user.id} user={user} />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="publications" className="mt-8">
              <div id="page-div-33" data-testId="page-div-33" className="space-y-4">
                {results?.publications.map((publication) => (
                  <PubSearchResult
                    key={publication.pubId}
                    publication={publication}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent value="forums" className="mt-8">
              <div id="page-div-34" data-testId="page-div-34" className="space-y-4">
                {results?.forums.map((forum) => (
                  <ForumSearchResult key={forum.forumId} forum={forum} />
                ))}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div id="page-div-35" data-testId="page-div-35" className="container mx-auto px-4 py-8">
          <div id="page-div-36" data-testId="page-div-36" className="space-y-4">
            <Skeleton className="h-8 w-64" />
            <Skeleton className="h-4 w-96" />
            <div id="page-div-37" data-testId="page-div-37" className="space-y-4">
              {[...Array(3)].map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-4 w-3/4" />
                    <Skeleton className="h-3 w-1/2" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-3 w-full mb-2" />
                    <Skeleton className="h-3 w-2/3" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      }
    >
      <SearchResultsContent />
    </Suspense>
  );
}