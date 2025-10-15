"use client";

import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { FileText } from "lucide-react";
import { timeAgo } from "@/lib/timeAgo";

type PageProps = {
  params: Promise<{ id: string }>;
};

interface PubProps {
  pub: any;
  index: number;
  user: any;
}

const UserPublication = ({ pub, index, user }: PubProps) => {
  return (
    <div key={pub?.pubId}>
      <div className="flex items-start space-x-4">
        <div className="p-2 bg-muted rounded-lg">
          <FileText className="h-4 w-4" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm">
            This user <span className="font-medium">published</span>{" "}
            <span className="font-medium break-words">{pub?.title}</span>
          </p>
          <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
            <Badge variant="outline">{pub?.category}</Badge>
            <span>{timeAgo(pub?.createdAt)}</span>
            <span>{pub?.pubComments?.length || 0} comments</span>
            <span>{pub?.pubLikes?.length || 0} likes</span>
          </div>
        </div>
        <Badge variant="secondary" className="bg-green-100 text-green-800">
          {pub?.status || "Published"}
        </Badge>
      </div>
      {index < user?.userData?.publications?.length - 1 && (
        <Separator className="mt-4" />
      )}
    </div>
  );
};

export default UserPublication;
