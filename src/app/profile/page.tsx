// "use client"

// import { useState } from "react"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// import { Badge } from "@/components/ui/badge"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import { Separator } from "@/components/ui/separator"
// import { User, Mail, Phone, MapPin, Calendar, Edit3, BookOpen, MessageSquare, Trophy, Star, FileText, Users, Award, Target, Camera } from 'lucide-react'
// // import { useRole } from "@/contexts/role-context"

// export default function ProfilePage() {
//   // const { user } = useRole()
//   const [isEditing, setIsEditing] = useState(false)
//   const [profileData, setProfileData] = useState({
//     name: user?.name || "Sarah Johnson",
//     email: user?.email || "sarah.johnson@lincolnhigh.edu",
//     phone: "(555) 123-4567",
//     bio: "Senior student passionate about journalism and creative writing. Editor-in-chief of the school newspaper and active member of the debate team.",
//     location: "Lincoln, State",
//     joinDate: "September 2021",
//     grade: "12th Grade",
//     interests: ["Journalism", "Creative Writing", "Photography", "Debate"]
//   })

//   const stats = {
//     publications: 24,
//     forumPosts: 156,
//     reputation: 892,
//     achievements: 8
//   }

//   const recentActivity = [
//     {
//       id: 1,
//       type: "publication",
//       title: "Spring Sports Highlights",
//       action: "published",
//       date: "2 hours ago",
//       engagement: { views: 234, comments: 12 }
//     },
//     {
//       id: 2,
//       type: "forum",
//       title: "Upcoming School Events Discussion",
//       action: "replied to",
//       date: "5 hours ago",
//       engagement: { replies: 8, likes: 15 }
//     },
//     {
//       id: 3,
//       type: "publication",
//       title: "Student Council Election Results",
//       action: "published",
//       date: "1 day ago",
//       engagement: { views: 567, comments: 28 }
//     }
//   ]

//   const publications = [
//     {
//       id: 1,
//       title: "Spring Sports Highlights",
//       category: "Sports",
//       date: "2 hours ago",
//       status: "Published",
//       views: 234,
//       comments: 12
//     },
//     {
//       id: 2,
//       title: "Student Council Election Results",
//       category: "News",
//       date: "1 day ago",
//       status: "Published",
//       views: 567,
//       comments: 28
//     },
//     {
//       id: 3,
//       title: "Art Show Preview",
//       category: "Arts",
//       date: "3 days ago",
//       status: "Published",
//       views: 189,
//       comments: 7
//     }
//   ]

//   const achievements = [
//     {
//       id: 1,
//       title: "Top Contributor",
//       description: "Published 20+ articles",
//       icon: Trophy,
//       earned: true,
//       date: "March 2024"
//     },
//     {
//       id: 2,
//       title: "Community Builder",
//       description: "100+ forum posts",
//       icon: Users,
//       earned: true,
//       date: "February 2024"
//     },
//     {
//       id: 3,
//       title: "Rising Star",
//       description: "500+ reputation points",
//       icon: Star,
//       earned: true,
//       date: "January 2024"
//     },
//     {
//       id: 4,
//       title: "Expert Writer",
//       description: "50+ published articles",
//       icon: Award,
//       earned: false,
//       progress: "24/50"
//     }
//   ]

//   const handleSave = () => {
//     // save to backend
//     setIsEditing(false)
//     console.log("Profile saved:", profileData)
//   }

//   const handleInputChange = (field: string, value: string) => {
//     setProfileData(prev => ({ ...prev, [field]: value }))
//   }

//   const getRoleColor = (role: string) => {
//     switch (role) {
//       case 'admin': return 'bg-red-100 text-red-800'
//       case 'editor': return 'bg-blue-100 text-blue-800'
//       case 'moderator': return 'bg-green-100 text-green-800'
//       default: return 'bg-gray-100 text-gray-800'
//     }
//   }

//   return (
//     <div className="max-w-4xl mx-auto space-y-6">
//       {/* Profile Header */}
//       <Card>
//         <CardContent className="pt-6">
//           <div className="flex flex-col md:flex-row gap-6">
//             <div className="flex flex-col items-center space-y-4">
//               <div className="relative">
//                 <Avatar className="h-32 w-32">
//                   <AvatarImage src={user?.avatar || "/placeholder.svg?height=128&width=128"} />
//                   <AvatarFallback className="text-2xl">
//                     {profileData.name
//                       .split(" ")
//                       .map((n) => n[0])
//                       .join("")}
//                   </AvatarFallback>
//                 </Avatar>
//                 <Button
//                   size="sm"
//                   variant="outline"
//                   className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full p-0"
//                 >
//                   <Camera className="h-4 w-4" />
//                 </Button>
//               </div>
//               <Badge className={getRoleColor(user?.role || 'student')} variant="secondary">
//                 {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Student'}
//               </Badge>
//             </div>

//             <div className="flex-1 space-y-4">
//               {!isEditing ? (
//                 <>
//                   <div className="flex items-center justify-between">
//                     <h1 className="text-3xl font-bold">{profileData.name}</h1>
//                     <Button onClick={() => setIsEditing(true)} variant="outline">
//                       <Edit3 className="mr-2 h-4 w-4" />
//                       Edit Profile
//                     </Button>
//                   </div>

//                   <p className="text-muted-foreground">{profileData.bio}</p>

//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
//                     <div className="flex items-center gap-2">
//                       <Mail className="h-4 w-4 text-muted-foreground" />
//                       <span>{profileData.email}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Phone className="h-4 w-4 text-muted-foreground" />
//                       <span>{profileData.phone}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <MapPin className="h-4 w-4 text-muted-foreground" />
//                       <span>{profileData.location}</span>
//                     </div>
//                     <div className="flex items-center gap-2">
//                       <Calendar className="h-4 w-4 text-muted-foreground" />
//                       <span>Joined {profileData.joinDate}</span>
//                     </div>
//                   </div>

//                   <div className="flex flex-wrap gap-2">
//                     {profileData.interests.map((interest) => (
//                       <Badge key={interest} variant="secondary">
//                         {interest}
//                       </Badge>
//                     ))}
//                   </div>
//                 </>
//               ) : (
//                 <div className="space-y-4">
//                   <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                       <Label htmlFor="name">Full Name</Label>
//                       <Input
//                         id="name"
//                         value={profileData.name}
//                         onChange={(e) => handleInputChange("name", e.target.value)}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="email">Email</Label>
//                       <Input
//                         id="email"
//                         type="email"
//                         value={profileData.email}
//                         onChange={(e) => handleInputChange("email", e.target.value)}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="phone">Phone</Label>
//                       <Input
//                         id="phone"
//                         value={profileData.phone}
//                         onChange={(e) => handleInputChange("phone", e.target.value)}
//                       />
//                     </div>
//                     <div className="space-y-2">
//                       <Label htmlFor="location">Location</Label>
//                       <Input
//                         id="location"
//                         value={profileData.location}
//                         onChange={(e) => handleInputChange("location", e.target.value)}
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-2">
//                     <Label htmlFor="bio">Bio</Label>
//                     <Textarea
//                       id="bio"
//                       value={profileData.bio}
//                       onChange={(e) => handleInputChange("bio", e.target.value)}
//                       rows={3}
//                     />
//                   </div>

//                   <div className="flex gap-2">
//                     <Button onClick={handleSave}>Save Changes</Button>
//                     <Button variant="outline" onClick={() => setIsEditing(false)}>
//                       Cancel
//                     </Button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </CardContent>
//       </Card>

//       {/* Stats Cards */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2">
//               <FileText className="h-5 w-5 text-blue-600" />
//               <div>
//                 <p className="text-2xl font-bold">{stats.publications}</p>
//                 <p className="text-sm text-muted-foreground">Publications</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2">
//               <MessageSquare className="h-5 w-5 text-green-600" />
//               <div>
//                 <p className="text-2xl font-bold">{stats.forumPosts}</p>
//                 <p className="text-sm text-muted-foreground">Forum Posts</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2">
//               <Star className="h-5 w-5 text-yellow-600" />
//               <div>
//                 <p className="text-2xl font-bold">{stats.reputation}</p>
//                 <p className="text-sm text-muted-foreground">Reputation</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="pt-6">
//             <div className="flex items-center space-x-2">
//               <Trophy className="h-5 w-5 text-purple-600" />
//               <div>
//                 <p className="text-2xl font-bold">{stats.achievements}</p>
//                 <p className="text-sm text-muted-foreground">Achievements</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Tabbed Content */}
//       <Tabs defaultValue="activity" className="space-y-4">
//         <TabsList>
//           <TabsTrigger value="activity">Recent Activity</TabsTrigger>
//           <TabsTrigger value="publications">Publications</TabsTrigger>
//           <TabsTrigger value="achievements">Achievements</TabsTrigger>
//         </TabsList>

//         <TabsContent value="activity" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Recent Activity</CardTitle>
//               <CardDescription>Your latest contributions and interactions</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {recentActivity.map((activity, index) => (
//                   <div key={activity.id}>
//                     <div className="flex items-start space-x-4">
//                       <div className="p-2 bg-muted rounded-lg">
//                         {activity.type === 'publication' ? (
//                           <FileText className="h-4 w-4" />
//                         ) : (
//                           <MessageSquare className="h-4 w-4" />
//                         )}
//                       </div>
//                       <div className="flex-1 min-w-0">
//                         <p className="text-sm">
//                           You <span className="font-medium">{activity.action}</span>{' '}
//                           <span className="font-medium">{activity.title}</span>
//                         </p>
//                         <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
//                           <span>{activity.date}</span>
//                           {activity.type === 'publication' ? (
//                             <>
//                               <span>{activity.engagement.views} views</span>
//                               <span>{activity.engagement.comments} comments</span>
//                             </>
//                           ) : (
//                             <>
//                               <span>{activity.engagement.replies} replies</span>
//                               <span>{activity.engagement.likes} likes</span>
//                             </>
//                           )}
//                         </div>
//                       </div>
//                     </div>
//                     {index < recentActivity.length - 1 && <Separator className="mt-4" />}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="publications" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Your Publications</CardTitle>
//               <CardDescription>Articles and content you've published</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="space-y-4">
//                 {publications.map((pub, index) => (
//                   <div key={pub.id}>
//                     <div className="flex items-center justify-between">
//                       <div className="flex-1">
//                         <h3 className="font-medium">{pub.title}</h3>
//                         <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
//                           <Badge variant="outline">{pub.category}</Badge>
//                           <span>{pub.date}</span>
//                           <span>{pub.views} views</span>
//                           <span>{pub.comments} comments</span>
//                         </div>
//                       </div>
//                       <Badge variant="secondary" className="bg-green-100 text-green-800">
//                         {pub.status}
//                       </Badge>
//                     </div>
//                     {index < publications.length - 1 && <Separator className="mt-4" />}
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>

//         <TabsContent value="achievements" className="space-y-4">
//           <Card>
//             <CardHeader>
//               <CardTitle>Achievements</CardTitle>
//               <CardDescription>Your milestones and accomplishments</CardDescription>
//             </CardHeader>
//             <CardContent>
//               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                 {achievements.map((achievement) => (
//                   <div
//                     key={achievement.id}
//                     className={`p-4 border rounded-lg ${
//                       achievement.earned
//                         ? 'bg-green-50 border-green-200'
//                         : 'bg-gray-50 border-gray-200'
//                     }`}
//                   >
//                     <div className="flex items-start space-x-3">
//                       <div className={`p-2 rounded-lg ${
//                         achievement.earned
//                           ? 'bg-green-100 text-green-600'
//                           : 'bg-gray-100 text-gray-400'
//                       }`}>
//                         <achievement.icon className="h-5 w-5" />
//                       </div>
//                       <div className="flex-1">
//                         <h3 className="font-medium">{achievement.title}</h3>
//                         <p className="text-sm text-muted-foreground">
//                           {achievement.description}
//                         </p>
//                         {achievement.earned ? (
//                           <p className="text-xs text-green-600 mt-1">
//                             Earned {achievement.date}
//                           </p>
//                         ) : (
//                           <p className="text-xs text-muted-foreground mt-1">
//                             Progress: {achievement.progress}
//                           </p>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </CardContent>
//           </Card>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }
