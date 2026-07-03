"use client";

import { Separator } from "@/components/ui/separator";
import { MessageSquare, FileText } from "lucide-react";

type PageProps = {
  params: Promise<{ id: string }>;
};

interface ActivityProps {
  activity: any;
  index: number;
  userActivity: any;
}

const RecentActivities = ({ activity, index, userActivity }: ActivityProps) => {
  return (
    <div id="recent-activities-div-1" data-testId="recent-activities-div-1" key={index}>
      <div id="recent-activities-flex-2" data-testId="recent-activities-flex-2" className="flex items-start space-x-4">
        <div id="recent-activities-div-3" data-testId="recent-activities-div-3" className="p-2 bg-muted rounded-lg">
          {activity.type === "PUBLISHED" ? (
            <FileText className="h-4 w-4" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
        </div>
        <div id="recent-activities-div-4" data-testId="recent-activities-div-4" className="flex-1 min-w-0">
          <p className="text-sm">
            {activity.type === "PUBLISHED" && (
              <>
                This user <span id="recent-activities-span-1" data-testId="recent-activities-span-1" className="font-medium">published</span>{" "}
                <span id="recent-activities-span-2" data-testId="recent-activities-span-2" className="font-medium break-words">
                  {activity.title}
                </span>
              </>
            )}
            {activity.type === "REPLIED" && (
              <>
                This user <span id="recent-activities-span-3" data-testId="recent-activities-span-3" className="font-medium">replied to</span>{" "}
                <span id="recent-activities-span-4" data-testId="recent-activities-span-4" className="font-medium break-words">
                  {activity.parentTitle}
                </span>
              </>
            )}
          </p>
          <div id="recent-activities-flex-5" data-testId="recent-activities-flex-5" className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span id="recent-activities-span-5" data-testId="recent-activities-span-5">{new Date(activity.createdAt).toLocaleString()}</span>
            {activity.type === "PUBLISHED" ? (
              <>
                <span id="recent-activities-span-6" data-testId="recent-activities-span-6">{activity.likeCounts || 0} likes</span>
                <span id="recent-activities-span-7" data-testId="recent-activities-span-7">{activity.commentCount || 0} comments</span>
              </>
            ) : (
              <>
                <span id="recent-activities-span-8" data-testId="recent-activities-span-8">{activity.replyCount || 0} replies</span>
                <span id="recent-activities-span-9" data-testId="recent-activities-span-9">{activity.likeCount || 0} likes</span>
              </>
            )}
          </div>
        </div>
      </div>
      {index < userActivity.length - 1 && <Separator className="mt-4" />}
    </div>
  );
};

export default RecentActivities;
