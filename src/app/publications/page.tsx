"use client"

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, PlusCircle } from "lucide-react";
import { usePostQuery } from "@/hooks/usePost";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "@/components/auth-modal";
import { useRouter } from "next/navigation";
import { useUserQuery } from "@/hooks/useUser";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import PublicationsLoading from "./loading";
import PublicationGrid from "@/components/publication/publication-grid";

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
  author: Author;
  createdAt: Date;
  pubLikes: string[];
  pubComments: string[];
  isFeatured?: boolean;
}

export default function PublicationsPage() {
  const router = useRouter();
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const token = Cookies.get("token") || "";
  const { data: currentUser } = useUserQuery(token);

  const { StatusModal, checkPost } = useUserStatusCheck(
    currentUser?.userData?.status,
    {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    },
  );
  const { data, isLoading } = usePostQuery(token);

  const categories = [
    "all",
    "Science",
    "Arts",
    "Sports",
    "Academic",
    "News",
    "Events",
    "Library",
    "Environment",
    "Technology",
    "Health",
    "Community",
  ];

  const startDiscussion = (e: React.MouseEvent<HTMLAnchorElement>) => {
    checkPost(async () => {
      e.preventDefault();
      if (requireAuth("create a publication")) {
        router.push("/publications/create");
      }
    });
  };

  const filteredAndSortedPubs = useMemo(() => {
    if (!data?.posts) return [];

    // filter the publications
    const filtered = data.posts.filter((publication: Publication) => {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === "" ||
        publication.title?.toLowerCase().includes(searchLower) ||
        publication.excerpt?.toLowerCase().includes(searchLower) ||
        publication.content?.toLowerCase().includes(searchLower) ||
        `${publication.author?.firstName} ${publication.author?.lastName}`
          .toLowerCase()
          .includes(searchLower) ||
        publication.tags?.some((tag) =>
          tag.toLowerCase().includes(searchLower),
        );

      const matchesCategory =
        selectedCategory === "all" || publication.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    const sorted = [...filtered].sort((a: Publication, b: Publication) => {
      switch (sortBy) {
        case "newest":
          return (
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

        case "oldest":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );

        case "liked":
          return (b.pubLikes?.length || 0) - (a.pubLikes?.length || 0);

        case "commented":
          return (b.pubComments?.length || 0) - (a.pubComments?.length || 0);

        case "alphabetical":
          return (a.title || "").localeCompare(b.title || "");

        default:
          return 0;
      }
    });

    return sorted.sort((a, b) => {
      if (a.isFeatured && !b.isFeatured) return -1;
      if (!a.isFeatured && b.isFeatured) return 1;
      return 0;
    });
  }, [data?.posts, searchQuery, selectedCategory, sortBy]);

  if (isLoading) {
    return <PublicationsLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="space-y-6">
      <StatusModal />
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      {/* Header */}
      <div
        id="page-flex-2"
        data-testId="page-flex-2"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div id="page-div-3" data-testId="page-div-3">
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-muted-foreground">
            Discover the latest news, articles, and updates from our school
            community
          </p>
        </div>
        <Button asChild>
          <a
            id="page-a-1"
            data-testId="page-a-1"
            className="cursor-pointer"
            onClick={startDiscussion}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Publication
          </a>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div
            id="page-flex-4"
            data-testId="page-flex-4"
            className="flex flex-col sm:flex-row gap-4"
          >
            <div
              id="page-div-5"
              data-testId="page-div-5"
              className="relative flex-1"
            >
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search publications, authors, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
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
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="oldest">Oldest First</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
                <SelectItem value="commented">Most Commented</SelectItem>
                <SelectItem value="alphabetical">A to Z</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Results count */}
      <div
        id="page-flex-6"
        data-testId="page-flex-6"
        className="flex items-center justify-between"
      >
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedPubs.length} of {data?.posts?.length || 0}{" "}
          publications
        </p>
        {searchQuery && (
          <Button
            id="page-button-1"
            data-testId="page-button-1"
            variant="ghost"
            size="sm"
            onClick={() => setSearchQuery("")}
          >
            Clear search
          </Button>
        )}
      </div>

      {/* Publications Grid */}
      <div
        id="page-grid-7"
        data-testId="page-grid-7"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
      >
        {filteredAndSortedPubs.map((publication: Publication) => (
          <PublicationGrid key={publication.pubId} publication={publication} />
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedPubs.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div id="page-div-8" data-testId="page-div-8" className="space-y-4">
              <h3 className="text-lg font-medium">No publications found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "all"
                  ? "No publications match your current filters. Try adjusting your search or category selection."
                  : "No publications have been created yet."}
              </p>
              <div
                id="page-flex-9"
                data-testId="page-flex-9"
                className="flex flex-col sm:flex-row gap-2 justify-center"
              >
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
                    id="page-button-2"
                    data-testId="page-button-2"
                    variant="outline"
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory("all");
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button asChild>
                  <Link
                    id="page-link-1"
                    data-testId="page-link-1"
                    href="/publications/create"
                  >
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Create Publication
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
