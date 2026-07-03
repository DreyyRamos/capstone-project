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
    <div
      id="dashboard-container"
      data-testId="dashboard-container"
      className="space-y-8"
    >
      {/* Hero Section */}
      <div
        id="hero-section"
        data-testId="hero-section"
        className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white"
      >
        <div
          id="hero-content"
          data-testId="hero-content"
          className="relative z-10"
        >
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Ramos School Publications
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Stay connected with the latest news, articles, and discussions from
            our school community.
          </p>
          <div
            id="hero-buttons"
            data-testId="hero-buttons"
            className="flex gap-4"
          >
            <Button size="lg" variant="secondary" asChild>
              <Link id="page-link-1" data-testId="page-link-1" href="/publications">Browse Publications</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link id="page-link-2" data-testId="page-link-2" href="/forum">Join Forum</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      {token && (
        <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div
                id="stats-publications"
                data-testId="stats-publications"
                className="flex items-center gap-4"
              >
                <div
                  id="stats-publications-icon"
                  data-testId="stats-publications-icon"
                  className="p-3 bg-blue-100 rounded-lg"
                >
                  <BookOpen className="h-6 w-6 text-blue-600" />
                </div>
                <div
                  id="stats-publications-text"
                  data-testId="stats-publications-text"
                >
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
              <div
                id="stats-forums"
                data-testId="stats-forums"
                className="flex items-center gap-4"
              >
                <div
                  id="stats-forums-icon"
                  data-testId="stats-forums-icon"
                  className="p-3 bg-green-100 rounded-lg"
                >
                  <MessageSquare className="h-6 w-6 text-green-600" />
                </div>
                <div id="stats-forums-text" data-testId="stats-forums-text">
                  <p className="text-2xl font-bold">{forums?.posts?.length}</p>
                  <p className="text-sm text-muted-foreground">Forum Topics</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <div
                id="stats-users"
                data-testId="stats-users"
                className="flex items-center gap-4"
              >
                <div
                  id="stats-users-icon"
                  data-testId="stats-users-icon"
                  className="p-3 bg-purple-100 rounded-lg"
                >
                  <Users className="h-6 w-6 text-purple-600" />
                </div>
                <div id="stats-users-text" data-testId="stats-users-text">
                  <p className="text-2xl font-bold">{users?.count ?? 0}</p>
                  <p className="text-sm text-muted-foreground">Active Users</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      <div
        id="content-grid"
        data-testId="content-grid"
        className="grid gap-6 lg:grid-cols-2"
      >
        {/* Featured Publications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div id="featured-pub-header" data-testId="featured-pub-header">
              <CardTitle>Featured Publications</CardTitle>
              <CardDescription>
                Latest articles from our school community
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link id="page-link-3" data-testId="page-link-3" href="/publications">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {featuredPublications?.length ? (
              featuredPublications.map((publication: any) => (
                <div
                  id={`featured-pub-item-${publication.pubId}`}
                  data-testId={`featured-pub-item-${publication.pubId}`}
                  key={publication.pubId}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
                >
                  <Avatar id="page-a-1" data-testId="page-a-1" className="h-8 w-8 flex-shrink-0">
                    <AvatarImage src={publication?.author?.profileImage} />
                    <AvatarFallback id="page-a-2" data-testId="page-a-2">
                      {publication?.author?.firstName[0]}{" "}
                      {publication?.author?.lastName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    id={`featured-pub-content-${publication.pubId}`}
                    data-testId={`featured-pub-content-${publication.pubId}`}
                    className="flex-1 min-w-0 overflow-hidden"
                  >
                    <Link id="page-link-4" data-testId="page-link-4"
                      href={`/publications/${publication.pubId}`}
                      className="block"
                    >
                      <h4
                        className="font-medium text-sm leading-tight hover:text-blue-400 break-words line-clamp-2"
                        style={{ overflowWrap: "anywhere" }}
                      >
                        {publication?.title}
                      </h4>
                    </Link>
                    <div
                      id={`featured-pub-meta-${publication.pubId}`}
                      data-testId={`featured-pub-meta-${publication.pubId}`}
                      className="flex items-center gap-2 mt-1 flex-wrap"
                    >
                      <span id="page-span-1" data-testId="page-span-1" className="text-xs text-muted-foreground truncate">
                        by {publication?.author?.firstName}{" "}
                        {publication?.author?.lastName}
                      </span>
                      <Badge
                        variant="secondary"
                        className="text-xs flex-shrink-0"
                      >
                        {publication?.category}
                      </Badge>
                    </div>
                    <div
                      id={`featured-pub-stats-${publication.pubId}`}
                      data-testId={`featured-pub-stats-${publication.pubId}`}
                      className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap"
                    >
                      <div
                        id="page-flex-1"
                        data-testId="page-flex-1"
                        className="flex items-center gap-1 flex-shrink-0"
                      >
                        <Clock className="h-3 w-3" />
                        Date published:{" "}
                        {new Date(publication?.createdAt).toLocaleDateString()}
                      </div>
                      <div
                        id="page-flex-2"
                        data-testId="page-flex-2"
                        className="flex items-center gap-1 flex-shrink-0"
                      >
                        <MessageCircle className="h-3 w-3" />
                        {publication?.pubComments?.length}
                      </div>
                      <div
                        id="page-flex-3"
                        data-testId="page-flex-3"
                        className="flex items-center gap-1 flex-shrink-0"
                      >
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
            <div id="recent-forum-header" data-testId="recent-forum-header">
              <CardTitle>Recent Forum Activity</CardTitle>
              <CardDescription>Latest discussions and topics</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link id="page-link-5" data-testId="page-link-5" href="/forum">
                View Forums
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {forums?.posts?.slice(0, 3).map((topic: any, index: number) => (
              <div
                id={`forum-topic-item-${index}`}
                data-testId={`forum-topic-item-${index}`}
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar id="page-a-3" data-testId="page-a-3" className="h-8 w-8 flex-shrink-0">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback id="page-a-4" data-testId="page-a-4">
                    {topic?.author?.firstName[0]} {topic?.author?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div
                  id={`forum-content-${index}`}
                  data-testId={`forum-content-${index}`}
                  className="flex-1 min-w-0 overflow-hidden"
                >
                  <Link id="page-link-6" data-testId="page-link-6"
                    href={`/forum/topic/${topic.forumId}`}
                    className="block"
                  >
                    <h4
                      className="font-medium text-sm leading-tight hover:text-blue-400 break-words line-clamp-2"
                      style={{ overflowWrap: "anywhere" }}
                    >
                      {topic.topicTitle}
                    </h4>
                  </Link>
                  <div
                    id={`forum-meta-${index}`}
                    data-testId={`forum-meta-${index}`}
                    className="flex items-center gap-2 mt-1 flex-wrap"
                  >
                    <span id="page-span-2" data-testId="page-span-2" className="text-xs text-muted-foreground truncate">
                      by {topic?.author?.firstName} {topic?.author?.lastName}
                    </span>
                    <Badge variant="outline" className="text-xs flex-shrink-0">
                      {topic.category}
                    </Badge>
                  </div>
                  <div
                    id="page-flex-4"
                    data-testId="page-flex-4"
                    className="flex items-center gap-4 mt-2 text-xs text-muted-foreground flex-wrap"
                  >
                    <div
                      id="page-flex-5"
                      data-testId="page-flex-5"
                      className="flex items-center gap-1 flex-shrink-0"
                    >
                      <MessageCircle className="h-3 w-3" />
                      {topic?.forumComments?.length} comments
                    </div>
                    <div
                      id="page-flex-6"
                      data-testId="page-flex-6"
                      className="flex items-center gap-1 flex-shrink-0"
                    >
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
            <div
              id="quick-actions-grid"
              data-testId="quick-actions-grid"
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
            >
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link id="page-link-7" data-testId="page-link-7" href="/publications/create">
                  <BookOpen className="h-6 w-6" />
                  Create Publication
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link id="page-link-8" data-testId="page-link-8" href="/forum/create">
                  <MessageSquare className="h-6 w-6" />
                  Start Discussion
                </Link>
              </Button>
              <Button
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
                asChild
              >
                <Link id="page-link-9" data-testId="page-link-9" href="/profile">
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
