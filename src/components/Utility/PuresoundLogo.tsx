"use client";

import Image from "next/image";

const PuresoundLogo = ({size, dark = true}: { size: number, dark?: boolean }) => {
  // Calc text size: size * 0.4. size here is Logo size
  const textSize = Math.round(size * 0.4);
  const margin = Math.round(size * 0.16);
  return (
    <div className="flex justify-start items-center">
      <Image src="/puresound-logo.svg" alt="PureSound Logo" width={size} height={size} style={{marginRight: `${margin}px`}}/>
      <div>
        <p className={`${dark ? "text-blue-300" : "text-blue-700/80"} font-semibold inline`} style={{fontSize: `${textSize}px`}}>Pure</p>
        <p className="text-gray-400 font-semibold inline" style={{fontSize: `${textSize}px`}}>Sound</p>
      </div>
    </div>
  )
}

export default PuresoundLogo;
