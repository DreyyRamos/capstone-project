"use client"

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, MessageSquare, Users, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useForumQuery } from "@/hooks/useForum";
import Cookies from "js-cookie";
import { timeAgo } from "@/lib/timeAgo";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import ForumLoading from "./loading";

export default function ForumPage() {
  const router = useRouter();
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const [searchQuery, setSearchQuery] = useState("");

  const token = Cookies.get("token") || "";
  const { data: rawForums, isLoading } = useForumQuery(token);

  const categories = useMemo(() => {
    if (!rawForums?.posts?.length) return [];

    // group by category name
    const grouped = rawForums?.posts?.reduce((acc: any, forum: any) => {
      const cat = forum.category || "Uncategorized";
      (acc[cat] = acc[cat] || []).push(forum);
      return acc;
    }, {});

    console.log("check forum from memo", grouped);

    // transform each group into the shape the UI expects
    return Object.entries(grouped).map(([name, forums]: any) => {
      const latest = forums.sort(
        (a: any, b: any) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      )[0];

      // crude post count: 1 forum post  all comments/replies
      const replies = forums.reduce(
        (sum: any, f: any) =>
          // 1 +
          // sum +
          f.forumComments?.length +
          f.forumComments?.reduce((total: any, post: any) => {
            return (
              total + (post.forumComments?.forumCommentReplies?.length || 0)
            );
          }, 0),
        0
      );

      console.log("check forum from memo 2", latest);

      return {
        id: name, // replace this if need ko ng real id
        name,
        description: `Discussion about ${name}`,
        topics: forums.length,
        replies,
        lastUpdated: timeAgo(new Date(latest.createdAt)),
        // simple deterministic color per category
        color: `bg-${
          ["blue", "green", "purple", "orange", "pink"][name.length % 5]
        }-100 text-${
          ["blue", "green", "purple", "orange", "pink"][name.length % 5]
        }-800`,
      };
    });
  }, [rawForums]);

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
      value: rawForums?.posts?.length,
      icon: MessageSquare,
    },
    {
      label: "Total Replies and Comments",
      value: rawForums?.posts?.reduce((total: any, post: any) => {
        return total + (post.forumComments?.length || 0);
      }, 0),
      icon: MessageSquare,
    },
    { label: "Active Users", value: "247", icon: Users },
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
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search forum topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {categories.map((category: any, i: any) => (
            <Card
              key={category.id}
              className="hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        <Link
                          href={`/forum/category/${category.name}`}
                          className="hover:text-blue-600"
                        >
                          {category.name}
                        </Link>
                      </h3>
                      {/* <Badge className={category.color}>
                        {category.topics} topics
                      </Badge> */}
                    </div>
                    <p className="text-muted-foreground mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{category.topics} topics</span>
                      <span>•</span>
                      <span>Last updated: {category.lastUpdated}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">
                      {/* {category.lastPost.title} */}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {/* by {category.lastPost.author} */}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {rawForums?.posts?.map((topic: any) => (
            <Card
              key={topic.forumId}
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
                          href={`/forum/topic/${topic.id}`}
                          className="hover:text-blue-600"
                        >
                          {topic?.topicTitle}
                        </Link>
                      </h3>
                    </div>
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
                        {topic?.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {topic.replies} replies
                      </span>
                      {/* <span>{topic.views} views</span> */}
                      <span className="flex items-center gap-1">
                        {/* <Clock className="h-4 w-4" />
                        {topic.lastReply} */}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
