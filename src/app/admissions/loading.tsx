import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdmissionsLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6">
      {/* Header */}
      <div id="loading-div-2" data-testId="loading-div-2">
        <Skeleton className="h-8 w-64 mb-2" />
        <Skeleton className="h-4 w-96" />
      </div>

      {/* Stats Cards */}
      <div id="loading-grid-3" data-testId="loading-grid-3" className="grid gap-4 md:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-4 w-4" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-8 w-12 mb-1" />
              <Skeleton className="h-3 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-32" />
        </CardHeader>
        <CardContent>
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex gap-4">
            <Skeleton className="h-10 flex-1" />
            <Skeleton className="h-10 w-[180px]" />
          </div>
        </CardContent>
      </Card>

      {/* Applications List */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
        </CardHeader>
        <CardContent>
          <div id="loading-div-5" data-testId="loading-div-5" className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div id="loading-flex-6" data-testId="loading-flex-6"
                key={i}
                className="flex items-center justify-between p-4 border rounded-lg"
              >
                <div id="loading-flex-7" data-testId="loading-flex-7" className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div id="loading-div-8" data-testId="loading-div-8">
                    <div id="loading-flex-9" data-testId="loading-flex-9" className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-5 w-32" />
                      <Skeleton className="h-5 w-16" />
                    </div>
                    <Skeleton className="h-4 w-48 mb-1" />
                    <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-center gap-4">
                      <Skeleton className="h-3 w-20" />
                      <Skeleton className="h-3 w-24" />
                    </div>
                  </div>
                </div>
                <div id="loading-flex-11" data-testId="loading-flex-11" className="flex items-center gap-2">
                  <Skeleton className="h-8 w-20" />
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-8 w-20" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
