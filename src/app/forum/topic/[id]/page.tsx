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
  Pin,
  Clock,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";

export default function ForumTopicPage({ params }: { params: { id: string } }) {
  const [newReply, setNewReply] = useState("");
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();

  // fetch this data based on the ID
  const topic = {
    id: 1,
    title: "Tips for Better Study Habits",
    content:
      "I've been struggling with maintaining consistent study habits and would love to hear what works for other students. What are your best tips for staying focused and organized with schoolwork?",
    author: "Alex Chen",
    authorRole: "Student",
    date: "2024-01-15T10:30:00Z",
    category: "Academic",
    views: 145,
    replies: 23,
    isPinned: false,
    isLocked: false,
    likes: 12,
  };

  const replies = [
    {
      id: 1,
      content:
        "Great question! I've found that the Pomodoro Technique really helps me stay focused. I study for 25 minutes, then take a 5-minute break. After 4 cycles, I take a longer 15-30 minute break. It keeps me from getting overwhelmed and helps maintain concentration.",
      author: "Sarah Johnson",
      authorRole: "Student",
      date: "2024-01-15T11:15:00Z",
      likes: 8,
      dislikes: 0,
      isHelpful: true,
    },
    {
      id: 2,
      content:
        "I second the Pomodoro Technique! Also, I've found that having a dedicated study space really makes a difference. I have a specific corner of my room that's only for studying - no games, no distractions. When I sit there, my brain knows it's time to focus.",
      author: "Michael Brown",
      authorRole: "Student",
      date: "2024-01-15T12:00:00Z",
      likes: 6,
      dislikes: 0,
      isHelpful: false,
    },
    {
      id: 3,
      content:
        "As a teacher, I'd recommend creating a study schedule and sticking to it. Consistency is key! Also, don't try to cram everything in one session. Spaced repetition - reviewing material multiple times over several days - is much more effective than marathon study sessions.",
      author: "Ms. Rodriguez",
      authorRole: "Teacher",
      date: "2024-01-15T14:30:00Z",
      likes: 15,
      dislikes: 1,
      isHelpful: true,
    },
    {
      id: 4,
      content:
        "One thing that's helped me is studying with friends, but in a structured way. We quiz each other and explain concepts to one another. Teaching someone else really helps solidify your own understanding!",
      author: "Emma Davis",
      authorRole: "Student",
      date: "2024-01-15T16:45:00Z",
      likes: 4,
      dislikes: 0,
      isHelpful: false,
    },
  ];

  const handleSubmitReply = () => {
    if (requireAuth("reply to this topic")) {
      if (newReply.trim()) {
        console.log("Submitting reply:", newReply);
        setNewReply("");
      }
    }
  };

  const handleLike = () => {
    requireAuth("like this topic");
  };

  const handleReplyLike = (replyId: number) => {
    requireAuth("like this reply");
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
        <Link href="/forum">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Forum
        </Link>
      </Button>

      {/* Topic Header */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {topic.isPinned && <Pin className="h-4 w-4 text-blue-600" />}
              <Badge variant="secondary">{topic.category}</Badge>
              <span className="text-sm text-muted-foreground">
                {topic.views} views
              </span>
            </div>

            <h1 className="text-3xl font-bold">{topic.title}</h1>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {topic.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{topic.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {topic.authorRole}
                  </p>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(topic.date).toLocaleString()}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" onClick={handleLike}>
                  <Heart className="mr-2 h-4 w-4" />
                  {topic.likes}
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
                <Button variant="outline" size="sm">
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="pt-4">
              <p className="text-lg leading-relaxed">{topic.content}</p>
            </div>

            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <MessageCircle className="h-4 w-4" />
                {topic.replies} replies
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Replies ({replies.length})</h2>

        {replies.map((reply, index) => (
          <Card key={reply.id}>
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="h-10 w-10">
                  <AvatarFallback>
                    {reply.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1 space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">{reply.author}</p>
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">
                          {reply.authorRole}
                        </Badge>
                        {reply.isHelpful && (
                          <Badge
                            variant="secondary"
                            className="text-xs bg-green-100 text-green-800"
                          >
                            Helpful
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {new Date(reply.date).toLocaleString()}
                      </p>
                    </div>
                  </div>

                  <p className="leading-relaxed">{reply.content}</p>

                  <div className="flex items-center gap-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplyLike(reply.id)}
                    >
                      <ThumbsUp className="mr-2 h-4 w-4" />
                      {reply.likes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleReplyLike(reply.id)}
                    >
                      <ThumbsDown className="mr-2 h-4 w-4" />
                      {reply.dislikes}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => requireAuth("reply to this comment")}
                    >
                      Reply
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Flag className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Reply Form */}
      <Card>
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold mb-4">Add a Reply</h3>
          <div className="space-y-4">
            <Textarea
              placeholder="Share your thoughts or advice..."
              value={newReply}
              onChange={(e) => setNewReply(e.target.value)}
              rows={4}
            />
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">
                Be respectful and constructive in your responses
              </p>
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setNewReply("")}>
                  Cancel
                </Button>
                <Button onClick={handleSubmitReply} disabled={!newReply.trim()}>
                  Post Reply
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
