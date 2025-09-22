"use client";

import type React from "react";
import { ToastContainer } from 'react-toastify';
import { SessionProvider } from "next-auth/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const queryClient = new QueryClient();
import 'react-loading-skeleton/dist/skeleton.css'


export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      {" "}
      <ToastContainer />
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </SessionProvider>
  );
}
