"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  ArrowLeft,
  Calendar,
  Eye,
  Users,
  MoreHorizontal,
  Edit,
  Archive,
  Trash2,
  Share2,
  Bookmark,
  Flag,
  Clock,
  MessageSquare,
  ThumbsUp,
  Bell,
  BellOff,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useParams } from "next/navigation";

// Mock data for a single announcement
const mockAnnouncement = {
  id: "1",
  title: "Welcome to the New Academic Year!",
  content: `We're excited to welcome all students back for another amazing year of learning and growth. This year brings new opportunities, courses, and exciting events that will help shape your academic journey.

## What's New This Year

- **New Course Offerings**: We've added 15 new courses across various departments
- **Enhanced Digital Library**: Access to over 50,000 new digital resources
- **Student Support Services**: Expanded counseling and tutoring programs
- **Campus Improvements**: New study spaces and recreational facilities

## Important Dates to Remember

- **Orientation Week**: September 4-8, 2024
- **Classes Begin**: September 11, 2024
- **Add/Drop Deadline**: September 25, 2024
- **Midterm Exams**: October 23-27, 2024

We encourage all students to participate in orientation activities and connect with their academic advisors early in the semester. If you have any questions or need assistance, please don't hesitate to reach out to our support team.

Looking forward to a successful and enriching academic year ahead!`,
  author: {
    name: "Dr. Sarah Johnson",
    role: "Principal",
    avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    email: "s.johnson@school.edu",
  },
  priority: "important" as const,
  audience: "all" as const,
  status: "published" as const,
  createdAt: "2024-01-15T09:00:00Z",
  updatedAt: "2024-01-15T09:00:00Z",
  views: 1247,
  likes: 89,
  comments: 23,
  isBookmarked: false,
  isLiked: false,
  isSubscribed: true,
};

const priorityConfig = {
  normal: {
    label: "Normal",
    icon: CheckCircle,
    color: "text-green-600",
    bgColor: "bg-green-50",
    borderColor: "border-green-200",
  },
  important: {
    label: "Important",
    icon: Info,
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-200",
  },
  urgent: {
    label: "Urgent",
    icon: AlertTriangle,
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-200",
  },
};

const audienceConfig = {
  all: { label: "All Users", color: "bg-gray-100 text-gray-800" },
  students: { label: "Students", color: "bg-green-100 text-green-800" },
  editors: { label: "Editors", color: "bg-blue-100 text-blue-800" },
  moderators: { label: "Moderators", color: "bg-purple-100 text-purple-800" },
  admins: { label: "Admins", color: "bg-red-100 text-red-800" },
};

const relatedAnnouncements = [
  {
    id: "2",
    title: "New Library Resources Available",
    createdAt: "2024-01-13T14:20:00Z",
    priority: "normal" as const,
  },
  {
    id: "3",
    title: "Campus Safety Guidelines Update",
    createdAt: "2024-01-10T11:30:00Z",
    priority: "important" as const,
  },
  {
    id: "4",
    title: "Student Registration Deadline Reminder",
    createdAt: "2024-01-08T16:45:00Z",
    priority: "urgent" as const,
  },
];

export default function AnnouncementDetailPage() {
  const params = useParams();
  const [announcement, setAnnouncement] = useState(mockAnnouncement);
  const [isLoading, setIsLoading] = useState(false);

  const priority = priorityConfig[announcement.priority];
  const PriorityIcon = priority.icon;

  const handleLike = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnnouncement((prev) => ({
      ...prev,
      isLiked: !prev.isLiked,
      likes: prev.isLiked ? prev.likes - 1 : prev.likes + 1,
    }));
    setIsLoading(false);
  };

  const handleBookmark = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnnouncement((prev) => ({
      ...prev,
      isBookmarked: !prev.isBookmarked,
    }));
    setIsLoading(false);
  };

  const handleSubscribe = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500));
    setAnnouncement((prev) => ({
      ...prev,
      isSubscribed: !prev.isSubscribed,
    }));
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-4xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/announcements">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Announcement Details
              </h1>
              <p className="text-gray-600">View and manage announcement</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={handleSubscribe}
              disabled={isLoading}
              className="flex items-center gap-2 bg-transparent"
            >
              {announcement.isSubscribed ? (
                <>
                  <BellOff className="h-4 w-4" />
                  Unsubscribe
                </>
              ) : (
                <>
                  <Bell className="h-4 w-4" />
                  Subscribe
                </>
              )}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon">
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem className="flex items-center gap-2">
                  <Share2 className="h-4 w-4" />
                  Share
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Flag className="h-4 w-4" />
                  Report
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link
                    href={`/announcements/${announcement.id}/edit`}
                    className="flex items-center gap-2"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2">
                  <Archive className="h-4 w-4" />
                  Archive
                </DropdownMenuItem>
                <DropdownMenuItem className="flex items-center gap-2 text-red-600">
                  <Trash2 className="h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        {/* Main Content */}
        <Card
          className={cn(
            "transition-all duration-200",
            mockAnnouncement.priority === "important" && "ring-2 ring-red-200"
          )}
        >
          <CardContent className="p-8">
            {/* Priority and Audience Badges */}
            <div className="flex items-center gap-3 mb-6">
              <div
                className={cn(
                  "flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium",
                  priority.bgColor,
                  priority.color,
                  priority.borderColor,
                  "border"
                )}
              >
                <PriorityIcon className="h-4 w-4" />
                {priority.label}
              </div>
              <Badge className={audienceConfig[announcement.audience].color}>
                <Users className="h-3 w-3 mr-1" />
                {audienceConfig[announcement.audience].label}
              </Badge>
              <Badge
                variant="outline"
                className="bg-green-50 text-green-700 border-green-200"
              >
                Published
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-gray-900 mb-6">
              {announcement.title}
            </h1>

            {/* Author and Meta Info */}
            <div className="flex items-center justify-between mb-8 pb-6 border-b">
              <div className="flex items-center gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    src={announcement.author.avatar || "/placeholder.svg"}
                    alt={announcement.author.name}
                  />
                  <AvatarFallback>
                    {announcement.author.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-semibold text-gray-900">
                    {announcement.author.name}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {announcement.author.role}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 text-sm text-gray-500">
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {new Date(announcement.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>
                    {new Date(announcement.createdAt).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "2-digit",
                        minute: "2-digit",
                      }
                    )}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  <span>{announcement.views.toLocaleString()} views</span>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="prose prose-gray max-w-none mb-8">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {announcement.content}
              </div>
            </div>

            {/* Engagement Actions */}
            <div className="flex items-center justify-between pt-6 border-t">
              <div className="flex items-center gap-4">
                <Button
                  variant={announcement.isLiked ? "default" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <ThumbsUp
                    className={cn(
                      "h-4 w-4",
                      announcement.isLiked && "fill-current"
                    )}
                  />
                  {announcement.likes}
                </Button>

                <Button
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <MessageSquare className="h-4 w-4" />
                  {announcement.comments} Comments
                </Button>

                <Button
                  variant={announcement.isBookmarked ? "default" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                  disabled={isLoading}
                  className="flex items-center gap-2"
                >
                  <Bookmark
                    className={cn(
                      "h-4 w-4",
                      announcement.isBookmarked && "fill-current"
                    )}
                  />
                  {announcement.isBookmarked ? "Bookmarked" : "Bookmark"}
                </Button>
              </div>

              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-2 bg-transparent"
              >
                <Share2 className="h-4 w-4" />
                Share
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Related Announcements */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
              Related Announcements
            </h2>
            <div className="space-y-4">
              {relatedAnnouncements.map((related) => {
                const relatedPriority = priorityConfig[related.priority];
                const RelatedIcon = relatedPriority.icon;

                return (
                  <Link
                    key={related.id}
                    href={`/announcements/${related.id}`}
                    className="block p-4 rounded-lg border hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            "p-2 rounded-lg",
                            relatedPriority.bgColor
                          )}
                        >
                          <RelatedIcon
                            className={cn("h-4 w-4", relatedPriority.color)}
                          />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            {related.title}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {new Date(related.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <ArrowLeft className="h-4 w-4 text-gray-400 rotate-180" />
                    </div>
                  </Link>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
