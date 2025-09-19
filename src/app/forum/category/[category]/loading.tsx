import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ForumCategoryLoading() {
  return (
    <div className="space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-32" /> {/* Back button */}
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <Skeleton className="h-9 w-48" /> {/* Category title */}
            <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
          </div>
          <Skeleton className="h-5 w-64" /> {/* Description */}
        </div>
        <Skeleton className="h-10 w-28" /> {/* New Topic button */}
      </div>

      {/* Stats Cards Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" /> {/* Icon */}
                <div className="space-y-2">
                  <Skeleton className="h-8 w-12" /> {/* Number */}
                  <Skeleton className="h-4 w-16" /> {/* Label */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" /> {/* Search input */}
            <Skeleton className="h-10 w-full sm:w-48" /> {/* Sort dropdown */}
          </div>
        </CardContent>
      </Card>

      {/* Topics List Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-6 w-72" /> {/* Topic title */}
                  </div>
                  <Skeleton className="h-4 w-full mb-3" /> {/* Description */}
                  <div className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar */}
                    <Skeleton className="h-4 w-20" /> {/* Author name */}
                    <Skeleton className="h-4 w-12 rounded-full" />{" "}
                    {/* Role badge */}
                    <Skeleton className="h-4 w-24" /> {/* Date */}
                  </div>
                  <div className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" /> {/* Replies */}
                    <Skeleton className="h-4 w-12" /> {/* Views */}
                    <Skeleton className="h-4 w-20" /> {/* Last reply */}
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Skeleton className="h-8 w-24" /> {/* View Topic button */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
