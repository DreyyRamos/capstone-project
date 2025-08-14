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
  params: Promise<{ slug: string }>;
};

export default function ForumCategoryPage({ params }: PageProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");

  const { slug } = use(params);

  const { data: topics } = useFetchForumByCategory(slug!);

  const truncate = (str: string, max = 30) =>
    str?.length > max ? str.slice(0, max) + "…" : str;

  console.log("category", topics);
  console.log("params", slug);

  // Sample category data based on the ID
  const categoryData = {
    "general-discussion": {
      name: "General Discussion",
      description: "General topics and school-wide discussions",
      color: "bg-blue-100 text-blue-800",
      topics: 45,
      posts: 234,
    },
    academic: {
      name: "Academic",
      description: "Study tips, homework help, and academic discussions",
      color: "bg-green-100 text-green-800",
      topics: 23,
      posts: 156,
    },
    "clubs-activities": {
      name: "Clubs & Activities",
      description: "Club announcements, activities, and events",
      color: "bg-purple-100 text-purple-800",
      topics: 18,
      posts: 89,
    },
    sports: {
      name: "Sports",
      description: "Sports news, team updates, and athletic discussions",
      color: "bg-orange-100 text-orange-800",
      topics: 12,
      posts: 67,
    },
    arts: {
      name: "Arts & Culture",
      description: "Art, music, theater, and cultural events",
      color: "bg-pink-100 text-pink-800",
      topics: 8,
      posts: 45,
    },
  };

  // const category = categoryData[params.id as keyof typeof categoryData] || categoryData["general-discussion"]

  // Sample topics for each category
  const sampleTopics = {
    "general-discussion": [
      {
        id: 1,
        title: "Welcome New Students to Lincoln High!",
        author: "Admin",
        authorRole: "Administrator",
        replies: 28,
        views: 156,
        lastReply: "2 hours ago",
        lastReplyBy: "Emma Davis",
        isPinned: true,
        isHot: false,
        createdAt: "2024-01-20T09:00:00Z",
        excerpt:
          "A warm welcome to all new students joining our school community this semester!",
      },
      {
        id: 2,
        title: "School Cafeteria Menu Suggestions",
        author: "Sarah Johnson",
        authorRole: "Student",
        replies: 15,
        views: 89,
        lastReply: "4 hours ago",
        lastReplyBy: "Michael Brown",
        isPinned: false,
        isHot: true,
        createdAt: "2024-01-19T14:30:00Z",
        excerpt:
          "What would you like to see added to our cafeteria menu? Share your suggestions here!",
      },
      {
        id: 3,
        title: "Lost and Found - January 2024",
        author: "Ms. Rodriguez",
        authorRole: "Teacher",
        replies: 8,
        views: 45,
        lastReply: "1 day ago",
        lastReplyBy: "Alex Chen",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-18T11:00:00Z",
        excerpt:
          "Monthly lost and found thread. Check here if you've lost something around campus.",
      },
    ],
    academic: [
      {
        id: 4,
        title: "Tips for Better Study Habits",
        author: "Alex Chen",
        authorRole: "Student",
        replies: 23,
        views: 145,
        lastReply: "2 hours ago",
        lastReplyBy: "Dr. Sarah Johnson",
        isPinned: false,
        isHot: true,
        createdAt: "2024-01-20T10:30:00Z",
        excerpt:
          "Looking for advice on maintaining consistent study habits. What works for you?",
      },
      {
        id: 5,
        title: "AP Chemistry Study Group Formation",
        author: "Maria Santos",
        authorRole: "Student",
        replies: 12,
        views: 67,
        lastReply: "6 hours ago",
        lastReplyBy: "James Wilson",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-19T16:45:00Z",
        excerpt:
          "Looking to form a study group for AP Chemistry. Who's interested?",
      },
      {
        id: 6,
        title: "Math Tutoring Available",
        author: "Prof. Anderson",
        authorRole: "Teacher",
        replies: 18,
        views: 98,
        lastReply: "8 hours ago",
        lastReplyBy: "Lisa Park",
        isPinned: true,
        isHot: false,
        createdAt: "2024-01-18T13:20:00Z",
        excerpt:
          "Free math tutoring sessions available every Tuesday and Thursday after school.",
      },
    ],
    "clubs-activities": [
      {
        id: 7,
        title: "Drama Club Auditions - Spring Play",
        author: "Ms. Thompson",
        authorRole: "Teacher",
        replies: 16,
        views: 112,
        lastReply: "3 hours ago",
        lastReplyBy: "Emma Davis",
        isPinned: true,
        isHot: true,
        createdAt: "2024-01-20T08:00:00Z",
        excerpt:
          "Auditions for our spring play 'Romeo and Juliet' are coming up! All students welcome.",
      },
      {
        id: 8,
        title: "Science Club Meeting Notes - January 15",
        author: "Michael Brown",
        authorRole: "Student",
        replies: 8,
        views: 56,
        lastReply: "6 hours ago",
        lastReplyBy: "Sarah Chen",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-19T15:30:00Z",
        excerpt:
          "Summary of our latest science club meeting and upcoming project discussions.",
      },
      {
        id: 9,
        title: "Photography Club Photo Walk This Weekend",
        author: "David Kim",
        authorRole: "Student",
        replies: 11,
        views: 73,
        lastReply: "1 day ago",
        lastReplyBy: "Ms. Garcia",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-17T12:00:00Z",
        excerpt:
          "Join us for a photo walk around downtown this Saturday morning!",
      },
    ],
    sports: [
      {
        id: 10,
        title: "Basketball Season Recap and Highlights",
        author: "Coach Martinez",
        authorRole: "Teacher",
        replies: 34,
        views: 234,
        lastReply: "1 hour ago",
        lastReplyBy: "Team Captain Jake",
        isPinned: true,
        isHot: true,
        createdAt: "2024-01-20T07:30:00Z",
        excerpt:
          "What an incredible season! Let's celebrate our achievements and look ahead.",
      },
      {
        id: 11,
        title: "Track and Field Tryouts Next Week",
        author: "Coach Williams",
        authorRole: "Teacher",
        replies: 19,
        views: 145,
        lastReply: "5 hours ago",
        lastReplyBy: "Runner Mike",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-19T10:15:00Z",
        excerpt:
          "Spring track and field season is starting! Tryouts begin Monday after school.",
      },
      {
        id: 12,
        title: "Intramural Soccer League Sign-ups",
        author: "Student Council",
        authorRole: "Student Organization",
        replies: 22,
        views: 167,
        lastReply: "3 hours ago",
        lastReplyBy: "Soccer Fan Sam",
        isPinned: false,
        isHot: true,
        createdAt: "2024-01-18T14:45:00Z",
        excerpt: "Join our intramural soccer league! All skill levels welcome.",
      },
    ],
    arts: [
      {
        id: 13,
        title: "Winter Concert Performance Review",
        author: "Ms. Johnson",
        authorRole: "Teacher",
        replies: 15,
        views: 89,
        lastReply: "4 hours ago",
        lastReplyBy: "Choir Member Amy",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-20T11:00:00Z",
        excerpt:
          "Thank you to everyone who attended our winter concert! Share your thoughts here.",
      },
      {
        id: 14,
        title: "Art Exhibition Submissions Open",
        author: "Mr. Wilson",
        authorRole: "Teacher",
        replies: 12,
        views: 76,
        lastReply: "7 hours ago",
        lastReplyBy: "Artist Anna",
        isPinned: true,
        isHot: false,
        createdAt: "2024-01-19T09:30:00Z",
        excerpt:
          "Submit your artwork for our spring exhibition! Deadline is February 15th.",
      },
      {
        id: 15,
        title: "Creative Writing Workshop This Friday",
        author: "Literary Club",
        authorRole: "Student Organization",
        replies: 9,
        views: 54,
        lastReply: "1 day ago",
        lastReplyBy: "Writer Will",
        isPinned: false,
        isHot: false,
        createdAt: "2024-01-17T16:20:00Z",
        excerpt:
          "Join us for a creative writing workshop with guest author Jane Smith!",
      },
    ],
  };

  // const topics =
  //   sampleTopics[params.id as keyof typeof sampleTopics] ||
  //   sampleTopics["general-discussion"];

  // const filteredTopics = topics?.filter(
  //   (topic: any) =>
  //     topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     topic.description.toLowerCase().includes(searchQuery.toLowerCase())
  // );

  // const sortedTopics = [...filteredTopics].sort((a, b) => {
  //   switch (sortBy) {
  //     case "recent":
  //       return (
  //         new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  //       );
  //     // case "popular":
  //     //   return b.views - a.views;
  //     case "replies":
  //       return b.replies - a.replies;
  //     default:
  //       return 0;
  //   }
  // });

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
