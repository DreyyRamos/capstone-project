import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function LeaderboardLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6">
      {/* Header Skeleton */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div id="loading-div-3" data-testId="loading-div-3">
          <Skeleton className="h-9 w-48 mb-2" />
          <Skeleton className="h-5 w-64" />
        </div>
        <Skeleton className="h-10 w-48" />
      </div>

      {/* Info Alert Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <Skeleton className="h-6 w-64 mb-4" />
          <Skeleton className="h-4 w-full mb-2" />
          <div id="loading-grid-4" data-testId="loading-grid-4" className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-3">
            <div id="loading-div-5" data-testId="loading-div-5" className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
            <div id="loading-div-6" data-testId="loading-div-6" className="space-y-2">
              {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className="h-4 w-full" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Skeleton */}
      <div id="loading-grid-7" data-testId="loading-grid-7" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div id="loading-flex-8" data-testId="loading-flex-8" className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" />
                <div id="loading-div-9" data-testId="loading-div-9">
                  <Skeleton className="h-8 w-16 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Top 3 Podium Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div id="loading-grid-10" data-testId="loading-grid-10" className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <CardContent className="pt-6 text-center">
                  <Skeleton className="h-12 w-12 mx-auto mb-4" />
                  <Skeleton className="h-16 w-16 rounded-full mx-auto mb-4" />
                  <Skeleton className="h-6 w-32 mx-auto mb-2" />
                  <Skeleton className="h-5 w-20 mx-auto mb-4" />
                  <Skeleton className="h-8 w-16 mx-auto mb-1" />
                  <Skeleton className="h-4 w-24 mx-auto mb-4" />
                  <div id="loading-flex-11" data-testId="loading-flex-11" className="flex justify-center gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Full Rankings Skeleton */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div id="loading-div-12" data-testId="loading-div-12" className="space-y-2">
            {[...Array(10)].map((_, i) => (
              <div id="loading-flex-13" data-testId="loading-flex-13"
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12" />
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div id="loading-div-15" data-testId="loading-div-15">
                    <Skeleton className="h-5 w-32 mb-1" />
                    <Skeleton className="h-4 w-48 mb-1" />
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div id="loading-flex-16" data-testId="loading-flex-16" className="flex items-center gap-6">
                  <div id="loading-div-17" data-testId="loading-div-17" className="hidden md:flex items-center gap-4">
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                    <Skeleton className="h-4 w-8" />
                  </div>
                  <div id="loading-div-18" data-testId="loading-div-18" className="text-right">
                    <Skeleton className="h-8 w-12 mb-1" />
                    <Skeleton className="h-3 w-8" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
