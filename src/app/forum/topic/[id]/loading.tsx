import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function ForumTopicLoading() {
  return (
    <div
      id="loading-div-1"
      data-testId="loading-div-1"
      className="max-w-4xl mx-auto space-y-6"
    >
      {/* Back Button Skeleton */}
      <Skeleton className="h-10 w-32" />

      {/* Topic Header Skeleton */}
      <Card>
        <CardContent className="p-6">
          <div
            id="loading-div-2"
            data-testId="loading-div-2"
            className="space-y-4"
          >
            <div
              id="loading-flex-3"
              data-testId="loading-flex-3"
              className="flex items-center gap-2"
            >
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div
              id="loading-flex-4"
              data-testId="loading-flex-4"
              className="flex items-center gap-2 flex-wrap"
            >
              <Skeleton className="h-4 w-12" />
              <Skeleton className="h-5 w-16 rounded-full" />
              <Skeleton className="h-5 w-20 rounded-full" />
              <Skeleton className="h-5 w-14 rounded-full" />
            </div>
            <Skeleton className="h-9 w-3/4" />
            <div
              id="loading-flex-5"
              data-testId="loading-flex-5"
              className="flex items-center justify-between"
            >
              <div
                id="loading-flex-6"
                data-testId="loading-flex-6"
                className="flex items-center gap-3"
              >
                <Skeleton className="h-10 w-10 rounded-full" />
                <div
                  id="loading-div-7"
                  data-testId="loading-div-7"
                  className="space-y-1"
                >
                  <Skeleton className="h-4 w-32" />
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>

              <div
                id="loading-flex-8"
                data-testId="loading-flex-8"
                className="flex items-center gap-2"
              >
                <Skeleton className="h-8 w-16" />
                <Skeleton className="h-8 w-20" />
                <Skeleton className="h-8 w-8" />
              </div>
            </div>
            <div
              id="loading-div-9"
              data-testId="loading-div-9"
              className="pt-4"
            >
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-full mb-2" />
              <Skeleton className="h-4 w-3/4" />
            </div>
            <div
              id="loading-flex-10"
              data-testId="loading-flex-10"
              className="flex items-center gap-4"
            >
              <Skeleton className="h-4 w-20" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Replies Section Header */}
      <Skeleton className="h-6 w-32" />

      {/* Reply Cards Skeleton */}
      <div
        id="loading-div-11"
        data-testId="loading-div-11"
        className="space-y-4"
      >
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div
                id="loading-div-12"
                data-testId="loading-div-12"
                className="space-y-4"
              >
                <div
                  id="loading-flex-13"
                  data-testId="loading-flex-13"
                  className="flex items-start gap-4"
                >
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <div
                    id="loading-div-14"
                    data-testId="loading-div-14"
                    className="flex-1 space-y-3"
                  >
                    <div
                      id="loading-flex-15"
                      data-testId="loading-flex-15"
                      className="flex items-center justify-between"
                    >
                      <div
                        id="loading-div-16"
                        data-testId="loading-div-16"
                        className="space-y-1"
                      >
                        <Skeleton className="h-4 w-32" />
                        <div
                          id="loading-flex-17"
                          data-testId="loading-flex-17"
                          className="flex items-center gap-2"
                        >
                          <Skeleton className="h-4 w-16 rounded-full" />{" "}
                          <Skeleton className="h-4 w-12 rounded-full" />{" "}
                        </div>
                        <Skeleton className="h-4 w-28" />
                      </div>
                      <Skeleton className="h-8 w-8" />
                    </div>

                    <div
                      id="loading-div-18"
                      data-testId="loading-div-18"
                      className="space-y-2"
                    >
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-4 w-2/3" />
                    </div>

                    <div
                      id="loading-flex-19"
                      data-testId="loading-flex-19"
                      className="flex items-center gap-4"
                    >
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-16" />
                      <Skeleton className="h-8 w-14" />
                      <Skeleton className="h-8 w-8" />
                    </div>
                  </div>
                </div>

                {/* Nested replies skeleton */}
                {index < 2 && (
                  <div
                    id="loading-div-20"
                    data-testId="loading-div-20"
                    className="ml-14 space-y-4 border-l-2 border-muted pl-4"
                  >
                    {Array.from({ length: 2 }).map((_, replyIndex) => (
                      <div
                        id="loading-flex-21"
                        data-testId="loading-flex-21"
                        key={replyIndex}
                        className="flex items-start gap-4"
                      >
                        <Skeleton className="h-8 w-8 rounded-full" />{" "}
                        <div
                          id="loading-div-22"
                          data-testId="loading-div-22"
                          className="flex-1 space-y-2"
                        >
                          <div
                            id="loading-flex-23"
                            data-testId="loading-flex-23"
                            className="flex items-center justify-between"
                          >
                            <div
                              id="loading-flex-24"
                              data-testId="loading-flex-24"
                              className="flex items-center gap-2"
                            >
                              <Skeleton className="h-4 w-24" />
                              <Skeleton className="h-4 w-12 rounded-full" />{" "}
                              <Skeleton className="h-4 w-20" />
                            </div>
                            <Skeleton className="h-6 w-6" />
                          </div>
                          <Skeleton className="h-4 w-full" />
                          <Skeleton className="h-4 w-3/4" />
                          <div
                            id="loading-flex-25"
                            data-testId="loading-flex-25"
                            className="flex items-center gap-4"
                          >
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-12" />
                            <Skeleton className="h-6 w-6" />
                          </div>

                          {/* Third level replies skeleton */}
                          {replyIndex === 0 && (
                            <div
                              id="loading-div-26"
                              data-testId="loading-div-26"
                              className="ml-6 space-y-4 border-l-2 border-muted pl-4 mt-4"
                            >
                              <div
                                id="loading-flex-27"
                                data-testId="loading-flex-27"
                                className="flex items-start gap-4"
                              >
                                <Skeleton className="h-8 w-8 rounded-full" />
                                <div
                                  id="loading-div-28"
                                  data-testId="loading-div-28"
                                  className="flex-1 space-y-2"
                                >
                                  <div
                                    id="loading-flex-29"
                                    data-testId="loading-flex-29"
                                    className="flex items-center justify-between"
                                  >
                                    <div
                                      id="loading-flex-30"
                                      data-testId="loading-flex-30"
                                      className="flex items-center gap-2"
                                    >
                                      <Skeleton className="h-4 w-20" />
                                      <Skeleton className="h-4 w-10 rounded-full" />
                                      <Skeleton className="h-4 w-16" />
                                    </div>
                                    <Skeleton className="h-6 w-6" />
                                  </div>
                                  <Skeleton className="h-4 w-full" />
                                  <Skeleton className="h-4 w-1/2" />
                                  <div
                                    id="loading-flex-31"
                                    data-testId="loading-flex-31"
                                    className="flex items-center gap-4"
                                  >
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
          <Skeleton className="h-6 w-32 mb-4" />
          <div
            id="loading-div-32"
            data-testId="loading-div-32"
            className="space-y-4"
          >
            <Skeleton className="h-24 w-full" />
            <div
              id="loading-flex-33"
              data-testId="loading-flex-33"
              className="flex items-center justify-between"
            >
              <Skeleton className="h-4 w-80" />
              <div
                id="loading-flex-34"
                data-testId="loading-flex-34"
                className="flex gap-2"
              >
                <Skeleton className="h-10 w-16" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
