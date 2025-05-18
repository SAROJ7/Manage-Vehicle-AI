"use client";

import React from "react";
import { ThemeProvider } from "next-themes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AxiosProvider } from "./AxiosProvider";
import { Toaster } from "@repo/ui/components/sonner";

const queryClient = new QueryClient();

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AxiosProvider>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
          <Toaster richColors expand={true} closeButton />
          <ReactQueryDevtools />
        </ThemeProvider>
      </AxiosProvider>
    </QueryClientProvider>
  );
}
