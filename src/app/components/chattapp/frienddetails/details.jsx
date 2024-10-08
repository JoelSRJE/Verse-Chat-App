import React, { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

const Details = ({ friend }) => {
  const [toggleState, setToggleState] = useState({
    pinned: false,
    files: false,
    images: false,
  });

  const handleToggle = (section) => {
    setToggleState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  if (!friend) {
    return (
      <div className="flex flex-col justify-between items-center w-[20rem] h-full text-white rounded-r-lg overflow-x-hidden">
        <div className="flex justify-center items-center w-full h-[8rem]  bg-[#000000]/80 text-xl font-semibold rounded-tr-lg"></div>
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full bg-[#000000]/60"></div>
        <div className="w-full h-[5rem] bg-[#000000]/80 rounded-br-lg"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between items-center w-[20rem] h-full text-white rounded-r-lg overflow-x-hidden">
      {/* Top section */}
      <div className="flex justify-center items-center w-full h-[8rem]  bg-[#000000]/80 text-xl font-semibold rounded-tr-lg">
        Details
      </div>

      {/* friend details */}
      <div className="flex flex-col justify-center w-[20rem] max-h-[10rem] bg-[#000000]/80 text-white p-4">
        <div className="flex justify-center items-center mb-4">
          {/* Profile picture */}
          <img
            src={friend.picture}
            alt="Profile picture"
            className="w-[5rem] h-auto"
          />
          {/* Status */}
          <div className="flex justify-center items-center w-[2rem] h-[2rem] rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
            <div
              className="w-[1rem] h-[1rem] rounded-full animate-pulse"
              style={{ backgroundColor: friend.online.color }}
            />
          </div>
          <span className="ml-1 text-lg font-semibold"></span>
        </div>
        <div className="flex flex-row justify-evenly">
          <div className="flex flex-col">
            <span className="text-lg">Username</span>
            <span className="text-md">{friend.username}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-lg">friends since</span>
            <span className="text-md">{friend.friendsSince}</span>
          </div>
        </div>
      </div>

      {/* Middle section */}
      <div className="flex flex-col gap-8 justify-center items-center w-full h-full bg-[#000000]/60">
        <div className="flex flex-col justify-between items-center w-full">
          <div className="flex justify-between items-center w-2/3">
            <span className="text-lg">Pinned messages</span>
            <button
              className="bg-[#535353]/50 p-2 rounded-lg"
              onClick={() => handleToggle("pinned")}
            >
              {toggleState.pinned ? (
                <CiCircleChevUp className="scale-150" />
              ) : (
                <CiCircleChevDown className="scale-150" />
              )}
            </button>
          </div>
          <div className="h-[2px] w-3/4 mt-2 bg-greenHighlight rounded-lg" />
        </div>

        <div className="flex flex-col justify-evenly items-center w-full h-[3rem]">
          <div className="flex justify-between items-center w-2/3">
            <span className="text-lg">Files</span>
            <button
              className="bg-[#535353]/50 p-2 rounded-lg"
              onClick={() => handleToggle("files")}
            >
              {toggleState.files ? (
                <CiCircleChevUp className="scale-150" />
              ) : (
                <CiCircleChevDown className="scale-150" />
              )}
            </button>
          </div>
          <div className="h-[2px] w-3/4 mt-2 bg-greenHighlight rounded-lg" />
        </div>

        <div className="flex flex-col justify-evenly items-center w-full h-[3rem]">
          <div className="flex justify-between items-center w-2/3">
            <span className="text-lg">Images</span>
            <button
              className="bg-[#535353]/50 p-2 rounded-lg"
              onClick={() => handleToggle("images")}
            >
              {toggleState.images ? (
                <CiCircleChevUp className="scale-150" />
              ) : (
                <CiCircleChevDown className="scale-150" />
              )}
            </button>
          </div>
          <div className="h-[2px] w-3/4 mt-2 bg-greenHighlight rounded-lg" />
        </div>
      </div>

      {/* Bottom section */}
      <div className="w-full p-4 h-[5rem] bg-[#000000]/80 rounded-br-lg"></div>
    </div>
  );
};

export default Details;
