import React from "react";
import ClientRenderLayout from "@/components/Listener/Common/ClientRenderLayout";
import {PlayerControlProvider} from "@/context/player-control-context";

export default function ListenerLayout({children,}: { children: React.ReactNode; }) {
  return (
    <PlayerControlProvider>
      <ClientRenderLayout children={children}/>
    </PlayerControlProvider>
  );
}
