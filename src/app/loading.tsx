// app/dashboard/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Mail,
  Phone,
  MapPin,
  Calendar,
  MessageSquare,
  Trophy,
  Star,
  FileText,
  Users,
  Award,
  BookOpen,
  TrendingUp,
  ArrowRight,
  Clock,
  Heart,
  MessageCircle,
} from "lucide-react";

export default function DashboardLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-8 animate-pulse">
      {/* Hero Section */}
      <div id="loading-div-2" data-testId="loading-div-2" className="relative overflow-hidden rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
        <div id="loading-div-3" data-testId="loading-div-3" className="relative z-10">
          <Skeleton className="h-10 w-96 mb-4" />
          <Skeleton className="h-6 w-full mb-6" />
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex gap-4">
            <Button disabled size="lg" variant="secondary">
              Browse Publications
            </Button>
            <Button
              disabled
              size="lg"
              variant="outline"
              className="border-white text-white"
            >
              Join Forum
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[...Array(3)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-6">
              <div id="loading-flex-5" data-testId="loading-flex-5" className="flex items-center gap-4">
                <div id="loading-div-6" data-testId="loading-div-6" className="p-3 bg-muted rounded-lg">
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
                <div id="loading-div-7" data-testId="loading-div-7">
                  <Skeleton className="h-7 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </section>

      <div id="loading-grid-8" data-testId="loading-grid-8" className="grid gap-6 lg:grid-cols-2">
        {/* Featured Publications */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div id="loading-div-9" data-testId="loading-div-9">
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-4 w-64" />
            </div>
            <Button disabled variant="outline" size="sm">
              View All
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div id="loading-flex-10" data-testId="loading-flex-10"
                key={i}
                className="flex items-start space-x-3 p-3 rounded-lg"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    <Skeleton className="h-full w-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div id="loading-div-11" data-testId="loading-div-11" className="flex-1 min-w-0 overflow-hidden">
                  <Skeleton className="h-4 w-full mb-1" />
                  <div id="loading-flex-12" data-testId="loading-flex-12" className="flex items-center gap-2 mt-1 flex-wrap">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16 rounded-full" />
                  </div>
                  <div id="loading-flex-13" data-testId="loading-flex-13" className="flex items-center gap-4 mt-2 flex-wrap">
                    <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                    <div id="loading-flex-15" data-testId="loading-flex-15" className="flex items-center gap-1 flex-shrink-0">
                      <MessageCircle className="h-3 w-3 text-muted-foreground" />
                      <Skeleton className="h-3 w-6" />
                    </div>
                    <div id="loading-flex-16" data-testId="loading-flex-16" className="flex items-center gap-1 flex-shrink-0">
                      <Heart className="h-3 w-3 text-muted-foreground" />
                      <Skeleton className="h-3 w-6" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Recent Forum Activity */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div id="loading-div-17" data-testId="loading-div-17">
              <Skeleton className="h-6 w-48 mb-1" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Button disabled variant="outline" size="sm">
              View Forums
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </CardHeader>
          <CardContent className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div id="loading-flex-18" data-testId="loading-flex-18"
                key={i}
                className="flex items-start space-x-3 p-3 rounded-lg"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback>
                    <Skeleton className="h-full w-full rounded-full" />
                  </AvatarFallback>
                </Avatar>
                <div id="loading-div-19" data-testId="loading-div-19" className="flex-1 min-w-0 overflow-hidden">
                  <Skeleton className="h-4 w-full mb-1" />
                  <div id="loading-flex-20" data-testId="loading-flex-20" className="flex items-center gap-2 mt-1 flex-wrap">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-3 w-16 rounded-full" />
                  </div>
                  <div id="loading-flex-21" data-testId="loading-flex-21" className="flex items-center gap-4 mt-2 flex-wrap">
                    <div id="loading-flex-22" data-testId="loading-flex-22" className="flex items-center gap-1 flex-shrink-0">
                      <MessageCircle className="h-3 w-3 text-muted-foreground" />
                      <Skeleton className="h-3 w-12" />
                    </div>
                    <div id="loading-flex-23" data-testId="loading-flex-23" className="flex items-center gap-1 flex-shrink-0">
                      <Clock className="h-3 w-3 text-muted-foreground" />
                      <Skeleton className="h-3 w-28" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-24 mb-1" />
          <Skeleton className="h-4 w-48" />
        </CardHeader>
        <CardContent>
          <div id="loading-grid-24" data-testId="loading-grid-24" className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(3)].map((_, i) => (
              <Button
                key={i}
                disabled
                variant="outline"
                className="h-20 flex-col gap-2 bg-transparent"
              >
                {i === 0 && <BookOpen className="h-6 w-6" />}
                {i === 1 && <MessageSquare className="h-6 w-6" />}
                {i === 2 && <Users className="h-6 w-6" />}
                <span className="text-xs">
                  {i === 0 && "Create Publication"}
                  {i === 1 && "Start Discussion"}
                  {i === 2 && "Edit Profile"}
                </span>
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
