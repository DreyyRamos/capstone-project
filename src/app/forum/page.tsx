"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Search, MessageSquare, Users, TrendingUp, Clock, Pin, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function ForumPage() {
  const [searchQuery, setSearchQuery] = useState("")

  const categories = [
    {
      id: 1,
      name: "General Discussion",
      description: "General topics and school-wide discussions",
      topics: 45,
      posts: 234,
      lastPost: {
        title: "Welcome New Students!",
        author: "Admin",
        time: "2 hours ago",
      },
      color: "bg-blue-100 text-blue-800",
    },
    {
      id: 2,
      name: "Academic",
      description: "Study tips, homework help, and academic discussions",
      topics: 23,
      posts: 156,
      lastPost: {
        title: "Tips for Better Study Habits",
        author: "Alex Chen",
        time: "4 hours ago",
      },
      color: "bg-green-100 text-green-800",
    },
    {
      id: 3,
      name: "Clubs & Activities",
      description: "Club announcements, activities, and events",
      topics: 18,
      posts: 89,
      lastPost: {
        title: "Science Club Meeting Notes",
        author: "Michael Brown",
        time: "6 hours ago",
      },
      color: "bg-purple-100 text-purple-800",
    },
    {
      id: 4,
      name: "Sports",
      description: "Sports news, team updates, and athletic discussions",
      topics: 12,
      posts: 67,
      lastPost: {
        title: "Basketball Season Recap",
        author: "Coach Martinez",
        time: "1 day ago",
      },
      color: "bg-orange-100 text-orange-800",
    },
    {
      id: 5,
      name: "Arts & Culture",
      description: "Art, music, theater, and cultural events",
      topics: 8,
      posts: 45,
      lastPost: {
        title: "Winter Concert Preparations",
        author: "Ms. Johnson",
        time: "2 days ago",
      },
      color: "bg-pink-100 text-pink-800",
    },
  ]

  const recentTopics = [
    {
      id: 1,
      title: "Tips for Better Study Habits",
      author: "Alex Chen",
      category: "Academic",
      replies: 23,
      views: 145,
      lastReply: "2 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: 2,
      title: "Upcoming School Events Discussion",
      author: "Emma Davis",
      category: "General Discussion",
      replies: 15,
      views: 89,
      lastReply: "4 hours ago",
      isPinned: true,
      isHot: false,
    },
    {
      id: 3,
      title: "Science Club Meeting Notes",
      author: "Michael Brown",
      category: "Clubs & Activities",
      replies: 8,
      views: 56,
      lastReply: "6 hours ago",
      isPinned: false,
      isHot: false,
    },
    {
      id: 4,
      title: "Basketball Season Highlights",
      author: "Coach Martinez",
      category: "Sports",
      replies: 34,
      views: 234,
      lastReply: "8 hours ago",
      isPinned: false,
      isHot: true,
    },
    {
      id: 5,
      title: "Art Exhibition Feedback",
      author: "Sarah Wilson",
      category: "Arts & Culture",
      replies: 12,
      views: 78,
      lastReply: "1 day ago",
      isPinned: false,
      isHot: false,
    },
  ]

  const stats = [
    { label: "Total Topics", value: "106", icon: MessageSquare },
    { label: "Total Posts", value: "591", icon: MessageSquare },
    { label: "Active Users", value: "247", icon: Users },
    { label: "Today's Posts", value: "18", icon: TrendingUp },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Community Forum</h1>
          <p className="text-muted-foreground">Connect, discuss, and share with your school community</p>
        </div>
        <Button asChild>
          <Link href="/forum/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Start Discussion
          </Link>
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
          <TabsTrigger value="popular">Popular</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {categories.map((category) => (
            <Card key={category.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-semibold">
                        <Link href={`/forum/category/${category.id}`} className="hover:text-blue-600">
                          {category.name}
                        </Link>
                      </h3>
                      <Badge className={category.color}>{category.topics} topics</Badge>
                    </div>
                    <p className="text-muted-foreground mb-3">{category.description}</p>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span>{category.posts} posts</span>
                      <span>•</span>
                      <span>Last post: {category.lastPost.time}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium">{category.lastPost.title}</p>
                    <p className="text-xs text-muted-foreground">by {category.lastPost.author}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {recentTopics.map((topic) => (
            <Card key={topic.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
                      {topic.isHot && <TrendingUp className="h-4 w-4 text-red-600" />}
                      <h3 className="text-lg font-semibold">
                        <Link href={`/forum/topic/${topic.id}`} className="hover:text-blue-600">
                          {topic.title}
                        </Link>
                      </h3>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs">
                          {topic.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">by {topic.author}</span>
                      <Badge variant="outline" className="text-xs">
                        {topic.category}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-4 w-4" />
                        {topic.replies} replies
                      </span>
                      <span>{topic.views} views</span>
                      <span className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        {topic.lastReply}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="popular" className="space-y-4">
          {recentTopics
            .sort((a, b) => b.views - a.views)
            .map((topic) => (
              <Card key={topic.id} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <TrendingUp className="h-4 w-4 text-orange-600" />
                        <h3 className="text-lg font-semibold">
                          <Link href={`/forum/topic/${topic.id}`} className="hover:text-blue-600">
                            {topic.title}
                          </Link>
                        </h3>
                      </div>
                      <div className="flex items-center gap-2 mb-3">
                        <Avatar className="h-6 w-6">
                          <AvatarFallback className="text-xs">
                            {topic.author
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm text-muted-foreground">by {topic.author}</span>
                        <Badge variant="outline" className="text-xs">
                          {topic.category}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MessageSquare className="h-4 w-4" />
                          {topic.replies} replies
                        </span>
                        <span className="font-medium text-orange-600">{topic.views} views</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {topic.lastReply}
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
  )
}
