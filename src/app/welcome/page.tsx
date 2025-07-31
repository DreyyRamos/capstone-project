"use client";

import { UploadButton } from "@/utils/uploadthing";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <UploadButton
        className="mt-4 ut-button:bg-red-500 ut-button:ut-readying:bg-red-500/50"
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res);
          alert("Upload Completed");
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
          alert(`ERROR! ${error.message}`);
        }}
      />
    </main>
  );
}

// "use client"

// import { useEffect } from "react"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import {
//   CheckCircle,
//   BookOpen,
//   MessageSquare,
//   Users,
//   BarChart3,
//   Edit3,
//   Shield,
//   GraduationCap,
//   ArrowRight,
//   Sparkles,
// } from "lucide-react"
// import { useRole } from "@/contexts/role-context"
// import { useRouter } from "next/navigation"
// import Link from "next/link"

// export default function WelcomePage() {
//   const { user } = useRole()
//   const router = useRouter()

//   useEffect(() => {
//     if (!user) {
//       router.push("/login")
//     }
//   }, [user, router])

//   if (!user) return null

//   const roleConfig = {
//     student: {
//       icon: GraduationCap,
//       color: "bg-blue-500",
//       title: "Welcome, Student!",
//       description: "You're now part of the Lincoln High School community platform.",
//       features: [
//         { icon: BookOpen, title: "Read Publications", description: "Access the latest school news and articles" },
//         { icon: MessageSquare, title: "Join Discussions", description: "Participate in forum conversations" },
//         { icon: Edit3, title: "Submit Articles", description: "Share your voice by writing articles" },
//       ],
//       nextSteps: [
//         { title: "Browse Publications", href: "/publications", description: "Discover the latest school content" },
//         { title: "Explore Forums", href: "/forum", description: "Join ongoing discussions" },
//         { title: "Complete Profile", href: "/profile", description: "Add your photo and bio" },
//       ],
//     },
//     editor: {
//       icon: Edit3,
//       color: "bg-green-500",
//       title: "Welcome, Editor!",
//       description: "You have content creation and moderation privileges.",
//       features: [
//         { icon: Edit3, title: "Create Content", description: "Write and publish articles and announcements" },
//         { icon: Shield, title: "Moderate Content", description: "Review and approve student submissions" },
//         { icon: BarChart3, title: "View Analytics", description: "Track engagement and performance metrics" },
//       ],
//       nextSteps: [
//         { title: "Content Manager", href: "/content", description: "Manage publications and submissions" },
//         { title: "Create Publication", href: "/publications/create", description: "Start writing your first article" },
//         { title: "Moderation Tools", href: "/moderation", description: "Review pending content" },
//       ],
//     },
//     moderator: {
//       icon: Shield,
//       color: "bg-orange-500",
//       title: "Welcome, Moderator!",
//       description: "You help maintain a positive community environment.",
//       features: [
//         { icon: MessageSquare, title: "Forum Moderation", description: "Monitor and moderate forum discussions" },
//         { icon: Users, title: "Community Management", description: "Help resolve conflicts and guide discussions" },
//         { icon: Shield, title: "Safety Tools", description: "Use moderation tools to maintain guidelines" },
//       ],
//       nextSteps: [
//         { title: "Moderation Dashboard", href: "/moderation", description: "Review flagged content and reports" },
//         { title: "Forum Categories", href: "/forum", description: "Monitor active discussions" },
//         { title: "Community Guidelines", href: "/guidelines", description: "Review moderation policies" },
//       ],
//     },
//     admin: {
//       icon: Shield,
//       color: "bg-purple-500",
//       title: "Welcome, Administrator!",
//       description: "You have full system access and management capabilities.",
//       features: [
//         { icon: Users, title: "User Management", description: "Manage all user accounts and permissions" },
//         { icon: BarChart3, title: "Full Analytics", description: "Access comprehensive platform analytics" },
//         { icon: Shield, title: "System Administration", description: "Configure platform settings and policies" },
//       ],
//       nextSteps: [
//         { title: "Admin Dashboard", href: "/", description: "View system overview and metrics" },
//         { title: "User Management", href: "/users", description: "Manage user accounts and roles" },
//         { title: "Analytics", href: "/analytics", description: "Review platform performance" },
//       ],
//     },
//   }

//   const config = roleConfig[user.role]
//   const IconComponent = config.icon

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
//       <div className="container mx-auto px-4 py-12">
//         <div className="max-w-4xl mx-auto">
//           {/* Header */}
//           <div className="text-center mb-12">
//             <div className="flex items-center justify-center mb-6">
//               <div className={`p-4 rounded-full ${config.color} text-white`}>
//                 <IconComponent className="h-8 w-8" />
//               </div>
//               <Sparkles className="h-6 w-6 text-yellow-500 ml-2" />
//             </div>
//             <h1 className="text-4xl font-bold mb-4">{config.title}</h1>
//             <p className="text-xl text-muted-foreground mb-6">{config.description}</p>
//             <div className="flex items-center justify-center space-x-4">
//               <Badge variant="secondary" className="text-sm">
//                 <CheckCircle className="h-4 w-4 mr-1" />
//                 Account Created
//               </Badge>
//               <Badge variant="outline" className="text-sm capitalize">
//                 Role: {user.role}
//               </Badge>
//             </div>
//           </div>

//           {/* User Info */}
//           <Card className="mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center">
//                 <Users className="h-5 w-5 mr-2" />
//                 Your Account Details
//               </CardTitle>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 <div>
//                   <p className="text-sm text-muted-foreground">Name</p>
//                   <p className="font-medium">{user.name}</p>
//                 </div>
//                 <div>
//                   <p className="text-sm text-muted-foreground">Email</p>
//                   <p className="font-medium">{user.email}</p>
//                 </div>
//                 {user.studentId && (
//                   <div>
//                     <p className="text-sm text-muted-foreground">Student ID</p>
//                     <p className="font-medium">{user.studentId}</p>
//                   </div>
//                 )}
//                 {user.department && (
//                   <div>
//                     <p className="text-sm text-muted-foreground">Department</p>
//                     <p className="font-medium">{user.department}</p>
//                   </div>
//                 )}
//               </div>
//             </CardContent>
//           </Card>

//           {/* Features */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-6">What you can do</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {config.features.map((feature, index) => (
//                 <Card key={index}>
//                   <CardHeader>
//                     <CardTitle className="flex items-center text-lg">
//                       <feature.icon className="h-5 w-5 mr-2" />
//                       {feature.title}
//                     </CardTitle>
//                   </CardHeader>
//                   <CardContent>
//                     <p className="text-muted-foreground">{feature.description}</p>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Next Steps */}
//           <div className="mb-8">
//             <h2 className="text-2xl font-bold mb-6">Get started</h2>
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               {config.nextSteps.map((step, index) => (
//                 <Card key={index} className="hover:shadow-lg transition-shadow">
//                   <CardHeader>
//                     <CardTitle className="text-lg">{step.title}</CardTitle>
//                     <CardDescription>{step.description}</CardDescription>
//                   </CardHeader>
//                   <CardContent>
//                     <Button asChild className="w-full">
//                       <Link href={step.href}>
//                         {step.title}
//                         <ArrowRight className="h-4 w-4 ml-2" />
//                       </Link>
//                     </Button>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
//           </div>

//           {/* Call to Action */}
//           <Card className="text-center">
//             <CardContent className="pt-6">
//               <h3 className="text-xl font-semibold mb-4">Ready to explore?</h3>
//               <p className="text-muted-foreground mb-6">
//                 Start by exploring the platform and connecting with your school community.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button asChild size="lg">
//                   <Link href="/">
//                     Go to Dashboard
//                     <ArrowRight className="h-4 w-4 ml-2" />
//                   </Link>
//                 </Button>
//                 <Button variant="outline" asChild size="lg">
//                   <Link href="/profile">Complete Profile</Link>
//                 </Button>
//               </div>
//             </CardContent>
//           </Card>
//         </div>
//       </div>
//     </div>
//   )
// }
