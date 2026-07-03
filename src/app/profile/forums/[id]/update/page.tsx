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
import { ArrowLeft, Upload, X, Eye, Save, MessageSquare } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  usePostQuery,
  useFetchOnePostQuery,
  usePostByIdQuery,
} from "@/hooks/usePost";
import { useUserPublicationQuery } from "@/hooks/useUser";
import { useFetchForumById } from "@/hooks/useForum";
import { useUserForumQuery } from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import { UploadDropzone } from "@/utils/uploadthing";
import Cookies from "js-cookie";
import Tiptap from "@/components/tiptap";
import { toast } from "sonner";
import UpdateForumTopicLoading from "./loading";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function UpdatePublicationPage({ params }: PageProps) {
  const { id } = use(params);
  const [formData, setFormData] = useState({
    topicTitle: "",
    description: "",
    category: "",
    // imageUrl: "",
    // isFeatured: false,
    // category: "",
  });
  const { confirmDelete } = useConfirmation();
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [isDraft, setIsDraft] = useState(true);
  const router = useRouter();
  const token = Cookies.get("token") || "";
  const { data: forumToUpdate, isLoading } = useFetchForumById(token, id);
  const { editForum, isEditing, deleteForum } = useUserForumQuery(token);
  console.log("forum to update", forumToUpdate);

  const categories = [
    "General Discussion",
    "Academic",
    "Clubs & Activities",
    "Sports",
    "Arts & Culture",
    "Technology",
    "Study Groups",
    "Events",
    "Help & Support",
  ];

  useEffect(() => {
    if (forumToUpdate) {
      setFormData({
        topicTitle: forumToUpdate.topicTitle || "",
        description: forumToUpdate.description || "",
        category: forumToUpdate.category || "",
        // imageUrl: pubToUpdate.imageUrl || "",
        // isFeatured: pubToUpdate.isFeatured ?? false,
        // category: pubToUpdate.category || "",
      });
      setTags(forumToUpdate.tags || []);
    }
  }, [forumToUpdate]);

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleFeaturedChange = (checked: boolean) => {
    setFormData((prevData) => ({
      ...prevData,
      isFeatured: checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await editForum(
        {
          newData: {
            ...formData,
            tags,
          },
          forumId: id,
        },
        {
          onSuccess: () => {
            toast("Publication updated successfully!");
            router.push(`/forum/topic/${id}`);
          },
        }
      );
    } catch (error: any) {
      console.error(error);
    }
  };

  const handleDeletePublication = (pubId: string, title: string) => {
    confirmDelete("forum", () => {
      deleteForum(pubId);
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
  // const handleContentChange = (richText: string) => {
  //   setFormData({
  //     ...formData,
  //     content: richText, // Set the 'content' field with the new HTML
  //   });
  // };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  if (isLoading) {
    return <UpdateForumTopicLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        <div id="page-div-3" data-testId="page-div-3">
          <h1 className="text-3xl font-bold">Update this forum contents</h1>
          <p className="text-muted-foreground">
            Create a new topic for the community to discuss
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <div id="page-grid-4" data-testId="page-grid-4" className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div id="page-div-5" data-testId="page-div-5" className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Topic Details</CardTitle>
                <CardDescription>
                  Provide the main information about your discussion topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-div-6" data-testId="page-div-6" className="space-y-2">
                  <Label htmlFor="topicTitle">Topic Title *</Label>
                  <Input
                    id="topicTitle"
                    placeholder="What would you like to discuss?"
                    name="topicTitle"
                    value={formData.topicTitle}
                    onChange={handleChange}
                    required
                  />
                  <p className="text-sm text-muted-foreground">
                    Choose a clear, descriptive title that summarizes your topic
                  </p>
                </div>

                <div id="page-div-7" data-testId="page-div-7" className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide more details about your topic. What would you like to discuss? What questions do you have?"
                    name="description"
                    onChange={handleTextAreaChange}
                    value={formData.description}
                    rows={10}
                    className="min-h-[250px]"
                  />
                  <p className="text-sm text-muted-foreground">
                    Be specific and provide context to help others understand
                    and contribute to the discussion
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div id="page-div-8" data-testId="page-div-8" className="space-y-6">
            {/* Category & Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Topic Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-div-9" data-testId="page-div-9" className="space-y-2">
                  <Label htmlFor="category">Category *</Label>
                  <Select
                    value={formData.category}
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
                  <p className="text-sm text-muted-foreground">
                    Choose the most appropriate category for your topic
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Tags */}
            <Card>
              <CardHeader>
                <CardTitle>Tags</CardTitle>
                <CardDescription>
                  Add tags to help others find your topic
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div id="page-flex-10" data-testId="page-flex-10" className="flex gap-2">
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
                  <div id="page-flex-11" data-testId="page-flex-11" className="flex flex-wrap gap-2">
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

                <p className="text-sm text-muted-foreground">
                  Use relevant keywords that describe your topic
                </p>
              </CardContent>
            </Card>

            {/* Guidelines */}
            <Card>
              <CardHeader>
                <CardTitle>Community Guidelines</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-sm text-muted-foreground">
                <p>• Be respectful and constructive</p>
                <p>• Stay on topic and provide relevant information</p>
                <p>• Use clear and appropriate language</p>
                <p>• Search existing topics before creating new ones</p>
                <p>• Help create a positive learning environment</p>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardContent className="p-4">
                <Button type="submit" className="w-full" disabled={isEditing}>
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Update Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
