// app/search/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, User, FileText, MessageSquare, Filter } from "lucide-react";

export default function SearchLoading() {
  return (
    <div id="loading-container" data-testId="loading-container" className="container mx-auto px-4 py-8 animate-pulse">
      {/* Header */}
      <div id="loading-div-2" data-testId="loading-div-2" className="mb-8">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-auto lg:grid-cols-4">
          <TabsTrigger value="all" disabled className="flex items-center gap-2">
            <Filter className="h-4 w-4" />
            All (0)
          </TabsTrigger>
          <TabsTrigger
            value="users"
            disabled
            className="flex items-center gap-2"
          >
            <User className="h-4 w-4" />
            Users (0)
          </TabsTrigger>
          <TabsTrigger
            value="publications"
            disabled
            className="flex items-center gap-2"
          >
            <FileText className="h-4 w-4" />
            Publications (0)
          </TabsTrigger>
          <TabsTrigger
            value="forums"
            disabled
            className="flex items-center gap-2"
          >
            <MessageSquare className="h-4 w-4" />
            Forums (0)
          </TabsTrigger>
        </TabsList>

        {/* Results Skeleton */}
        <div id="loading-div-3" data-testId="loading-div-3" className="mt-8 space-y-4">
          {[...Array(5)].map((_, i) => (
            <Card key={i} className="hover:shadow-md transition-shadow">
              <CardHeader>
                <Skeleton className="h-4 w-3/4" />
                <Skeleton className="h-3 w-1/2" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-3 w-full mb-2" />
                <Skeleton className="h-3 w-2/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </Tabs>
    </div>
  );
}
