import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ForumLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <Skeleton className="h-9 w-56 mb-2" /> {/* Title */}
          <Skeleton className="h-5 w-80" /> {/* Description */}
        </div>
        <Skeleton className="h-10 w-36" /> {/* Start Discussion button */}
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Skeleton className="h-4 w-4" /> {/* Icon */}
                <div>
                  <Skeleton className="h-8 w-12 mb-1" /> {/* Value */}
                  <Skeleton className="h-3 w-20" /> {/* Label */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Skeleton */}
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-10 w-full" /> {/* Search input */}
        </CardContent>
      </Card>

      <Tabs defaultValue="categories" className="space-y-6">
        <TabsList>
          <TabsTrigger value="categories">Categories</TabsTrigger>
          <TabsTrigger value="recent">Recent Topics</TabsTrigger>
        </TabsList>

        <TabsContent value="categories" className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <Skeleton className="h-6 w-48" /> {/* Category name */}
                    </div>
                    <Skeleton className="h-4 w-64 mb-3" /> {/* Description */}
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-16" /> {/* Topics count */}
                      <Skeleton className="h-4 w-1" /> {/* Separator */}
                      <Skeleton className="h-4 w-32" /> {/* Last updated */}
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <Skeleton className="h-4 w-24" /> {/* Last post title */}
                    <Skeleton className="h-3 w-20" /> {/* Last post author */}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          {Array.from({ length: 6 }).map((_, index) => (
            <Card key={index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-6 w-72" /> {/* Topic title */}
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <Skeleton className="h-6 w-6 rounded-full" />{" "}
                      {/* Avatar */}
                      <Skeleton className="h-4 w-24" /> {/* Author name */}
                      <Skeleton className="h-4 w-16 rounded-full" />{" "}
                      {/* Category badge */}
                    </div>
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-4 w-20" /> {/* Replies count */}
                      <Skeleton className="h-4 w-16" /> {/* Views count */}
                      <Skeleton className="h-4 w-24" /> {/* Last reply */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
