"use client";

import { useState } from "react";

type ContentType =
  | "FORUM_POST"
  | "FORUM_COMMENT"
  | "FORUM_REPLY"
  | "FORUM_REPLY_TO_REPLY" // Children of forum replies
  | "PUBLICATION"
  | "PUBLICATION_COMMENT"
  | "PUBLICATION_REPLY"
  | "PUBLICATION_REPLY_TO_REPLY"; // Children of publication replies

interface ReportModalState {
  isModalOpen: boolean;
  contentType: ContentType;
  contentId: string;
  contentTitle?: string;
  reportedUserId?: string; // Add this for consistency with the modal component
}

export function useReportModal() {
  const [state, setState] = useState<ReportModalState>({
    isModalOpen: false,
    contentType: "PUBLICATION", // Default to a valid ContentType value
    contentId: "",
    contentTitle: "",
    reportedUserId: ""
  });

  // Updated to use the complete ContentType enum
  const openReportModal = (
    contentType: ContentType, // Now accepts all content types
    contentId: string,
    contentTitle?: string,
    reportedUserId?: string // Optional: ID of user who created the content
  ) => {
    setState({
      isModalOpen: true,
      contentType,
      contentId,
      contentTitle,
      reportedUserId,
    });
  };

  const closeReportModal = () => {
    setState((prev) => ({
      ...prev,
      isModalOpen: false,
    }));
  };

  return {
    ...state,
    openReportModal,
    closeReportModal,
  };
}

// Usage examples:
/*
const { isModalOpen, contentType, contentId, contentTitle, reportedUserId, openReportModal, closeReportModal } = useReportModal();

// Report a forum post
openReportModal("FORUM_POST", "forum_123", "Post title", "author_user_id");

// Report a forum comment
openReportModal("FORUM_COMMENT", "comment_456", "Comment content preview", "commenter_id");

// Report a nested reply
openReportModal("FORUM_REPLY_TO_REPLY", "nested_reply_789", "Nested reply content", "reply_author_id");

// Report a publication
openReportModal("PUBLICATION", "pub_321", "Publication title", "publication_author_id");

// Report a publication comment
openReportModal("PUBLICATION_COMMENT", "pub_comment_654", "Comment on publication", "commenter_id");

// Report a publication nested reply
openReportModal("PUBLICATION_REPLY_TO_REPLY", "pub_nested_987", "Nested publication reply", "nested_author_id");

// Then use in component:
<ReportModal
  isOpen={isModalOpen}
  onClose={closeReportModal}
  contentType={contentType}
  contentId={contentId}
  contentTitle={contentTitle}
  reportedUserId={reportedUserId}
/>
*/
