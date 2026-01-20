'use client';

import React from "react";
import MusicQueue from "@/components/Listener/Common/RightContentLayout/MusicQueue";
import {useAppSelector} from "@/libs/redux/hooks";


const RightContentLayout = () => {
  const layout = useAppSelector(state => state.layout);
  const isOpen = layout.rightSidebar.openQueue;
  
  return (
    <aside
      id="sidebar"
      className={`fixed right-0 top-20 bottom-22 w-76 mr-2 px-2 py-3 lg:px-4 lg:py-5 bg-neutral-900/60 z-40 rounded-2xl
      transition-transform duration-300 ease-in-out shadow-2xl translate-x-[110%]
      ${isOpen ? 'lg:translate-x-0' : 'translate-x-[110%]'}`}
    >
      <MusicQueue/>
    </aside>
  )
}

export default RightContentLayout;