"use client"

import { useState, useMemo } from "react";
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
  Calendar,
  Eye,
  Heart,
  MessageCircle,
  PlusCircle,
} from "lucide-react";
import { usePostQuery } from "@/hooks/usePost";
import Cookies from "js-cookie";
import Link from "next/link";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { AuthModal } from "@/components/auth-modal";
import { useRouter } from "next/navigation";
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
  // views?: number;
}

export default function PublicationsPage() {
  const router = useRouter();
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const token = Cookies.get("token") || "";

  const { data, isLoading } = usePostQuery(token);

  console.log("data from puubs", data);

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
    e.preventDefault();
    if (requireAuth("create a publication")) {
      router.push("/publications/create");
    }
  };

  // Improved filtering and sorting logic
  const filteredAndSortedPubs = useMemo(() => {
    if (!data?.posts) return [];

    // filter the publications
    const filtered = data.posts.filter((publication: Publication) => {
      // Search filter - check title, excerpt, content, author name, and tags
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
          tag.toLowerCase().includes(searchLower)
        );

      // Category filter
      const matchesCategory =
        selectedCategory === "all" || publication.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });

    // sort the filtered results
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

        // case "popular":
        //   // Sort by views otherwise by likes + comments
        //   const aPopularity =
        //     (a.views || 0) +
        //     (a.pubLikes?.length || 0) +
        //     (a.pubComments?.length || 0);
        //   const bPopularity =
        //     (b.views || 0) +
        //     (b.pubLikes?.length || 0) +
        //     (b.pubComments?.length || 0);
        //   return bPopularity - aPopularity;

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

    // prioritize featured publications
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
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-muted-foreground">
            Discover the latest news, articles, and updates from our school
            community
          </p>
        </div>
        <Button asChild>
          <a className="cursor-pointer" onClick={startDiscussion}>
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Publication
          </a>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
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
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          Showing {filteredAndSortedPubs.length} of {data?.posts?.length || 0}{" "}
          publications
        </p>
        {searchQuery && (
          <Button variant="ghost" size="sm" onClick={() => setSearchQuery("")}>
            Clear search
          </Button>
        )}
      </div>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAndSortedPubs.map((publication: Publication) => (
          <PublicationGrid key={publication.pubId} publication={publication} />
        ))}
      </div>

      {/* No results message */}
      {filteredAndSortedPubs.length === 0 && !isLoading && (
        <Card>
          <CardContent className="p-12 text-center">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">No publications found</h3>
              <p className="text-muted-foreground">
                {searchQuery || selectedCategory !== "all"
                  ? "No publications match your current filters. Try adjusting your search or category selection."
                  : "No publications have been created yet."}
              </p>
              <div className="flex flex-col sm:flex-row gap-2 justify-center">
                {(searchQuery || selectedCategory !== "all") && (
                  <Button
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
                  <Link href="/publications/create">
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
