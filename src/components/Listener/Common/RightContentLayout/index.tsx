'use client';

import React from "react";
import MusicQueue from "@/components/Listener/Common/RightContentLayout/MusicQueue";


const RightContentLayout = () => {
  return (
    <aside id="sidebar" className="fixed right-0 top-20 bottom-22 w-76 mr-2 px-4 py-3 lg:px-6 lg:py-5 bg-neutral-900/60 z-40 rounded-2xl
                            transform translate-x-[105%] lg:translate-x-0 transition-transform duration-300 ease-in-out">
      <MusicQueue/>
    </aside>
  )
}

export default RightContentLayout;