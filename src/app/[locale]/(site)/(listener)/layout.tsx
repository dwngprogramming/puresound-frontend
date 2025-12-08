import React from "react";
import ClientRenderLayout from "@/components/Listener/Common/ClientRenderLayout";

export default function ListenerLayout({children,}: { children: React.ReactNode; }) {
  return <ClientRenderLayout children={children}/>
}
