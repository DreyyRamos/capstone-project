"use client";

import { useState } from "react";

type ContentType =
  | "FORUM_POST"
  | "FORUM_COMMENT"
  | "FORUM_REPLY"
  | "FORUM_REPLY_TO_REPLY"
  | "PUBLICATION"
  | "PUBLICATION_COMMENT"
  | "PUBLICATION_REPLY"
  | "PUBLICATION_REPLY_TO_REPLY";

interface ReportModalState {
  isModalOpen: boolean;
  contentType: ContentType;
  contentId: string;
  contentTitle?: string;
  reportedUserId?: string;
}

export function useReportModal() {
  const [state, setState] = useState<ReportModalState>({
    isModalOpen: false,
    contentType: "PUBLICATION",
    contentId: "",
    contentTitle: "",
    reportedUserId: "",
  });

  const openReportModal = (
    contentType: ContentType,
    contentId: string,
    contentTitle?: string,
    reportedUserId?: string,
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
