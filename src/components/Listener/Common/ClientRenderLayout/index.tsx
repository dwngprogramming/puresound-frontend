'use client';

import React, {useEffect, useState} from "react";
import BottomMusicController from "@/components/Listener/Common/BottomMusicController";
import MobileOverlay from "@/components/Listener/Common/MobileOverlay";
import Header from "@/components/Listener/Common/Header";
import InitialLoadListener from "@/components/Listener/Common/ClientRenderLayout/InitialLoadListener";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Listener/Common/Footer";
import MyLibrary from "@/components/Listener/Common/Library";

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
        <MyLibrary/>
        <MobileOverlay/>

        {/* Content wrapper */}
        {/* flex-1 + h-0 => Tạo ra area content có thể scroll bên trong */}
        <div className="flex-1 flex mt-20 mb-22 h-0">
          <main className="flex-1 ml-4 lg:ml-80 mr-2 px-4 py-3 lg:px-6 lg:py-5 rounded-2xl bg-neutral-900/60 overflow-y-auto vertical-scrollbar">
            {children}

            <Footer/>
          </main>
        </div>

        <BottomMusicController/>
      </div>
    </>
  )
}

export default ClientRenderLayout;
