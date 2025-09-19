// app/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { BookOpen, MessageSquare, Users, Calendar } from "lucide-react";

export default function HomePageLoading() {
  return (
    <div className="space-y-8 animate-pulse">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg p-8">
        <div className="max-w-4xl">
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-full mb-6" />
          <div className="flex gap-4">
            <Button disabled size="lg" variant="secondary">
              Browse Publications
            </Button>
            <Button
              disabled
              size="lg"
              variant="outline"
              className="text-white border-white"
            >
              Join Forum
            </Button>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <div className="p-6">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-muted rounded-lg">
                  {i === 0 && (
                    <BookOpen className="h-6 w-6 text-muted-foreground" />
                  )}
                  {i === 1 && (
                    <MessageSquare className="h-6 w-6 text-muted-foreground" />
                  )}
                  {i === 2 && (
                    <Users className="h-6 w-6 text-muted-foreground" />
                  )}
                </div>
                <div>
                  <Skeleton className="h-7 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </div>
          </Card>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Featured Publications */}
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Button disabled variant="outline">
              View All
            </Button>
          </div>
          <div className="space-y-6">
            {[...Array(2)].map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:w-1/3 p-1.5">
                    <Skeleton className="w-full h-48 md:h-full rounded-md" />
                  </div>
                  <div className="md:w-2/3 p-6">
                    <div className="flex items-center gap-2 mb-2">
                      <Skeleton className="h-5 w-16 rounded-full" />
                      <Skeleton className="h-4 w-20" />
                    </div>
                    <Skeleton className="h-6 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-full mb-1" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            <Skeleton className="h-full w-full rounded-full" />
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <Skeleton className="h-4 w-24 mb-1" />
                          <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3 text-muted-foreground" />
                            <Skeleton className="h-3 w-28" />
                          </div>
                        </div>
                      </div>
                      <Button disabled variant="outline" size="sm">
                        Read More
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </section>

        {/* Recent Forum Activity */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <Skeleton className="h-8 w-48" />
            <Button disabled variant="outline">
              View Forum
            </Button>
          </div>
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <Card key={i}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <Skeleton className="h-4 w-16 rounded-full" />
                    <Skeleton className="h-3 w-20" />
                  </div>
                  <Skeleton className="h-4 w-full mb-2" />
                  <div className="flex items-center justify-between text-sm">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16" />
                  </div>
                </div>
              </Card>
            ))}
          </div>

          <Card className="mt-6">
            <div>
              <Skeleton className="h-5 w-32" />
            </div>
            <div className="space-y-3">
              <Button disabled className="w-full" variant="outline">
                Create Publication
              </Button>
              <Button disabled className="w-full" variant="outline">
                Start Discussion
              </Button>
              <Button disabled className="w-full" variant="outline">
                View Profile
              </Button>
            </div>
          </Card>
        </section>
      </div>
    </div>
  );
}
