"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Flag, MoreVertical, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import PublicationCommentLikeButton from "@/components/like-buttons/publication-comment-like-button";
import PublicationCommentReplyLikeButton from "@/components/like-buttons/publication-comment-reply-like-button";
import PublicationReplyToReplyLikeButton from "@/components/like-buttons/publication-replyToReply-like-button";

interface CommentSectionProps {
  token: string;
  id: string;
  publication: any;
  comment: any;
  isCurrentUserContent: any;
  editingComment: any;
  editCommentContent: string;
  editingReply: any;
  editReplyContent: any;
  editNestedReplyContent: any;
  replyContent: string;
  replyingTo: string | null;
  replyingToSecondLevel: string | null;
  secondLevelReplyContent: string;
  editingNestedReply: string | null;
  setSecondLevelReplyContent: (value: string) => void;
  setReplyContent: (value: string) => void;
  setEditReplyContent: (value: string) => void;
  setEditNestedReplyContent: (value: string) => void;
  handleEditComment: (c: any) => void;
  confirmDelete: (c: string, f: () => void) => void;
  handleDeleteComment: (d: string) => void;
  setEditCommentContent: (value: string) => void;
  handleSaveEditComment: (id: string) => void;
  handleSaveEditReply: (replyId: string, commentId: string) => void;
  handleCancelEdit: () => void;
  handleReply: (id: string) => void;
  handleReportPublicationComment: (
    commentId: string,
    comment_content: string,
    authorId: string
  ) => void;
  handleCancelReply: () => void;
  handleSubmitReply: (forumId: string, commentId: string) => void;
  handleEditReply: (reply: any) => void;
  handleDeleteReply: (replyId: string, commentId: string) => void;
  handleSecondLevelReply: (replyId: string) => void;
  handleReportPublicationReply: (
    replyId: string,
    reply: any,
    reply_authorId: string
  ) => void;
  handleCancelSecondLevelReply: () => void;
  handleSubmitSecondLevelReply: (
    pubId: string,
    replyId: string,
    commentId: string
  ) => void;
  handleEditNestedReply: (childReply: any) => void;
  handleDeleteNestedReply: (
    replyToReplyId: string,
    commentId: string,
    replyId: string
  ) => void;
  handleSaveEditNestedReply: (
    replyToReplyId: string,
    commentId: string,
    replyId: string
  ) => void;

  handleReportPublicationNestedReply: (
    replyToReplyId: string,
    rtr_content: string,
    rtr_authorId: string
  ) => void;
}

const PublicationCommentsSection = ({
  token,
  id,
  publication,
  comment,
  isCurrentUserContent,
  editingComment,
  editingReply,
  editReplyContent,
  editCommentContent,
  replyContent,
  replyingTo,
  replyingToSecondLevel,
  secondLevelReplyContent,
  editingNestedReply,
  editNestedReplyContent,
  handleEditComment,
  confirmDelete,
  handleDeleteComment,
  setEditCommentContent,
  setEditNestedReplyContent,
  setSecondLevelReplyContent,
  setReplyContent,
  setEditReplyContent,
  handleSaveEditReply,
  handleSaveEditComment,
  handleCancelEdit,
  handleReply,
  handleReportPublicationComment,
  handleCancelReply,
  handleSubmitReply,
  handleEditReply,
  handleDeleteReply,
  handleSecondLevelReply,
  handleReportPublicationReply,
  handleCancelSecondLevelReply,
  handleSubmitSecondLevelReply,
  handleEditNestedReply,
  handleDeleteNestedReply,
  handleSaveEditNestedReply,
  handleReportPublicationNestedReply,
}: CommentSectionProps) => {
  return (
    <Card key={comment.commentId}>
      <CardContent className="p-6">
        <div id="publication-comments-div-1" data-testId="publication-comments-div-1" className="space-y-4">
          <div id="publication-comments-flex-2" data-testId="publication-comments-flex-2" className="flex items-start gap-4">
            <Avatar className="h-10 w-10">
              <AvatarImage
                src={comment.author?.profileImage || "/placeholder.svg"}
              />
              <AvatarFallback>
                {comment.author?.firstName?.[0]}
                {comment.author?.lastName?.[0]}
              </AvatarFallback>
            </Avatar>
            <div id="publication-comments-div-3" data-testId="publication-comments-div-3" className="flex-1 space-y-2">
              <div id="publication-comments-flex-4" data-testId="publication-comments-flex-4" className="flex items-center justify-between">
                <div id="publication-comments-flex-5" data-testId="publication-comments-flex-5" className="flex items-center gap-2">
                  <p className="font-medium">
                    <Link href={`/visit/user/${comment?.authorId}`}>
                      {comment?.author?.firstName} {comment?.author?.lastName}
                    </Link>
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {comment?.author?.role}
                  </Badge>
                  <span className="text-sm text-muted-foreground">
                    {new Date(comment?.createdAt).toLocaleDateString()}
                  </span>
                </div>

                {/* Dropdown menu for comment owner */}
                {isCurrentUserContent(comment.authorId) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={() => handleEditComment(comment)}
                      >
                        <Edit2 className="h-4 w-4 mr-2" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          confirmDelete("comment", () =>
                            handleDeleteComment(comment.commentId)
                          );
                        }}
                        className="text-red-600"
                      >
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>

              {/* Comment content - editable if in edit mode */}
              {editingComment === comment.commentId ? (
                <div id="publication-comments-div-6" data-testId="publication-comments-div-6" className="space-y-2">
                  <Textarea
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    rows={3}
                  />
                  <div id="publication-comments-flex-7" data-testId="publication-comments-flex-7" className="flex items-center gap-2">
                    <Button
                      size="sm"
                      onClick={() => handleSaveEditComment(comment.commentId)}
                      disabled={!editCommentContent.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="text-sm leading-relaxed break-words max-w-prose">
                  {comment?.comment_content}
                </p>
              )}

              <div id="publication-comments-flex-8" data-testId="publication-comments-flex-8" className="flex items-center gap-4">
                <PublicationCommentLikeButton
                  comment={comment}
                  token={token}
                  forumId={id}
                />
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(comment.commentId)}
                >
                  {replyingTo === comment.commentId ? "Cancel" : "Reply"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleReportPublicationComment(
                      comment.commentId,
                      comment.comment_content,
                      comment.authorId
                    )
                  }
                >
                  <Flag className="h-3 w-3" />
                </Button>
              </div>
            </div>
          </div>

          {replyingTo === comment.commentId && (
            <div id="publication-comments-div-9" data-testId="publication-comments-div-9" className="ml-6 md:ml-14 space-y-3">
              <div id="publication-comments-div-10" data-testId="publication-comments-div-10" className="border-l-2 border-muted pl-2 md:pl-4">
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={2}
                  className="resize-none"
                />
                <div id="publication-comments-flex-11" data-testId="publication-comments-flex-11" className="flex items-center justify-end gap-2 mt-2">
                  <Button variant="ghost" size="sm" onClick={handleCancelReply}>
                    Cancel
                  </Button>
                  <Button
                    size="sm"
                    onClick={() =>
                      handleSubmitReply(comment.commentId, publication.pubId)
                    }
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {comment?.replies && comment?.replies?.length > 0 && (
            <div id="publication-comments-div-12" data-testId="publication-comments-div-12" className="ml-6 md:ml-14 space-y-4 border-l-2 border-muted pl-2 md:pl-4">
              {comment?.replies?.map((reply: any) => (
                <div id="publication-comments-flex-13" data-testId="publication-comments-flex-13"
                  key={reply.replyId}
                  className="flex items-start gap-2 md:gap-4"
                >
                  <Avatar className="h-6 w-6 md:h-8 md:w-8 shrink-0">
                    <AvatarImage
                      src={
                        reply?.reply_author?.profileImage ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                    />
                    <AvatarFallback className="text-xs">
                      {reply?.reply_author?.firstName?.[0]}
                      {reply?.reply_author?.lastName?.[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div id="publication-comments-div-14" data-testId="publication-comments-div-14" className="flex-1 min-w-0 space-y-2">
                    <div id="publication-comments-flex-15" data-testId="publication-comments-flex-15" className="flex items-start justify-between gap-2">
                      <div id="publication-comments-flex-16" data-testId="publication-comments-flex-16" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 min-w-0">
                        <p className="font-medium text-sm truncate">
                          {reply?.reply_author?.firstName}{" "}
                          {reply?.reply_author?.lastName}
                        </p>
                        <div id="publication-comments-flex-17" data-testId="publication-comments-flex-17" className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs shrink-0">
                            {reply?.reply_author?.role}
                          </Badge>
                          <span className="text-xs text-muted-foreground shrink-0">
                            {new Date(reply?.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                      </div>

                      {/* Dropdown menu for reply owner */}
                      {isCurrentUserContent(reply.reply_authorId) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="shrink-0"
                            >
                              <MoreVertical className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem
                              onClick={() => handleEditReply(reply)}
                            >
                              <Edit2 className="h-4 w-4 mr-2" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuItem
                              onClick={() => {
                                confirmDelete("reply", () =>
                                  handleDeleteReply(
                                    reply.replyId,
                                    comment.commentId
                                  )
                                );
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      )}
                    </div>

                    {/* Reply content - editable if in edit mode */}
                    {editingReply === reply.replyId ? (
                      <div id="publication-comments-div-18" data-testId="publication-comments-div-18" className="space-y-2">
                        <Textarea
                          value={editReplyContent}
                          onChange={(e) => setEditReplyContent(e.target.value)}
                          rows={2}
                        />
                        <div id="publication-comments-flex-19" data-testId="publication-comments-flex-19" className="flex items-center gap-2">
                          <Button
                            size="sm"
                            onClick={() =>
                              handleSaveEditReply(
                                reply.replyId,
                                comment.commentId
                              )
                            }
                            disabled={!editReplyContent.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-sm leading-relaxed break-words max-w-prose">
                        {reply.reply_content}
                      </p>
                    )}

                    <div id="publication-comments-flex-20" data-testId="publication-comments-flex-20" className="flex items-center gap-2 md:gap-4 flex-wrap">
                      <PublicationCommentReplyLikeButton
                        reply={reply}
                        token={token}
                        pubId={id}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSecondLevelReply(reply.replyId)}
                        className="text-xs md:text-sm"
                      >
                        {replyingToSecondLevel === reply.replyId
                          ? "Cancel"
                          : "Reply"}
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleReportPublicationReply(
                            reply.replyId,
                            reply.reply_content,
                            reply.reply_authorId
                          )
                        }
                        className="p-1 md:p-2"
                      >
                        <Flag className="h-3 w-3" />
                      </Button>
                    </div>

                    {replyingToSecondLevel === reply.replyId && (
                      <div id="publication-comments-div-21" data-testId="publication-comments-div-21" className="ml-2 md:ml-6 space-y-3">
                        <div id="publication-comments-div-22" data-testId="publication-comments-div-22" className="border-l-2 border-muted pl-2 md:pl-4">
                          <Textarea
                            placeholder="Write your reply..."
                            value={secondLevelReplyContent}
                            onChange={(e) =>
                              setSecondLevelReplyContent(e.target.value)
                            }
                            rows={2}
                            className="resize-none"
                          />
                          <div id="publication-comments-flex-23" data-testId="publication-comments-flex-23" className="flex items-center justify-end gap-2 mt-2">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelSecondLevelReply}
                            >
                              Cancel
                            </Button>
                            <Button
                              size="sm"
                              onClick={() =>
                                handleSubmitSecondLevelReply(
                                  publication.pubId,
                                  reply.replyId,
                                  comment.commentId
                                )
                              }
                              disabled={!secondLevelReplyContent.trim()}
                            >
                              Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {reply?.children && reply.children.length > 0 && (
                      <div id="publication-comments-div-24" data-testId="publication-comments-div-24" className="ml-2 md:ml-6 space-y-4 border-l-2 border-muted pl-2 md:pl-4 mt-4">
                        {reply.children.map((childReply: any) => (
                          <div id="publication-comments-flex-25" data-testId="publication-comments-flex-25"
                            key={childReply.replyToReplyId}
                            className="flex items-start gap-2 md:gap-4"
                          >
                            <Avatar className="h-6 w-6 md:h-8 md:w-8 shrink-0">
                              <AvatarImage
                                src={
                                  childReply?.reply_author?.profileImage ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback className="text-xs">
                                {childReply?.reply_author?.firstName?.[0]}
                                {childReply?.reply_author?.lastName?.[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div id="publication-comments-div-26" data-testId="publication-comments-div-26" className="flex-1 min-w-0 space-y-2">
                              <div id="publication-comments-flex-27" data-testId="publication-comments-flex-27" className="flex items-start justify-between gap-2">
                                <div id="publication-comments-flex-28" data-testId="publication-comments-flex-28" className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2 min-w-0">
                                  <p className="font-medium text-sm truncate">
                                    {childReply?.reply_author?.firstName}{" "}
                                    {childReply?.reply_author?.lastName}
                                  </p>
                                  <div id="publication-comments-flex-29" data-testId="publication-comments-flex-29" className="flex items-center gap-2">
                                    <Badge
                                      variant="outline"
                                      className="text-xs shrink-0"
                                    >
                                      {childReply?.reply_author?.role}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground shrink-0">
                                      {new Date(
                                        childReply?.createdAt
                                      ).toLocaleDateString()}
                                    </span>
                                  </div>
                                </div>

                                {/* Dropdown menu for nested reply owner */}
                                {isCurrentUserContent(
                                  childReply.reply_authorId
                                ) && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="shrink-0"
                                      >
                                        <MoreVertical className="h-4 w-4" />
                                      </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                      <DropdownMenuItem
                                        onClick={() =>
                                          handleEditNestedReply(childReply)
                                        }
                                      >
                                        <Edit2 className="h-4 w-4 mr-2" />
                                        Edit
                                      </DropdownMenuItem>
                                      <DropdownMenuItem
                                        onClick={() => {
                                          confirmDelete("reply", () =>
                                            handleDeleteNestedReply(
                                              childReply.replyToReplyId,
                                              comment.commentId,
                                              reply.replyId
                                            )
                                          );
                                        }}
                                        className="text-red-600"
                                      >
                                        <Trash2 className="h-4 w-4 mr-2" />
                                        Delete
                                      </DropdownMenuItem>
                                    </DropdownMenuContent>
                                  </DropdownMenu>
                                )}
                              </div>

                              {/* Nested reply content - editable if in edit mode */}
                              {editingNestedReply ===
                              childReply.replyToReplyId ? (
                                <div id="publication-comments-div-30" data-testId="publication-comments-div-30" className="space-y-2">
                                  <Textarea
                                    value={editNestedReplyContent}
                                    onChange={(e) =>
                                      setEditNestedReplyContent(e.target.value)
                                    }
                                    rows={2}
                                  />
                                  <div id="publication-comments-flex-31" data-testId="publication-comments-flex-31" className="flex items-center gap-2">
                                    <Button
                                      size="sm"
                                      onClick={() =>
                                        handleSaveEditNestedReply(
                                          childReply.replyToReplyId,
                                          comment.commentId,
                                          reply.replyId
                                        )
                                      }
                                      disabled={!editNestedReplyContent.trim()}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      onClick={handleCancelEdit}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <p className="text-sm leading-relaxed break-words max-w-prose">
                                  {childReply?.replyToReply_content}
                                </p>
                              )}

                              <div id="publication-comments-flex-32" data-testId="publication-comments-flex-32" className="flex items-center gap-2 md:gap-4">
                                <PublicationReplyToReplyLikeButton
                                  replyToReply={childReply}
                                  token={token}
                                  pubId={id}
                                  commentId={reply.commentId}
                                />
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleReportPublicationNestedReply(
                                      childReply.replyToReplyId,
                                      childReply.replyToReply_content,
                                      childReply.reply_authorId
                                    )
                                  }
                                  className="p-1 md:p-2"
                                >
                                  <Flag className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PublicationCommentsSection;
