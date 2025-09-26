"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import {
  Megaphone,
  ArrowLeft,
  Save,
  Send,
  Eye,
  AlertTriangle,
  Info,
  CheckCircle,
  Users,
  GraduationCap,
  Edit,
  Shield,
  Crown,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const priorityOptions = [
  {
    value: "normal",
    label: "Normal",
    description: "Standard announcement",
    icon: CheckCircle,
    color: "text-blue-600",
  },
  {
    value: "important",
    label: "Important",
    description: "Requires attention",
    icon: Info,
    color: "text-orange-600",
  },
  {
    value: "urgent",
    label: "Urgent",
    description: "Immediate action required",
    icon: AlertTriangle,
    color: "text-red-600",
  },
];

const audienceOptions = [
  {
    value: "all",
    label: "All Users",
    description: "Everyone in the system",
    icon: Users,
    color: "text-gray-600",
  },
  {
    value: "students",
    label: "Students",
    description: "Student role only",
    icon: GraduationCap,
    color: "text-green-600",
  },
  {
    value: "editors",
    label: "Editors",
    description: "Editor role only",
    icon: Edit,
    color: "text-blue-600",
  },
  {
    value: "moderators",
    label: "Moderators",
    description: "Moderator role only",
    icon: Shield,
    color: "text-purple-600",
  },
  {
    value: "admins",
    label: "Admins",
    description: "Admin role only",
    icon: Crown,
    color: "text-red-600",
  },
];

export default function CreateAnnouncementPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    priority: "normal",
    targetAudience: "all",
    publishImmediately: true,
    sendNotification: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsLoading(false);
    // Show success message and redirect
    router.push("/announcements");
  };

  const handlePublish = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsLoading(false);
    // Show success message and redirect
    router.push("/announcements");
  };

  const selectedPriority = priorityOptions.find(
    (p) => p.value === formData.priority
  );
  const selectedAudience = audienceOptions.find(
    (a) => a.value === formData.targetAudience
  );

  const isFormValid = formData.title.trim() && formData.content.trim();

  return (
    <div className="container mx-auto px-6 py-8 max-w-4xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link href="/announcements">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <Megaphone className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">Create Announcement</h1>
            <p className="text-muted-foreground">
              Share important information with your community
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
              <CardDescription>
                Enter the main details of your announcement
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  placeholder="Enter announcement title..."
                  value={formData.title}
                  onChange={(e) => handleInputChange("title", e.target.value)}
                  className="text-lg"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="content">Content *</Label>
                <Textarea
                  id="content"
                  placeholder="Write your announcement content here..."
                  value={formData.content}
                  onChange={(e) => handleInputChange("content", e.target.value)}
                  rows={8}
                  className="resize-none"
                />
                <p className="text-sm text-muted-foreground">
                  {formData.content.length} characters
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Announcement Settings</CardTitle>
              <CardDescription>
                Configure priority, audience, and publishing options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Priority Selection */}
              <div className="space-y-3">
                <Label>Priority Level</Label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {priorityOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.priority === option.value;

                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() =>
                          handleInputChange("priority", option.value)
                        }
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={cn("h-4 w-4", option.color)} />
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Audience Selection */}
              <div className="space-y-3">
                <Label>Target Audience</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {audienceOptions.map((option) => {
                    const Icon = option.icon;
                    const isSelected = formData.targetAudience === option.value;

                    return (
                      <div
                        key={option.value}
                        className={cn(
                          "p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md",
                          isSelected
                            ? "border-primary bg-primary/5 shadow-sm"
                            : "border-border hover:border-primary/50"
                        )}
                        onClick={() =>
                          handleInputChange("targetAudience", option.value)
                        }
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <Icon className={cn("h-4 w-4", option.color)} />
                          <span className="font-medium">{option.label}</span>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {option.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              <Separator />

              {/* Publishing Options */}
              <div className="space-y-4">
                <Label>Publishing Options</Label>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Publish Immediately</div>
                    <div className="text-sm text-muted-foreground">
                      Make this announcement visible right away
                    </div>
                  </div>
                  <Switch
                    checked={formData.publishImmediately}
                    onCheckedChange={(checked) =>
                      handleInputChange("publishImmediately", checked)
                    }
                  />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="space-y-1">
                    <div className="font-medium">Send Notification</div>
                    <div className="text-sm text-muted-foreground">
                      Notify users about this announcement
                    </div>
                  </div>
                  <Switch
                    checked={formData.sendNotification}
                    onCheckedChange={(checked) =>
                      handleInputChange("sendNotification", checked)
                    }
                  />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Preview Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                Preview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {formData.title || formData.content ? (
                <div className="space-y-3">
                  <div>
                    <h3 className="font-semibold text-lg">
                      {formData.title || "Untitled Announcement"}
                    </h3>
                    <div className="flex gap-2 mt-2">
                      {selectedPriority && (
                        <Badge
                          variant="outline"
                          className={cn(
                            selectedPriority.value === "urgent" &&
                              "bg-red-100 text-red-800 border-red-200",
                            selectedPriority.value === "important" &&
                              "bg-orange-100 text-orange-800 border-orange-200",
                            selectedPriority.value === "normal" &&
                              "bg-blue-100 text-blue-800 border-blue-200"
                          )}
                        >
                          {selectedPriority.label}
                        </Badge>
                      )}
                      {selectedAudience && (
                        <Badge
                          variant="outline"
                          className="bg-gray-100 text-gray-800"
                        >
                          {selectedAudience.label}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {formData.content || "No content yet..."}
                  </p>
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <Megaphone className="h-8 w-8 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Start typing to see preview</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                onClick={handleSaveDraft}
                disabled={!isFormValid || isLoading}
                variant="outline"
                className="w-full bg-transparent"
              >
                <Save className="h-4 w-4 mr-2" />
                {isLoading ? "Saving..." : "Save as Draft"}
              </Button>

              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    disabled={!isFormValid || isLoading}
                    className="w-full"
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {formData.publishImmediately ? "Publish Now" : "Schedule"}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Publication</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to{" "}
                      {formData.publishImmediately ? "publish" : "schedule"}{" "}
                      this announcement?
                      {formData.sendNotification && " Users will be notified."}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handlePublish}>
                      {formData.publishImmediately ? "Publish" : "Schedule"}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground text-center">
                  {!isFormValid && "Please fill in all required fields"}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card>
            <CardHeader>
              <CardTitle className="text-sm">💡 Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>• Keep titles clear and concise</p>
              <p>• Use urgent priority sparingly</p>
              <p>• Target specific audiences when possible</p>
              <p>• Preview before publishing</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
