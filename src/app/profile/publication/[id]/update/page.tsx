"use client";

import type React from "react";

import { useState, useEffect, use } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Upload, X, Eye, Save } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  usePostQuery,
  useFetchOnePostQuery,
  usePostByIdQuery,
} from "@/hooks/usePost";
import { useUserPublicationQuery } from "@/hooks/useUser";
import { UploadDropzone } from "@/utils/uploadthing";
import Cookies from "js-cookie";
import Tiptap from "@/components/tiptap";
import { toast } from "sonner";
import UpdatePublicationLoading from "./loading";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function UpdatePublicationPage({ params }: PageProps) {
  const { id } = use(params);
  const [formData, setFormData] = useState({
    title: "",
    excerpt: "",
    content: "",
    imageUrl: "",
    category: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token") || "";
  const { data: pubToUpdate, isLoading } = useFetchOnePostQuery(id);
  const { editPub: updatePost, isEditing } = useUserPublicationQuery(token);

  const categories = [
    "Science",
    "Arts",
    "Sports",
    "Academic",
    "News",
    "Events",
    "Library",
    "Environment",
    "Technology",
    "Health",
    "Community",
  ];

  useEffect(() => {
    if (pubToUpdate) {
      setFormData({
        title: pubToUpdate.title || "",
        excerpt: pubToUpdate.excerpt || "",
        content: pubToUpdate.content || "",
        imageUrl: pubToUpdate.imageUrl || "",
        category: pubToUpdate.category || "",
      });
      setTags(pubToUpdate.tags || []);
    }
  }, [pubToUpdate]);

  console.log("Current category:", formData.category);
  console.log("pubToUpdate:", pubToUpdate?.category);

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
    try {
      await updatePost(
        {
          newData: {
            ...formData,
            tags,
            imageUrl: formData.imageUrl ?? "",
          },
          pubId: id,
        },
        {
          onSuccess: () => {
            toast("Publication updated successfully!");
            router.push(`/publications/${id}`);
          },
        }
      );
    } catch (error: any) {
      console.error(error);
    }
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
    return <UpdatePublicationLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex items-center justify-between">
        <div id="page-flex-3" data-testId="page-flex-3" className="flex items-center gap-4">
          <Button asChild variant="ghost">
            <Link href="/publications">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back
            </Link>
          </Button>
          <div id="page-div-4" data-testId="page-div-4">
            <h1 className="text-3xl font-bold">Edit Publication</h1>
            <p className="text-muted-foreground">
              Share news, articles, and updates with the school community
            </p>
          </div>
        </div>
        {/* save to drafat */}
        {/* <div id="page-flex-5" data-testId="page-flex-5" className="flex items-center gap-2">
          <Button variant="outline" onClick={() => handleSubmit(false)}>
            <Save className="mr-2 h-4 w-4" />
            Save Draft
          </Button>
          <Button onClick={() => handleSubmit(true)}>Publish</Button>
        </div> */}
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
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>

                <div id="page-div-9" data-testId="page-div-9" className="space-y-2">
                  <Label htmlFor="excerpt">Excerpt</Label>
                  <Textarea
                    id="excerpt"
                    placeholder="Brief summary or excerpt (optional)..."
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleTextAreaChange}
                    rows={3}
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
              {/* <Button
                type="submit"
                variant="outline"
                className="w-full bg-transparent"
                disabled={isUpdating}
              >
                <Save className="mr-2 h-4 w-4" />
                Update
              </Button> */}
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
                    key={formData.category} // Force re-render when category changes
                    value={formData.category || undefined}
                    onValueChange={handleSelectChange}
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
                    <Label>Save as Draft</Label>
                    <p className="text-sm text-muted-foreground">
                      Don&apos;t publish immediately
                    </p>
                  </div>
                  <Switch checked={isDraft} onCheckedChange={setIsDraft} />
                </div> */}
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
                <div id="page-flex-15" data-testId="page-flex-15" className="flex gap-2">
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
                  <div id="page-flex-16" data-testId="page-flex-16" className="flex flex-wrap gap-2">
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
                  disabled={isEditing}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  Update
                </Button>
                {/* <Button variant="outline" className="w-full bg-transparent">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button> */}
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
