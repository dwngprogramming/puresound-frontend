'use client';

import React, {useEffect, useState} from "react";
import BottomMusicController from "@/components/Listener/Common/BottomMusicController";
import MobileOverlay from "@/components/Listener/Common/MobileOverlay";
import Header from "@/components/Listener/Common/Header";
import InitialLoadListener from "@/components/Listener/Common/ClientRenderLayout/InitialLoadListener";
import PageLoader from "@/components/PageLoader";
import Footer from "@/components/Listener/Common/Footer";
import MyLibrary from "@/components/Listener/Common/Library";
import RightContentLayout from "@/components/Listener/Common/RightContentLayout";
import {useAppSelector} from "@/libs/redux/hooks";
import {OverlayScrollbarsComponent} from "overlayscrollbars-react";

const ClientRenderLayout = ({children}: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);
  const {rightSidebar} = useAppSelector(state => state.layout);
  const isQueueOpen = rightSidebar.openQueue;
  
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
        <RightContentLayout/>
        
        {/* Content wrapper */}
        {/* flex-1 + h-0 => Tạo ra area content có thể scroll bên trong */}
        <div className="flex-1 flex mt-20 mb-22 h-0">
          <OverlayScrollbarsComponent
            element="main"
            options={{
              scrollbars: {
                theme: 'os-theme-dark',
                visibility: 'auto',
                autoHide: 'leave',
                autoHideDelay: 2000,
                clickScroll: true,
              },
              overflow: {
                x: 'hidden',
                y: 'scroll'
              },
              paddingAbsolute: true,
            }}
            defer
            className={`flex-1 ml-4 lg:ml-80 ${isQueueOpen ? 'lg:mr-80' : 'lg:mr-4'} transition-[margin-right] ease-in-out duration-300 mr-2 rounded-2xl bg-neutral-900/60`}
          >
            <div className="pl-4 py-3 lg:pl-6 lg:py-5">
              {children}
              <Footer/>
            </div>
          </OverlayScrollbarsComponent>
        </div>
        
        <BottomMusicController/>
      </div>
    </>
  )
}

export default ClientRenderLayout;
