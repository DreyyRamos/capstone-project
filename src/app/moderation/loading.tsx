import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ModerationLoading() {
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
          <Skeleton className="h-5 w-96" />
        </div>
        <div
          id="loading-flex-4"
          data-testId="loading-flex-4"
          className="flex items-center gap-2"
        >
          <Skeleton className="h-10 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
      </div>

      {/* Stats Cards Skeleton */}
      <div
        id="loading-grid-5"
        data-testId="loading-grid-5"
        className="grid grid-cols-1 md:grid-cols-4 gap-6"
      >
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div
                id="loading-flex-6"
                data-testId="loading-flex-6"
                className="flex items-center gap-4"
              >
                <Skeleton className="h-12 w-12 rounded-lg" />
                <div id="loading-div-7" data-testId="loading-div-7">
                  <Skeleton className="h-8 w-12 mb-2" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="reports" className="space-y-6">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="actions">Recent Actions</TabsTrigger>
          <TabsTrigger value="users">User Management</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="space-y-6">
          {/* Filters Skeleton */}
          <Card>
            <CardContent className="p-6">
              <div
                id="loading-flex-8"
                data-testId="loading-flex-8"
                className="flex flex-col sm:flex-row gap-4"
              >
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 w-full sm:w-48" />{" "}
                <Skeleton className="h-10 w-full sm:w-48" />
              </div>
            </CardContent>
          </Card>

          {/* Reports List Skeleton */}
          <div
            id="loading-div-9"
            data-testId="loading-div-9"
            className="space-y-4"
          >
            {Array.from({ length: 5 }).map((_, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                  <div
                    id="loading-flex-10"
                    data-testId="loading-flex-10"
                    className="flex items-start justify-between"
                  >
                    <div
                      id="loading-div-11"
                      data-testId="loading-div-11"
                      className="flex-1"
                    >
                      <div
                        id="loading-flex-12"
                        data-testId="loading-flex-12"
                        className="flex items-center gap-2 mb-2"
                      >
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-6 w-80" />
                        <Skeleton className="h-5 w-16 rounded-full" />{" "}
                        <Skeleton className="h-5 w-20 rounded-full" />{" "}
                      </div>
                      <div
                        id="loading-div-13"
                        data-testId="loading-div-13"
                        className="bg-muted p-3 rounded-md mb-3"
                      >
                        <Skeleton className="h-4 w-full mb-1" />{" "}
                        <Skeleton className="h-4 w-3/4" />
                      </div>
                      <Skeleton className="h-4 w-full mb-3" />{" "}
                      {/* Description */}
                      <div
                        id="loading-flex-14"
                        data-testId="loading-flex-14"
                        className="flex items-center gap-4"
                      >
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-4 w-1" />
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-1" />
                        <Skeleton className="h-4 w-28" />
                        <Skeleton className="h-4 w-1" />
                        <Skeleton className="h-4 w-20" />
                        <Skeleton className="h-4 w-1" />
                        <Skeleton className="h-4 w-24" />
                      </div>
                    </div>
                    <Skeleton className="h-10 w-10" />{" "}
                    {/* More actions button */}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="actions" className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-48 mb-2" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div
                id="loading-div-15"
                data-testId="loading-div-15"
                className="space-y-4"
              >
                {Array.from({ length: 4 }).map((_, index) => (
                  <div
                    id="loading-flex-16"
                    data-testId="loading-flex-16"
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div
                      id="loading-flex-17"
                      data-testId="loading-flex-17"
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-8 w-8 rounded-lg" />
                      <div id="loading-div-18" data-testId="loading-div-18">
                        <Skeleton className="h-4 w-32 mb-1" />{" "}
                        <Skeleton className="h-4 w-48 mb-1" />{" "}
                        <Skeleton className="h-3 w-40" />
                      </div>
                    </div>
                    <div
                      id="loading-div-19"
                      data-testId="loading-div-19"
                      className="text-right"
                    >
                      <Skeleton className="h-4 w-24 mb-1" />
                      <Skeleton className="h-3 w-32" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-36 mb-2" />
              <Skeleton className="h-4 w-72" />
            </CardHeader>
            <CardContent>
              <div
                id="loading-div-20"
                data-testId="loading-div-20"
                className="space-y-4"
              >
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    id="loading-flex-21"
                    data-testId="loading-flex-21"
                    key={index}
                    className="flex items-center justify-between p-4 border rounded-lg"
                  >
                    <div
                      id="loading-flex-22"
                      data-testId="loading-flex-22"
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-10 w-10 rounded-full" />{" "}
                      <div id="loading-div-23" data-testId="loading-div-23">
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-4 w-48 mb-1" />
                        <Skeleton className="h-4 w-16 rounded-full" />{" "}
                      </div>
                    </div>
                    <div
                      id="loading-flex-24"
                      data-testId="loading-flex-24"
                      className="flex items-center gap-2"
                    >
                      <Skeleton className="h-5 w-20 rounded-full" />{" "}
                      <Skeleton className="h-8 w-24" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
