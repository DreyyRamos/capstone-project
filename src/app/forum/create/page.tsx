"use client";

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
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, X, MessageSquare } from "lucide-react";
import TiptapForum from "@/components/tiptap-forum";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForumQuery } from "@/hooks/useForum";
import { useUserQuery } from "@/hooks/useUser";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import Cookies from "js-cookie";
import CreateForumTopicLoading from "./loading";

export default function CreateForumTopicPage() {
  const [formData, setFormData] = useState({
    topicTitle: "",
    description: "",
    category: "",
  });
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [contentError, setContentError] = useState(false);
  const router = useRouter();

  const token = Cookies.get("token") || "";

  const { data: currentUser } = useUserQuery(token);

  const { StatusModal, checkPost } = useUserStatusCheck(
    currentUser?.userData?.status,
    {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    },
  );

  const { createForum, isCreatingForum, isLoading } = useForumQuery(token);

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

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleTextAreaChange = (
    e:
      | React.ChangeEvent<HTMLTextAreaElement>
      | { target: { name: string; value: string } },
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSelectChange = (value: string) => {
    setFormData({
      ...formData,
      category: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.description.trim()) {
      setContentError(true);
      toast.error("Description is required.");
      return;
    }

    setContentError(false);
    checkPost(async () => {
      try {
        createForum(
          {
            ...formData,
            category: formData.category || "Academic",
            tags,
          },
          {
            onSuccess: () => {
              toast("Forum created!");
              router.push("/forum");
            },
          },
        );
      } catch (error: any) {
        console.error(error);
      }
    });
  };

  if (isLoading) {
    return <CreateForumTopicLoading />;
  }

  return (
    <div id="page-div-1" data-testId="page-div-1" className="max-w-4xl mx-auto space-y-6">
      <StatusModal />
      {/* Header */}
      <div id="page-flex-2" data-testId="page-flex-2" className="flex items-center gap-4">
        <Button asChild variant="ghost">
          <Link href="/forum">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
          </Link>
        </Button>
        <div id="page-div-3" data-testId="page-div-3">
          <h1 className="text-3xl font-bold">Start New Discussion</h1>
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
                  <p className="text-xs text-muted-foreground text-right">
                    {formData.topicTitle.length}/255
                  </p>
                  <Input
                    id="topicTitle"
                    placeholder="What would you like to discuss?"
                    name="topicTitle"
                    value={formData.topicTitle}
                    onChange={handleChange}
                    required
                    maxLength={255}
                  />
                  <p className="text-sm text-muted-foreground">
                    Choose a clear, descriptive title that summarizes your topic
                  </p>
                </div>

                <div id="page-div-7" data-testId="page-div-7" className="space-y-2">
                  <Label htmlFor="description">Description *</Label>
                  <TiptapForum
                    id="description"
                    name="description"
                    description={formData.description}
                    onChange={handleTextAreaChange}
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
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isCreatingForum}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Create Topic
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
}
