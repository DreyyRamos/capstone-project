"use client";

import type React from "react";

import { useState, use, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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
  TrendingUp,
  ArrowLeft,
  Plus,
} from "lucide-react";
import Link from "next/link";
import { useFetchForumByCategory } from "@/hooks/useForum";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useRouter } from "next/navigation";
import ForumCategoryLoading from "./loading";
import TopicList from "@/components/forum/category/topic-list";

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage: string | null;
  role: string;
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
  forumLikes: any[];
  forumComments: any[];
  isPinned: boolean;
}

type PageProps = {
  params: Promise<{ category: string }>;
};

export default function ForumCategoryPage({ params }: PageProps) {
  const router = useRouter();
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const { category: rawCategory } = use(params);

  // Decode URL parameter and handle uncategorized case
  const decodedCategory = decodeURIComponent(rawCategory);
  const category =
    decodedCategory === "Uncategorized" ? "Uncategorized" : decodedCategory;

  const { data: topics, isLoading } = useFetchForumByCategory(category);

  console.log("category", topics);
  console.log("decoded category", decodedCategory);
  console.log("processed category", category);

  const startDiscussion = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (requireAuth("create a new discussion")) {
      router.push("/forum/create");
    }
  };

  // Enhanced filtering and sorting logic
  const filteredAndSortedTopics = useMemo(() => {
    if (!topics || !Array.isArray(topics)) return [];

    // Filter the topics
    const filtered = topics.filter((topic: ForumTopic) => {
      const searchLower = searchQuery.toLowerCase();

      // Search across title, description, author name, and tags
      const matchesSearch =
        searchQuery === "" ||
        topic.topicTitle?.toLowerCase().includes(searchLower) ||
        topic.description?.toLowerCase().includes(searchLower) ||
        `${topic.author?.firstName} ${topic.author?.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        topic.tags?.some((tag) => tag.toLowerCase().includes(searchLower));

      return matchesSearch;
    });

    // Sort the filtered results
    const sorted = [...filtered].sort((a: ForumTopic, b: ForumTopic) => {
      switch (sortBy) {
        case "recent":
          return (
            new Date(b.updatedAt || b.createdAt).getTime() -
            new Date(a.updatedAt || a.createdAt).getTime()
          );

        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        // case "popular":
        //   // Sort by views
        //   const aPopularity = (a.views || 0) + (a.forumLikes?.length || 0) + (a.forumComments?.length || 0)
        //   const bPopularity = (b.views || 0) + (b.forumLikes?.length || 0) + (b.forumComments?.length || 0)
        //   return bPopularity - aPopularity

        case "replies":
          return (
            (b.forumComments?.length || 0) - (a.forumComments?.length || 0)
          );

        case "likes":
          return (b.forumLikes?.length || 0) - (a.forumLikes?.length || 0);

        case "alphabetical":
          return (a.topicTitle || "").localeCompare(b.topicTitle || "");

        default:
          return 0;
      }
    });

    // prioritize pinned topics
    return sorted.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      return 0;
    });
  }, [topics, searchQuery, sortBy]);

  // Calculate statistics from filtered topics
  const stats = useMemo(() => {
    const totalTopics = filteredAndSortedTopics.length;
    const totalPosts = filteredAndSortedTopics.reduce(
      (sum, topic) => sum + (topic.forumComments?.length || 0),
      0
    );
    const avgReplies =
      totalTopics > 0 ? Math.floor(totalPosts / totalTopics) : 0;

    return { totalTopics, totalPosts, avgReplies };
  }, [filteredAndSortedTopics]);

  if (isLoading) {
    return <ForumCategoryLoading />;
  }

  return (
    <div className="space-y-6">
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
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
            <h1 className="text-3xl font-bold">{decodedCategory}</h1>
            <Badge className="bg-blue-100 text-blue-800">
              {stats.totalTopics} topics
            </Badge>
          </div>
          <p className="text-muted-foreground">
            Discussion about {decodedCategory.toLowerCase()}
          </p>
        </div>
        <Button asChild>
          <a className="cursor-pointer" onClick={startDiscussion}>
            <Plus className="mr-2 h-4 w-4" />
            New Topic
          </a>
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
                <p className="text-2xl font-bold">{stats.totalTopics}</p>
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
                <p className="text-2xl font-bold">{stats.totalPosts}</p>
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
                <p className="text-2xl font-bold">{stats.avgReplies}</p>
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
                placeholder={`Search ${decodedCategory.toLowerCase()} topics, authors, or tags...`}
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
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
                <SelectItem value="replies">Most Replies</SelectItem>
                <SelectItem value="likes">Most Liked</SelectItem>
                <SelectItem value="alphabetical">A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedTopics.length} of {topics?.length || 0}{" "}
          topics
        </p>
        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        )}
      </div>

      {/* Topics List */}
      <div className="space-y-4">
        {filteredAndSortedTopics.length > 0 ? (
          filteredAndSortedTopics.map((topic: ForumTopic) => (
            <TopicList key={topic.forumId} topic={topic} />
          ))
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <div className="space-y-4">
                <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="text-lg font-medium">No topics found</h3>
                <p className="text-muted-foreground">
                  {searchQuery
                    ? `No topics match your search for "${searchQuery}" in ${decodedCategory.toLowerCase()}.`
                    : `No topics found in ${decodedCategory.toLowerCase()}.`}
                </p>
                <div className="flex flex-col sm:flex-row gap-2 justify-center">
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear Search
                    </Button>
                  )}
                  <Button asChild>
                    <a className="cursor-pointer" onClick={startDiscussion}>
                      <Plus className="mr-2 h-4 w-4" />
                      Start the first discussion
                    </a>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
