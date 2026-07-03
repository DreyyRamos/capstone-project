// app/admin/users/loading.tsx
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent } from "@/components/ui/dropdown-menu"
import { Search, Users, UserPlus, MoreHorizontal, BookOpen, MessageSquare, TrendingUp } from "lucide-react"

export default function UsersLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6 animate-pulse">
      {/* Header */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div id="loading-div-3" data-testId="loading-div-3" className="space-y-2">
          <Skeleton className="h-9 w-64" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Button id="loading-button-1" data-testId="loading-button-1" disabled>
          <UserPlus className="mr-2 h-4 w-4" />
          Add User
        </Button>
      </div>

      {/* Stats */}
      <div id="loading-grid-4" data-testId="loading-grid-4" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div id="loading-flex-5" data-testId="loading-flex-5" className="flex items-center justify-between">
                <div id="loading-div-6" data-testId="loading-div-6" className="space-y-1">
                  <Skeleton className="h-7 w-12" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div id="loading-flex-7" data-testId="loading-flex-7" className="flex items-center gap-2">
                  <Skeleton className="h-5 w-5" />
                  <Skeleton className="h-4 w-10 rounded-full" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div id="loading-flex-8" data-testId="loading-flex-8" className="flex flex-col sm:flex-row gap-4">
            <div id="loading-div-9" data-testId="loading-div-9" className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input disabled placeholder="Search users..." className="pl-10" />
            </div>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div id="loading-div-10" data-testId="loading-div-10" className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div id="loading-flex-11" data-testId="loading-flex-11" key={i} className="flex items-center justify-between p-4 border rounded-lg">
                <div id="loading-flex-12" data-testId="loading-flex-12" className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div id="loading-div-13" data-testId="loading-div-13" className="space-y-2">
                    <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-2">
                      <Skeleton className="h-5 w-40" />
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </div>
                    <Skeleton className="h-4 w-56" />
                    <div id="loading-flex-15" data-testId="loading-flex-15" className="flex items-center gap-4">
                      <Skeleton className="h-3 w-24" />
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                </div>

                <div id="loading-flex-16" data-testId="loading-flex-16" className="flex items-center gap-6">
                  <div id="loading-div-17" data-testId="loading-div-17" className="hidden md:flex items-center gap-4">
                    <div id="loading-flex-18" data-testId="loading-flex-18" className="flex items-center gap-1">
                      <BookOpen className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                    <div id="loading-flex-19" data-testId="loading-flex-19" className="flex items-center gap-1">
                      <MessageSquare className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                    <div id="loading-flex-20" data-testId="loading-flex-20" className="flex items-center gap-1">
                      <TrendingUp className="h-4 w-4 text-muted-foreground" />
                      <Skeleton className="h-4 w-6" />
                    </div>
                  </div>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button id="loading-button-2" data-testId="loading-button-2" variant="ghost" size="icon" disabled>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <Skeleton className="h-4 w-32 m-2" />
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            ))}

            {/* Empty State */}
            <div id="loading-div-21" data-testId="loading-div-21" className="text-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <Skeleton className="h-5 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}