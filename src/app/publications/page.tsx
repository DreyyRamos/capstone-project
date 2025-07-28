"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Calendar, Eye, Heart, MessageCircle, PlusCircle } from "lucide-react"
import Link from "next/link"

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [sortBy, setSortBy] = useState("newest")

  const publications = [
    {
      id: 1,
      title: "Annual Science Fair Results",
      excerpt:
        "Outstanding achievements from our students in the 2024 Science Fair competition. This year saw record participation with over 200 projects submitted across various scientific disciplines.",
      author: "Dr. Sarah Johnson",
      date: "2024-01-15",
      category: "Science",
      views: 1250,
      likes: 45,
      comments: 12,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 2,
      title: "New Library Digital Resources",
      excerpt:
        "Exciting new digital resources now available in our school library system. Students can now access thousands of e-books, research databases, and multimedia content.",
      author: "Maria Rodriguez",
      date: "2024-01-12",
      category: "Library",
      views: 890,
      likes: 32,
      comments: 8,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
    },
    {
      id: 3,
      title: "Student Art Exhibition 2024",
      excerpt:
        "Showcasing the incredible artistic talents of our students in this year's exhibition. The gallery features paintings, sculptures, digital art, and photography.",
      author: "James Wilson",
      date: "2024-01-10",
      category: "Arts",
      views: 2100,
      likes: 78,
      comments: 25,
      image: "/placeholder.svg?height=200&width=300",
      featured: true,
    },
    {
      id: 4,
      title: "Basketball Team Championship Victory",
      excerpt:
        "Our varsity basketball team secured the regional championship with an outstanding performance throughout the season. Coach Martinez shares insights on the team's success.",
      author: "Coach Martinez",
      date: "2024-01-08",
      category: "Sports",
      views: 1850,
      likes: 92,
      comments: 34,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
    },
    {
      id: 5,
      title: "Environmental Club Tree Planting Initiative",
      excerpt:
        "The Environmental Club successfully planted 500 trees around the school campus as part of their sustainability initiative. Learn about their ongoing environmental projects.",
      author: "Emma Green",
      date: "2024-01-05",
      category: "Environment",
      views: 675,
      likes: 28,
      comments: 15,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
    },
    {
      id: 6,
      title: "Drama Club's Winter Performance",
      excerpt:
        "The Drama Club's winter performance of 'A Midsummer Night's Dream' was a tremendous success. Behind-the-scenes look at the preparation and execution of this classic play.",
      author: "Ms. Thompson",
      date: "2024-01-03",
      category: "Arts",
      views: 1120,
      likes: 56,
      comments: 19,
      image: "/placeholder.svg?height=200&width=300",
      featured: false,
    },
  ]

  const categories = ["all", "Science", "Library", "Arts", "Sports", "Environment", "Academic", "News"]

  const filteredPublications = publications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || pub.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const sortedPublications = [...filteredPublications].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime()
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime()
      case "popular":
        return b.views - a.views
      case "liked":
        return b.likes - a.likes
      default:
        return 0
    }
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Publications</h1>
          <p className="text-muted-foreground">
            Discover the latest news, articles, and updates from our school community
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
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
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
        {sortedPublications.map((publication) => (
          <Card key={publication.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={publication.image || "/placeholder.svg"}
                alt={publication.title}
                className="w-full h-48 object-cover"
              />
              {publication.featured && (
                <Badge className="absolute top-2 left-2 bg-yellow-500 hover:bg-yellow-600">Featured</Badge>
              )}
              <Badge variant="secondary" className="absolute top-2 right-2">
                {publication.category}
              </Badge>
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-2 line-clamp-2">
                <Link href={`/publications/${publication.id}`} className="hover:text-blue-600">
                  {publication.title}
                </Link>
              </h3>
              <p className="text-muted-foreground mb-4 line-clamp-3">{publication.excerpt}</p>

              <div className="flex items-center gap-2 mb-4">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>
                    {publication.author
                      .split(" ")
                      .map((n) => n[0])
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
                  <Link href={`/publications/${publication.id}`}>Read More</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {sortedPublications.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-muted-foreground">No publications found matching your criteria.</p>
            <Button asChild className="mt-4">
              <Link href="/publications/create">Create the first publication</Link>
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
