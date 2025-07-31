"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Eye, Heart, MessageCircle, PlusCircle } from "lucide-react"
import { usePostQuery } from "@/hooks/usePost";
import Cookies from "js-cookie";
import Link from "next/link";

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
}

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const token = Cookies.get("token") || "";

  const { data } = usePostQuery(token);

  console.log("data from puubs", data);

  const categories = [
    "all",
    "Science",
    "Library",
    "Arts",
    "Sports",
    "Environment",
    "Academic",
    "News",
  ];

  // const filteredPublications = data?.posts?.filter((pub: Publication) => {
  //   const matchesSearch =
  //     pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //     pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesCategory =
  //     selectedCategory === "all" || pub.category === selectedCategory;
  //   return matchesSearch && matchesCategory;
  // });

  // const sortedPublications = [...filteredPublications].sort((a, b) => {
  //   switch (sortBy) {
  //     case "newest":
  //       return new Date(b.date).getTime() - new Date(a.date).getTime();
  //     case "oldest":
  //       return new Date(a.date).getTime() - new Date(b.date).getTime();
  //     case "popular":
  //       return b.views - a.views;
  //     case "liked":
  //       return b.likes - a.likes;
  //     default:
  //       return 0;
  //   }
  // });

  return (
    <div className="space-y-6">
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
          <Link href="/publications/create">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create Publication
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search publications..."
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
                <SelectItem value="popular">Most Viewed</SelectItem>
                <SelectItem value="liked">Most Liked</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Publications Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.posts?.map((publication: Publication) => (
          <Card
            key={publication.pubId}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={publication.imageUrl || "/placeholder.svg"}
                alt={publication.title}
                className="w-full h-48 object-cover"
              />
              {/* {publication.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                  Featured
                </Badge>
              )} */}
              <Badge variant="secondary" className="absolute top-2 right-2">
                {publication.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                <Link
                  href={`/publications/${publication.pubId}`}
                  className="hover:text-blue-600"
                >
                  {publication.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {publication.excerpt}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {
                      publication.author?.firstName
                      // .split(" ")
                      // .map((n: any) => n[0])
                      // .join("")}
                    }
                  </AvatarFallback>
                </Avatar>
                <div>
                  {/* <p className="text-sm font-medium">{publication.author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(publication.date).toLocaleDateString()}
                  </p> */}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {/* {publication.views} */}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {/* {publication.likes} */}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {/* {publication.comments} */}
                  </span>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/publications/${publication.pubId}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
        {/* {sortedPublications.map((publication) => (
          <Card
            key={publication.id}
            className="overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="relative">
              <img
                src={publication.image || "/placeholder.svg"}
                alt={publication.title}
                className="w-full h-48 object-cover"
              />
              {publication.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">
                  Featured
                </Badge>
              )}
              <Badge variant="secondary" className="absolute top-2 right-2">
                {publication.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                <Link
                  href={`/publications/${publication.id}`}
                  className="hover:text-blue-600"
                >
                  {publication.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">
                {publication.excerpt}
              </p>

              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {publication.author
                      .split(" ")
                      .map((n: any) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="text-sm font-medium">{publication.author}</p>
                  <p className="text-xs text-muted-foreground flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {new Date(publication.date).toLocaleDateString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-4">
                  <span className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    {publication.views}
                  </span>
                  <span className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    {publication.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    {publication.comments}
                  </span>
                </div>
                <Button asChild variant="outline" size="sm">
                  <Link href={`/publications/${publication.id}`}>
                    Read More
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))} */}
      </div>

      {/* {sortedPublications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">
              No publications found matching your criteria.
            </p>
            <Button asChild className="mt-4">
              <Link href="/publications/create">
                Create the first publication
              </Link>
            </Button>
          </CardContent>
        </Card>
      )} */}
    </div>
  );
}
