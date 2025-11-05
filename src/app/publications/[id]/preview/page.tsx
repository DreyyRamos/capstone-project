"use client";

import { useState, use } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Heart, Flag, ArrowLeft, Clock, Star } from "lucide-react";
import { toast } from "sonner";
import Link from "next/link";
import { AuthModal } from "@/components/auth-modal";
import { useAuthModal } from "@/hooks/use-auth-modal";
import { useFetchOnePostQuery, usePostByIdQuery } from "@/hooks/usePost";
import { useTokenUser } from "@/hooks/useTokenUser";
import { useIsFeatured } from "@/hooks/useIsFeatured";
import { useAddTopReply, useAddNestedReply } from "@/hooks/usePost";
import Cookies from "js-cookie";
import { ReportModal } from "@/components/report-modal";
import { useReportModal } from "@/hooks/use-report-modal";
import ContentDisplay from "@/components/content-display";
import { useUserStatusCheck } from "@/hooks/useUserStatusCheck";
import { useUserQuery } from "@/hooks/useUser";
import { useConfirmation } from "@/components/confirmation-provider";
import PublicationDetailLoading from "../loading";
import { useEditorQuery } from "@/hooks/useEditor";
import { useRoleGate } from "@/utils/userRoleGate";
import { useRouter } from "next/navigation";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default function PublicationDetailPage({ params }: PageProps) {
  const { id } = use(params);
  const { isOpen, action, redirectTo, requireAuth, closeModal } =
    useAuthModal();
  const {
    isModalOpen,
    contentType,
    contentId,
    contentTitle,
    openReportModal,
    closeReportModal,
    reportedUserId,
  } = useReportModal();

  const router = useRouter();

  const token = Cookies.get("token") || "";
  useRoleGate(["ADMIN", "EDITOR"], token);
  const { data: currentUser } = useUserQuery(token);
  console.log("current user", currentUser);
  const { data: publication, isLoading, isError } = useFetchOnePostQuery(id);
  const { user } = useTokenUser();
  const userRole = user?.role || "STUDENT";
  const { StatusModal, checkComment, checkLike, checkShare, checkAndExecute } =
    useUserStatusCheck(currentUser?.userData?.status, {
      onBlocked: (action, status) => {
        console.log(`User tried to ${action} but is ${status}`);
      },
    });

  const { data: toReview, approve, reject } = useEditorQuery(token);

  const handleApprove = async (postId: string) => {
    try {
      await approve(postId, {
        onSuccess: () => {
          toast("Publication approved!");
          router.push("/content-manager");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (postId: string) => {
    try {
      await reject(postId, {
        onSuccess: () => {
          toast("Publication rejected!");
          router.push("/content-manager");
        },
      });
    } catch (error) {
      console.error(error);
    }
  };

  if (isLoading) {
    return <PublicationDetailLoading />;
  }
  if (isError) return <div>Error loading publication.</div>;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <StatusModal />
      <AuthModal
        isOpen={isOpen}
        onClose={closeModal}
        action={action}
        redirectTo={redirectTo}
      />
      <ReportModal
        isOpen={isModalOpen}
        onClose={closeReportModal}
        contentType={contentType}
        contentId={contentId}
        contentTitle={contentTitle}
        reportedUserId={reportedUserId}
      />

      <Button asChild variant="ghost">
        <Link href="/publications">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Publications
        </Link>
      </Button>

      <article className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-2 flex-wrap">
            {publication?.tags?.map((tag: any) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
          </div>

          <h1 className="text-4xl font-bold leading-tight break-words">
            {publication?.title}
          </h1>

          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12">
                <AvatarImage
                  src={publication.author?.profileImage || "/placeholder.svg"}
                />
                <AvatarFallback>
                  {publication.author?.firstName?.[0]}
                  {publication.author?.lastName?.[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">
                  {publication?.author.firstName} {publication?.author.lastName}
                </p>
                <p className="text-sm text-muted-foreground">
                  {publication?.author.role}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(publication?.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleApprove(id)}
              >
                Approve
              </Button>

              <Button
                variant="outline"
                size="sm"
                onClick={() => handleReject(id)}
              >
                Reject
              </Button>
            </div>
          </div>
        </div>

        {publication?.imageUrl && (
          <div className="relative aspect-video rounded-lg overflow-hidden">
            <img
              src={publication?.imageUrl || "/placeholder.svg"}
              alt={publication?.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <ContentDisplay htmlContent={publication?.content} />
      </article>
    </div>
  );
}
