import type { Metadata } from "next";

import "@shared/src/styles/globals.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "Prepper Shop — Site 3",
  description: "Prepper shop storefront",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="hu">
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
