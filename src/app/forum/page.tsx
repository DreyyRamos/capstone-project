"use client"

import type React from "react";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  MessageSquare,
  Users,
  PlusCircle,
  Pin,
  TrendingUp,
  Clock,
  Eye,
  Heart,
} from "lucide-react";
import Link from "next/link";
import { useForumQuery } from "@/hooks/useForum";
import { useFetchUsers } from "@/hooks/usePublicData";
import Cookies from "js-cookie";
import { timeAgo } from "@/lib/timeAgo";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import ForumLoading from "./loading";
import Categories from "@/components/forum/main-forum/categories";
import Recents from "@/components/forum/main-forum/recents";

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

export default function ForumPage() {
  const router = useRouter();
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("categories");

  const token = Cookies.get("token") || "";
  const { data: rawForums, isLoading } = useForumQuery(token);
  const { data: users } = useFetchUsers();

  const categories = useMemo(() => {
    if (!rawForums?.posts?.length) return [];

    // Group by category name
    const grouped = rawForums?.posts?.reduce((acc: any, forum: any) => {
      const cat = forum.category || "Uncategorized";
      (acc[cat] = acc[cat] || []).push(forum);
      return acc;
    }, {});

    console.log("check forum from memo", grouped);

    // Transform each group into the shape the UI expects
    return Object.entries(grouped).map(([name, forums]: any) => {
      const latest = forums.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      // Calculate total replies
      const replies = forums.reduce(
        (sum: any, f: any) =>
          sum +
          (f.forumComments?.length || 0) +
          (f.forumComments?.reduce((total: any, comment: any) => {
            return total + (comment.forumCommentReplies?.length || 0);
          }, 0) || 0),
        0
      );

      console.log("check forum from memo 2", latest);

      return {
        id: name,
        name,
        description: `Discussion about ${name}`,
        topics: forums.length,
        replies,
        createdAt: timeAgo(new Date(latest.createdAt)),
        color: `bg-${
          ["blue", "green", "purple", "orange", "pink"][name.length % 5]
        }-100 text-${
          ["blue", "green", "purple", "orange", "pink"][name.length % 5]
        }-800`,
        forums, // Keep reference to forums for searching
      };
    });
  }, [rawForums]);

  // Filtered categories based on search
  const filteredCategories = useMemo(() => {
    if (!searchQuery) return categories;

    const searchLower = searchQuery.toLowerCase();
    return categories.filter(
      (category: Category) =>
        category.name.toLowerCase().includes(searchLower) ||
        category.description.toLowerCase().includes(searchLower) ||
        // search within the topics in this category
        category.forums?.some(
          (topic: ForumTopic) =>
            topic.topicTitle?.toLowerCase().includes(searchLower) ||
            topic.description?.toLowerCase().includes(searchLower) ||
            `${topic.author?.firstName} ${topic.author?.lastName}`
              .toLowerCase()
              .includes(searchLower) ||
            topic.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
        )
    );
  }, [categories, searchQuery]);

  // Filtered recent topics based on search
  const filteredRecentTopics = useMemo(() => {
    if (!rawForums?.posts) return [];

    let topics = rawForums.posts;

    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      topics = topics.filter(
        (topic: ForumTopic) =>
          topic.topicTitle?.toLowerCase().includes(searchLower) ||
          topic.description?.toLowerCase().includes(searchLower) ||
          topic.category?.toLowerCase().includes(searchLower) ||
          `${topic.author?.firstName} ${topic.author?.lastName}`
            .toLowerCase()
            .includes(searchLower) ||
          topic.tags?.some((tag) => tag.toLowerCase().includes(searchLower))
      );
    }

    // Sort by most recent
    return topics.sort((a: ForumTopic, b: ForumTopic) => {
      // Prioritize pinned topics
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;

      // Then by creation date
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  }, [rawForums?.posts, searchQuery]);

  console.log("categories to check", categories);
  console.log("raw forum to check", rawForums);

  const startDiscussion = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (requireAuth("start a discussion")) {
      router.push("/forum/create");
    }
  };

  const stats = [
    {
      label: "Total Topics",
      value: rawForums?.posts?.length || 0,
      icon: MessageSquare,
    },
    {
      label: "Total Replies",
      value:
        rawForums?.posts?.reduce((total: any, post: any) => {
          return total + (post.forumComments?.length || 0);
        }, 0) || 0,
      icon: MessageSquare,
    },
    {
      label: "Active Users",
      value: users?.count ?? 0,
      icon: Users,
    },
    {
      label: "Categories",
      value: categories.length,
      icon: MessageSquare,
    },
  ];

  if (isLoading) {
    return <ForumLoading />;
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">
            Connect, discuss, and share with your school community
          </p>
        </div>
        <Button asChild>
          <a className="cursor-pointer" onClick={startDiscussion}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Start Discussion
          </a>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <stat.icon className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search */}
      <Card>
        <CardContent className="p-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder={`Search ${
                  activeTab === "categories"
                    ? "categories and topics"
                    : "recent topics"
                }...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSearchQuery("")}
              >
                Clear
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Search Results Summary */}
      {searchQuery && (
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <div>
            {activeTab === "categories" ? (
              <span>
                Found {filteredCategories.length} categories matching &quot;
                {searchQuery}&quot;
              </span>
            ) : (
              <span>
                Found {filteredRecentTopics.length} topics matching &quot;
                {searchQuery}&quot;
              </span>
            )}
          </div>
        </div>
      )}

      <Tabs
        defaultValue="categories"
        className="space-y-6"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="categories">
            Categories
            {searchQuery && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredCategories.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="recent">
            Recent Topics
            {searchQuery && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredRecentTopics.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {filteredCategories.length > 0 ? (
            filteredCategories.map((category: Category) => (
              <Categories key={category.id} category={category} />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No categories found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `No categories match your search for "${searchQuery}".`
                      : "No forum categories available yet."}
                  </p>
                  {searchQuery && (
                    <Button
                      variant="outline"
                      onClick={() => setSearchQuery("")}
                    >
                      Clear search
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {filteredRecentTopics.length > 0 ? (
            filteredRecentTopics.map((topic: ForumTopic) => (
              <Recents key={topic.forumId} topic={topic} />
            ))
          ) : (
            <Card>
              <CardContent className="p-12 text-center">
                <div className="space-y-4">
                  <MessageSquare className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="text-lg font-medium">No topics found</h3>
                  <p className="text-muted-foreground">
                    {searchQuery
                      ? `No topics match your search for "${searchQuery}".`
                      : "No forum topics available yet."}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-2 justify-center">
                    {searchQuery && (
                      <Button
                        variant="outline"
                        onClick={() => setSearchQuery("")}
                      >
                        Clear search
                      </Button>
                    )}
                    <Button asChild>
                      <a className="cursor-pointer" onClick={startDiscussion}>
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Start the first discussion
                      </a>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
