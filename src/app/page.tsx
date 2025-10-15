"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";
import { useFeaturedPostsQuery, usePostQuery } from "@/hooks/usePost";
import { useForumQuery } from "@/hooks/useForum";
import { useFetchUsers } from "@/hooks/usePublicData";
import Cookies from "js-cookie";
import HomePageLoading from "./loading";

export default function Dashboard() {
  const token = Cookies.get("token") || "";

  const { data: featuredPublications, isLoading } = useFeaturedPostsQuery();
  const { data: publications, isLoading: publicationLoading } =
    usePostQuery(token);
  const { data: forums } = useForumQuery(token);
  const { data: users } = useFetchUsers();

  if (isLoading) {
    return <HomePageLoading />;
  }
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Ramos School Publications
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Stay connected with the latest news, articles, and discussions from
            our school community.
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/publications">Browse Publications</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/forum">Join Forum</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {token && (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold">
                    {publications?.posts?.length}
                  </p>
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
                  <p className="text-2xl font-bold">{forums?.posts?.length}</p>
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
                  <p className="text-2xl font-bold">{users?.count ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Featured Publications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Featured Publications</CardTitle>
              <CardDescription>
                Latest articles from our school community
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/publications">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuredPublications?.length ? (
              featuredPublications.map((publication: any) => (
                <div
                  key={publication.pubId}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors truncate"
                >
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={publication?.author?.profileImage} />
                    <AvatarFallback>
                      {publication?.author?.firstName[0]}{" "}
                      {publication?.author?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <Link href={`/publications/${publication.pubId}`}>
                      <h4 className="font-medium text-sm leading-tight hover:text-blue-400">
                        {publication?.title}
                      </h4>
                    </Link>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-muted-foreground">
                        by {publication?.author?.firstName}{" "}
                        {publication?.author?.lastName}
                      </span>
                      <Badge variant="secondary" className="text-xs">
                        {publication?.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        Date published:{" "}
                        {new Date(publication?.createdAt).toLocaleDateString()}
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageCircle className="h-3 w-3" />
                        {publication?.pubComments?.length}
                      </div>
                      <div className="flex items-center gap-1">
                        <Heart className="h-3 w-3" />
                        {publication?.pubLikes?.length}
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">
                No featured publications yet.
              </p>
            )}
          </CardContent>
        </Card>

        {/* Recent Forum Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Forum Activity</CardTitle>
              <CardDescription>Latest discussions and topics</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/forum">
                View Forums
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {forums?.posts?.slice(0, 3).map((topic: any, index: number) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors truncate"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>
                    {topic?.author?.firstName[0]} {topic?.author?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <Link href={`/forum/topic/${topic.forumId}`}>
                      <h4 className="font-medium text-sm leading-tight hover:text-blue-400">
                        {topic.topicTitle}
                      </h4>
                    </Link>
                    {/* {topic.isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )} */}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      by {topic?.author?.firstName} {topic?.author?.lastName}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {topic?.forumComments?.length} comments
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      Date created:{" "}
                      {new Date(topic?.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      {token && (
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks and shortcuts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link href="/publications/create">
                  <BookOpen className="h-6 w-6" />
                  Create Publication
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link href="/forum/create">
                  <MessageSquare className="h-6 w-6" />
                  Start Discussion
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link href="/profile">
                  <Users className="h-6 w-6" />
                  Edit Profile
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
