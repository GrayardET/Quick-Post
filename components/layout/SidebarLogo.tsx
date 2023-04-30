import React from 'react'
import { BsTwitter } from 'react-icons/bs'

const SidebarLogo = () => {
  return (
    <div className="
      h-14 w-14 p-4 
      flex items-center justify-center rounded-full 
      hover:bg-blue-300 cursor-pointer transition"
    >
      <BsTwitter size={28} color="white" className="flex"/>
    </div>
  );
}

export default SidebarLogo