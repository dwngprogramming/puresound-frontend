import React from "react";
import ComponentLoader from "@/components/ComponentLoader";

const PageLoader = () => {
  return (
    <div
      className="flex flex-col justify-start items-center bg-gray-900 py-8 sm:bg-gradient-to-t from-black to-blue-950 min-h-screen">
      <ComponentLoader/>
    </div>
  )
}

export default PageLoader;
