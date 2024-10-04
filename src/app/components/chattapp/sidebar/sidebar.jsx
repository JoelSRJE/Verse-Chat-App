import React from "react";
import { CiChat1, CiSettings } from "react-icons/ci";

const ChatSidebar = ({ handleContentChange, showInfo, setShowInfo }) => {
  const groups = [{ poster: "/Elysian.webp" }, { poster: "verselogo.png" }];

  return (
    <div className="flex flex-col justify-between items-center h-full w-[5rem] rounded-l-lg bg-[#000000]/80 text-white overflow-x-hidden">
      {/* Top section */}
      {/* Logo */}
      <div className="flex flex-col justify-center items-center mt-2">
        <img
          src="/verselogo.png"
          alt="Logo"
          className="scale-75 w-[5rem] h-[3.5rem] hover:cursor-pointer"
          onClick={() => handleContentChange("welcome")}
        />
        <div>
          <button
            className="relative flex justify-center items-center w-fill h-auto w-[5rem] overflow-hidden"
            onClick={() => handleContentChange("profile")}
          >
            <CiChat1 className="w-auto h-[3rem] text-greenHighlight" />
            <span className="absolute m-auto bottom-3.5">+</span>
          </button>
        </div>
        {/* divider */}
        <div className="w-[4rem] h-[2px] bg-greenHighlight opacity-30 mt-2 mb-4" />
      </div>

      {/* Middle section */}
      {/* Groups */}
      <div className="flex h-full w-[4rem] flex-col gap-2 justify-start items-center ">
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
      <div className="flex flex-col h-auto gap-2 justify-center items-center mb-2">
        <button
          className="w-[3rem] h-[2.5rem] rounded-lg border-2 border-greenHighlight mb-2 group-hover"
          onMouseEnter={() => setShowInfo(true)}
          onMouseLeave={() => setShowInfo(false)}
        >
          +
        </button>

        {/* divider */}
        <div className="w-[4rem] h-[2px] bg-greenHighlight opacity-30" />
        <button className="mt-2 mb-2">
          <CiSettings className="w-[2rem] h-[2rem] hover:text-greenHighlight" />
        </button>
      </div>
    </div>
  );
};

export default ChatSidebar;
