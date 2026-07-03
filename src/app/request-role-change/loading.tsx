// app/role-request/loading.tsx
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
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserCog, Info, Send } from "lucide-react";

export default function RoleRequestLoading() {
  return (
    <div id="loading-div-1" data-testId="loading-div-1" className="max-w-2xl mx-auto space-y-6 animate-pulse">
      {/* Header */}
      <div id="loading-div-2" data-testId="loading-div-2" className="text-center space-y-2">
        <div id="loading-flex-3" data-testId="loading-flex-3" className="flex items-center justify-center gap-2 mb-4">
          <Skeleton className="h-12 w-12 rounded-lg" />
        </div>
        <Skeleton className="h-9 w-64 mx-auto" />
        <Skeleton className="h-5 w-96 mx-auto" />
      </div>

      {/* Current Role Info */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Info className="h-5 w-5" />
            Current Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div id="loading-flex-4" data-testId="loading-flex-4" className="flex items-center justify-between">
            <div id="loading-div-5" data-testId="loading-div-5" className="space-y-1">
              <Skeleton className="h-5 w-40" />
              <Skeleton className="h-4 w-56" />
            </div>
            <Skeleton className="h-6 w-20 rounded-full" />
          </div>
        </CardContent>
      </Card>

      {/* Request Form */}
      <Card>
        <CardHeader>
          <Skeleton className="h-6 w-48" />
          <Skeleton className="h-4 w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Role Selection */}
          <div id="loading-div-6" data-testId="loading-div-6" className="space-y-2">
            <Label>Requested Role *</Label>
            <Select disabled>
              <SelectTrigger>
                <SelectValue placeholder="Select the role you want to request" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="placeholder">Placeholder</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Reason */}
          <div id="loading-div-7" data-testId="loading-div-7" className="space-y-2">
            <Label>Reason for Role Change *</Label>
            <Textarea
              disabled
              placeholder="Please explain why you want this role change..."
              rows={5}
            />
            <Skeleton className="h-4 w-48 ml-auto" />
          </div>

          {/* Additional Information */}
          <div id="loading-div-8" data-testId="loading-div-8" className="space-y-2">
            <Label>Additional Information</Label>
            <Textarea
              disabled
              placeholder="Any additional information that supports your request (optional)..."
              rows={3}
            />
            <Skeleton className="h-4 w-full" />
          </div>

          {/* Submit Button */}
          <Button id="loading-button-1" data-testId="loading-button-1" className="w-full" disabled>
            <Send className="h-4 w-4 mr-2" />
            Submit Role Change Request
          </Button>
        </CardContent>
      </Card>

      {/* Information Card */}
      <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
        <CardContent className="pt-4">
          <div id="loading-flex-9" data-testId="loading-flex-9" className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
            <div id="loading-div-10" data-testId="loading-div-10" className="space-y-2 flex-1">
              <Skeleton className="h-4 w-40" />
              <div id="loading-div-11" data-testId="loading-div-11" className="space-y-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-3/4" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
