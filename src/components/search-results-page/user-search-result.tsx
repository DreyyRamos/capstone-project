"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { User as SearchUser } from "@/hooks/useSearch";

interface UserProps {
  user: SearchUser;
}

const UserSearchResult = ({ user }: UserProps) => {
  const getDisplayName = (user: SearchUser | any) => {
    if (!user) return "Unknown User";
    return (
      `${user.firstName || ""} ${user.lastName || ""}`.trim() || user.email
    );
  };
  return (
    <Card key={user.id} className="hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <Link
          id="user-search-result-link-1"
          data-testId="user-search-result-link-1"
          href={`/visit/user/${user.id}`}
          className="block"
        >
          <div
            id="user-search-result-div-1"
            data-testId="user-search-result-div-1"
            className="text-center"
          >
            <Avatar
              id="user-search-result-a-1"
              data-testId="user-search-result-a-1"
              className="h-16 w-16 mx-auto mb-3"
            >
              <AvatarImage src={user.profileImage || ""} />
              <AvatarFallback
                id="user-search-result-a-2"
                data-testId="user-search-result-a-2"
                className="text-lg"
              >
                {getDisplayName(user).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <h3 className="font-medium mb-2">{getDisplayName(user)}</h3>
            <div
              id="user-search-result-flex-2"
              data-testId="user-search-result-flex-2"
              className="flex items-center justify-center gap-2 mb-2"
            >
              <Badge variant="secondary">{user.role}</Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              {user.reputationPoints} reputation points
            </p>
            {user.bio && (
              <p className="text-sm text-muted-foreground line-clamp-3">
                {user.bio}
              </p>
            )}
            {user.interests.length > 0 && (
              <div
                id="user-search-result-flex-3"
                data-testId="user-search-result-flex-3"
                className="flex gap-1 mt-2 flex-wrap justify-center"
              >
                {user.interests.slice(0, 3).map((interest) => (
                  <Badge key={interest} variant="outline" className="text-xs">
                    {interest}
                  </Badge>
                ))}
              </div>
            )}
          </div>
        </Link>
      </CardContent>
    </Card>
  );
};

export default UserSearchResult;
