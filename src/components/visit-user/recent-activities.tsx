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
    <div key={index}>
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-muted rounded-lg">
          {activity.type === "PUBLISHED" ? (
            <FileText className="h-4 w-4" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            {activity.type === "PUBLISHED" && (
              <>
                This user <span className="font-medium">published</span>{" "}
                <span className="font-medium break-words">
                  {activity.title}
                </span>
              </>
            )}
            {activity.type === "REPLIED" && (
              <>
                This user <span className="font-medium">replied to</span>{" "}
                <span className="font-medium break-words">
                  {activity.parentTitle}
                </span>
              </>
            )}
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <span>{new Date(activity.createdAt).toLocaleString()}</span>
            {activity.type === "PUBLISHED" ? (
              <>
                <span>{activity.likeCounts || 0} likes</span>
                <span>{activity.commentCount || 0} comments</span>
              </>
            ) : (
              <>
                <span>{activity.replyCount || 0} replies</span>
                <span>{activity.likeCount || 0} likes</span>
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
