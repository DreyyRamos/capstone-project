import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function CreatePublicationLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="h-10 w-20" /> {/* Back button */}
          <div>
            <Skeleton className="h-9 w-48 mb-2" /> {/* Title */}
            <Skeleton className="h-5 w-96" /> {/* Description */}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content Skeleton */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-40 mb-2" /> {/* Card title */}
              <Skeleton className="h-4 w-64" /> {/* Card description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" /> {/* Title label */}
                <Skeleton className="h-10 w-full" /> {/* Title input */}
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" /> {/* Excerpt label */}
                <Skeleton className="h-20 w-full" /> {/* Excerpt textarea */}
                <Skeleton className="h-4 w-80" /> {/* Helper text */}
              </div>
            </CardContent>
          </Card>

          {/* Cover Image Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-28 mb-2" /> {/* Card title */}
              <Skeleton className="h-4 w-56" /> {/* Card description */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-48 w-full rounded-lg" />{" "}
              {/* Image placeholder */}
            </CardContent>
          </Card>

          {/* Content Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-20 mb-2" /> {/* Card title */}
              <Skeleton className="h-4 w-48" /> {/* Card description */}
            </CardHeader>
            <CardContent>
              <Skeleton className="h-80 w-full" /> {/* Rich text editor */}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar Skeleton */}
        <div className="space-y-6">
          {/* Publication Settings Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-44" /> {/* Card title */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Skeleton className="h-4 w-20" /> {/* Category label */}
                <Skeleton className="h-10 w-full" /> {/* Category select */}
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Skeleton className="h-4 w-36" /> {/* Featured label */}
                  <Skeleton className="h-4 w-48" /> {/* Featured description */}
                </div>
                <Skeleton className="h-6 w-11 rounded-full" /> {/* Switch */}
              </div>
            </CardContent>
          </Card>

          {/* Tags Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-12 mb-2" /> {/* Title */}
              <Skeleton className="h-4 w-64" /> {/* Description */}
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Skeleton className="h-10 flex-1" /> {/* Tag input */}
                <Skeleton className="h-10 w-16" /> {/* Add button */}
              </div>

              {/* Existing tags skeleton */}
              <div className="flex flex-wrap gap-2">
                <Skeleton className="h-6 w-16 rounded-full" />
                <Skeleton className="h-6 w-20 rounded-full" />
                <Skeleton className="h-6 w-14 rounded-full" />
                <Skeleton className="h-6 w-18 rounded-full" />
                <Skeleton className="h-6 w-22 rounded-full" />
              </div>
            </CardContent>
          </Card>

          {/* Actions Card */}
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-16" /> {/* Card title */}
            </CardHeader>
            <CardContent className="space-y-2">
              <Skeleton className="h-10 w-full" /> {/* Update button */}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
