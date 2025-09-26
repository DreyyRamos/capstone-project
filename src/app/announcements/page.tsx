"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertTriangle,
  CheckCircle,
  Info,
  Search,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Archive,
  Trash2,
  Users,
  Calendar,
  TrendingUp,
  FileText,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// Mock data for announcements
const mockAnnouncements = [
  {
    id: "1",
    title: "Welcome to the New Academic Year!",
    content:
      "We're excited to welcome all students back for another amazing year of learning and growth. This year brings new opportunities, courses, and exciting events.",
    author: {
      name: "Dr. Sarah Johnson",
      role: "Principal",
      avatar: "/placeholder.svg?height=40&width=40&text=SJ",
    },
    priority: "important" as const,
    audience: "all" as const,
    status: "published" as const,
    createdAt: "2024-01-15T09:00:00Z",
    views: 1247,
    isUrgent: false,
  },
  {
    id: "2",
    title: "Emergency: Campus Closure Due to Weather",
    content:
      "Due to severe weather conditions, the campus will be closed today. All classes are moved to online format. Please check your email for virtual meeting links.",
    author: {
      name: "Admin Team",
      role: "Administration",
      avatar: "/placeholder.svg?height=40&width=40&text=AT",
    },
    priority: "urgent" as const,
    audience: "all" as const,
    status: "published" as const,
    createdAt: "2024-01-14T06:30:00Z",
    views: 2156,
    isUrgent: true,
  },
  {
    id: "3",
    title: "New Library Resources Available",
    content:
      "The library has acquired new digital resources and study materials. Students can now access over 10,000 new e-books and research databases.",
    author: {
      name: "Maria Rodriguez",
      role: "Librarian",
      avatar: "/placeholder.svg?height=40&width=40&text=MR",
    },
    priority: "normal" as const,
    audience: "students" as const,
    status: "published" as const,
    createdAt: "2024-01-13T14:20:00Z",
    views: 543,
    isUrgent: false,
  },
  {
    id: "4",
    title: "Editorial Guidelines Update",
    content:
      "We've updated our editorial guidelines for the school publication. All editors and contributors should review the new standards before submitting content.",
    author: {
      name: "James Wilson",
      role: "Editor-in-Chief",
      avatar: "/placeholder.svg?height=40&width=40&text=JW",
    },
    priority: "important" as const,
    audience: "editors" as const,
    status: "published" as const,
    createdAt: "2024-01-12T11:15:00Z",
    views: 89,
    isUrgent: false,
  },
  {
    id: "5",
    title: "Upcoming Maintenance Window",
    content:
      "The school publication system will undergo scheduled maintenance this weekend. The platform may be temporarily unavailable on Saturday from 2-4 AM.",
    author: {
      name: "Tech Support",
      role: "IT Department",
      avatar: "/placeholder.svg?height=40&width=40&text=TS",
    },
    priority: "normal" as const,
    audience: "all" as const,
    status: "draft" as const,
    createdAt: "2024-01-11T16:45:00Z",
    views: 0,
    isUrgent: false,
  },
];

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

const statusConfig = {
  published: { label: "Published", color: "bg-green-100 text-green-800" },
  draft: { label: "Draft", color: "bg-yellow-100 text-yellow-800" },
  archived: { label: "Archived", color: "bg-gray-100 text-gray-800" },
};

export default function AnnouncementsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [audienceFilter, setAudienceFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority =
      priorityFilter === "all" || announcement.priority === priorityFilter;
    const matchesAudience =
      audienceFilter === "all" || announcement.audience === audienceFilter;
    const matchesStatus =
      statusFilter === "all" || announcement.status === statusFilter;

    return matchesSearch && matchesPriority && matchesAudience && matchesStatus;
  });

  const stats = {
    published: mockAnnouncements.filter((a) => a.status === "published").length,
    urgent: mockAnnouncements.filter((a) => a.priority === "urgent").length,
    totalViews: mockAnnouncements.reduce((sum, a) => sum + a.views, 0),
    archived: mockAnnouncements.filter((a) => a.status === "draft").length,
  };

  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Announcements</h1>
            <p className="text-gray-600 mt-1">
              Manage and view all system announcements
            </p>
          </div>
          <Link href="/announcements/create">
            <Button className="flex items-center gap-2">
              <Plus className="h-4 w-4" />
              Create Announcement
            </Button>
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Published</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.published}
                  </p>
                </div>
                <div className="h-12 w-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Urgent</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.urgent}
                  </p>
                </div>
                <div className="h-12 w-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <AlertTriangle className="h-6 w-6 text-red-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Views
                  </p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.totalViews.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Archived</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {stats.archived}
                  </p>
                </div>
                <div className="h-12 w-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <Archive className="h-6 w-6 text-gray-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Select
                  value={priorityFilter}
                  onValueChange={setPriorityFilter}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="normal">Normal</SelectItem>
                    <SelectItem value="important">Important</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>

                <Select
                  value={audienceFilter}
                  onValueChange={setAudienceFilter}
                >
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Audience" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Audiences</SelectItem>
                    <SelectItem value="students">Students</SelectItem>
                    <SelectItem value="editors">Editors</SelectItem>
                    <SelectItem value="moderators">Moderators</SelectItem>
                    <SelectItem value="admins">Admins</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={statusFilter} onValueChange={setStatusFilter}>
                  <SelectTrigger className="w-full sm:w-[140px]">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Announcements List */}
        <div className="space-y-4">
          {filteredAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="p-12 text-center">
                <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No announcements found
                </h3>
                <p className="text-gray-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Link href="/announcements/create">
                  <Button>Create First Announcement</Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            filteredAnnouncements.map((announcement) => {
              const priority = priorityConfig[announcement.priority];
              const PriorityIcon = priority.icon;

              return (
                <Card
                  key={announcement.id}
                  className={cn(
                    "transition-all duration-200 hover:shadow-md",
                    announcement.priority === "urgent" && "ring-2 ring-red-200"
                  )}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3 mb-3">
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
                          <Badge
                            className={
                              audienceConfig[announcement.audience].color
                            }
                          >
                            <Users className="h-3 w-3 mr-1" />
                            {audienceConfig[announcement.audience].label}
                          </Badge>
                          <Badge
                            className={statusConfig[announcement.status].color}
                          >
                            {statusConfig[announcement.status].label}
                          </Badge>
                        </div>

                        <Link href={`/announcements/${announcement.id}`}>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2 hover:text-blue-600 transition-colors cursor-pointer">
                            {announcement.title}
                          </h3>
                        </Link>

                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {announcement.content}
                        </p>

                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <div className="flex items-center gap-2">
                            <img
                              src={
                                announcement.author.avatar || "/placeholder.svg"
                              }
                              alt={announcement.author.name}
                              className="h-6 w-6 rounded-full"
                            />
                            <span>{announcement.author.name}</span>
                            <span>•</span>
                            <span>{announcement.author.role}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            <span>
                              {new Date(
                                announcement.createdAt
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Eye className="h-4 w-4" />
                            <span>
                              {announcement.views.toLocaleString()} views
                            </span>
                          </div>
                        </div>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem asChild>
                            <Link
                              href={`/announcements/${announcement.id}`}
                              className="flex items-center gap-2"
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Link>
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
                  </CardContent>
                </Card>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}

// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Megaphone,
//   Plus,
//   Search,
//   MoreHorizontal,
//   Calendar,
//   User,
//   Eye,
//   Edit,
//   Archive,
//   Trash2,
//   AlertTriangle,
//   Info,
//   CheckCircle,
// } from "lucide-react";
// import Link from "next/link";

// // Mock data for announcements
// const mockAnnouncements = [
//   {
//     id: 1,
//     title: "New Academic Year Guidelines",
//     content:
//       "Important updates regarding the upcoming academic year policies and procedures. All students and faculty are required to review these changes before the semester begins.",
//     author: "Dr. Sarah Johnson",
//     authorRole: "Admin",
//     createdAt: "2024-01-15T10:30:00Z",
//     priority: "urgent",
//     targetAudience: "all",
//     status: "published",
//     views: 1247,
//   },
//   {
//     id: 2,
//     title: "Library Hours Extended",
//     content:
//       "The library will now be open until 11 PM on weekdays to accommodate student study needs during exam period.",
//     author: "Michael Chen",
//     authorRole: "Editor",
//     createdAt: "2024-01-14T14:20:00Z",
//     priority: "important",
//     targetAudience: "students",
//     status: "published",
//     views: 892,
//   },
//   {
//     id: 3,
//     title: "Publication Submission Deadline",
//     content:
//       "Reminder: All publication submissions for the monthly newsletter are due by January 25th. Please ensure your articles meet the editorial guidelines.",
//     author: "Emma Wilson",
//     authorRole: "Editor",
//     createdAt: "2024-01-13T09:15:00Z",
//     priority: "normal",
//     targetAudience: "editors",
//     status: "published",
//     views: 456,
//   },
//   {
//     id: 4,
//     title: "Forum Moderation Updates",
//     content:
//       "New community guidelines have been implemented. Please review the updated moderation policies and report any violations accordingly.",
//     author: "Alex Rodriguez",
//     authorRole: "Moderator",
//     createdAt: "2024-01-12T16:45:00Z",
//     priority: "important",
//     targetAudience: "moderators",
//     status: "published",
//     views: 234,
//   },
//   {
//     id: 5,
//     title: "Winter Break Schedule",
//     content:
//       "Campus facilities and services schedule during the winter break period. Most services will be limited from December 20th to January 8th.",
//     author: "Dr. Sarah Johnson",
//     authorRole: "Admin",
//     createdAt: "2024-01-10T11:00:00Z",
//     priority: "normal",
//     targetAudience: "all",
//     status: "archived",
//     views: 2156,
//   },
// ];

// const priorityConfig = {
//   urgent: {
//     label: "Urgent",
//     color: "bg-red-100 text-red-800 border-red-200",
//     icon: AlertTriangle,
//   },
//   important: {
//     label: "Important",
//     color: "bg-orange-100 text-orange-800 border-orange-200",
//     icon: Info,
//   },
//   normal: {
//     label: "Normal",
//     color: "bg-blue-100 text-blue-800 border-blue-200",
//     icon: CheckCircle,
//   },
// };

// const audienceConfig = {
//   all: { label: "All Users", color: "bg-gray-100 text-gray-800" },
//   students: { label: "Students", color: "bg-green-100 text-green-800" },
//   editors: { label: "Editors", color: "bg-blue-100 text-blue-800" },
//   moderators: { label: "Moderators", color: "bg-purple-100 text-purple-800" },
//   admins: { label: "Admins", color: "bg-red-100 text-red-800" },
// };

// const statusConfig = {
//   published: { label: "Published", color: "bg-green-100 text-green-800" },
//   draft: { label: "Draft", color: "bg-yellow-100 text-yellow-800" },
//   archived: { label: "Archived", color: "bg-gray-100 text-gray-800" },
// };

// export default function AnnouncementsPage() {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [priorityFilter, setPriorityFilter] = useState("all");
//   const [audienceFilter, setAudienceFilter] = useState("all");
//   const [statusFilter, setStatusFilter] = useState("all");

//   const filteredAnnouncements = mockAnnouncements.filter((announcement) => {
//     const matchesSearch =
//       announcement.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       announcement.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
//       announcement.author.toLowerCase().includes(searchQuery.toLowerCase());

//     const matchesPriority =
//       priorityFilter === "all" || announcement.priority === priorityFilter;
//     const matchesAudience =
//       audienceFilter === "all" ||
//       announcement.targetAudience === audienceFilter;
//     const matchesStatus =
//       statusFilter === "all" || announcement.status === statusFilter;

//     return matchesSearch && matchesPriority && matchesAudience && matchesStatus;
//   });

//   const formatDate = (dateString: string) => {
//     return new Date(dateString).toLocaleDateString("en-US", {
//       year: "numeric",
//       month: "short",
//       day: "numeric",
//       hour: "2-digit",
//       minute: "2-digit",
//     });
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
//         <div className="flex items-center gap-3">
//           <div className="p-2 bg-blue-100 rounded-lg">
//             <Megaphone className="h-6 w-6 text-blue-600" />
//           </div>
//           <div>
//             <h1 className="text-3xl font-bold">Announcements</h1>
//             <p className="text-muted-foreground">
//               Stay updated with the latest news and important information
//             </p>
//           </div>
//         </div>
//         <Link href="/announcements/create">
//           <Button className="flex items-center gap-2">
//             <Plus className="h-4 w-4" />
//             Create Announcement
//           </Button>
//         </Link>
//       </div>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-green-100 rounded-lg">
//                 <CheckCircle className="h-4 w-4 text-green-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Published</p>
//                 <p className="text-2xl font-bold">
//                   {
//                     mockAnnouncements.filter((a) => a.status === "published")
//                       .length
//                   }
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <AlertTriangle className="h-4 w-4 text-red-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Urgent</p>
//                 <p className="text-2xl font-bold">
//                   {
//                     mockAnnouncements.filter((a) => a.priority === "urgent")
//                       .length
//                   }
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Eye className="h-4 w-4 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Total Views</p>
//                 <p className="text-2xl font-bold">
//                   {mockAnnouncements
//                     .reduce((sum, a) => sum + a.views, 0)
//                     .toLocaleString()}
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center gap-2">
//               <div className="p-2 bg-gray-100 rounded-lg">
//                 <Archive className="h-4 w-4 text-gray-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-muted-foreground">Archived</p>
//                 <p className="text-2xl font-bold">
//                   {
//                     mockAnnouncements.filter((a) => a.status === "archived")
//                       .length
//                   }
//                 </p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <Card className="mb-6">
//         <CardContent className="p-6">
//           <div className="flex flex-col lg:flex-row gap-4">
//             <div className="flex-1">
//               <div className="relative">
//                 <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
//                 <Input
//                   placeholder="Search announcements..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="pl-10"
//                 />
//               </div>
//             </div>
//             <div className="flex flex-col sm:flex-row gap-2">
//               <Select value={priorityFilter} onValueChange={setPriorityFilter}>
//                 <SelectTrigger className="w-full sm:w-[140px]">
//                   <SelectValue placeholder="Priority" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Priorities</SelectItem>
//                   <SelectItem value="urgent">Urgent</SelectItem>
//                   <SelectItem value="important">Important</SelectItem>
//                   <SelectItem value="normal">Normal</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={audienceFilter} onValueChange={setAudienceFilter}>
//                 <SelectTrigger className="w-full sm:w-[140px]">
//                   <SelectValue placeholder="Audience" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Audiences</SelectItem>
//                   <SelectItem value="all">All Users</SelectItem>
//                   <SelectItem value="students">Students</SelectItem>
//                   <SelectItem value="editors">Editors</SelectItem>
//                   <SelectItem value="moderators">Moderators</SelectItem>
//                   <SelectItem value="admins">Admins</SelectItem>
//                 </SelectContent>
//               </Select>
//               <Select value={statusFilter} onValueChange={setStatusFilter}>
//                 <SelectTrigger className="w-full sm:w-[140px]">
//                   <SelectValue placeholder="Status" />
//                 </SelectTrigger>
//                 <SelectContent>
//                   <SelectItem value="all">All Status</SelectItem>
//                   <SelectItem value="published">Published</SelectItem>
//                   <SelectItem value="draft">Draft</SelectItem>
//                   <SelectItem value="archived">Archived</SelectItem>
//                 </SelectContent>
//               </Select>
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Announcements List */}
//       <div className="space-y-4">
//         {filteredAnnouncements.length === 0 ? (
//           <Card>
//             <CardContent className="p-12 text-center">
//               <Megaphone className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
//               <h3 className="text-lg font-semibold mb-2">
//                 No announcements found
//               </h3>
//               <p className="text-muted-foreground mb-4">
//                 {searchQuery ||
//                 priorityFilter !== "all" ||
//                 audienceFilter !== "all" ||
//                 statusFilter !== "all"
//                   ? "Try adjusting your search criteria or filters."
//                   : "There are no announcements to display at the moment."}
//               </p>
//               <Link href="/announcements/create">
//                 <Button>
//                   <Plus className="h-4 w-4 mr-2" />
//                   Create First Announcement
//                 </Button>
//               </Link>
//             </CardContent>
//           </Card>
//         ) : (
//           filteredAnnouncements.map((announcement) => {
//             const PriorityIcon =
//               priorityConfig[
//                 announcement.priority as keyof typeof priorityConfig
//               ].icon;

//             return (
//               <Card
//                 key={announcement.id}
//                 className="hover:shadow-md transition-shadow"
//               >
//                 <CardContent className="p-6">
//                   <div className="flex flex-col lg:flex-row lg:items-start gap-4">
//                     <div className="flex-1">
//                       <div className="flex items-start justify-between gap-4 mb-3">
//                         <div className="flex-1">
//                           <div className="flex items-center gap-2 mb-2">
//                             <PriorityIcon className="h-4 w-4" />
//                             <h3 className="text-lg font-semibold">
//                               {announcement.title}
//                             </h3>
//                           </div>
//                           <div className="flex flex-wrap items-center gap-2 mb-3">
//                             <Badge
//                               variant="outline"
//                               className={
//                                 priorityConfig[
//                                   announcement.priority as keyof typeof priorityConfig
//                                 ].color
//                               }
//                             >
//                               {
//                                 priorityConfig[
//                                   announcement.priority as keyof typeof priorityConfig
//                                 ].label
//                               }
//                             </Badge>
//                             <Badge
//                               variant="outline"
//                               className={
//                                 audienceConfig[
//                                   announcement.targetAudience as keyof typeof audienceConfig
//                                 ].color
//                               }
//                             >
//                               {
//                                 audienceConfig[
//                                   announcement.targetAudience as keyof typeof audienceConfig
//                                 ].label
//                               }
//                             </Badge>
//                             <Badge
//                               variant="outline"
//                               className={
//                                 statusConfig[
//                                   announcement.status as keyof typeof statusConfig
//                                 ].color
//                               }
//                             >
//                               {
//                                 statusConfig[
//                                   announcement.status as keyof typeof statusConfig
//                                 ].label
//                               }
//                             </Badge>
//                           </div>
//                         </div>
//                         <DropdownMenu>
//                           <DropdownMenuTrigger asChild>
//                             <Button variant="ghost" size="icon">
//                               <MoreHorizontal className="h-4 w-4" />
//                             </Button>
//                           </DropdownMenuTrigger>
//                           <DropdownMenuContent align="end">
//                             <DropdownMenuLabel>Actions</DropdownMenuLabel>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem>
//                               <Eye className="h-4 w-4 mr-2" />
//                               View Details
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Edit className="h-4 w-4 mr-2" />
//                               Edit
//                             </DropdownMenuItem>
//                             <DropdownMenuItem>
//                               <Archive className="h-4 w-4 mr-2" />
//                               Archive
//                             </DropdownMenuItem>
//                             <DropdownMenuSeparator />
//                             <DropdownMenuItem className="text-red-600">
//                               <Trash2 className="h-4 w-4 mr-2" />
//                               Delete
//                             </DropdownMenuItem>
//                           </DropdownMenuContent>
//                         </DropdownMenu>
//                       </div>

//                       <p className="text-muted-foreground mb-4 line-clamp-2">
//                         {announcement.content}
//                       </p>

//                       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-sm text-muted-foreground">
//                         <div className="flex items-center gap-4">
//                           <div className="flex items-center gap-1">
//                             <User className="h-4 w-4" />
//                             <span>{announcement.author}</span>
//                             <Badge variant="secondary" className="text-xs">
//                               {announcement.authorRole}
//                             </Badge>
//                           </div>
//                           <div className="flex items-center gap-1">
//                             <Calendar className="h-4 w-4" />
//                             <span>{formatDate(announcement.createdAt)}</span>
//                           </div>
//                         </div>
//                         <div className="flex items-center gap-1">
//                           <Eye className="h-4 w-4" />
//                           <span>
//                             {announcement.views.toLocaleString()} views
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </div>

//       {/* Pagination would go here */}
//       {filteredAnnouncements.length > 0 && (
//         <div className="flex justify-center mt-8">
//           <div className="flex items-center gap-2">
//             <Button variant="outline" size="sm" disabled>
//               Previous
//             </Button>
//             <Button
//               variant="outline"
//               size="sm"
//               className="bg-primary text-primary-foreground"
//             >
//               1
//             </Button>
//             <Button variant="outline" size="sm">
//               2
//             </Button>
//             <Button variant="outline" size="sm">
//               3
//             </Button>
//             <Button variant="outline" size="sm">
//               Next
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }
