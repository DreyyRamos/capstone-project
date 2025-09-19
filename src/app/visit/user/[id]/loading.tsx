// app/visit/user/[id]/loading.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
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
} from "lucide-react";

export default function ProfilePageLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-pulse">
      {/* Profile Header */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex flex-col items-center space-y-4">
              <Avatar className="h-32 w-32">
                <AvatarFallback className="text-2xl">
                  <Skeleton className="h-full w-full rounded-full" />
                </AvatarFallback>
              </Avatar>
              <Skeleton className="h-5 w-20 rounded-full" />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex items-center justify-between">
                <Skeleton className="h-8 w-64" />
              </div>

              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-5/6" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-48" />
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-32" />
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-40" />
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <Skeleton className="h-4 w-36" />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {[...Array(4)].map((_, i) => (
                  <Skeleton key={i} className="h-5 w-16 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="pt-6">
              <div className="flex items-center space-x-2">
                <div className="p-2 bg-muted rounded-lg">
                  {i === 0 && <FileText className="h-5 w-5 text-blue-600" />}
                  {i === 1 && (
                    <MessageSquare className="h-5 w-5 text-green-600" />
                  )}
                  {i === 2 && <Star className="h-5 w-5 text-yellow-600" />}
                  {i === 3 && <Trophy className="h-5 w-5 text-purple-600" />}
                </div>
                <div>
                  <Skeleton className="h-7 w-12 mb-1" />
                  <Skeleton className="h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tabbed Content */}
      <Tabs defaultValue="activity" className="space-y-4">
        <TabsList>
          <TabsTrigger value="activity" disabled>
            Recent Activity
          </TabsTrigger>
          <TabsTrigger value="publications" disabled>
            Publications
          </TabsTrigger>
          <TabsTrigger value="forums" disabled>
            Forums
          </TabsTrigger>
          <TabsTrigger value="achievements" disabled>
            Achievements
          </TabsTrigger>
        </TabsList>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-64" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        {i % 2 === 0 ? (
                          <FileText className="h-4 w-4" />
                        ) : (
                          <MessageSquare className="h-4 w-4" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-1" />
                        <div className="flex items-center gap-4 mt-1">
                          <Skeleton className="h-3 w-16" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                    {i < 2 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="publications" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
              <Skeleton className="h-4 w-48" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <FileText className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-1" />
                        <div className="flex items-center gap-4 mt-1">
                          <Skeleton className="h-3 w-16 rounded-full" />
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                      <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                    {i === 0 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="forums" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-40" />
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[...Array(2)].map((_, i) => (
                  <div key={i}>
                    <div className="flex items-start space-x-4">
                      <div className="p-2 bg-muted rounded-lg">
                        <MessageSquare className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <Skeleton className="h-4 w-full mb-1" />
                        <div className="flex items-center gap-4 mt-1">
                          <Skeleton className="h-3 w-16 rounded-full" />
                          <Skeleton className="h-3 w-24" />
                          <Skeleton className="h-3 w-20" />
                          <Skeleton className="h-3 w-16" />
                        </div>
                      </div>
                    </div>
                    {i === 0 && <Separator className="mt-4" />}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-4">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-4 w-56" />
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="p-4 border rounded-lg">
                    <div className="flex items-start space-x-3">
                      <div className="p-2 rounded-lg bg-gray-100 text-gray-400">
                        <Trophy className="h-5 w-5" />
                      </div>
                      <div className="flex-1">
                        <Skeleton className="h-4 w-32 mb-1" />
                        <Skeleton className="h-3 w-full mb-1" />
                        <Skeleton className="h-3 w-24" />
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
