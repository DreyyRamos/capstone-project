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
  reportedUserId?: string; // for consistency with the modal component
}

export function useReportModal() {
  const [state, setState] = useState<ReportModalState>({
    isModalOpen: false,
    contentType: "PUBLICATION", // Default to a valid ContentType value
    contentId: "",
    contentTitle: "",
    reportedUserId: "",
  });

  // Updated to use the complete ContentType enum
  const openReportModal = (
    contentType: ContentType, // accepts all content types
    contentId: string,
    contentTitle?: string,
    reportedUserId?: string // ID of user who created the content
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
