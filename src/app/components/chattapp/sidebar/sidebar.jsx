import React from "react";
import { CiChat1, CiSettings } from "react-icons/ci";
import { Tooltip as ReactTooltip } from "react-tooltip";

const ChatSidebar = ({ handleContentChange, handleModal, groups }) => {
  return (
    <div className="flex flex-col justify-between items-center h-full min-w-16 rounded-l-lg bg-[#000000]/80 text-white overflow-x-hidden">
      {/* Top section */}
      {/* Logo */}
      <div className="flex flex-col justify-center items-center mt-2">
        <div className="hover:scale-110 transition-all duration-200 hover:text-greenHighlight">
          <img
            src="/verselogo.png"
            alt="Logo"
            className="scale-75 w-16 h-14 hover:cursor-pointer"
            onClick={() => handleContentChange("welcome")}
            data-tooltip-id="home"
          />
        </div>

        <div className="hover:scale-110 transition-all duration-200 hover:text-greenHighlight">
          <button
            className="relative flex justify-center items-center w-fill h-auto w-16"
            onClick={() => handleContentChange("profile")}
            data-tooltip-id="message"
          >
            <CiChat1 className="w-auto h-12 text-greenHighlight " />
          </button>
        </div>
        {/* divider */}
        <div className="w-12 h-[2px] bg-greenHighlight opacity-30 mt-2 mb-4" />
      </div>

      {/* Middle section */}
      {/* Groups */}
      <div className="flex h-full w-16 flex-col gap-2 justify-start items-center">
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => handleContentChange("group", group)}
          >
            <img
              src={group.groupAvatar}
              alt={group.groupName}
              className="w-12 h-12 rounded-lg border-[1px] border-x-gray-300 hover:border-greenHighlight hover:scale-110 transition-all duration-200"
            />
          </button>
        ))}
      </div>

      {/* Bottom section */}
      {/* Settings */}
      <div className="flex flex-col h-auto gap-2 justify-center items-center mb-2 ">
        <button
          data-tooltip-id="add-group"
          onClick={() => handleModal(true)}
          className="w-12 h-10 rounded-lg border-2 border-greenHighlight mb-2 hover:text-greenHighlight hover:scale-110 transition-all duration-200"
        >
          +
        </button>

        {/* divider */}
        <div className="w-12 h-[2px] bg-greenHighlight opacity-30" />
        <button data-tooltip-id="settings" className="mt-2 mb-2">
          <CiSettings className="w-8 h-8 hover:text-greenHighlight hover:scale-110 transition-all duration-200" />
        </button>
      </div>

      {/* tooltips */}
      <ReactTooltip id="home" place="bottom" content="Home" />
      <ReactTooltip id="message" place="bottom" content="Private messages" />
      <ReactTooltip
        id="add-group"
        place="right"
        content="Click here to join a group or create your own"
      />
      <ReactTooltip id="settings" place="right" content="Settings" />
    </div>
  );
};

export default ChatSidebar;
