import React from "react";
import { CiChat1, CiSettings } from "react-icons/ci";

const ChatSidebar = () => {
  const groups = [{ poster: "/Elysian.webp" }, { poster: "verselogo.png" }];

  return (
    <div className="flex flex-col justify-between items-center h-full w-[5rem] rounded-l-lg bg-[#000000]/80 text-white">
      {/* Top section */}
      {/* Logo */}
      <div className="flex flex-col justify-center items-center mt-2">
        <img
          src="/verselogo.png"
          alt="Logo"
          className="scale-75 w-[5rem] h-[3.5rem] "
        />
        <div>
          <button className="flex justify-center items-center w-fill h-auto w-[5rem] overflow-hidden">
            <CiChat1 className="w-[3rem] h-[3rem] text-greenHighlight" />
            <span className="absolute">+</span>
          </button>
        </div>
        {/* divider */}
        <div className="w-[4rem] h-[2px] bg-greenHighlight opacity-30 mt-2" />
      </div>

      {/* Middle section */}
      {/* Groups */}
      <div className="flex h-4/5 w-[4rem] flex-col gap-2 justify-start items-center ">
        {groups.map((group, idx) => (
          <button key={idx}>
            <img
              src={group.poster}
              alt="Group poster"
              className="w-[4rem] h-[3rem] rounded-lg border-[1px] border-x-gray-300 hover:border-greenHighlight"
            />
          </button>
        ))}
      </div>

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
