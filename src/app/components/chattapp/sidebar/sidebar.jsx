import React from "react";
import { CiChat1, CiSettings } from "react-icons/ci";

const ChatSidebar = () => {
  return (
    <div className="flex flex-col justify-between items-center h-full w-[5rem] rounded-l-lg bg-[#000000]/80 text-white">
      {/* Top section */}
      {/* Logo */}
      <div className="mt-2">
        <img src="/verselogo.png" alt="Logo" className="w-[4rem] h-[2.5rem]" />
        <div>
          <button className="flex justify-center items-center w-fill h-auto ">
            <CiChat1 className="w-[2rem] h-[2rem] text-greenHighlight" />
            <span className="absolute">+</span>
          </button>
        </div>
        {/* divider */}
        <div className="w-[4rem] h-[2px] bg-greenHighlight opacity-30" />
      </div>

      {/* Middle section */}
      {/* Groups */}
      <div></div>

      {/* Bottom section */}
      {/* Settings */}
      <div className="flex flex-col gap-2 justify-center items-center mb-2">
        {/* divider */}
        <div className="w-[4rem] h-[2px] bg-greenHighlight opacity-30" />
        <button>
          <CiSettings className="w-[2rem] h-[2rem] hover:text-greenHighlight" />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
