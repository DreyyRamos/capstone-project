"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  BookOpen,
  MessageSquare,
  TrendingUp,
  Users,
  Calendar,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { useFeaturedPostsQuery } from "@/hooks/usePost";

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
  createdAt: Date;
  author: Author;
}

export default function HomePage() {
  // const recentForumPosts = [
  //   {
  //     id: 1,
  //     title: "Tips for Better Study Habits",
  //     author: "Alex Chen",
  //     replies: 23,
  //     lastActivity: "2 hours ago",
  //     category: "Academic",
  //   },
  //   {
  //     id: 2,
  //     title: "Upcoming School Events Discussion",
  //     author: "Emma Davis",
  //     replies: 15,
  //     lastActivity: "4 hours ago",
  //     category: "General",
  //   },
  //   {
  //     id: 3,
  //     title: "Science Club Meeting Notes",
  //     author: "Michael Brown",
  //     replies: 8,
  //     lastActivity: "6 hours ago",
  //     category: "Clubs",
  //   },
  // ]

  const { data: featuredPublications, isLoading } = useFeaturedPostsQuery();

  if (isLoading) {
    return <div>Loading publications...</div>; // Or a custom spinner component
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Lincoln High School Publications
          </h1>
          <p className="text-xl mb-6">
            Stay connected with the latest news, articles, and discussions from
            our school community.
          </p>
          <div className="flex gap-4">
            <Button asChild size="lg" variant="secondary">
              <Link href="/publications">Browse Publications</Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
            >
              <Link href="/forum">Join Forum</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <BookOpen className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">Publications</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <MessageSquare className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">89</p>
                <p className="text-sm text-muted-foreground">Forum Topics</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Users className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">1,247</p>
                <p className="text-sm text-muted-foreground">Active Users</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-orange-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12.5k</p>
                <p className="text-sm text-muted-foreground">Monthly Views</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Publications */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Featured Publications</h2>
            <Button asChild variant="outline">
              <Link href="/publications">View All</Link>
            </Button>
          </div>
          <div className="space-y-6">
            {featuredPublications?.map((publication: Publication) => (
              <Card key={publication.pubId} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-1.5 ">
                    <img
                      src={publication.imageUrl || "/placeholder.svg"}
                      alt={publication.title}
                      className="w-full h-48 md:h-full object-cover rounded-md"
                    />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant="secondary">{publication.category}</Badge>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        {/* <Eye className="h-4 w-4" />
                        {publication.views} */}
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <Link
                        href={`/publications/${publication.pubId}`}
                        className="hover:text-blue-600"
                      >
                        {publication.title}
                      </Link>
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      {publication.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {publication.author?.firstName}
                            {/* .split(" ")
                              .map((n) => n[0])
                              .join("")} */}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm font-medium">
                            {publication.author?.firstName}
                          </p>
                          <p className="text-xs text-muted-foreground flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(
                              publication.createdAt
                            ).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Button asChild variant="outline" size="sm">
                        <Link href={`/publications/${publication.pubId}`}>
                          Read More
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Forum Activity */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Recent Forum Activity</h2>
            <Button asChild variant="outline">
              <Link href="/forum">View Forum</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {/* {recentForumPosts.map((post) => (
              <Card key={post.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {post.category}
                    </Badge>
                    <span className="text-xs text-muted-foreground">
                      {post.lastActivity}
                    </span>
                  </div>
                  <h4 className="font-medium mb-2">
                    <Link
                      href={`/forum/topic/${post.id}`}
                      className="hover:text-blue-600"
                    >
                      {post.title}
                    </Link>
                  </h4>
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <span>by {post.author}</span>
                    <span>{post.replies} replies</span>
                  </div>
                </CardContent>
              </Card>
            ))} */}
          </div>

          <Card className="mt-6">
            <CardHeader>
              <CardTitle className="text-lg">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                asChild
                className="w-full bg-transparent"
                variant="outline"
              >
                <Link href="/publications/create">Create Publication</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-transparent"
                variant="outline"
              >
                <Link href="/forum/create">Start Discussion</Link>
              </Button>
              <Button
                asChild
                className="w-full bg-transparent"
                variant="outline"
              >
                <Link href="/profile">View Profile</Link>
              </Button>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
}
