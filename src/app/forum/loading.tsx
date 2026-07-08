import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ForumLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6">
      {/* Header Skeleton */}
      <div
        id="loading-flex-2"
        data-testId="loading-flex-2"
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
      >
        <div id="loading-div-3" data-testId="loading-div-3">
          <Skeleton className="h-9 w-56 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <Skeleton className="h-10 w-36" />
      </div>

      {/* Stats Cards Skeleton */}
      <div
        id="loading-grid-4"
        data-testId="loading-grid-4"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div
                id="loading-flex-5"
                data-testId="loading-flex-5"
                className="flex items-center gap-2"
              >
                <Skeleton className="h-4 w-4" />
                <div id="loading-div-6" data-testId="loading-div-6">
                  <Skeleton className="h-8 w-12 mb-1" />
                  <Skeleton className="h-3 w-20" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Search Skeleton */}
      <Card>
        <CardContent className="p-4">
          <Skeleton className="h-10 w-full" />
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
                <div
                  id="loading-flex-7"
                  data-testId="loading-flex-7"
                  className="flex items-start justify-between"
                >
                  <div
                    id="loading-div-8"
                    data-testId="loading-div-8"
                    className="flex-1"
                  >
                    <div
                      id="loading-flex-9"
                      data-testId="loading-flex-9"
                      className="flex items-center gap-3 mb-2"
                    >
                      <Skeleton className="h-6 w-48" />
                    </div>
                    <Skeleton className="h-4 w-64 mb-3" />
                    <div
                      id="loading-flex-10"
                      data-testId="loading-flex-10"
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-1" />
                      <Skeleton className="h-4 w-32" />
                    </div>
                  </div>
                  <div
                    id="loading-div-11"
                    data-testId="loading-div-11"
                    className="text-right space-y-1"
                  >
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-3 w-20" />
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
                <div
                  id="loading-flex-12"
                  data-testId="loading-flex-12"
                  className="flex items-start justify-between"
                >
                  <div
                    id="loading-div-13"
                    data-testId="loading-div-13"
                    className="flex-1"
                  >
                    <div
                      id="loading-flex-14"
                      data-testId="loading-flex-14"
                      className="flex items-center gap-2 mb-2"
                    >
                      <Skeleton className="h-6 w-72" />
                    </div>
                    <div
                      id="loading-flex-15"
                      data-testId="loading-flex-15"
                      className="flex items-center gap-2 mb-3"
                    >
                      <Skeleton className="h-6 w-6 rounded-full" />{" "}
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-16 rounded-full" />{" "}
                    </div>
                    <div
                      id="loading-flex-16"
                      data-testId="loading-flex-16"
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-4 w-16" />
                      <Skeleton className="h-4 w-24" />
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
