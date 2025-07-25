import React from "react";
import InitialLoadListener from "@/components/Listener/Me/InitialLoadListener";

export default function ListenerLayout({children,}: { children: React.ReactNode; }) {
  return <>
    <InitialLoadListener/>
    {children}
  </>
}
