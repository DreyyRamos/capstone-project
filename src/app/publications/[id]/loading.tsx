import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PublicationDetailLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-44" />

      <article className="space-y-6">
        <div className="space-y-4">
          {/* Tags Skeleton */}
          <div className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-18 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-12 w-full" />

          {/* Author and Actions Skeleton */}
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
              <div>
                <Skeleton className="h-4 w-32 mb-1" /> {/* Author name */}
                <Skeleton className="h-4 w-20 mb-1" /> {/* Role */}
                <Skeleton className="h-4 w-28" /> {/* Date */}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Skeleton className="h-8 w-16" /> {/* Like button */}
              <Skeleton className="h-8 w-8" /> {/* Star button */}
              <Skeleton className="h-8 w-8" /> {/* Flag button */}
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <Skeleton className="h-80 w-full rounded-lg" />

        {/* Content Skeleton */}
        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Stats Bar Skeleton */}
        <div className="flex items-center justify-between pt-6 border-t">
          <div className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" /> {/* Likes count */}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div className="space-y-6">
        {/* Comment Form Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <Skeleton className="h-20 w-full" /> {/* Textarea */}
              <div className="flex items-center justify-between">
                <Skeleton className="h-4 w-80" /> {/* Helper text */}
                <Skeleton className="h-10 w-32" /> {/* Post button */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List Skeleton */}
        <div className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />{" "}
                    {/* Avatar */}
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-24" /> {/* Name */}
                          <Skeleton className="h-4 w-16 rounded-full" />{" "}
                          {/* Role badge */}
                          <Skeleton className="h-4 w-20" /> {/* Date */}
                        </div>
                        <Skeleton className="h-8 w-8" /> {/* More menu */}
                      </div>

                      <div className="space-y-2">
                        <Skeleton className="h-4 w-full" />{" "}
                        {/* Comment content */}
                        <Skeleton className="h-4 w-3/4" />
                      </div>

                      <div className="flex items-center gap-4">
                        <Skeleton className="h-8 w-16" /> {/* Like button */}
                        <Skeleton className="h-8 w-14" /> {/* Reply button */}
                        <Skeleton className="h-8 w-8" /> {/* Flag button */}
                      </div>
                    </div>
                  </div>

                  {/* Nested replies skeleton */}
                  {index < 2 && (
                    <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                      {Array.from({ length: 2 }).map((_, replyIndex) => (
                        <div
                          key={replyIndex}
                          className="flex items-start gap-4"
                        >
                          <Skeleton className="h-8 w-8 rounded-full" />{" "}
                          {/* Avatar */}
                          <div className="flex-1 space-y-2">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-20" /> {/* Name */}
                                <Skeleton className="h-4 w-12 rounded-full" />{" "}
                                {/* Role */}
                                <Skeleton className="h-3 w-16" /> {/* Date */}
                              </div>
                              <Skeleton className="h-6 w-6" /> {/* More menu */}
                            </div>
                            <Skeleton className="h-4 w-full" />{" "}
                            {/* Reply content */}
                            <Skeleton className="h-4 w-2/3" />
                            <div className="flex items-center gap-4">
                              <Skeleton className="h-6 w-12" /> {/* Like */}
                              <Skeleton className="h-6 w-12" /> {/* Reply */}
                              <Skeleton className="h-6 w-6" /> {/* Flag */}
                            </div>
                            {/* Third level replies skeleton */}
                            {replyIndex === 0 && (
                              <div className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4">
                                <div className="flex items-start gap-4">
                                  <Skeleton className="h-8 w-8 rounded-full" />
                                  <div className="flex-1 space-y-2">
                                    <div className="flex items-center justify-between">
                                      <div className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-18" />
                                        <Skeleton className="h-4 w-10 rounded-full" />
                                        <Skeleton className="h-3 w-14" />
                                      </div>
                                      <Skeleton className="h-6 w-6" />
                                    </div>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <div className="flex items-center gap-4">
                                      <Skeleton className="h-6 w-10" />
                                      <Skeleton className="h-6 w-6" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Load More Button Skeleton */}
        <div className="text-center">
          <Skeleton className="h-10 w-36 mx-auto" />
        </div>
      </div>
    </div>
  );
}
