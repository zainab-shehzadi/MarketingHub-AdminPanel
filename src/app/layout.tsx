import type { Metadata } from "next";

import "@/css/satoshi.css";
import "@/css/style.css";
import React from "react";

export const metadata: Metadata = {
  title: "FetchFocus",
  description:
    "Enterprise administration dashboard for managing organizations, users, and subscriptions",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}