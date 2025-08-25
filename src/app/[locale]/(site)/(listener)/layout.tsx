import React from "react";
import InitialLoadListener from "@/components/Listener/Me/InitialLoadListener";
import Header from "@/components/Listener/Common/Header";
import LeftSidebar from "@/components/Listener/Common/LeftSidebar";
import MobileOverlay from "@/components/Listener/Common/MobileOverlay";
import BottomMusicController from "@/components/Listener/Common/BottomMusicController";

export default function ListenerLayout({children,}: { children: React.ReactNode; }) {
  return (
    <div className="bg-primary-700 h-screen flex flex-col">
      <InitialLoadListener/>
      <Header/>
      <LeftSidebar/>
      <MobileOverlay/>

      {/* Content wrapper */}
      <div className="flex-1 flex mt-20 mb-20">
        <main className="flex-1 ml-4 lg:ml-68 mr-2 p-4 lg:p-6 rounded-2xl bg-neutral-900/60 overflow-y-auto">
          {children}
        </main>
      </div>

      <BottomMusicController/>
    </div>
  );
}
