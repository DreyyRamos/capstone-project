"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  MoreHorizontal,
  Calendar,
  User,
  FolderOpen,
  Plus,
  Tag,
} from "lucide-react"
import { useEditorQuery } from "@/hooks/useEditor";
import Cookies from "js-cookie";
import Link from "next/link";
import { usePostQuery, useArchivedPostsQuery } from "@/hooks/usePost";

interface Publication {
  title: string;
  excerpt: string;
  content: string;
  imageUrl: string;
  tags: string[];
  category: string;
  status: Status;
}

enum Status {
  "DRAFT",
  "PUBLISHED",
  "ARCHIVED",
  "PENDING_REVIEW",
}

export default function ContentManagerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");

  const token = Cookies.get("token") || "";
  const {
    data: toReview,
    isLoading,
    approve,
    archive,
    restoreArchive,
  } = useEditorQuery(token);

  const { data: publishedContent } = usePostQuery(token);
  const { data: archivedPost } = useArchivedPostsQuery(token);

  console.log("data to review", toReview);
  console.log("archived check", archivedPost);

  const handleApprove = async (postId: string) => {
    try {
      await approve(postId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (postId: string) => {
    try {
      await archive(postId);
    } catch (error) {
      console.error(error);
    }
  };

  // const draftPublications = [
  //   {
  //     id: 1,
  //     title: "Winter Sports Season Recap",
  //     author: "Coach Martinez",
  //     authorRole: "Teacher",
  //     lastModified: "2024-01-20T14:30:00Z",
  //     category: "Sports",
  //     wordCount: 1250,
  //     status: "draft",
  //     excerpt: "A comprehensive look at our winter sports teams' performances this season...",
  //   },
  //   {
  //     id: 2,
  //     title: "New STEM Lab Equipment",
  //     author: "Dr. Sarah Johnson",
  //     authorRole: "Teacher",
  //     lastModified: "2024-01-19T16:45:00Z",
  //     category: "Science",
  //     wordCount: 890,
  //     status: "review",
  //     excerpt: "Exciting new equipment has arrived for our STEM laboratory...",
  //   },
  //   {
  //     id: 3,
  //     title: "Student Council Elections 2024",
  //     author: "Emma Davis",
  //     authorRole: "Student",
  //     lastModified: "2024-01-18T10:15:00Z",
  //     category: "News",
  //     wordCount: 650,
  //     status: "pending",
  //     excerpt: "Information about the upcoming student council elections...",
  //   },
  // ]

  // const publishedContent = [
  //   {
  //     id: 4,
  //     title: "Annual Science Fair Results",
  //     author: "Dr. Sarah Johnson",
  //     publishDate: "2024-01-15T09:00:00Z",
  //     category: "Science",
  //     views: 1250,
  //     likes: 45,
  //     comments: 12,
  //     status: "published",
  //   },
  //   {
  //     id: 5,
  //     title: "Student Art Exhibition 2024",
  //     author: "James Wilson",
  //     publishDate: "2024-01-10T14:00:00Z",
  //     category: "Arts",
  //     views: 2100,
  //     likes: 78,
  //     comments: 25,
  //     status: "published",
  //   },
  //   {
  //     id: 6,
  //     title: "Basketball Team Championship Victory",
  //     author: "Coach Martinez",
  //     publishDate: "2024-01-08T11:30:00Z",
  //     category: "Sports",
  //     views: 1850,
  //     likes: 92,
  //     comments: 34,
  //     status: "published",
  //   },
  // ]

  const categories = [
    { name: "Science", count: 12, color: "bg-blue-100 text-blue-800" },
    { name: "Arts", count: 8, color: "bg-purple-100 text-purple-800" },
    { name: "Sports", count: 15, color: "bg-green-100 text-green-800" },
    { name: "News", count: 20, color: "bg-orange-100 text-orange-800" },
    { name: "Academic", count: 10, color: "bg-indigo-100 text-indigo-800" },
    { name: "Events", count: 6, color: "bg-pink-100 text-pink-800" },
  ];

  const statusColors = {
    draft: "bg-gray-100 text-gray-800",
    review: "bg-yellow-100 text-yellow-800",
    pending: "bg-blue-100 text-blue-800",
    published: "bg-green-100 text-green-800",
    rejected: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    DRAFT: Clock,
    PENDING_REVIEW: Eye,
    PUBLISHED: Clock,
    ARCHIVED: CheckCircle,
    // rejected: XCircle,
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground">
            Manage publications, drafts, and content categories
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button asChild variant="outline">
            <Link href="/categories/manage">
              <Tag className="mr-2 h-4 w-4" />
              Manage Categories
            </Link>
          </Button>
          <Button asChild>
            <Link href="/publications/create">
              <Plus className="mr-2 h-4 w-4" />
              New Publication
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-blue-100 rounded-lg">
                <FileText className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">156</p>
                <p className="text-sm text-muted-foreground">
                  Total Publications
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">12</p>
                <p className="text-sm text-muted-foreground">Pending Review</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-gray-100 rounded-lg">
                <Edit className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">8</p>
                <p className="text-sm text-muted-foreground">Drafts</p>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">136</p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="drafts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drafts">Drafts & Review</TabsTrigger>
          <TabsTrigger value="published">Published Content</TabsTrigger>
          <TabsTrigger value="archived">Archived Content</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="drafts" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search drafts..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="review">In Review</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                  </SelectContent>
                </Select>
                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger className="w-full sm:w-48">
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="Science">Science</SelectItem>
                    <SelectItem value="Arts">Arts</SelectItem>
                    <SelectItem value="Sports">Sports</SelectItem>
                    <SelectItem value="News">News</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Drafts List */}
          <div className="space-y-4">
            {toReview?.postToReview?.map((publication: any) => {
              const StatusIcon =
                statusIcons[publication.status as keyof typeof statusIcons];
              return (
                <Card
                  key={publication.pubId}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {publication.title}
                          </h3>
                          <Badge
                            className={
                              statusColors[
                                publication.status as keyof typeof statusColors
                              ]
                            }
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {publication?.status}
                          </Badge>
                          <Badge variant="outline">
                            {publication.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {publication.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {publication?.author?.firstName}
                                {/* .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")} */}
                              </AvatarFallback>
                            </Avatar>
                            <span>{publication?.author?.firstName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {publication?.author?.role}
                            </Badge>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              publication.updatedAt
                            ).toLocaleDateString()}
                          </span>
                          {/* <span>{publication.wordCount} words</span> */}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/publications/${publication.pubId}`}
                              className="flex items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/publications/${publication.pubId}/update`}
                              className="flex items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleApprove(publication.pubId)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Approve & Publish
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => handleArchive(publication.pubId)}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Archive Post
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-6">
          <div className="space-y-4">
            {publishedContent?.posts?.map((content: any) => (
              <Card
                key={content.pubId}
                className="hover:shadow-md transition-shadow"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-lg font-semibold">
                          {content?.title}
                        </h3>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Published
                        </Badge>
                        <Badge variant="outline">{content?.category}</Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <User className="h-4 w-4" />
                          <span>{content?.author?.firstName}</span>
                        </div>
                        <span className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {new Date(content.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <span>{content?.views} views</span>
                        <span>{content?.pubLikes} likes</span>
                        <span>{content?.pubComments} comments</span>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/publications/${content?.pubId}`}
                            className="flex items-center"
                          >
                            <Eye className="mr-2 h-4 w-4" />
                            View
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem asChild>
                          <Link
                            href={`/publications/${content?.pubId}/update`}
                            className="flex items-center"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </Link>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <XCircle className="mr-2 h-4 w-4" />
                          Unpublish
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          <div className="space-y-4">
            {archivedPost?.map((publication: any) => {
              const StatusIcon =
                statusIcons[publication.status as keyof typeof statusIcons];
              return (
                <Card
                  key={publication.pubId}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <h3 className="text-lg font-semibold">
                            {publication.title}
                          </h3>
                          <Badge
                            className={
                              statusColors[
                                publication.status as keyof typeof statusColors
                              ]
                            }
                          >
                            <StatusIcon className="h-3 w-3 mr-1" />
                            {publication?.status}
                          </Badge>
                          <Badge variant="outline">
                            {publication.category}
                          </Badge>
                        </div>
                        <p className="text-muted-foreground mb-3">
                          {publication.excerpt}
                        </p>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Avatar className="h-6 w-6">
                              <AvatarFallback className="text-xs">
                                {publication?.author?.firstName}
                                {/* .split(" ")
                                  .map((n: any) => n[0])
                                  .join("")} */}
                              </AvatarFallback>
                            </Avatar>
                            <span>{publication?.author?.firstName}</span>
                            <Badge variant="secondary" className="text-xs">
                              {publication?.author?.role}
                            </Badge>
                          </div>
                          <span className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              publication.updatedAt
                            ).toLocaleDateString()}
                          </span>
                          {/* <span>{publication.wordCount} words</span> */}
                        </div>
                      </div>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/publications/${publication.pubId}`}
                              className="flex items-center"
                            >
                              <Eye className="mr-2 h-4 w-4" />
                              Preview
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/publications/${publication.pubId}/update`}
                              className="flex items-center"
                            >
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </Link>
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => restoreArchive(publication.pubId)}
                          >
                            <CheckCircle className="mr-2 h-4 w-4" />
                            Restore for Review
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => console.log("delete")}
                            className="text-red-600"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Publication
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Content Categories</CardTitle>
              <CardDescription>
                Manage publication categories and their organization
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {categories.map((category) => (
                  <Card
                    key={category.name}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold">{category.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            {category.count} publications
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge className={category.color}>
                            {category.count}
                          </Badge>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem>
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Category
                              </DropdownMenuItem>
                              <DropdownMenuItem>
                                <FolderOpen className="mr-2 h-4 w-4" />
                                View Publications
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                              <DropdownMenuItem className="text-red-600">
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete Category
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
