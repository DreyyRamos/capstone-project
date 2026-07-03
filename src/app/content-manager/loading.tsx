import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ContentManagerLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-6">
      {/* Header Skeleton */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div id="loading-div-3" data-testId="loading-div-3">
          <Skeleton className="h-9 w-64 mb-2" />
          <Skeleton className="h-5 w-80" />
        </div>
        <div id="loading-flex-4" data-testId="loading-flex-4" className="flex items-center gap-2">
          <Skeleton className="h-10 w-40" />
          <Skeleton className="h-10 w-36" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div id="loading-grid-5" data-testId="loading-grid-5" className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div id="loading-flex-6" data-testId="loading-flex-6" className="flex items-center gap-4">
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div id="loading-div-7" data-testId="loading-div-7" className="space-y-2">
                  <Skeleton className="h-8 w-16" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="drafts" className="space-y-6">
        <TabsList>
          <TabsTrigger value="drafts">Drafts & Review</TabsTrigger>
          <TabsTrigger value="published">Published Content</TabsTrigger>
          <TabsTrigger value="archived">Archived Content</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>

        <TabsContent value="drafts" className="space-y-6">
          {/* Filters Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div id="loading-flex-8" data-testId="loading-flex-8" className="flex flex-col sm:flex-row gap-4">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-full sm:w-48" />
                <Skeleton className="h-10 w-full sm:w-48" />
              </div>
            </CardContent>
          </Card>

          {/* Content List Skeleton */}
          <div id="loading-div-9" data-testId="loading-div-9" className="space-y-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-start justify-between">
                    <div id="loading-div-11" data-testId="loading-div-11" className="flex-1">
                      <div id="loading-flex-12" data-testId="loading-flex-12" className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-64" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-20" />
                      </div>
                      <Skeleton className="h-4 w-full mb-3" />
                      <div id="loading-flex-13" data-testId="loading-flex-13" className="flex items-center gap-4">
                        <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-4 w-20" />
                          <Skeleton className="h-4 w-12" />
                        </div>
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-10" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="published" className="space-y-6">
          <div id="loading-div-15" data-testId="loading-div-15" className="space-y-4">
            {Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div id="loading-flex-16" data-testId="loading-flex-16" className="flex items-start justify-between">
                    <div id="loading-div-17" data-testId="loading-div-17" className="flex-1">
                      <div id="loading-flex-18" data-testId="loading-flex-18" className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-56" />
                        <Skeleton className="h-5 w-18" />
                        <Skeleton className="h-5 w-16" />
                      </div>
                      <div id="loading-flex-19" data-testId="loading-flex-19" className="flex items-center gap-4 text-sm mb-3">
                        <div id="loading-flex-20" data-testId="loading-flex-20" className="flex items-center gap-2">
                          <Skeleton className="h-4 w-4" />
                          <Skeleton className="h-4 w-16" />
                        </div>
                        <Skeleton className="h-4 w-20" />
                      </div>
                      <div id="loading-flex-21" data-testId="loading-flex-21" className="flex items-center gap-4">
                        <Skeleton className="h-4 w-12" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-10" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="archived" className="space-y-6">
          <div id="loading-div-22" data-testId="loading-div-22" className="space-y-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div id="loading-flex-23" data-testId="loading-flex-23" className="flex items-start justify-between">
                    <div id="loading-div-24" data-testId="loading-div-24" className="flex-1">
                      <div id="loading-flex-25" data-testId="loading-flex-25" className="flex items-center gap-2 mb-2">
                        <Skeleton className="h-6 w-60" />
                        <Skeleton className="h-5 w-16" />
                        <Skeleton className="h-5 w-18" />
                      </div>
                      <Skeleton className="h-4 w-full mb-3" />
                      <div id="loading-flex-26" data-testId="loading-flex-26" className="flex items-center gap-4">
                        <div id="loading-flex-27" data-testId="loading-flex-27" className="flex items-center gap-2">
                          <Skeleton className="h-6 w-6 rounded-full" />
                          <Skeleton className="h-4 w-18" />
                          <Skeleton className="h-4 w-14" />
                        </div>
                        <Skeleton className="h-4 w-22" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-10" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="categories" className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <div id="loading-grid-28" data-testId="loading-grid-28" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                  <Card
                    key={index}
                    className="hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4">
                      <div id="loading-flex-29" data-testId="loading-flex-29" className="flex items-center justify-between">
                        <div id="loading-div-30" data-testId="loading-div-30">
                          <Skeleton className="h-5 w-16 mb-1" />
                          <Skeleton className="h-4 w-24" />
                        </div>
                        <div id="loading-flex-31" data-testId="loading-flex-31" className="flex items-center gap-2">
                          <Skeleton className="h-5 w-8 rounded-full" />
                          <Skeleton className="h-8 w-8" />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
