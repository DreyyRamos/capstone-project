import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProfilePageLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Profile Header Skeleton */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <Skeleton className="h-32 w-32 rounded-full" /> {/* Avatar */}
                <Skeleton className="h-8 w-8 rounded-full absolute -bottom-2 -right-2" />{" "}
                {/* Upload button */}
              </div>
              <Skeleton className="h-5 w-16 rounded-full" /> {/* Role badge */}
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-9 w-64" /> {/* Name */}
                <Skeleton className="h-10 w-32" /> {/* Edit button */}
              </div>
              <Skeleton className="h-4 w-full" /> {/* Bio */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-32" /> {/* Email */}
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-28" /> {/* Phone */}
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-24" /> {/* Location */}
                </div>
                <div className="flex items-center gap-2">
                  <Skeleton className="h-4 w-4" /> {/* Icon */}
                  <Skeleton className="h-4 w-32" /> {/* Join date */}
                </div>
              </div>
              {/* Interests */}
              <div className="flex flex-wrap gap-2">
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
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <Skeleton className="h-5 w-5" /> {/* Icon */}
                <div>
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
              <div className="space-y-4">
                {Array.from({ length: 5 }).map((_, index) => (
                  <div key={index}>
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Activity text */}
                        <div className="flex items-center gap-4">
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
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Publication text */}
                        <div className="flex items-center gap-4">
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
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index}>
                    <div className="flex items-start space-x-4">
                      <Skeleton className="h-8 w-8 rounded-lg" /> {/* Icon */}
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-2" />{" "}
                        {/* Forum text */}
                        <div className="flex items-center gap-4">
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
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {Array.from({ length: 4 }).map((_, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="h-9 w-9 rounded-lg" />{" "}
                      {/* Achievement icon */}
                      <div className="flex-1">
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
