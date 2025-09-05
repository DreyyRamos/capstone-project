"use client";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ReactQueryProvider({ children }: Props) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            gcTime: 1000 * 60 * 5, // 5 min in memory after last observer unmounts
            staleTime: 1000 * 60 * 2, // 2 min,
            // refetchOnMount: false,      // don’t refetch when component mounts
            // refetchOnWindowFocus: false,// don’t refetch when user returns to tab
            // refetchOnReconnect: false,  // don’t refetch when network comes back
            retry: 1, // optional: keep, or set to 0 if you want
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
