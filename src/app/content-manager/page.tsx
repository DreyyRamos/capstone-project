"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  Plus,
  Tag,
  Heart,
  MessageCircle,
} from "lucide-react";
import ContentManagerLoading from "./loading";
import { useEditorQuery } from "@/hooks/useEditor";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  usePostQuery,
  useArchivedPostsQuery,
  useCountPubsQuery,
} from "@/hooks/usePost";
import { toast } from "sonner";

enum Status {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2,
  PENDING_REVIEW = 3,
}

interface Author {
  id: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  role: string;
}

interface Publication {
  pubId: string;
  title: string;
  excerpt: string;
  content: string;
  authorId: string;
  author: Author;
  category: string;
  tags: string[];
  status: keyof typeof Status;
  createdAt: Date;
  updatedAt: Date;
  pubLikes: any[];
  pubComments: any[];
  views?: number;
  isFeatured?: boolean;
}

export default function ContentManagerPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeTab, setActiveTab] = useState("drafts");

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
  const { data: pubsCount } = useCountPubsQuery(token);

  // Get unique categories from all content
  const categories = useMemo(() => {
    const allContent = [
      ...(toReview?.postToReview || []),
      ...(publishedContent?.posts || []),
      ...(archivedPost || []),
    ];
    const uniqueCategories = [
      ...new Set(allContent.map((item: any) => item.category).filter(Boolean)),
    ];
    return ["all", ...uniqueCategories];
  }, [toReview, publishedContent, archivedPost]);

  // Filtering and sorting logic for drafts/review content
  const filteredDrafts = useMemo(() => {
    if (!toReview?.postToReview) return [];

    const filtered = toReview.postToReview.filter(
      (publication: Publication) => {
        const searchLower = searchQuery.toLowerCase();

        // Search filter
        const matchesSearch =
          searchQuery === "" ||
          publication.title?.toLowerCase().includes(searchLower) ||
          publication.excerpt?.toLowerCase().includes(searchLower) ||
          publication.content?.toLowerCase().includes(searchLower) ||
          `${publication.author?.firstName} ${publication.author?.lastName}`
            .toLowerCase()
            .includes(searchLower) ||
          publication.tags?.some((tag) =>
            tag.toLowerCase().includes(searchLower)
          );

        // Status filter
        const matchesStatus =
          statusFilter === "all" ||
          (statusFilter === "draft" && publication.status === "DRAFT") ||
          (statusFilter === "review" &&
            publication.status === "PENDING_REVIEW") ||
          (statusFilter === "pending" &&
            publication.status === "PENDING_REVIEW") ||
          (statusFilter === "archived" && publication.status === "ARCHIVED");

        // Category filter
        const matchesCategory =
          categoryFilter === "all" || publication.category === categoryFilter;

        return matchesSearch && matchesStatus && matchesCategory;
      }
    );

    // Sort the filtered results
    return filtered.sort((a: Publication, b: Publication) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "alphabetical":
          return (a.title || "").localeCompare(b.title || "");
        case "author":
          const aAuthor = `${a.author?.firstName} ${a.author?.lastName}`;
          const bAuthor = `${b.author?.firstName} ${b.author?.lastName}`;
          return aAuthor.localeCompare(bAuthor);
        default:
          return 0;
      }
    });
  }, [
    toReview?.postToReview,
    searchQuery,
    statusFilter,
    categoryFilter,
    sortBy,
  ]);

  // Filtering and sorting logic for published content
  const filteredPublished = useMemo(() => {
    if (!publishedContent?.posts) return [];

    const filtered = publishedContent.posts.filter(
      (publication: Publication) => {
        const searchLower = searchQuery.toLowerCase();

        const matchesSearch =
          searchQuery === "" ||
          publication.title?.toLowerCase().includes(searchLower) ||
          publication.excerpt?.toLowerCase().includes(searchLower) ||
          `${publication.author?.firstName} ${publication.author?.lastName}`
            .toLowerCase()
            .includes(searchLower) ||
          publication.tags?.some((tag) =>
            tag.toLowerCase().includes(searchLower)
          );

        const matchesCategory =
          categoryFilter === "all" || publication.category === categoryFilter;

        return matchesSearch && matchesCategory;
      }
    );

    return filtered.sort((a: Publication, b: Publication) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "likes":
          return (b.pubLikes?.length || 0) - (a.pubLikes?.length || 0);
        case "comments":
          return (b.pubComments?.length || 0) - (a.pubComments?.length || 0);
        case "alphabetical":
          return (a.title || "").localeCompare(b.title || "");
        case "author":
          const aAuthor = `${a.author?.firstName} ${a.author?.lastName}`;
          const bAuthor = `${b.author?.firstName} ${b.author?.lastName}`;
          return aAuthor.localeCompare(bAuthor);
        default:
          return 0;
      }
    });
  }, [publishedContent?.posts, searchQuery, categoryFilter, sortBy]);

  console.log("filtered pubs", filteredPublished);

  // Filtering and sorting logic for archived content
  const filteredArchived = useMemo(() => {
    if (!archivedPost) return [];

    const filtered = archivedPost.filter((publication: Publication) => {
      const searchLower = searchQuery.toLowerCase();

      const matchesSearch =
        searchQuery === "" ||
        publication.title?.toLowerCase().includes(searchLower) ||
        publication.excerpt?.toLowerCase().includes(searchLower) ||
        `${publication.author?.firstName} ${publication.author?.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        publication.tags?.some((tag) =>
          tag.toLowerCase().includes(searchLower)
        );

      const matchesCategory =
        categoryFilter === "all" || publication.category === categoryFilter;

      return matchesSearch && matchesCategory;
    });

    return filtered.sort((a: Publication, b: Publication) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
          );
        case "oldest":
          return (
            new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
          );
        case "alphabetical":
          return (a.title || "").localeCompare(b.title || "");
        case "author":
          const aAuthor = `${a.author?.firstName} ${a.author?.lastName}`;
          const bAuthor = `${b.author?.firstName} ${b.author?.lastName}`;
          return aAuthor.localeCompare(bAuthor);
        default:
          return 0;
      }
    });
  }, [archivedPost, searchQuery, categoryFilter, sortBy]);

  const handleApprove = async (postId: string) => {
    try {
      await approve(postId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleArchive = async (postId: string) => {
    try {
      await archive(postId, {
        onSuccess: () => {
          toast("Publication archived!");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const statusColors = {
    DRAFT: "bg-gray-100 text-gray-800",
    PENDING_REVIEW: "bg-yellow-100 text-yellow-800",
    PUBLISHED: "bg-green-100 text-green-800",
    ARCHIVED: "bg-red-100 text-red-800",
  };

  const statusIcons = {
    DRAFT: Clock,
    PENDING_REVIEW: Eye,
    PUBLISHED: CheckCircle,
    ARCHIVED: XCircle,
  };

  const totalPubs =
    (pubsCount?.publications.PUBLISHED ?? 0) +
    (pubsCount?.publications.ARCHIVED ?? 0) +
    (pubsCount?.publications.PENDING_REVIEW ?? 0);

  const clearFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setCategoryFilter("all");
    setSortBy("newest");
  };

  const getSortOptions = () => {
    const baseOptions = [
      { value: "newest", label: "Newest First" },
      { value: "oldest", label: "Oldest First" },
      { value: "alphabetical", label: "A to Z" },
      { value: "author", label: "By Author" },
    ];

    if (activeTab === "published") {
      return [
        ...baseOptions,
        { value: "likes", label: "Most Liked" },
        { value: "comments", label: "Most Comments" },
      ];
    }

    return baseOptions;
  };

  if (isLoading) {
    return <ContentManagerLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4">
        <div>
          <h1 className="text-3xl font-bold">Content Manager</h1>
          <p className="text-muted-foreground">
            Manage publications, drafts, and content categories
          </p>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-2 sm:justify-end">
          <Button
            asChild
            variant="outline"
            className="w-full sm:w-auto bg-transparent"
          >
            <Link href="/categories/manage">
              <Tag className="mr-2 h-4 w-4" />
              Manage Categories
            </Link>
          </Button>
          <Button asChild className="w-full sm:w-auto">
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
                <p className="text-2xl font-bold">{totalPubs}</p>
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
                <p className="text-2xl font-bold">
                  {pubsCount?.publications.PENDING_REVIEW || 0}
                </p>
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
                <p className="text-2xl font-bold">
                  {pubsCount?.publications.ARCHIVED || 0}
                </p>
                <p className="text-sm text-muted-foreground">Archived</p>
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
                <p className="text-2xl font-bold">
                  {pubsCount?.publications.PUBLISHED || 0}
                </p>
                <p className="text-sm text-muted-foreground">Published</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs
        defaultValue="drafts"
        className="space-y-6 mb-5"
        onValueChange={setActiveTab}
      >
        <TabsList>
          <TabsTrigger value="drafts">
            Drafts & Review
            {(searchQuery ||
              statusFilter !== "all" ||
              categoryFilter !== "all") && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredDrafts.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="published">
            Published Content
            {(searchQuery || categoryFilter !== "all") && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredPublished.length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="archived">
            Archived Content
            {(searchQuery || categoryFilter !== "all") && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredArchived.length}
              </Badge>
            )}
          </TabsTrigger>
        </TabsList>

        {/* Universal Filters */}
        <Card>
          <CardContent className="p-4 sm:p-6">
            <div className="flex flex-col gap-3 sm:gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder={`Search ${
                    activeTab === "drafts" ? "drafts" : activeTab
                  } by title, author, content, or tags...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {activeTab === "drafts" && (
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="draft">Draft</SelectItem>
                      <SelectItem value="review">In Review</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="archived">Archived</SelectItem>
                    </SelectContent>
                  </Select>
                )}

                <Select
                  value={categoryFilter}
                  onValueChange={setCategoryFilter}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Filter by category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category} value={category}>
                        {category === "all" ? "All Categories" : category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger>
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {getSortOptions().map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                {(searchQuery ||
                  statusFilter !== "all" ||
                  categoryFilter !== "all" ||
                  sortBy !== "newest") && (
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="sm:col-span-1 bg-transparent"
                  >
                    Clear Filters
                  </Button>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Results Summary */}
        {(searchQuery ||
          statusFilter !== "all" ||
          categoryFilter !== "all") && (
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div>
              {activeTab === "drafts" && (
                <span>
                  Showing {filteredDrafts.length} of{" "}
                  {toReview?.postToReview?.length || 0} draft items
                </span>
              )}
              {activeTab === "published" && (
                <span>
                  Showing {filteredPublished.length} of{" "}
                  {publishedContent?.posts?.length || 0} published items
                </span>
              )}
              {activeTab === "archived" && (
                <span>
                  Showing {filteredArchived.length} of{" "}
                  {archivedPost?.length || 0} archived items
                </span>
              )}
            </div>
          </div>
        )}

        <TabsContent value="drafts" className="space-y-6">
          <div className="space-y-4 mb-5.5">
            {filteredDrafts.length > 0 ? (
              filteredDrafts.map((publication: Publication) => {
                const StatusIcon = statusIcons[publication.status];
                return (
                  <Card
                    key={publication.pubId}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold truncate mb-2">
                              {publication.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 mb-2">
                              <Badge
                                className={statusColors[publication.status]}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {publication?.status.replace("_", " ")}
                              </Badge>
                              <Badge variant="outline">
                                {publication.category}
                              </Badge>
                              {publication.isFeatured && (
                                <Badge className="bg-yellow-100 text-yellow-800">
                                  Featured
                                </Badge>
                              )}
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                              >
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

                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {publication.excerpt}
                        </p>

                        {/* Tags */}
                        {publication.tags && publication.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {publication.tags.slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {publication.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{publication.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar className="h-6 w-6 shrink-0">
                              <AvatarFallback className="text-xs">
                                {publication?.author?.firstName?.charAt(0)}
                                {publication?.author?.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">
                              {publication?.author?.firstName}{" "}
                              {publication?.author?.lastName}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs shrink-0"
                            >
                              {publication?.author?.role}
                            </Badge>
                          </div>
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              publication.updatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <Clock className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">No drafts found</h3>
                    <p className="text-muted-foreground">
                      {searchQuery ||
                      statusFilter !== "all" ||
                      categoryFilter !== "all"
                        ? "No drafts match your current filters."
                        : "No drafts or items pending review."}
                    </p>
                    {(searchQuery ||
                      statusFilter !== "all" ||
                      categoryFilter !== "all") && (
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-6">
          <div className="space-y-4 mb-5.5">
            {filteredPublished.length > 0 ? (
              filteredPublished.map((content: Publication) => (
                <Card
                  key={content.pubId}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4 sm:p-6">
                    <div className="space-y-3">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex-1 min-w-0">
                          <h3 className="text-lg font-semibold truncate mb-2">
                            {content?.title}
                          </h3>
                          <div className="flex flex-wrap items-center gap-1 mb-2">
                            <Badge className="bg-green-100 text-green-800">
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Published
                            </Badge>
                            <Badge variant="outline">{content?.category}</Badge>
                            {content.isFeatured && (
                              <Badge className="bg-yellow-100 text-yellow-800">
                                Featured
                              </Badge>
                            )}
                          </div>
                        </div>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0"
                            >
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
                            <DropdownMenuItem
                              className="text-red-600"
                              onClick={() => handleArchive(content?.pubId)}
                            >
                              <XCircle className="mr-2 h-4 w-4" />
                              Unpublish
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>

                      {/* Tags */}
                      {content.tags && content.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1">
                          {content.tags.slice(0, 2).map((tag, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {tag}
                            </Badge>
                          ))}
                          {content.tags.length > 2 && (
                            <Badge variant="outline" className="text-xs">
                              +{content.tags.length - 2}
                            </Badge>
                          )}
                        </div>
                      )}

                      <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2 min-w-0">
                          <User className="h-4 w-4 shrink-0" />
                          <span className="truncate">
                            {content?.author?.firstName}{" "}
                            {content?.author?.lastName}
                          </span>
                          <Badge
                            variant="secondary"
                            className="text-xs shrink-0"
                          >
                            {content?.author?.role}
                          </Badge>
                        </div>
                        <span className="flex items-center gap-1 shrink-0">
                          <Calendar className="h-4 w-4" />
                          {new Date(content.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                        {content.views && (
                          <span className="flex items-center gap-1">
                            <Eye className="h-4 w-4" />
                            {content.views} views
                          </span>
                        )}
                        <span className="flex items-center gap-1">
                          <Heart className="h-4 w-4" />
                          {content?.pubLikes?.length || 0} likes
                        </span>
                        <span className="flex items-center gap-1">
                          <MessageCircle className="h-4 w-4" />
                          {content?.pubComments?.length || 0} comments
                        </span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">
                      No published content found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery || categoryFilter !== "all"
                        ? "No published content matches your current filters."
                        : "No published content available."}
                    </p>
                    {(searchQuery || categoryFilter !== "all") && (
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          <div className="space-y-4 mb-8">
            {filteredArchived.length > 0 ? (
              filteredArchived.map((publication: Publication) => {
                const StatusIcon = statusIcons[publication.status];
                return (
                  <Card
                    key={publication.pubId}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 sm:p-6">
                      <div className="space-y-3">
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex-1 min-w-0">
                            <h3 className="text-lg font-semibold truncate mb-2">
                              {publication.title}
                            </h3>
                            <div className="flex flex-wrap items-center gap-1 mb-2">
                              <Badge
                                className={statusColors[publication.status]}
                              >
                                <StatusIcon className="h-3 w-3 mr-1" />
                                {publication?.status.replace("_", " ")}
                              </Badge>
                              <Badge variant="outline">
                                {publication.category}
                              </Badge>
                            </div>
                          </div>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="shrink-0"
                              >
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
                                onClick={() =>
                                  restoreArchive(publication.pubId)
                                }
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

                        <p className="text-muted-foreground text-sm line-clamp-2">
                          {publication.excerpt}
                        </p>

                        {/* Tags */}
                        {publication.tags && publication.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {publication.tags.slice(0, 2).map((tag, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                            {publication.tags.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{publication.tags.length - 2}
                              </Badge>
                            )}
                          </div>
                        )}

                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar className="h-6 w-6 shrink-0">
                              <AvatarFallback className="text-xs">
                                {publication?.author?.firstName?.charAt(0)}
                                {publication?.author?.lastName?.charAt(0)}
                              </AvatarFallback>
                            </Avatar>
                            <span className="truncate">
                              {publication?.author?.firstName}{" "}
                              {publication?.author?.lastName}
                            </span>
                            <Badge
                              variant="secondary"
                              className="text-xs shrink-0"
                            >
                              {publication?.author?.role}
                            </Badge>
                          </div>
                          <span className="flex items-center gap-1 shrink-0">
                            <Calendar className="h-4 w-4" />
                            {new Date(
                              publication.updatedAt
                            ).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">
                      No archived content found
                    </h3>
                    <p className="text-muted-foreground">
                      {searchQuery || categoryFilter !== "all"
                        ? "No archived content matches your current filters."
                        : "No archived content available."}
                    </p>
                    {(searchQuery || categoryFilter !== "all") && (
                      <Button variant="outline" onClick={clearFilters}>
                        Clear Filters
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
