import React from "react";
import {Metadata} from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: 'Staging Access',
};

export default function StagingLayout({
                                        children,
                                      }: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body className="bg-gray-100 min-h-screen">
        <main>{children}</main>
      </body>
    </html>
  )
}