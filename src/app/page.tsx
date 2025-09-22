"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  BookOpen,
  MessageSquare,
  Users,
  TrendingUp,
  Calendar,
  Clock,
  Eye,
  Heart,
  MessageCircle,
  ArrowRight,
} from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Lincoln High School Publications
          </h1>
          <p className="text-xl mb-6 opacity-90">
            Stay connected with the latest news, articles, and discussions from
            our school community.
          </p>
          <div className="flex gap-4">
            <Button size="lg" variant="secondary" asChild>
              <Link href="/publications">Browse Publications</Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              asChild
            >
              <Link href="/forum">Join Forum</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Publications</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Forum Topics</CardTitle>
            <MessageSquare className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+5 from last week</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,247</div>
            <p className="text-xs text-muted-foreground">+89 from last month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Views</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5k</div>
            <p className="text-xs text-muted-foreground">
              +2.1k from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Featured Publications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Featured Publications</CardTitle>
              <CardDescription>
                Latest articles from our school community
              </CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/publications">
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Annual Science Fair Results",
                author: "Dr. Sarah Johnson",
                category: "Science",
                time: "2 hours ago",
                views: 234,
                likes: 18,
              },
              {
                title: "Spring Sports Season Recap",
                author: "Coach Mike Wilson",
                category: "Sports",
                time: "5 hours ago",
                views: 189,
                likes: 24,
              },
              {
                title: "Student Art Exhibition Opens",
                author: "Ms. Emily Chen",
                category: "Arts",
                time: "1 day ago",
                views: 156,
                likes: 31,
              },
            ].map((publication, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>
                    {publication.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h4 className="font-medium text-sm leading-tight">
                    {publication.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      by {publication.author}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {publication.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {publication.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="h-3 w-3" />
                      {publication.views}
                    </div>
                    <div className="flex items-center gap-1">
                      <Heart className="h-3 w-3" />
                      {publication.likes}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Forum Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Recent Forum Activity</CardTitle>
              <CardDescription>Latest discussions and topics</CardDescription>
            </div>
            <Button variant="outline" size="sm" asChild>
              <Link href="/forum">
                View Forum
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                title: "Tips for Better Study Habits",
                author: "Alex Thompson",
                category: "Academic",
                replies: 12,
                time: "30 minutes ago",
                isActive: true,
              },
              {
                title: "Upcoming School Events Discussion",
                author: "Maria Garcia",
                category: "Events",
                replies: 8,
                time: "2 hours ago",
                isActive: false,
              },
              {
                title: "Technology in Education",
                author: "David Kim",
                category: "Technology",
                replies: 15,
                time: "4 hours ago",
                isActive: true,
              },
            ].map((topic, index) => (
              <div
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg hover:bg-accent/50 transition-colors"
              >
                <Avatar className="h-8 w-8">
                  <AvatarImage src={`/placeholder.svg?height=32&width=32`} />
                  <AvatarFallback>
                    {topic.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-sm leading-tight">
                      {topic.title}
                    </h4>
                    {topic.isActive && (
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-muted-foreground">
                      by {topic.author}
                    </span>
                    <Badge variant="outline" className="text-xs">
                      {topic.category}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-4 mt-2 text-xs text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MessageCircle className="h-3 w-3" />
                      {topic.replies} replies
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {topic.time}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common tasks and shortcuts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/publications/create">
                <BookOpen className="h-6 w-6" />
                Create Publication
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/forum/create">
                <MessageSquare className="h-6 w-6" />
                Start Discussion
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/profile">
                <Users className="h-6 w-6" />
                Edit Profile
              </Link>
            </Button>
            <Button
              variant="outline"
              className="h-20 flex-col gap-2 bg-transparent"
              asChild
            >
              <Link href="/settings">
                <Calendar className="h-6 w-6" />
                Settings
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// "use client";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   BookOpen,
//   MessageSquare,
//   TrendingUp,
//   Users,
//   Calendar,
//   Eye,
// } from "lucide-react";
// import Link from "next/link";
// import { useFeaturedPostsQuery, usePostQuery } from "@/hooks/usePost";
// import { useForumQuery } from "@/hooks/useForum";
// import { useFetchUsers } from "@/hooks/usePublicData";
// import Cookies from "js-cookie";
// import HomePageLoading from "./loading";

// interface Author {
//   id: string;
//   firstName: string;
//   lastName: string;
//   profileImage: string | null;
// }

// interface Publication {
//   pubId: string;
//   title: string;
//   excerpt: string;
//   content: string;
//   imageUrl: string;
//   tags: string[];
//   category: string;
//   createdAt: Date;
//   author: Author;
// }

// export default function HomePage() {
//   const token = Cookies.get("token") || "";

//   const { data: featuredPublications, isLoading } = useFeaturedPostsQuery();
//   const { data: publications, isLoading: publicationLoading } =
//     usePostQuery(token);
//   const { data: forums } = useForumQuery(token);
//   const { data: users } = useFetchUsers();

//   if (isLoading) {
//     return <HomePageLoading />;
//   }

//   return (
//     <div className="space-y-8">
//       {/* Hero Section */}
//       <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
//         <div className="max-w-4xl">
//           <h1 className="text-4xl font-bold mb-4">
//             Welcome to Lincoln High School Publications
//           </h1>
//           <p className="text-xl mb-6">
//             Stay connected with the latest news, articles, and discussions from
//             our school community.
//           </p>
//           <div className="flex gap-4">
//             <Button asChild size="lg" variant="secondary">
//               <Link href="/publications">Browse Publications</Link>
//             </Button>
//             <Button
//               asChild
//               size="lg"
//               variant="outline"
//               className="text-white border-white hover:bg-white hover:text-blue-600 bg-transparent"
//             >
//               <Link href="/forum">Join Forum</Link>
//             </Button>
//           </div>
//         </div>
//       </section>

//       {/* Stats Section */}
//       {token && (
//         <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-blue-100 rounded-lg">
//                   <BookOpen className="h-6 w-6 text-blue-600" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">
//                     {publications?.posts?.length}
//                   </p>
//                   <p className="text-sm text-muted-foreground">Publications</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-green-100 rounded-lg">
//                   <MessageSquare className="h-6 w-6 text-green-600" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{forums?.posts?.length}</p>
//                   <p className="text-sm text-muted-foreground">Forum Topics</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//           <Card>
//             <CardContent className="p-6">
//               <div className="flex items-center gap-4">
//                 <div className="p-3 bg-purple-100 rounded-lg">
//                   <Users className="h-6 w-6 text-purple-600" />
//                 </div>
//                 <div>
//                   <p className="text-2xl font-bold">{users?.count ?? 0}</p>
//                   <p className="text-sm text-muted-foreground">Active Users</p>
//                 </div>
//               </div>
//             </CardContent>
//           </Card>
//         </section>
//       )}

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Featured Publications */}
//         <section className="lg:col-span-2">
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold">Featured Publications</h2>
//             <Button asChild variant="outline">
//               <Link href="/publications">View All</Link>
//             </Button>
//           </div>
//           <div className="space-y-6">
//             {featuredPublications?.map((publication: Publication) => (
//               <Card key={publication.pubId} className="overflow-hidden">
//                 <div className="md:flex">
//                   <div className="md:w-1/3 p-1.5 ">
//                     <img
//                       src={publication.imageUrl || "/placeholder.svg"}
//                       alt={publication.title}
//                       className="w-full h-48 md:h-full object-cover rounded-md"
//                     />
//                   </div>
//                   <div className="md:w-2/3 p-6">
//                     <div className="flex items-center gap-2 mb-2">
//                       <Badge variant="secondary">{publication.category}</Badge>
//                       <div className="flex items-center gap-1 text-sm text-muted-foreground">
//                         {/* <Eye className="h-4 w-4" />
//                         {publication.views} */}
//                       </div>
//                     </div>
//                     <h3 className="text-xl font-semibold mb-2">
//                       <Link
//                         href={`/publications/${publication.pubId}`}
//                         className="hover:text-blue-600"
//                       >
//                         {publication.title}
//                       </Link>
//                     </h3>
//                     <p className="text-muted-foreground mb-4">
//                       {publication.excerpt}
//                     </p>
//                     <div className="flex items-center justify-between">
//                       <div className="flex items-center gap-2">
//                         <Avatar className="h-8 w-8">
//                           <AvatarImage
//                             src={
//                               publication.author?.profileImage ||
//                               "/placeholder.svg"
//                             }
//                           />
//                           <AvatarFallback>
//                             {publication.author?.firstName?.[0]}
//                             {publication.author?.lastName?.[0]}
//                           </AvatarFallback>
//                         </Avatar>
//                         {/* <Avatar className="h-8 w-8">
//                           <AvatarFallback>
//                             {publication.author?.firstName}
//                           </AvatarFallback>
//                         </Avatar> */}
//                         <div>
//                           <p className="text-sm font-medium">
//                             {publication.author?.firstName}{" "}
//                             {publication.author?.lastName}
//                           </p>
//                           <p className="text-xs text-muted-foreground flex items-center gap-1">
//                             <Calendar className="h-3 w-3" />
//                             {new Date(
//                               publication.createdAt
//                             ).toLocaleDateString()}
//                           </p>
//                         </div>
//                       </div>
//                       <Button asChild variant="outline" size="sm">
//                         <Link href={`/publications/${publication.pubId}`}>
//                           Read More
//                         </Link>
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               </Card>
//             ))}
//           </div>
//         </section>

//         {/* Recent Forum Activity */}
//         <section>
//           <div className="flex items-center justify-between mb-6">
//             <h2 className="text-2xl font-bold">Recent Forum Activity</h2>
//             <Button asChild variant="outline">
//               <Link href="/forum">View Forum</Link>
//             </Button>
//           </div>
//           <div className="space-y-4">
//             {/* {recentForumPosts.map((post) => (
//               <Card key={post.id}>
//                 <CardContent className="p-4">
//                   <div className="flex items-start justify-between mb-2">
//                     <Badge variant="outline" className="text-xs">
//                       {post.category}
//                     </Badge>
//                     <span className="text-xs text-muted-foreground">
//                       {post.lastActivity}
//                     </span>
//                   </div>
//                   <h4 className="font-medium mb-2">
//                     <Link
//                       href={`/forum/topic/${post.id}`}
//                       className="hover:text-blue-600"
//                     >
//                       {post.title}
//                     </Link>
//                   </h4>
//                   <div className="flex items-center justify-between text-sm text-muted-foreground">
//                     <span>by {post.author}</span>
//                     <span>{post.replies} replies</span>
//                   </div>
//                 </CardContent>
//               </Card>
//             ))} */}
//           </div>

//           <Card className="mt-6">
//             <CardHeader>
//               <CardTitle className="text-lg">Quick Actions</CardTitle>
//             </CardHeader>
//             <CardContent className="space-y-3">
//               <Button
//                 asChild
//                 className="w-full bg-transparent"
//                 variant="outline"
//               >
//                 <Link href="/publications/create">Create Publication</Link>
//               </Button>
//               <Button
//                 asChild
//                 className="w-full bg-transparent"
//                 variant="outline"
//               >
//                 <Link href="/forum/create">Start Discussion</Link>
//               </Button>
//               <Button
//                 asChild
//                 className="w-full bg-transparent"
//                 variant="outline"
//               >
//                 <Link href="/profile">View Profile</Link>
//               </Button>
//             </CardContent>
//           </Card>
//         </section>
//       </div>
//     </div>
//   );
// }
