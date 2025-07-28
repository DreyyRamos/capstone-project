"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Search,
  Users,
  UserPlus,
  MoreHorizontal,
  Mail,
  Shield,
  MessageSquare,
  BookOpen,
  TrendingUp,
  UserCheck,
  UserX,
  Crown,
} from "lucide-react"

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [roleFilter, setRoleFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john.doe@lincolnhigh.edu",
      role: "Student",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      joinDate: "2023-09-01",
      lastActive: "2 hours ago",
      publications: 5,
      forumPosts: 23,
      reputation: 145,
    },
    {
      id: 2,
      name: "Dr. Sarah Johnson",
      email: "s.johnson@lincolnhigh.edu",
      role: "Teacher",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      joinDate: "2022-08-15",
      lastActive: "1 hour ago",
      publications: 12,
      forumPosts: 67,
      reputation: 892,
    },
    {
      id: 3,
      name: "Maria Rodriguez",
      email: "m.rodriguez@lincolnhigh.edu",
      role: "Librarian",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      joinDate: "2023-01-10",
      lastActive: "30 minutes ago",
      publications: 8,
      forumPosts: 34,
      reputation: 456,
    },
    {
      id: 4,
      name: "Alex Chen",
      email: "alex.chen@lincolnhigh.edu",
      role: "Student",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      joinDate: "2023-09-01",
      lastActive: "5 hours ago",
      publications: 3,
      forumPosts: 45,
      reputation: 234,
    },
    {
      id: 5,
      name: "Emma Davis",
      email: "emma.davis@lincolnhigh.edu",
      role: "Student",
      status: "Inactive",
      avatar: "/placeholder-user.jpg",
      joinDate: "2023-09-01",
      lastActive: "2 weeks ago",
      publications: 1,
      forumPosts: 8,
      reputation: 67,
    },
    {
      id: 6,
      name: "Admin User",
      email: "admin@lincolnhigh.edu",
      role: "Admin",
      status: "Active",
      avatar: "/placeholder-user.jpg",
      joinDate: "2022-01-01",
      lastActive: "Just now",
      publications: 25,
      forumPosts: 156,
      reputation: 1250,
    },
  ]

  const stats = [
    { label: "Total Users", value: "1,247", icon: Users, change: "+12%" },
    { label: "Active Today", value: "89", icon: UserCheck, change: "+5%" },
    { label: "New This Month", value: "34", icon: UserPlus, change: "+23%" },
    { label: "Teachers", value: "45", icon: Crown, change: "+2%" },
  ]

  const roleColors = {
    Admin: "bg-red-100 text-red-800",
    Teacher: "bg-blue-100 text-blue-800",
    Student: "bg-green-100 text-green-800",
    Librarian: "bg-purple-100 text-purple-800",
  }

  const statusColors = {
    Active: "bg-green-100 text-green-800",
    Inactive: "bg-gray-100 text-gray-800",
    Suspended: "bg-red-100 text-red-800",
  }

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesRole = roleFilter === "all" || user.role === roleFilter
    const matchesStatus = statusFilter === "all" || user.status === statusFilter
    return matchesSearch && matchesRole && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">User Management</h1>
          <p className="text-muted-foreground">Manage users, roles, and permissions</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
                <div className="flex items-center gap-2">
                  <stat.icon className="h-5 w-5 text-muted-foreground" />
                  <Badge variant="secondary" className="text-xs text-green-600">
                    {stat.change}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Teacher">Teacher</SelectItem>
                <SelectItem value="Student">Student</SelectItem>
                <SelectItem value="Librarian">Librarian</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Suspended">Suspended</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Users ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={user.avatar || "/placeholder.svg"} alt={user.name} />
                    <AvatarFallback>
                      {user.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold">{user.name}</h3>
                      <Badge className={roleColors[user.role as keyof typeof roleColors]}>{user.role}</Badge>
                      <Badge className={statusColors[user.status as keyof typeof statusColors]}>{user.status}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
                      <span>Joined {new Date(user.joinDate).toLocaleDateString()}</span>
                      <span>•</span>
                      <span>Last active {user.lastActive}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden md:flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4" />
                      {user.publications}
                    </div>
                    <div className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4" />
                      {user.forumPosts}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4" />
                      {user.reputation}
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem>
                        <Mail className="mr-2 h-4 w-4" />
                        Send Message
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Shield className="mr-2 h-4 w-4" />
                        Edit Permissions
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <UserX className="mr-2 h-4 w-4" />
                        Suspend User
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
