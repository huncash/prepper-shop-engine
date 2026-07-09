"use client";

import type { ReactNode } from "react";

import { authProvider } from "@shared/auth/auth-provider";

export interface AdminLayoutProps {
  children: ReactNode;
  fallback?: ReactNode;
}

export function AdminLayout({ children, fallback = null }: AdminLayoutProps) {
  if (!authProvider.isAdmin()) {
    return <>{fallback}</>;
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {children}
    </div>
  );
}
