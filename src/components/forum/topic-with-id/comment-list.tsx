"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import { Flag, Clock, MoreVertical, Edit2, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ForumCommentLikeButton from "@/components/like-buttons/forum-comment-like-button";
import ForumCommentReplyLikeButton from "@/components/like-buttons/forum-comment-reply-like-button";
import ForumReplyToReplyLikeButton from "@/components/like-buttons/forum-replyToReply-like-button";

interface CommentListProps {
  token: string;
  id: string;
  topic: any;
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
  handleReportForumComment: (
    commentId: string,
    comment_content: string,
    authorId: string,
  ) => void;
  handleCancelReply: () => void;
  handleSubmitReply: (forumId: string, commentId: string) => void;
  handleEditReply: (reply: any) => void;
  handleDeleteReply: (replyId: string, commentId: string) => void;
  handleReplyDislike: (replyId: number) => void;
  handleSecondLevelReply: (replyId: string) => void;
  handleReportForumReply: (
    replyId: string,
    reply: any,
    reply_authorId: string,
  ) => void;
  handleCancelSecondLevelReply: () => void;
  handleSubmitSecondLevelReply: (replyId: string, commentId: string) => void;
  handleEditNestedReply: (childReply: any) => void;
  handleDeleteNestedReply: (
    replyToReplyId: string,
    commentId: string,
    replyId: string,
  ) => void;
  handleSaveEditNestedReply: (
    replyToReplyId: string,
    commentId: string,
    replyId: string,
    childReply_ReplyToReplyId: string,
  ) => void;
  handleReportForumNestedReply: (
    replyToReplyId: string,
    replyToReply_content: string,
    reply_authorId: string,
  ) => void;
}

const CommentList = ({
  token,
  id,
  topic,
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
  handleReportForumComment,
  handleCancelReply,
  handleSubmitReply,
  handleEditReply,
  handleDeleteReply,
  handleSecondLevelReply,
  handleReportForumReply,
  handleCancelSecondLevelReply,
  handleSubmitSecondLevelReply,
  handleEditNestedReply,
  handleDeleteNestedReply,
  handleSaveEditNestedReply,
  handleReportForumNestedReply,
}: CommentListProps) => {
  return (
    <Card key={comment.commentId}>
      <CardContent className="p-2">
        <div
          id="comment-list-div-1"
          data-testId="comment-list-div-1"
          className="space-y-4"
        >
          <div
            id="comment-list-flex-2"
            data-testId="comment-list-flex-2"
            className="flex items-start gap-4"
          >
            <Avatar
              id="comment-list-a-1"
              data-testId="comment-list-a-1"
              className="h-10 w-10"
            >
              <AvatarImage
                src={comment.author.profileImage || "/placeholder.svg"}
              />
              <AvatarFallback
                id="comment-list-a-2"
                data-testId="comment-list-a-2"
              >
                {comment.author.firstName[0]}
              </AvatarFallback>
            </Avatar>
            <div
              id="comment-list-div-3"
              data-testId="comment-list-div-3"
              className="flex-1 space-y-3"
            >
              <div
                id="comment-list-flex-4"
                data-testId="comment-list-flex-4"
                className="flex items-center justify-between"
              >
                <div id="comment-list-div-5" data-testId="comment-list-div-5">
                  <p className="font-medium">
                    {comment.author.firstName} {comment.author.lastName}
                  </p>
                  <div
                    id="comment-list-flex-6"
                    data-testId="comment-list-flex-6"
                    className="flex items-center gap-2"
                  >
                    <Badge variant="outline" className="text-xs">
                      {comment.author.role}
                    </Badge>
                    {comment.isHelpful && (
                      <Badge
                        variant="secondary"
                        className="text-xs bg-green-100 text-green-800"
                      >
                        Helpful
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {new Date(comment.createdAt).toLocaleString()}
                  </p>
                </div>

                {/* Dropdown menu for comment owner */}
                {isCurrentUserContent(comment.authorId) && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        id="comment-list-button-1"
                        data-testId="comment-list-button-1"
                        variant="ghost"
                        size="sm"
                      >
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
                            handleDeleteComment(comment.commentId),
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
                <div
                  id="comment-list-div-7"
                  data-testId="comment-list-div-7"
                  className="space-y-2"
                >
                  <Textarea
                    className="resize-none break-all overflow-hidden whitespace-pre-wrap"
                    value={editCommentContent}
                    onChange={(e) => setEditCommentContent(e.target.value)}
                    rows={3}
                  />
                  <div
                    id="comment-list-flex-8"
                    data-testId="comment-list-flex-8"
                    className="flex items-center gap-2"
                  >
                    <Button
                      id="comment-list-button-2"
                      data-testId="comment-list-button-2"
                      size="sm"
                      onClick={() => handleSaveEditComment(comment.commentId)}
                      disabled={!editCommentContent.trim()}
                    >
                      Save
                    </Button>
                    <Button
                      id="comment-list-button-3"
                      data-testId="comment-list-button-3"
                      variant="ghost"
                      size="sm"
                      onClick={handleCancelEdit}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <p className="leading-relaxed break-words break-all max-w-prose whitespace-pre-wrap">
                  {comment.comment_content}
                </p>
              )}

              <div
                id="comment-list-flex-9"
                data-testId="comment-list-flex-9"
                className="flex items-center gap-4"
              >
                <ForumCommentLikeButton
                  comment={comment}
                  token={token}
                  forumId={id}
                />
                <Button
                  id="comment-list-button-4"
                  data-testId="comment-list-button-4"
                  variant="ghost"
                  size="sm"
                  onClick={() => handleReply(comment.commentId)}
                >
                  {replyingTo === comment.commentId ? "Cancel" : "Reply"}
                </Button>
                <Button
                  id="comment-list-button-5"
                  data-testId="comment-list-button-5"
                  variant="ghost"
                  size="sm"
                  onClick={() =>
                    handleReportForumComment(
                      comment?.commentId,
                      comment?.comment_content,
                      comment?.authorId,
                    )
                  }
                >
                  <Flag className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {replyingTo === comment.commentId && (
            <div
              id="comment-list-div-10"
              data-testId="comment-list-div-10"
              className="ml-6 md:ml-14 space-y-3"
            >
              <div
                id="comment-list-div-11"
                data-testId="comment-list-div-11"
                className="border-l-2 border-muted pl-2 md:pl-4"
              >
                <Textarea
                  placeholder="Write your reply..."
                  value={replyContent}
                  onChange={(e) => setReplyContent(e.target.value)}
                  rows={2}
                  className="resize-none break-all overflow-hidden whitespace-pre-wrap"
                />
                <div
                  id="comment-list-flex-12"
                  data-testId="comment-list-flex-12"
                  className="flex items-center justify-end gap-2 mt-2"
                >
                  <Button
                    id="comment-list-button-6"
                    data-testId="comment-list-button-6"
                    variant="ghost"
                    size="sm"
                    onClick={handleCancelReply}
                  >
                    Cancel
                  </Button>
                  <Button
                    id="comment-list-button-7"
                    data-testId="comment-list-button-7"
                    size="sm"
                    onClick={() =>
                      handleSubmitReply(topic?.forumId, comment.commentId)
                    }
                    disabled={!replyContent.trim()}
                  >
                    Reply
                  </Button>
                </div>
              </div>
            </div>
          )}

          {comment.replies && comment.replies.length > 0 && (
            <div
              id="comment-list-div-13"
              data-testId="comment-list-div-13"
              className="ml-6 md:ml-14 space-y-4 border-l-2 border-muted pl-2 md:pl-4"
            >
              {comment.replies.map((reply: any) => (
                <div
                  id="comment-list-flex-14"
                  data-testId="comment-list-flex-14"
                  key={reply.replyId}
                  className="flex items-start gap-4"
                >
                  <Avatar
                    id="comment-list-a-3"
                    data-testId="comment-list-a-3"
                    className="h-8 w-8"
                  >
                    <AvatarImage
                      src={
                        reply.reply_author.profileImage ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                    />
                    <AvatarFallback
                      id="comment-list-a-4"
                      data-testId="comment-list-a-4"
                    >
                      {reply.reply_author.firstName[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div
                    id="comment-list-div-15"
                    data-testId="comment-list-div-15"
                    className="flex-1 space-y-2"
                  >
                    <div
                      id="comment-list-flex-16"
                      data-testId="comment-list-flex-16"
                      className="flex items-center justify-between"
                    >
                      <div
                        id="comment-list-flex-17"
                        data-testId="comment-list-flex-17"
                        className="flex items-center gap-2"
                      >
                        <p className="font-medium text-sm">
                          {reply.reply_author.firstName}{" "}
                          {reply.reply_author.lastName}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {reply.reply_author.role}
                        </Badge>
                        <span
                          id="comment-list-span-1"
                          data-testId="comment-list-span-1"
                          className="text-xs text-muted-foreground"
                        >
                          {new Date(reply.createdAt).toLocaleDateString()}
                        </span>
                      </div>

                      {/* Dropdown menu for reply owner */}
                      {isCurrentUserContent(reply.reply_authorId) && (
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button
                              id="comment-list-button-8"
                              data-testId="comment-list-button-8"
                              variant="ghost"
                              size="sm"
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
                                    comment.commentId,
                                  ),
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
                      <div
                        id="comment-list-div-18"
                        data-testId="comment-list-div-18"
                        className="space-y-2"
                      >
                        <Textarea
                          className="resize-none break-all overflow-hidden whitespace-pre-wrap"
                          value={editReplyContent}
                          onChange={(e) => setEditReplyContent(e.target.value)}
                          rows={2}
                        />
                        <div
                          id="comment-list-flex-19"
                          data-testId="comment-list-flex-19"
                          className="flex items-center gap-2"
                        >
                          <Button
                            id="comment-list-button-9"
                            data-testId="comment-list-button-9"
                            size="sm"
                            onClick={() =>
                              handleSaveEditReply(
                                reply.replyId,
                                comment.commentId,
                              )
                            }
                            disabled={!editReplyContent.trim()}
                          >
                            Save
                          </Button>
                          <Button
                            id="comment-list-button-10"
                            data-testId="comment-list-button-10"
                            variant="ghost"
                            size="sm"
                            onClick={handleCancelEdit}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="leading-relaxed break-words break-all max-w-prose whitespace-pre-wrap">
                        {reply.reply_content}
                      </p>
                    )}

                    <div
                      id="comment-list-flex-20"
                      data-testId="comment-list-flex-20"
                      className="flex items-center gap-4"
                    >
                      <ForumCommentReplyLikeButton
                        reply={reply}
                        token={token}
                        forumId={id}
                      />
                      <Button
                        id="comment-list-button-11"
                        data-testId="comment-list-button-11"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleSecondLevelReply(reply.replyId)}
                      >
                        {replyingToSecondLevel === reply.replyId
                          ? "Cancel"
                          : "Reply"}
                      </Button>
                      <Button
                        id="comment-list-button-12"
                        data-testId="comment-list-button-12"
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleReportForumReply(
                            reply.replyId,
                            reply.reply_content,
                            reply.reply_authorId,
                          )
                        }
                      >
                        <Flag className="h-4 w-4" />
                      </Button>
                    </div>

                    {replyingToSecondLevel === reply.replyId && (
                      <div
                        id="comment-list-div-21"
                        data-testId="comment-list-div-21"
                        className="ml-3 md:ml-6 space-y-3"
                      >
                        <div
                          id="comment-list-div-22"
                          data-testId="comment-list-div-22"
                          className="border-l-2 border-muted pl-2 md:pl-4 max-w-prose break-words"
                        >
                          <Textarea
                            placeholder="Write your reply..."
                            value={secondLevelReplyContent}
                            onChange={(e) =>
                              setSecondLevelReplyContent(e.target.value)
                            }
                            rows={2}
                            className="resize-none break-all overflow-hidden whitespace-pre-wrap"
                          />
                          <div
                            id="comment-list-flex-23"
                            data-testId="comment-list-flex-23"
                            className="flex items-center justify-end gap-2 mt-2"
                          >
                            <Button
                              id="comment-list-button-13"
                              data-testId="comment-list-button-13"
                              variant="ghost"
                              size="sm"
                              onClick={handleCancelSecondLevelReply}
                            >
                              Cancel
                            </Button>
                            <Button
                              id="comment-list-button-14"
                              data-testId="comment-list-button-14"
                              size="sm"
                              onClick={() =>
                                handleSubmitSecondLevelReply(
                                  reply.replyId,
                                  comment.commentId,
                                )
                              }
                              disabled={!secondLevelReplyContent.trim()}
                            >
                              Submit Reply
                            </Button>
                          </div>
                        </div>
                      </div>
                    )}

                    {reply.children && reply.children.length > 0 && (
                      <div
                        id="comment-list-div-24"
                        data-testId="comment-list-div-24"
                        className="ml-3 md:ml-6 space-y-4 border-l-2 border-muted pl-2 md:pl-4 mt-4"
                      >
                        {reply.children.map((childReply: any) => (
                          <div
                            id="comment-list-flex-25"
                            data-testId="comment-list-flex-25"
                            key={childReply.replyToReplyId}
                            className="flex items-start gap-4"
                          >
                            <Avatar
                              id="comment-list-a-5"
                              data-testId="comment-list-a-5"
                              className="h-8 w-8"
                            >
                              <AvatarImage
                                src={
                                  childReply.reply_author.profileImage ||
                                  "/placeholder.svg" ||
                                  "/placeholder.svg"
                                }
                              />
                              <AvatarFallback
                                id="comment-list-a-6"
                                data-testId="comment-list-a-6"
                              >
                                {childReply.reply_author.firstName[0]}
                              </AvatarFallback>
                            </Avatar>
                            <div
                              id="comment-list-div-26"
                              data-testId="comment-list-div-26"
                              className="flex-1 space-y-2"
                            >
                              <div
                                id="comment-list-flex-27"
                                data-testId="comment-list-flex-27"
                                className="flex items-center justify-between"
                              >
                                <div
                                  id="comment-list-flex-28"
                                  data-testId="comment-list-flex-28"
                                  className="flex items-center gap-2"
                                >
                                  <p className="font-medium text-sm">
                                    {childReply.reply_author.firstName}{" "}
                                    {childReply.reply_author.lastName}
                                  </p>
                                  <Badge variant="outline" className="text-xs">
                                    {childReply.reply_author.role}
                                  </Badge>
                                  <span
                                    id="comment-list-span-2"
                                    data-testId="comment-list-span-2"
                                    className="text-xs text-muted-foreground"
                                  >
                                    {new Date(
                                      childReply.createdAt,
                                    ).toLocaleDateString()}
                                  </span>
                                </div>

                                {/* Dropdown menu for nested reply owner */}
                                {isCurrentUserContent(
                                  childReply.reply_authorId,
                                ) && (
                                  <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                      <Button
                                        id="comment-list-button-15"
                                        data-testId="comment-list-button-15"
                                        variant="ghost"
                                        size="sm"
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
                                              reply.replyId,
                                            ),
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
                                <div
                                  id="comment-list-div-29"
                                  data-testId="comment-list-div-29"
                                  className="space-y-2 max-w-prose"
                                >
                                  <Textarea
                                    value={editNestedReplyContent}
                                    onChange={(e) =>
                                      setEditNestedReplyContent(e.target.value)
                                    }
                                    rows={2}
                                    className="resize-none break-all overflow-hidden whitespace-pre-wrap"
                                  />
                                  <div
                                    id="comment-list-flex-30"
                                    data-testId="comment-list-flex-30"
                                    className="flex items-center gap-2"
                                  >
                                    <Button
                                      id="comment-list-button-16"
                                      data-testId="comment-list-button-16"
                                      size="sm"
                                      onClick={() =>
                                        handleSaveEditNestedReply(
                                          childReply.replyToReplyId,
                                          comment.commentId,
                                          reply.replyId,
                                          childReply.replyToReplyId,
                                        )
                                      }
                                      disabled={!editNestedReplyContent.trim()}
                                    >
                                      Save
                                    </Button>
                                    <Button
                                      id="comment-list-button-17"
                                      data-testId="comment-list-button-17"
                                      variant="ghost"
                                      size="sm"
                                      onClick={handleCancelEdit}
                                    >
                                      Cancel
                                    </Button>
                                  </div>
                                </div>
                              ) : (
                                <p className="leading-relaxed break-words break-all max-w-prose whitespace-pre-wrap">
                                  {childReply.replyToReply_content}
                                </p>
                              )}

                              <div
                                id="comment-list-flex-31"
                                data-testId="comment-list-flex-31"
                                className="flex items-center gap-4"
                              >
                                <ForumReplyToReplyLikeButton
                                  replyToReply={childReply}
                                  token={token}
                                  forumId={id}
                                  commentId={reply?.commentId}
                                />
                                <Button
                                  id="comment-list-button-18"
                                  data-testId="comment-list-button-18"
                                  variant="ghost"
                                  size="sm"
                                  onClick={() =>
                                    handleReportForumNestedReply(
                                      childReply.replyToReplyId,
                                      childReply.replyToReply_content,
                                      childReply?.reply_authorId,
                                    )
                                  }
                                >
                                  <Flag className="h-4 w-4" />
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

export default CommentList;
