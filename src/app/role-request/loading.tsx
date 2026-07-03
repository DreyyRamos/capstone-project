// app/admin/role-requests/loading.tsx
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Search,
  UserCog,
  Clock,
  CheckCircle,
  XCircle,
  ArrowRight,
  MoreHorizontal,
  Eye,
  Check,
  X,
  Phone,
  Mail,
  MapPin,
  Calendar,
} from "lucide-react";

export default function RoleRequestsLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="space-y-4 md:space-y-6 p-4 md:p-0 animate-pulse">
      {/* Header */}
      <div id="loading-div-2" data-testId="loading-div-2" className="space-y-2">
        <Skeleton className="h-8 md:h-9 w-64" />
        <Skeleton className="h-4 md:h-5 w-96" />
      </div>

      {/* Statistics Cards */}
      <div id="loading-grid-3" data-testId="loading-grid-3" className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardContent className="p-4 md:pt-6">
              <div id="loading-flex-4" data-testId="loading-flex-4" className="flex items-center space-x-2">
                <Skeleton className="h-4 w-4 md:h-5 md:w-5" />
                <div id="loading-div-5" data-testId="loading-div-5" className="min-w-0">
                  <Skeleton className="h-6 md:h-7 w-12 mb-1" />
                  <Skeleton className="h-3 md:h-4 w-24" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="p-4 md:pt-6">
          <div id="loading-div-6" data-testId="loading-div-6" className="space-y-3 md:space-y-0 md:flex md:flex-row md:gap-4">
            <div id="loading-div-7" data-testId="loading-div-7" className="flex-1">
              <div id="loading-div-8" data-testId="loading-div-8" className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  disabled
                  placeholder="Search by name, email, or role..."
                  className="pl-10 text-sm"
                />
              </div>
            </div>
            <div id="loading-grid-9" data-testId="loading-grid-9" className="grid grid-cols-2 gap-2 md:flex md:gap-4">
              <Select disabled>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                </SelectContent>
              </Select>
              <Select disabled>
                <SelectTrigger className="w-full md:w-[140px]">
                  <SelectValue placeholder="Role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Requests List */}
      <Card>
        <CardHeader className="p-4 md:p-6">
          <Skeleton className="h-6 md:h-7 w-48" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>
        <CardContent className="p-4 md:p-6 pt-0">
          <div id="loading-div-10" data-testId="loading-div-10" className="space-y-3 md:space-y-4">
            {/* Mobile Skeletons */}
            {[...Array(3)].map((_, i) => (
              <div id="loading-div-11" data-testId="loading-div-11"
                key={`mobile-${i}`}
                className="block md:hidden border rounded-lg p-3 space-y-3"
              >
                <div id="loading-flex-12" data-testId="loading-flex-12" className="flex items-start space-x-3">
                  <Skeleton className="h-10 w-10 rounded-full flex-shrink-0" />
                  <div id="loading-div-13" data-testId="loading-div-13" className="flex-1 min-w-0">
                    <div id="loading-flex-14" data-testId="loading-flex-14" className="flex items-center gap-2 mb-1">
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-16 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-48 mb-2" />
                    <div id="loading-flex-15" data-testId="loading-flex-15" className="flex items-center gap-1 mb-2">
                      <Skeleton className="h-4 w-12 rounded-full" />
                      <Skeleton className="h-3 w-3" />
                      <Skeleton className="h-4 w-12 rounded-full" />
                    </div>
                    <Skeleton className="h-3 w-24" />
                  </div>
                </div>
                <div id="loading-div-16" data-testId="loading-div-16" className="pl-0">
                  <Skeleton className="h-3 w-full mb-1" />
                  <Skeleton className="h-3 w-4/5" />
                </div>
                <div id="loading-flex-17" data-testId="loading-flex-17" className="flex items-center justify-between pt-2 border-t">
                  <div id="loading-flex-18" data-testId="loading-flex-18" className="flex gap-2 flex-1">
                    <Skeleton className="h-8 flex-1" />
                    <Skeleton className="h-8 flex-1" />
                  </div>
                  <Skeleton className="h-8 w-8 ml-2" />
                </div>
              </div>
            ))}

            {/* Desktop Skeletons */}
            {[...Array(3)].map((_, i) => (
              <div id="loading-div-19" data-testId="loading-div-19"
                key={`desktop-${i}`}
                className="hidden md:block border rounded-lg p-4"
              >
                <div id="loading-flex-20" data-testId="loading-flex-20" className="flex items-center justify-between">
                  <div id="loading-flex-21" data-testId="loading-flex-21" className="flex items-center space-x-4 flex-1">
                    <Skeleton className="h-12 w-12 rounded-full" />
                    <div id="loading-div-22" data-testId="loading-div-22" className="flex-1 min-w-0">
                      <div id="loading-flex-23" data-testId="loading-flex-23" className="flex items-center gap-2 mb-1">
                        <Skeleton className="h-5 w-40" />
                        <Skeleton className="h-5 w-20 rounded-full" />
                      </div>
                      <Skeleton className="h-4 w-56 mb-2" />
                      <div id="loading-flex-24" data-testId="loading-flex-24" className="flex items-center gap-2">
                        <Skeleton className="h-5 w-16 rounded-full" />
                        <Skeleton className="h-4 w-4" />
                        <Skeleton className="h-5 w-16 rounded-full" />
                      </div>
                    </div>
                  </div>
                  <div id="loading-flex-25" data-testId="loading-flex-25" className="flex items-center gap-2">
                    <Skeleton className="h-4 w-24 mr-4" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-20" />
                    <Skeleton className="h-8 w-8" />
                  </div>
                </div>
                <div id="loading-div-26" data-testId="loading-div-26" className="mt-3 pl-16">
                  <Skeleton className="h-4 w-full mb-1" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}

            {/* Empty State Skeleton */}
            <div id="loading-div-27" data-testId="loading-div-27" className="text-center py-8 md:py-12">
              <UserCog className="h-8 w-8 md:h-12 md:w-12 text-muted-foreground mx-auto mb-4" />
              <Skeleton className="h-5 w-48 mx-auto mb-2" />
              <Skeleton className="h-4 w-64 mx-auto" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
