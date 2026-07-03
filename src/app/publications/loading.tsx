// app/publications/loading.tsx
"use client"

import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search, PlusCircle } from "lucide-react"

export default function PublicationsLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6 animate-pulse">
      {/* Header */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div id="loading-div-3" data-testId="loading-div-3" className="space-y-2">
          <Skeleton className="h-9 w-48" />
          <Skeleton className="h-5 w-96" />
        </div>
        <Button disabled>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create Publication
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-6">
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex flex-col sm:flex-row gap-4">
            <div id="loading-div-5" data-testId="loading-div-5" className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input disabled placeholder="Search publications..." className="pl-10" />
            </div>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
              </SelectContent>
            </Select>
            <Select disabled>
              <SelectTrigger className="w-full sm:w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Publications Grid */}
      <div id="loading-grid-6" data-testId="loading-grid-6" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 6 }).map((_, i) => (
          <Card key={i} className="overflow-hidden">
            <Skeleton className="h-48 w-full rounded-none" />
            <CardContent className="p-6 space-y-4">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              <div id="loading-flex-7" data-testId="loading-flex-7" className="flex items-center gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <div id="loading-div-8" data-testId="loading-div-8" className="space-y-1">
                  <Skeleton className="h-4 w-24" />
                  <Skeleton className="h-3 w-32" />
                </div>
              </div>

              <div id="loading-flex-9" data-testId="loading-flex-9" className="flex items-center justify-between">
                <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-center gap-4">
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                  <Skeleton className="h-4 w-12" />
                </div>
                <Skeleton className="h-8 w-24" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}