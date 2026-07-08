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
            gcTime: 1000 * 60 * 5, // 5 mins
            staleTime: 1000 * 60 * 2, // 2 min,
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
