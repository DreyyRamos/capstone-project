"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, Save, Eye } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePostQuery } from "@/hooks/usePost";
import { UploadDropzone } from "@/utils/uploadthing";
import Cookies from "js-cookie";
import Tiptap from "@/components/tiptap";
import { useConfirmation } from "@/components/confirmation-provider";
import ContentDisplay from "@/components/content-display";
import CreatePublicationLoading from "./loading";
import { useUserQuery } from "@/hooks/useUser";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";

export default function CreatePublicationPage() {
  const { confirmAction, openModal } = useConfirmation();
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    isFeatured: false,
    category: "",
  });
  const [contentError, setContentError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token") || "";
  const { createPost, isCreating, isLoading } = usePostQuery(token);
  const { data: currentUser } = useUserQuery(token);

  const { StatusModal, checkPost } = useUserStatusCheck(
    currentUser?.userData?.status,
    {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    },
  );

  const categories = [
    "Science",
    "Arts",
    "Sports",
    "Academic",
    "News",
    "Events",
    "Environment",
    "Technology",
    "Health",
    "Community",
  ];

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.content.trim()) {
      setContentError(true);
      toast.error("Content is required.");
      return;
    }

    setContentError(false);

    checkPost(async () => {
      confirmAction(
        "Submit Publication",
        "This publication will be submitted and will be reviewed by editors.",
        () => {
          try {
            createPost(
              {
                ...formData,
                category: formData.category || "Academic",
                tags,
                imageUrl: formData.imageUrl ?? "",
              },
              {
                onSuccess: () => {
                  toast("Publication created and is pending for review!");
                  setIsModalOpen(true);
                  router.push("/publications");
                },
              },
            );
          } catch (error: any) {
            console.error(error);
          }
        },
      );
    });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleContentChange = (richText: string) => {
    setFormData({
      ...formData,
      content: richText, // Set the 'content' field with the new HTML
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  if (isLoading) {
    return <CreatePublicationLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="max-w-4xl mx-auto space-y-6">
      <StatusModal />
      {/* Header */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex items-center justify-between">
        <div id="page-flex-3" data-testId="page-flex-3" className="flex items-center flex-wrap gap-4">
          <Button asChild variant="ghost">
            <Link href="/publications">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div id="page-div-4" data-testId="page-div-4">
            <h1 className="text-3xl font-bold">Create Publication</h1>
            <p className="text-muted-foreground">
              Share news, articles, and updates with the school community
            </p>
          </div>
          <div id="page-div-5" data-testId="page-div-5" className="border rounded-md border-green-500 p-2">
            <h3 className="text-md font-bold text-green-400">Note</h3>
            <p className="text-green-300">
              Submitted publications needs to be approved first before you can
              see it publicly.
            </p>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div id="page-grid-6" data-testId="page-grid-6" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div id="page-div-7" data-testId="page-div-7" className="lg:col-span-2 space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>
                  Enter the main details of your publication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-div-8" data-testId="page-div-8" className="space-y-2">
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    placeholder="Enter publication title..."
                    name="title"
                    onChange={handleChange}
                    required
                    maxLength={255}
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.title.length}/255
                  </p>
                </div>

                <div id="page-div-9" data-testId="page-div-9" className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary or excerpt (optional)..."
                    name="excerpt"
                    onChange={handleTextAreaChange}
                    rows={3}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    This will be shown in publication previews and search
                    results
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Cover Image */}
            <Card>
              <CardHeader>
                <CardTitle>Cover Image</CardTitle>
                <CardDescription>
                  Upload a cover image for your publication
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formData.imageUrl ? (
                  <div id="page-div-10" data-testId="page-div-10" className="relative">
                    <img
                      src={formData.imageUrl || "/placeholder.svg"}
                      alt="Cover"
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <Button
                      variant="destructive"
                      size="sm"
                      className="absolute top-2 right-2"
                      onClick={() => setFormData({ ...formData, imageUrl: "" })}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <UploadDropzone
                    endpoint="imageUploader"
                    config={{ mode: "auto" }}
                    onClientUploadComplete={(res) => {
                      console.log("Files: ", res);
                      setFormData({ ...formData, imageUrl: res[0].url });
                    }}
                    onUploadError={(error) => {
                      alert(`ERROR! ${error.message}`);
                    }}
                    appearance={{
                      container:
                        "relative border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center",
                      uploadIcon: "h-12 w-12 text-muted-foreground/50 mb-4",
                      label: "text-sm text-muted-foreground",
                      allowedContent: "text-xs text-muted-foreground",
                      // Make the button and progress bar transparent
                      button:
                        "absolute inset-0 h-full w-full cursor-pointer bg-transparent text-transparent ut-uploading:bg-slate-900/50 ut-uploading:text-white",
                    }}
                  />
                )}
              </CardContent>
            </Card>

            {/* Content */}
            <Card>
              <CardHeader>
                <CardTitle>Content *</CardTitle>
                <CardDescription>
                  Write your publication content
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tiptap
                  description={formData.content}
                  onChange={handleContentChange}
                />
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div id="page-div-11" data-testId="page-div-11" className="space-y-6">
            {/* Publication Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Publication Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-div-12" data-testId="page-div-12" className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
                    onValueChange={handleSelectChange}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((cat) => (
                        <SelectItem key={cat} value={cat}>
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* <div id="page-flex-13" data-testId="page-flex-13" className="flex items-center justify-between">
                  <div id="page-div-14" data-testId="page-div-14" className="space-y-0.5">
                    <Label>Featured Publication</Label>
                    <p className="text-sm text-muted-foreground">
                      Show this publication prominently
                    </p>
                  </div>
                  <Switch
                    checked={formData.isFeatured}
                    onCheckedChange={handleFeaturedChange}
                  />
                </div> */}

                {/* <div id="page-flex-15" data-testId="page-flex-15" className="flex items-center justify-between">
                  <div id="page-div-16" data-testId="page-div-16" className="space-y-0.5">
                    <Label>Save as Draft</Label>
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t publish immediately
                    </p>
                  </div>
                  <Switch checked={isDraft} onCheckedChange={setIsDraft} />
                </div> */}
              </CardContent>
            </Card>

            {/* Preview Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </CardTitle>
                <p className="text-xs text-muted-foreground mt-1">
                  No image preview and excerpt will be shown.
                </p>
              </CardHeader>
              <CardContent className="space-y-4 break-words">
                {formData.title || formData.content ? (
                  <div id="page-div-17" data-testId="page-div-17" className="space-y-3">
                    <div id="page-div-18" data-testId="page-div-18">
                      <h3 className="font-semibold text-lg">
                        {formData.title || "Untitled Publication"}
                      </h3>
                      <div id="page-flex-19" data-testId="page-flex-19" className="flex gap-2 mt-2"></div>
                    </div>
                    <ContentDisplay
                      htmlContent={formData.content || "No content yet..."}
                    />

                    {tags.length > 0 && (
                      <div id="page-flex-20" data-testId="page-flex-20" className="flex flex-wrap gap-2">
                        {tags.map((tag) => (
                          <Badge
                            key={tag}
                            variant="secondary"
                            className="flex items-center gap-1"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  <div id="page-div-21" data-testId="page-div-21" className="text-center py-8 text-muted-foreground">
                    <p className="text-sm">Start typing to see preview</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help categorize your publication
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-flex-22" data-testId="page-flex-22" className="flex gap-2">
                  <Input
                    placeholder="Add tag..."
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        handleAddTag();
                      }
                    }}
                  />
                  <Button type="button" onClick={handleAddTag} size="sm">
                    Add
                  </Button>
                </div>

                {tags.length > 0 && (
                  <div id="page-flex-23" data-testId="page-flex-23" className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="secondary"
                        className="flex items-center gap-1"
                      >
                        {tag}
                        <button
                          onClick={() => handleRemoveTag(tag)}
                          className="ml-1 hover:text-destructive"
                        >
                          <X className="h-3 w-3" />
                        </button>
                      </Badge>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Preview */}
            <Card>
              <CardHeader>
                <CardTitle>Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  type="submit"
                  variant="outline"
                  className="w-full bg-transparent"
                  disabled={isCreating}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Publish
                </Button>
                {/* <Button variant="outline" className="w-full bg-transparent">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button> */}
              </CardContent>
            </Card>

            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogContent className="max-w-2xl max-h-[90vh] mx-4">
                <DialogHeader>
                  <DialogTitle>
                    Your publication is submitted and is under review.
                  </DialogTitle>
                  <DialogDescription>
                    You will see it publicly once it is approved by an editor or
                    an admin.
                  </DialogDescription>
                </DialogHeader>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </form>
    </div>
  );
}
