import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePageLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div id="loading-flex-2" data-testId="loading-flex-2" className="flex flex-col md:flex-row gap-6">
            <div id="loading-flex-3" data-testId="loading-flex-3" className="flex flex-col items-center space-y-4">
              <div id="loading-div-4" data-testId="loading-div-4" className="relative">
                <Skeleton className="h-32 w-32 rounded-full" /> {/* Avatar */}
                <Skeleton className="h-8 w-8 rounded-full absolute -bottom-2 -right-2" />{" "}
                {/* Upload button */}
              </div>
              <Skeleton className="h-5 w-16 rounded-full" /> {/* Role badge */}
            </div>

            <div id="loading-div-5" data-testId="loading-div-5" className="flex-1 space-y-4">
              <div id="loading-flex-6" data-testId="loading-flex-6" className="flex items-center justify-between">
                <Skeleton className="h-9 w-64" /> {/* Name */}
                <Skeleton className="h-10 w-32" /> {/* Edit button */}
              </div>
              <Skeleton className="h-4 w-full" /> {/* Bio */}
              <div id="loading-grid-7" data-testId="loading-grid-7" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div id="loading-flex-8" data-testId="loading-flex-8" className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-32" /> {/* Email */}
                </div>
                <div id="loading-flex-9" data-testId="loading-flex-9" className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-28" /> {/* Phone */}
                </div>
                <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-24" /> {/* Location */}
                </div>
                <div id="loading-flex-11" data-testId="loading-flex-11" className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-32" /> {/* Join date */}
                </div>
              </div>
              {/* Interests */}
              <div id="loading-flex-12" data-testId="loading-flex-12" className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
                <Skeleton className="h-6 w-22 rounded-full" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards Skeleton */}
      <div id="loading-grid-13" data-testId="loading-grid-13" className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" /> {/* Icon */}
                <div id="loading-div-15" data-testId="loading-div-15">
                  <Skeleton className="h-8 w-8 mb-1" /> {/* Value */}
                  <Skeleton className="h-4 w-20" /> {/* Label */}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content Skeleton */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
          <TabsTrigger value="publications">Publications</TabsTrigger>
          <TabsTrigger value="forums">Forums</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-64" /> {/* Description */}
            </CardHeader>
            <CardContent>
              <div id="loading-div-16" data-testId="loading-div-16" className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div id="loading-div-17" data-testId="loading-div-17" key={index}>
                    <div id="loading-flex-18" data-testId="loading-flex-18" className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div id="loading-div-19" data-testId="loading-div-19" className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Activity text */}
                        <div id="loading-flex-20" data-testId="loading-flex-20" className="flex items-center gap-4">
                          <Skeleton className="h-3 w-24" /> {/* Date */}
                          <Skeleton className="h-3 w-16" /> {/* Likes */}
                          <Skeleton className="h-3 w-20" /> {/* Comments */}
                        </div>
                      </div>
                    </div>
                    {index < 4 && <Skeleton className="h-px w-full mt-4" />}{" "}
                    {/* Separator */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-56" /> {/* Description */}
            </CardHeader>
            <CardContent>
              <div id="loading-div-21" data-testId="loading-div-21" className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div id="loading-div-22" data-testId="loading-div-22" key={index}>
                    <div id="loading-flex-23" data-testId="loading-flex-23" className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div id="loading-div-24" data-testId="loading-div-24" className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Publication text */}
                        <div id="loading-flex-25" data-testId="loading-flex-25" className="flex items-center gap-4">
                          <Skeleton className="h-4 w-16 rounded-full" />{" "}
                          {/* Category badge */}
                          <Skeleton className="h-3 w-16" /> {/* Date */}
                          <Skeleton className="h-3 w-20" /> {/* Comments */}
                          <Skeleton className="h-3 w-12" /> {/* Likes */}
                        </div>
                      </div>
                      <Skeleton className="h-5 w-20 rounded-full" />{" "}
                      {/* Status badge */}
                      <Skeleton className="h-8 w-8" /> {/* More menu */}
                    </div>
                    {index < 3 && <Skeleton className="h-px w-full mt-4" />}{" "}
                    {/* Separator */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-48" /> {/* Description */}
            </CardHeader>
            <CardContent>
              <div id="loading-div-26" data-testId="loading-div-26" className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div id="loading-div-27" data-testId="loading-div-27" key={index}>
                    <div id="loading-flex-28" data-testId="loading-flex-28" className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div id="loading-div-29" data-testId="loading-div-29" className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Forum text */}
                        <div id="loading-flex-30" data-testId="loading-flex-30" className="flex items-center gap-4">
                          <Skeleton className="h-4 w-20 rounded-full" />{" "}
                          {/* Category badge */}
                          <Skeleton className="h-3 w-16" /> {/* Date */}
                          <Skeleton className="h-3 w-20" /> {/* Comments */}
                          <Skeleton className="h-3 w-12" /> {/* Likes */}
                        </div>
                      </div>
                      <Skeleton className="h-8 w-8" /> {/* More menu */}
                    </div>
                    {index < 3 && <Skeleton className="h-px w-full mt-4" />}{" "}
                    {/* Separator */}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-64" /> {/* Description */}
            </CardHeader>
            <CardContent>
              <div id="loading-grid-31" data-testId="loading-grid-31" className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div id="loading-div-32" data-testId="loading-div-32" key={index} className="p-4 border rounded-lg">
                    <div id="loading-flex-33" data-testId="loading-flex-33" className="flex items-start space-x-3">
                      <Skeleton className="h-9 w-9 rounded-lg" />{" "}
                      {/* Achievement icon */}
                      <div id="loading-div-34" data-testId="loading-div-34" className="flex-1">
                        <Skeleton className="h-4 w-24 mb-1" />{" "}
                        {/* Achievement title */}
                        <Skeleton className="h-4 w-32 mb-2" />{" "}
                        {/* Description */}
                        <Skeleton className="h-3 w-20" /> {/* Date/Progress */}
                      </div>
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
