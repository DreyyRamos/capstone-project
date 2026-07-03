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
    <div id="activities-div-1" data-testId="activities-div-1" key={index}>
      <div id="activities-flex-2" data-testId="activities-flex-2" className="flex items-start space-x-3 sm:space-x-4">
        <div id="activities-div-3" data-testId="activities-div-3" className="p-2 bg-muted rounded-lg flex-shrink-0">
          {activity.type === "PUBLISHED" ? (
            <FileText className="h-4 w-4" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
        </div>
        <div id="activities-div-4" data-testId="activities-div-4" className="flex-1 min-w-0">
          <p className="text-sm truncate max-w-[200px] sm:max-w-[300px]">
            {activity.type === "PUBLISHED" && (
              <>
                You <span id="activities-span-1" data-testId="activities-span-1" className="font-medium">published</span>{" "}
                <span id="activities-span-2" data-testId="activities-span-2" className="font-medium">{activity.title}</span>
              </>
            )}
            {activity.type === "REPLIED" && (
              <>
                You <span id="activities-span-3" data-testId="activities-span-3" className="font-medium">replied to</span>{" "}
                <span id="activities-span-4" data-testId="activities-span-4" className="font-medium">{activity.parentTitle}</span>
              </>
            )}
          </p>
          <div id="activities-flex-5" data-testId="activities-flex-5" className="flex flex-wrap items-center gap-2 sm:gap-4 mt-1 text-xs text-muted-foreground">
            <span id="activities-span-5" data-testId="activities-span-5">{new Date(activity.createdAt).toLocaleString()}</span>
            {activity.type === "PUBLISHED" ? (
              <>
                <span id="activities-span-6" data-testId="activities-span-6">{activity.likeCounts || 0} likes</span>
                <span id="activities-span-7" data-testId="activities-span-7">{activity.commentCount || 0} comments</span>
              </>
            ) : (
              <>
                <span id="activities-span-8" data-testId="activities-span-8">{activity.engagement?.replies || 0} replies</span>
                <span id="activities-span-9" data-testId="activities-span-9">{activity.engagement?.likes || 0} likes</span>
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
