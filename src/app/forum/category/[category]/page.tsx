"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  MessageSquare,
  Users,
  Clock,
  Pin,
  TrendingUp,
  ArrowLeft,
  Plus,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useFetchForumByCategory } from "@/hooks/useForum";

type PageProps = {
  params: Promise<{ category: string }>;
};

export default function ForumCategoryPage({ params }: PageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const { category } = use(params);

  const { data: topics } = useFetchForumByCategory(category!);

  const truncate = (str: string, max = 30) =>
    str?.length > max ? str.slice(0, max) + "…" : str;

  console.log("category", topics);
  console.log("params", category);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h1 className="text-3xl font-bold">{topics?.topicTitle}</h1>
            {/* <Badge className={category.color}>{category.topics} topics</Badge> */}
          </div>
          <p className="text-muted-foreground">{topics?.description}</p>
        </div>
        <Button asChild>
          <Link href="/forum/create">
            <Plus className="mr-2 h-4 w-4" />
            New Topic
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{topics?.length}</p>
                <p className="text-sm text-muted-foreground">Topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <Users className="h-6 w-6 text-green-600" />
              </div>
              <div>
                {/* <p className="text-2xl font-bold">{category.posts}</p> */}
                <p className="text-sm text-muted-foreground">Posts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {/* {Math.floor(category.posts / category.topics)} */}
                </p>
                <p className="text-sm text-muted-foreground">Avg. Replies</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                // placeholder={`Search ${category.name.toLowerCase()} topics...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recent">Most Recent</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Topics List */}
      <div className="space-y-4">
        {topics?.map((topic: any) => (
          <Card
            key={topic?.forumId}
            className="hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {/* {topic.isPinned && (
                      <Pin className="h-4 w-4 text-blue-600" />
                    )}
                    {topic.isHot && (
                      <TrendingUp className="h-4 w-4 text-red-600" />
                    )} */}
                    <h3 className="text-lg font-semibold">
                      <Link
                        href={`/forum/topic/${topic?.forumId}`}
                        className="hover:text-blue-600"
                      >
                        {topic?.topicTitle}
                      </Link>
                    </h3>
                    {/* {topic.isPinned && (
                      <Badge variant="secondary" className="text-xs">
                        Pinned
                      </Badge>
                    )}
                    {topic.isHot && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-red-100 text-red-800"
                      >
                        Hot
                      </Badge>
                    )} */}
                  </div>
                  <p className="text-muted-foreground mb-3">
                    {truncate(topic?.description, 30)}
                  </p>
                  <div className="flex items-center gap-2 mb-3">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={topic?.author?.profileImage} />
                      <AvatarFallback className="text-xs">
                        {topic?.author?.firstName
                          .split(" ")
                          .map((n: any) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <span className="text-sm text-muted-foreground">
                      by {topic?.author?.firstName} {topic?.author?.lastName}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {topic?.author?.role}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      • {new Date(topic.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {topic?.forumComments?.length} replies
                    </span>
                    <span className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      {/* {topic.views} views */}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      {/* Last reply {topic.lastReply} by {topic.lastReplyBy} */}
                    </span>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href={`/forum/topic/${topic.id}`}>View Topic</Link>
                  </Button>
                  {/* {topic.isHot && (
                    <div className="flex items-center gap-1 text-xs text-red-600">
                      <TrendingUp className="h-3 w-3" />
                      Trending
                    </div>
                  )} */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* {sortedTopics.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
            <p className="text-muted-foreground mb-4">
              No topics found matching your search.
            </p>
            <Button asChild>
              <Link href="/forum/create">Start the first discussion</Link>
            </Button>
          </CardContent>
        </Card>
      )} */}

      {/* Pagination */}
      {/* {sortedTopics.length > 0 && (
        // <div className="flex justify-center">
        //   <div className="flex items-center gap-2">
        //     <Button variant="outline" size="sm" disabled>
        //       Previous
        //     </Button>
        //     <Button
        //       variant="outline"
        //       size="sm"
        //       className="bg-primary text-primary-foreground"
        //     >
        //       1
        //     </Button>
        //     <Button variant="outline" size="sm">
        //       2
        //     </Button>
        //     <Button variant="outline" size="sm">
        //       3
        //     </Button>
        //     <Button variant="outline" size="sm">
        //       Next
        //     </Button>
        //   </div>
        // </div>
      )} */}
    </div>
  );
}
