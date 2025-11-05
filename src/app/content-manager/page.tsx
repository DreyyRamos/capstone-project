"use client";

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  FileText,
  Clock,
  CheckCircle,
  XCircle,
  Edit,
  Plus,
  Tag,
} from "lucide-react";
import ContentManagerLoading from "./loading";
import { useEditorQuery } from "@/hooks/useEditor";
import Cookies from "js-cookie";
import Link from "next/link";
import {
  usePostQuery,
  useArchivedPostsQuery,
  useCountPubsQuery,
  useRejectedPostsQuery,
} from "@/hooks/usePost";
import { useRoleGate } from "@/utils/userRoleGate";
import { toast } from "sonner";
import Drafts from "@/components/content-manager/drafts";
import Published from "@/components/content-manager/published";
import Archived from "@/components/content-manager/archived";
import Rejected from "@/components/content-manager/rejected";

enum Status {
  DRAFT = 0,
  PUBLISHED = 1,
  ARCHIVED = 2,
  PENDING_REVIEW = 3,
  REJECTED = 4,
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
  useRoleGate(["ADMIN", "EDITOR"], token);
  const {
    data: toReview,
    isLoading,
    approve,
    archive,
    reject,
    restoreArchive,
  } = useEditorQuery(token);

  const { data: publishedContent } = usePostQuery(token);
  const { data: archivedPost } = useArchivedPostsQuery(token);
  const { data: rejectedPosts } = useRejectedPostsQuery(token);
  const { data: pubsCount } = useCountPubsQuery(token);

  // Get unique categories from all content
  const categories = useMemo(() => {
    const allContent = [
      ...(toReview?.postToReview || []),
      ...(publishedContent?.posts || []),
      ...(archivedPost || []),
      ...(rejectedPosts || []),
    ];
    const uniqueCategories = [
      ...new Set(allContent.map((item: any) => item.category).filter(Boolean)),
    ];
    return ["all", ...uniqueCategories];
  }, [toReview, publishedContent, archivedPost, rejectedPosts]);

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
          (statusFilter === "archived" && publication.status === "ARCHIVED") ||
          (statusFilter === "rejected" && publication.status === "REJECTED");

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

  const filteredRejected = useMemo(() => {
    if (!rejectedPosts) return [];

    const filtered = rejectedPosts.filter((publication: Publication) => {
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
  }, [rejectedPosts, searchQuery, categoryFilter, sortBy]);

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

  const handleReject = async (postId: string) => {
    try {
      await reject(postId, {
        onSuccess: () => {
          toast("Publication archived!");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const totalPubs =
    (pubsCount?.publications.PUBLISHED ?? 0) +
    (pubsCount?.publications.ARCHIVED ?? 0) +
    (pubsCount?.publications.PENDING_REVIEW ?? 0) +
    (pubsCount?.publications.REJECTED ?? 0);

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
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-green-100 rounded-lg">
                <CheckCircle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">
                  {pubsCount?.publications.REJECTED || 0}
                </p>
                <p className="text-sm text-muted-foreground">Rejected</p>
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
          <TabsTrigger value="rejected">
            Rejected Content
            {(searchQuery || categoryFilter !== "all") && (
              <Badge variant="secondary" className="ml-2 h-4 px-1 text-xs">
                {filteredRejected.length}
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
                      <SelectItem value="rejected">Rejected</SelectItem>
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
              {activeTab === "rejected" && (
                <span>
                  Showing {filteredArchived.length} of{" "}
                  {rejectedPosts?.length || 0} rejected items
                </span>
              )}
            </div>
          </div>
        )}

        <TabsContent value="drafts" className="space-y-6">
          <div className="space-y-4 mb-5.5">
            {filteredDrafts.length > 0 ? (
              filteredDrafts.map((publication: Publication) => {
                return (
                  <Drafts
                    key={publication.pubId}
                    publication={publication}
                    handleArchive={handleArchive}
                    handleApprove={handleApprove}
                    handleReject={handleReject}
                  />
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
                <Published
                  key={content.pubId}
                  content={content}
                  handleArchive={handleArchive}
                />
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
                return (
                  <Archived
                    key={publication.pubId}
                    publication={publication}
                    restoreArchive={restoreArchive}
                  />
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

        <TabsContent value="rejected" className="space-y-6">
          <div className="space-y-4 mb-8">
            {filteredRejected.length > 0 ? (
              filteredRejected.map((publication: Publication) => {
                return (
                  <Rejected
                    key={publication.pubId}
                    publication={publication}
                    // restoreArchive={restoreArchive}
                  />
                );
              })
            ) : (
              <Card>
                <CardContent className="p-12 text-center">
                  <div className="space-y-4">
                    <XCircle className="mx-auto h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">
                      No rejected content found
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
