"use client";

import { Shield } from "lucide-react";

interface TransformedReport {
  id: string;
  contentType: string;
  title: string;
  reportedBy: string;
  reportedUser: string;
  reportedByUser: any;
  reportedUserObj: any;
  reason: string;
  description: string;
  status: string;
  priority: string;
  createdAt: string;
  contentPreview: string;
  category: string;
  reportedUserId: string;
  contentId: string;
  actionTaken?: string;
  forum?: any;
  publication?: any;
  originalReport: any;
}

interface ReportActionsProps {
  reportActions: TransformedReport;
}

const ActionsTakenLists = ({ reportActions }: ReportActionsProps) => {
  return (
    <div id="actions-taken-lists-flex-1" data-testId="actions-taken-lists-flex-1"
      key={reportActions?.id}
      className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border rounded-lg gap-4"
    >
      <div id="actions-taken-lists-flex-2" data-testId="actions-taken-lists-flex-2" className="flex items-start gap-4 min-w-0 flex-1">
        <div id="actions-taken-lists-div-3" data-testId="actions-taken-lists-div-3" className="p-2 bg-muted rounded-lg flex-shrink-0">
          <Shield className="h-4 w-4" />
        </div>
        <div id="actions-taken-lists-div-4" data-testId="actions-taken-lists-div-4" className="min-w-0 flex-1">
          <p className="font-medium text-sm sm:text-base truncate">
            {reportActions?.actionTaken}
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground truncate">
            {reportActions?.contentType} - {reportActions?.title}
          </p>
          <p className="text-xs text-muted-foreground break-words">
            Reason: {reportActions?.reason}
          </p>
        </div>
      </div>
      <div id="actions-taken-lists-div-5" data-testId="actions-taken-lists-div-5" className="text-left sm:text-right flex-shrink-0">
        <p className="text-xs sm:text-sm font-medium truncate">
          {reportActions?.reportedByUser?.firstName}{" "}
          {reportActions?.reportedByUser?.lastName}
        </p>
        <p className="text-xs text-muted-foreground">
          {new Date(reportActions?.createdAt).toLocaleString()}
        </p>
      </div>
    </div>
  );
};

export default ActionsTakenLists;
