import React from "react";
import {BreakpointProvider} from "@/context/breakpoint-auth-context";

export default function AuthLayout({children,}: { children: React.ReactNode; }) {
  return (
    <BreakpointProvider>
      <div
        className="flex flex-col justify-start items-center bg-gray-900 py-8 sm:bg-gradient-to-t from-black to-blue-950 min-h-screen">
        {children}
      </div>
    </BreakpointProvider>
  );
}
