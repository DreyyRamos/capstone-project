import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CreateForumTopicLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center gap-4">
        <Skeleton className="h-10 w-32" /> {/* Back button */}
        <div>
          <Skeleton className="h-9 w-56 mb-2" /> {/* Title */}
          <Skeleton className="h-5 w-80" /> {/* Description */}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32 mb-2" /> {/* Card title */}
              <Skeleton className="h-4 w-96" /> {/* Card description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-24" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Input */}
                <Skeleton className="h-4 w-80" /> {/* Helper text */}
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-64 w-full" /> {/* Textarea */}
                <Skeleton className="h-4 w-full" /> {/* Helper text */}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Topic Settings Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" /> {/* Card title */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" /> {/* Label */}
                <Skeleton className="h-10 w-full" /> {/* Select */}
                <Skeleton className="h-4 w-72" /> {/* Helper text */}
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-16 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-48" /> {/* Description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" /> {/* Input */}
                <Skeleton className="h-10 w-16" /> {/* Add button */}
              </div>
              {/* Sample tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
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
              <Skeleton className="h-10 w-full" /> {/* Submit button */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
