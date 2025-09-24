"use client";

import { Separator } from "@/components/ui/separator";
import { MessageSquare, FileText } from "lucide-react";

interface User {
  firstName: string;
  lastName: string;
  email: string;
  contactNumber: string;
  bio: string;
  location: string;
  profileImage: string;
  interests: string[];
}

interface UserActivityProps {
  activity: any;
  index: number;
  visibleActivities: [];
}

const Activities = ({
  activity,
  index,
  visibleActivities,
}: UserActivityProps) => {
  return (
    <div key={index}>
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="p-2 bg-muted rounded-lg flex-shrink-0">
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
                You <span className="font-medium">published</span>{" "}
                <span className="font-medium">{activity.title}</span>
              </>
            )}
            {activity.type === "REPLIED" && (
              <>
                You <span className="font-medium">replied to</span>{" "}
                <span className="font-medium">{activity.parentTitle}</span>
              </>
            )}
          </p>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <span>{new Date(activity.createdAt).toLocaleString()}</span>
            {activity.type === "PUBLISHED" ? (
              <>
                <span>{activity.likeCounts || 0} likes</span>
                <span>{activity.commentCount || 0} comments</span>
              </>
            ) : (
              <>
                <span>{activity.engagement?.replies || 0} replies</span>
                <span>{activity.engagement?.likes || 0} likes</span>
              </>
            )}
          </div>
        </div>
      </div>
      {index < visibleActivities.length - 1 && <Separator className="mt-4" />}
    </div>
  );
};

export default Activities;
