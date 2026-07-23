import type { Metadata } from "next";

import { Footer } from "@shared/components/layout/Footer";
import { Navbar } from "@shared/components/layout/Navbar";
import "@shared/styles/globals.css";

export const metadata: Metadata = {
  title: "Projektorlámpacsere",
  description: "Projektor lámpamodul csere — gyors, megbízható, B2B",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="hu">
      <body className="flex min-h-screen flex-col bg-background text-foreground antialiased">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
