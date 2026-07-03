import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function PublicationDetailLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="max-w-4xl mx-auto space-y-6">
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-44" />

      <article className="space-y-6">
        <div id="loading-div-2" data-testId="loading-div-2" className="space-y-4">
          {/* Tags Skeleton */}
          <div id="loading-flex-3" data-testId="loading-flex-3" className="flex items-center gap-2 flex-wrap">
            <Skeleton className="h-5 w-16 rounded-full" />
            <Skeleton className="h-5 w-20 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-full" />
            <Skeleton className="h-5 w-18 rounded-full" />
          </div>

          {/* Title Skeleton */}
          <Skeleton className="h-12 w-full" />

          {/* Author and Actions Skeleton */}
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex items-center justify-between flex-wrap gap-4">
            <div id="loading-flex-5" data-testId="loading-flex-5" className="flex items-center gap-4">
              <Skeleton className="h-12 w-12 rounded-full" /> {/* Avatar */}
              <div id="loading-div-6" data-testId="loading-div-6">
                <Skeleton className="h-4 w-32 mb-1" /> {/* Author name */}
                <Skeleton className="h-4 w-20 mb-1" /> {/* Role */}
                <Skeleton className="h-4 w-28" /> {/* Date */}
              </div>
            </div>

            <div id="loading-flex-7" data-testId="loading-flex-7" className="flex items-center gap-2">
              <Skeleton className="h-8 w-16" /> {/* Like button */}
              <Skeleton className="h-8 w-8" /> {/* Star button */}
              <Skeleton className="h-8 w-8" /> {/* Flag button */}
            </div>
          </div>
        </div>

        {/* Featured Image Skeleton */}
        <Skeleton className="h-80 w-full rounded-lg" />

        {/* Content Skeleton */}
        <div id="loading-div-8" data-testId="loading-div-8" className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
        </div>

        {/* Stats Bar Skeleton */}
        <div id="loading-flex-9" data-testId="loading-flex-9" className="flex items-center justify-between pt-6 border-t">
          <div id="loading-flex-10" data-testId="loading-flex-10" className="flex items-center gap-4">
            <Skeleton className="h-4 w-16" /> {/* Likes count */}
          </div>
        </div>
      </article>

      {/* Comments Section */}
      <div id="loading-div-11" data-testId="loading-div-11" className="space-y-6">
        {/* Comment Form Skeleton */}
        <Card>
          <CardContent className="p-6">
            <div id="loading-div-12" data-testId="loading-div-12" className="space-y-4">
              <Skeleton className="h-20 w-full" /> {/* Textarea */}
              <div id="loading-flex-13" data-testId="loading-flex-13" className="flex items-center justify-between">
                <Skeleton className="h-4 w-80" /> {/* Helper text */}
                <Skeleton className="h-10 w-32" /> {/* Post button */}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Comments List Skeleton */}
        <div id="loading-div-14" data-testId="loading-div-14" className="space-y-4">
          {Array.from({ length: 3 }).map((_, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div id="loading-div-15" data-testId="loading-div-15" className="space-y-4">
                  <div id="loading-flex-16" data-testId="loading-flex-16" className="flex items-start gap-4">
                    <Skeleton className="h-10 w-10 rounded-full" />{" "}
                    {/* Avatar */}
                    <div id="loading-div-17" data-testId="loading-div-17" className="flex-1 space-y-2">
                      <div id="loading-flex-18" data-testId="loading-flex-18" className="flex items-center justify-between">
                        <div id="loading-flex-19" data-testId="loading-flex-19" className="flex items-center gap-2">
                          <Skeleton className="h-4 w-24" /> {/* Name */}
                          <Skeleton className="h-4 w-16 rounded-full" />{" "}
                          {/* Role badge */}
                          <Skeleton className="h-4 w-20" /> {/* Date */}
                        </div>
                        <Skeleton className="h-8 w-8" /> {/* More menu */}
                      </div>

                      <div id="loading-div-20" data-testId="loading-div-20" className="space-y-2">
                        <Skeleton className="h-4 w-full" />{" "}
                        {/* Comment content */}
                        <Skeleton className="h-4 w-3/4" />
                      </div>

                      <div id="loading-flex-21" data-testId="loading-flex-21" className="flex items-center gap-4">
                        <Skeleton className="h-8 w-16" /> {/* Like button */}
                        <Skeleton className="h-8 w-14" /> {/* Reply button */}
                        <Skeleton className="h-8 w-8" /> {/* Flag button */}
                      </div>
                    </div>
                  </div>

                  {/* Nested replies skeleton */}
                  {index < 2 && (
                    <div id="loading-div-22" data-testId="loading-div-22" className="ml-14 space-y-4 border-l-2 border-muted pl-4">
                      {Array.from({ length: 2 }).map((_, replyIndex) => (
                        <div id="loading-flex-23" data-testId="loading-flex-23"
                          key={replyIndex}
                          className="flex items-start gap-4"
                        >
                          <Skeleton className="h-8 w-8 rounded-full" />{" "}
                          {/* Avatar */}
                          <div id="loading-div-24" data-testId="loading-div-24" className="flex-1 space-y-2">
                            <div id="loading-flex-25" data-testId="loading-flex-25" className="flex items-center justify-between">
                              <div id="loading-flex-26" data-testId="loading-flex-26" className="flex items-center gap-2">
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
                            <div id="loading-flex-27" data-testId="loading-flex-27" className="flex items-center gap-4">
                              <Skeleton className="h-6 w-12" /> {/* Like */}
                              <Skeleton className="h-6 w-12" /> {/* Reply */}
                              <Skeleton className="h-6 w-6" /> {/* Flag */}
                            </div>
                            {/* Third level replies skeleton */}
                            {replyIndex === 0 && (
                              <div id="loading-div-28" data-testId="loading-div-28" className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4">
                                <div id="loading-flex-29" data-testId="loading-flex-29" className="flex items-start gap-4">
                                  <Skeleton className="h-8 w-8 rounded-full" />
                                  <div id="loading-div-30" data-testId="loading-div-30" className="flex-1 space-y-2">
                                    <div id="loading-flex-31" data-testId="loading-flex-31" className="flex items-center justify-between">
                                      <div id="loading-flex-32" data-testId="loading-flex-32" className="flex items-center gap-2">
                                        <Skeleton className="h-4 w-18" />
                                        <Skeleton className="h-4 w-10 rounded-full" />
                                        <Skeleton className="h-3 w-14" />
                                      </div>
                                      <Skeleton className="h-6 w-6" />
                                    </div>
                                    <Skeleton className="h-4 w-full" />
                                    <Skeleton className="h-4 w-1/2" />
                                    <div id="loading-flex-33" data-testId="loading-flex-33" className="flex items-center gap-4">
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
        <div id="loading-div-34" data-testId="loading-div-34" className="text-center">
          <Skeleton className="h-10 w-36 mx-auto" />
        </div>
      </div>
    </div>
  );
}
