import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function UpdateForumTopicLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="max-w-4xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div id="loading-flex-2" data-testId="loading-flex-2" className="flex items-center gap-4">
        <Skeleton className="h-10 w-32" /> {/* Back button */}
        <div id="loading-div-3" data-testId="loading-div-3">
          <Skeleton className="h-9 w-72 mb-2" /> {/* Title */}
          <Skeleton className="h-5 w-96" /> {/* Description */}
        </div>
      </div>

      <div id="loading-grid-4" data-testId="loading-grid-4" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div id="loading-div-5" data-testId="loading-div-5" className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" /> {/* Card title */}
              <Skeleton className="h-4 w-80" /> {/* Card description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div id="loading-div-6" data-testId="loading-div-6" className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
                <Skeleton className="h-4 w-96" /> {/* Helper text */}
              </div>

              <div id="loading-div-7" data-testId="loading-div-7" className="space-y-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-64 w-full" /> {/* Large textarea */}
                <Skeleton className="h-4 w-full" /> {/* Helper text */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div id="loading-div-8" data-testId="loading-div-8" className="space-y-6">
          {/* Topic Settings Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" /> {/* Card title */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div id="loading-div-9" data-testId="loading-div-9" className="space-y-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Select dropdown */}
                <Skeleton className="h-4 w-80" /> {/* Helper text */}
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-16 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-52" /> {/* Description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div id="loading-flex-10" data-testId="loading-flex-10" className="flex gap-2">
                <Skeleton className="h-10 flex-1" /> {/* Tag input */}
                <Skeleton className="h-10 w-16" /> {/* Add button */}
              </div>

              {/* Existing tags skeleton */}
              <div id="loading-flex-11" data-testId="loading-flex-11" className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-24 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
              </div>

              <Skeleton className="h-4 w-64" /> {/* Helper text */}
            </CardContent>
          </Card>

          {/* Guidelines Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-44" /> {/* Title */}
            </CardHeader>
            <CardContent className="space-y-2">
              {Array.from({ length: 5 }).map((_, index) => (
                <Skeleton key={index} className="h-4 w-full" />
              ))}
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardContent className="p-4">
              <Skeleton className="h-10 w-full" /> {/* Update button */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}