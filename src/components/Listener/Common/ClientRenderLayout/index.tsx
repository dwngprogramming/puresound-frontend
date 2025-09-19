'use client'

import React, {useEffect, useState} from "react";
import BottomMusicController from "@/components/Listener/Common/BottomMusicController";
import MobileOverlay from "@/components/Listener/Common/MobileOverlay";
import LeftSidebar from "@/components/Listener/Common/LeftSidebar";
import Header from "@/components/Listener/Common/Header";
import InitialLoadListener from "@/components/Listener/Common/ClientRenderLayout/InitialLoadListener";
import PageLoader from "@/components/PageLoader";

interface ClientRenderLayoutProps {
  children: React.ReactNode;
}

const ClientRenderLayout = ({children}: ClientRenderLayoutProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading && <PageLoader/>}
      <div className={`bg-primary-700 h-screen flex flex-col ${isLoading ? 'hidden' : 'block'}`}>
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
    </>
  )
}

export default ClientRenderLayout;
