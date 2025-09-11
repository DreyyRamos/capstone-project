// hooks/useSearch.ts
import { useQuery } from "@tanstack/react-query";

export interface User {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  profileImage: string | null;
  bio: string | null;
  role: string;
  interests: string[];
  reputationPoints: number;
}

export interface Publication {
  pubId: string;
  title: string | null;
  excerpt: string | null;
  imageUrl: string | null;
  category: string | null;
  tags: string[];
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
    role: string;
  } | null;
  _count: {
    pubLikes: number;
    pubComments: number;
  };
}

export interface Forum {
  forumId: string;
  topicTitle: string | null;
  description: string | null;
  imageUrl: string | null;
  category: string | null;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  author: {
    id: string;
    firstName: string | null;
    lastName: string | null;
    profileImage: string | null;
    role: string;
  } | null;
  _count: {
    forumLikes: number;
    forumComments: number;
  };
}

export interface SearchResults {
  users: User[];
  publications: Publication[];
  forums: Forum[];
  total: number;
  query: string;
}

type SearchType = "all" | "users" | "publications" | "forums";

interface UseSearchOptions {
  query: string;
  type?: SearchType;
  limit?: number;
  offset?: number;
  enabled?: boolean;
}

export const useSearch = ({
  query,
  type = "all",
  limit = 10,
  offset = 0,
  enabled = true,
}: UseSearchOptions) => {
  return useQuery<SearchResults>({
    queryKey: ["search", query, type, limit, offset],
    queryFn: async () => {
      if (!query || query.trim().length < 2) {
        return {
          users: [],
          publications: [],
          forums: [],
          total: 0,
          query: "",
        };
      }

      const params = new URLSearchParams({
        q: query.trim(),
        type,
        limit: limit.toString(),
        offset: offset.toString(),
      });

      const response = await fetch(`/api/search?${params}`);

      if (!response.ok) {
        throw new Error("Search failed");
      }

      return response.json();
    },
    enabled: enabled && query.trim().length >= 2,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  });
};

// Hook for debounced search
import { useEffect, useState } from "react";

export const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
};
