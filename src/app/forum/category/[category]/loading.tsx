import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ForumCategoryLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6">
      {/* Header Skeleton */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex items-center gap-4">
        <Skeleton className="h-10 w-32" /> {/* Back button */}
        <div id="loading-div-3" data-testId="loading-div-3" className="flex-1">
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex items-center gap-3 mb-2">
            <Skeleton className="h-9 w-48" /> {/* Category title */}
            <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
          </div>
          <Skeleton className="h-5 w-64" /> {/* Description */}
        </div>
        <Skeleton className="h-10 w-28" /> {/* New Topic button */}
      </div>

      {/* Stats Cards Skeleton */}
      <div id="loading-grid-5" data-testId="loading-grid-5" className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div id="loading-flex-6" data-testId="loading-flex-6" className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" /> {/* Icon */}
                <div id="loading-div-7" data-testId="loading-div-7" className="space-y-2">
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
          <div id="loading-flex-8" data-testId="loading-flex-8" className="flex flex-col sm:flex-row gap-4">
            <Skeleton className="h-10 flex-1" /> {/* Search input */}
            <Skeleton className="h-10 w-full sm:w-48" /> {/* Sort dropdown */}
          </div>
        </CardContent>
      </Card>

      {/* Topics List Skeleton */}
      <div id="loading-div-9" data-testId="loading-div-9" className="space-y-4">
        {Array.from({ length: 5 }).map((_, index) => (
          <Card key={index} className="hover:shadow-md transition-shadow">
            <CardContent className="p-6">
              <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-start justify-between">
                <div id="loading-div-11" data-testId="loading-div-11" className="flex-1">
                  <div id="loading-flex-12" data-testId="loading-flex-12" className="flex items-center gap-2 mb-2">
                    <Skeleton className="h-6 w-72" /> {/* Topic title */}
                  </div>
                  <Skeleton className="h-4 w-full mb-3" /> {/* Description */}
                  <div id="loading-flex-13" data-testId="loading-flex-13" className="flex items-center gap-2 mb-3">
                    <Skeleton className="h-6 w-6 rounded-full" /> {/* Avatar */}
                    <Skeleton className="h-4 w-20" /> {/* Author name */}
                    <Skeleton className="h-4 w-12 rounded-full" />{" "}
                    {/* Role badge */}
                    <Skeleton className="h-4 w-24" /> {/* Date */}
                  </div>
                  <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-4">
                    <Skeleton className="h-4 w-16" /> {/* Replies */}
                    <Skeleton className="h-4 w-12" /> {/* Views */}
                    <Skeleton className="h-4 w-20" /> {/* Last reply */}
                  </div>
                </div>
                <div id="loading-flex-15" data-testId="loading-flex-15" className="flex flex-col items-end gap-2">
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
