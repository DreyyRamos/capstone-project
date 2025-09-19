import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ForumTopicLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32" />

      {/* Topic Header Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Skeleton className="h-5 w-16 rounded-full" /> {/* Badge */}
              <Skeleton className="h-4 w-20" /> {/* Views */}
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <Skeleton className="h-4 w-12" /> {/* Tags label */}
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-9 w-3/4" /> {/* Topic title */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
                <div className="space-y-1">
                  <Skeleton className="h-4 w-32" /> {/* Author name */}
                  <Skeleton className="h-4 w-20" /> {/* Role */}
                  <Skeleton className="h-4 w-36" /> {/* Date */}
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Skeleton className="h-8 w-16" /> {/* Like button */}
                <Skeleton className="h-8 w-20" /> {/* Share button */}
                <Skeleton className="h-8 w-8" /> {/* Flag button */}
              </div>
            </div>
            <div className="pt-4">
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div className="flex items-center gap-4">
              <Skeleton className="h-4 w-20" /> {/* Replies count */}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies Section Header */}
      <Skeleton className="h-6 w-32" />

      {/* Reply Cards Skeleton */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <Skeleton className="h-10 w-10 rounded-full" /> {/* Avatar */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="space-y-1">
                        <Skeleton className="h-4 w-32" /> {/* Name */}
                        <div className="flex items-center gap-2">
                          <Skeleton className="h-4 w-16 rounded-full" />{" "}
                          {/* Role badge */}
                          <Skeleton className="h-4 w-12 rounded-full" />{" "}
                          {/* Helpful badge */}
                        </div>
                        <Skeleton className="h-4 w-28" /> {/* Date */}
                      </div>
                      <Skeleton className="h-8 w-8" /> {/* More menu */}
                    </div>

                    <div className="space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>

                    <div className="flex items-center gap-4">
                      <Skeleton className="h-8 w-16" /> {/* Like button */}
                      <Skeleton className="h-8 w-16" /> {/* Dislike button */}
                      <Skeleton className="h-8 w-14" /> {/* Reply button */}
                      <Skeleton className="h-8 w-8" /> {/* Flag button */}
                    </div>
                  </div>
                </div>

                {/* Nested replies skeleton */}
                {index < 2 && (
                  <div className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                    {Array.from({ length: 2 }).map((_, replyIndex) => (
                      <div key={replyIndex} className="flex items-start gap-4">
                        <Skeleton className="h-8 w-8 rounded-full" />{" "}
                        {/* Avatar */}
                        <div className="flex-1 space-y-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Skeleton className="h-4 w-24" /> {/* Name */}
                              <Skeleton className="h-4 w-12 rounded-full" />{" "}
                              {/* Role */}
                              <Skeleton className="h-4 w-20" /> {/* Date */}
                            </div>
                            <Skeleton className="h-6 w-6" /> {/* More menu */}
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div className="flex items-center gap-4">
                            <Skeleton className="h-6 w-12" /> {/* Like */}
                            <Skeleton className="h-6 w-12" /> {/* Dislike */}
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
                                      <Skeleton className="h-4 w-20" />
                                      <Skeleton className="h-4 w-10 rounded-full" />
                                      <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-6 w-6" />
                                  </div>
                                  <Skeleton className="h-4 w-full" />
                                  <Skeleton className="h-4 w-1/2" />
                                  <div className="flex items-center gap-4">
                                    <Skeleton className="h-6 w-10" />
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

      {/* Reply Form Skeleton */}
      <Card>
        <CardContent className="p-6">
          <Skeleton className="h-6 w-32 mb-4" /> {/* Form title */}
          <div className="space-y-4">
            <Skeleton className="h-24 w-full" /> {/* Textarea */}
            <div className="flex items-center justify-between">
              <Skeleton className="h-4 w-80" /> {/* Helper text */}
              <div className="flex gap-2">
                <Skeleton className="h-10 w-16" /> {/* Cancel button */}
                <Skeleton className="h-10 w-24" /> {/* Submit button */}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
