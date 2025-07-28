"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  Heart,
  MessageCircle,
  Share2,
  Flag,
  ArrowLeft,
  Clock,
  Bookmark,
  Eye,
} from "lucide-react";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";

export default function PublicationDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const [newComment, setNewComment] = useState("");
  const [isLiked, setIsLiked] = useState(false);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  // fetch this data based on the ID
  const publication = {
    id: 1,
    title: "Annual Science Fair Results: Outstanding Student Achievements",
    content: `
      <p>We are thrilled to announce the results of this year's Annual Science Fair, which showcased the incredible talent and dedication of our students. The event, held on March 15th, featured over 150 projects from students across all grade levels.</p>
      
      <h3>First Place Winners:</h3>
      <ul>
        <li><strong>Biology Category:</strong> Sarah Johnson (Grade 11) - "The Effects of Microplastics on Aquatic Ecosystems"</li>
        <li><strong>Chemistry Category:</strong> Michael Chen (Grade 12) - "Sustainable Battery Technology Using Organic Materials"</li>
        <li><strong>Physics Category:</strong> Emma Rodriguez (Grade 10) - "Renewable Energy Optimization in Small-Scale Wind Turbines"</li>
        <li><strong>Environmental Science:</strong> David Kim (Grade 11) - "Urban Air Quality Monitoring Using IoT Sensors"</li>
      </ul>
      
      <p>The judging panel, consisting of local university professors and industry professionals, was impressed by the quality of research and presentation skills demonstrated by all participants.</p>
      
      <h3>Special Recognition:</h3>
      <p>This year, we're proud to announce that three of our projects have been selected to represent Lincoln High School at the State Science Fair competition in May. We wish Sarah, Michael, and Emma the best of luck as they compete at the state level.</p>
      
      <p>The Science Fair continues to be one of our most anticipated annual events, fostering scientific curiosity and critical thinking among our students. We extend our gratitude to all the teachers, parents, and volunteers who made this event possible.</p>
      
      <p>Congratulations to all participants for their hard work and dedication to scientific inquiry!</p>
    `,
    author: "Dr. Patricia Williams",
    authorRole: "Science Department Head",
    date: "2024-01-20T09:00:00Z",
    category: "Science",
    tags: ["Science Fair", "Student Achievement", "STEM", "Competition"],
    views: 1247,
    likes: 89,
    comments: 23,
    readTime: "4 min read",
    coverImage: "/placeholder.svg?height=400&width=800",
  };

  const comments = [
    {
      id: 1,
      content:
        "Congratulations to all the winners! The projects sound absolutely fascinating, especially Sarah's work on microplastics. It's great to see students tackling such important environmental issues.",
      author: "Jennifer Martinez",
      authorRole: "Parent",
      date: "2024-01-20T10:30:00Z",
      likes: 12,
      replies: [
        {
          id: 11,
          content:
            "I completely agree! As a marine biology teacher, I'm particularly excited about Sarah's research. These are the kinds of projects that can make a real difference.",
          author: "Mr. Thompson",
          authorRole: "Teacher",
          date: "2024-01-20T11:15:00Z",
          likes: 8,
        },
      ],
    },
    {
      id: 2,
      content:
        "So proud of our students! Michael's sustainable battery project caught my attention - this could have real commercial applications. Has anyone reached out to local tech companies about potential internships?",
      author: "Robert Chen",
      authorRole: "Alumni",
      date: "2024-01-20T14:20:00Z",
      likes: 15,
      replies: [],
    },
    {
      id: 3,
      content:
        "The Science Fair was amazing this year! As a student who participated, I can say the level of competition was incredible. Congratulations to all the winners - you truly deserved it!",
      author: "Alex Rivera",
      authorRole: "Student",
      date: "2024-01-20T16:45:00Z",
      likes: 7,
      replies: [
        {
          id: 31,
          content:
            "What was your project about, Alex? I'd love to hear more about the student perspective!",
          author: "Ms. Johnson",
          authorRole: "Teacher",
          date: "2024-01-20T17:30:00Z",
          likes: 3,
        },
      ],
    },
    {
      id: 4,
      content:
        "This is exactly why I love working at Lincoln High. Our students consistently demonstrate such creativity and scientific rigor. Looking forward to seeing how our representatives do at State!",
      author: "Principal Davis",
      authorRole: "Principal",
      date: "2024-01-21T08:00:00Z",
      likes: 24,
      replies: [],
    },
  ];

  const handleLike = () => {
    if (requireAuth("like this publication")) {
      setIsLiked(!isLiked);
    }
  };

  const handleBookmark = () => {
    if (requireAuth("bookmark this publication")) {
      setIsBookmarked(!isBookmarked);
    }
  };

  const handleComment = () => {
    if (requireAuth("comment on this publication")) {
      if (newComment.trim()) {
        console.log("Adding comment:", newComment);
        setNewComment("");
      }
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    // show a toast notification here
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />

      {/* Back Button */}
      <Button asChild variant="ghost">
        <Link href="/publications">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Publications
        </Link>
      </Button>

      {/* Article Header */}
      <article className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            <Badge variant="secondary">{publication.category}</Badge>
            {publication.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold leading-tight">
            {publication.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarFallback>
                  {publication.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{publication.author}</p>
                <p className="text-sm text-muted-foreground">
                  {publication.authorRole}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(publication.date).toLocaleDateString()}
                  </span>
                  <span>{publication.readTime}</span>
                  <span className="flex items-center gap-1">
                    <Eye className="h-3 w-3" />
                    {publication.views} views
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={handleLike}
                className={
                  isLiked ? "bg-red-50 text-red-600 border-red-200" : ""
                }
              >
                <Heart
                  className={`mr-2 h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                />
                {publication.likes + (isLiked ? 1 : 0)}
              </Button>
              <Button variant="outline" size="sm" onClick={handleShare}>
                <Share2 className="mr-2 h-4 w-4" />
                Share
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleBookmark}
                className={
                  isBookmarked ? "bg-blue-50 text-blue-600 border-blue-200" : ""
                }
              >
                <Bookmark
                  className={`h-4 w-4 ${isBookmarked ? "fill-current" : ""}`}
                />
              </Button>
              <Button variant="outline" size="sm">
                <Flag className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Cover Image */}
        {publication.coverImage && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={publication.coverImage || "/placeholder.svg"}
              alt={publication.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Article Content */}
        <div
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: publication.content }}
        />

        {/* Article Footer */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <MessageCircle className="h-4 w-4" />
              {publication.comments} comments
            </span>
            <span className="flex items-center gap-1">
              <Heart className="h-4 w-4" />
              {publication.likes} likes
            </span>
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>

        {/* Comment Form */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Textarea
                placeholder="Share your thoughts about this publication..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows={3}
              />
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Be respectful and constructive in your comments
                </p>
                <Button onClick={handleComment} disabled={!newComment.trim()}>
                  Post Comment
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List */}
        <div className="space-y-4">
          {comments.map((comment) => (
            <Card key={comment.id}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Avatar className="h-10 w-10">
                      <AvatarFallback>
                        {comment.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{comment.author}</p>
                        <Badge variant="outline" className="text-xs">
                          {comment.authorRole}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {new Date(comment.date).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        {comment.content}
                      </p>
                      <div className="flex items-center gap-4">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => requireAuth("like this comment")}
                        >
                          <Heart className="mr-1 h-3 w-3" />
                          {comment.likes}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => requireAuth("reply to this comment")}
                        >
                          Reply
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Replies */}
                  {comment.replies && comment.replies.length > 0 && (
                    <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                      {comment.replies.map((reply) => (
                        <div key={reply.id} className="flex items-start gap-4">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback className="text-xs">
                              {reply.author
                                .split(" ")
                                .map((n) => n[0])
                                .join("")}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-2">
                              <p className="font-medium text-sm">
                                {reply.author}
                              </p>
                              <Badge variant="outline" className="text-xs">
                                {reply.authorRole}
                              </Badge>
                              <span className="text-xs text-muted-foreground">
                                {new Date(reply.date).toLocaleDateString()}
                              </span>
                            </div>
                            <p className="text-sm leading-relaxed">
                              {reply.content}
                            </p>
                            <div className="flex items-center gap-4">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => requireAuth("like this reply")}
                              >
                                <Heart className="mr-1 h-3 w-3" />
                                {reply.likes}
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() =>
                                  requireAuth("reply to this comment")
                                }
                              >
                                Reply
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Comments */}
        <div className="text-center">
          <Button variant="outline">Load More Comments</Button>
        </div>
      </div>
    </div>
  );
}
