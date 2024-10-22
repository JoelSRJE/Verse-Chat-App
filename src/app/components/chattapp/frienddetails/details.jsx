import React, { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp, CiLogout } from "react-icons/ci";

const Details = ({ selectedFriend, handleLogout, friendsWithData }) => {
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

  if (!selectedFriend) {
    return (
      <div className="flex flex-col justify-between items-center w-[20rem] h-full text-white rounded-r-lg">
        {/* Top section */}
        <div className="flex justify-between items-center w-full min-h-16 bg-[#000000]/80 text-xl rounded-tr-lg" />

        {/* Middle section */}
        <div className="flex flex-col gap-4 justify-center items-center w-full h-full bg-[#000000]/60" />
        <div className="w-full h-16 bg-[#000000]/80 rounded-br-lg">
          <div className="flex w-full justify-end min-h-16">
            {/* logout */}
            <button
              className="abslute text-white w-12 rounded-tr-lg hover:scale-110 transition-all duration-200"
              onClick={handleLogout}
            >
              <CiLogout className="scale-125" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-center items-center w-[20rem] h-full text-white rounded-r-lg">
      {/* Top section */}
      <div className="flex justify-center items-center w-full h-16 bg-[#000000]/80 text-lg rounded-tr-lg">
        Details
      </div>

      {/* friend details */}
      <div className="flex flex-col justify-center w-[20rem] h-40 bg-[#000000]/80 text-white p-4">
        <div className="flex justify-center items-center mb-4">
          {/* Profile picture */}
          <img
            src={selectedFriend.avatar}
            alt="Profile picture"
            className="w-[5rem] h-auto"
          />
          {/* Status */}
          <div className="flex justify-center items-center w-[2rem] h-[2rem] rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
            <div
              className="w-[1rem] h-[1rem] rounded-full animate-pulse"
              style={{ backgroundColor: selectedFriend.online.color }}
            />
          </div>
          <span className="ml-1 text-lg font-semibold"></span>
        </div>
        <div className="flex flex-row justify-evenly">
          <span className="text-lg">{selectedFriend.username}</span>
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
      <div className="w-full bg-[#000000]/80 rounded-br-lg">
        <div className="flex justify-end h-16 bg-[#000000]/80 rounded-br-lg text-white">
          {/* logout */}
          <button
            className="abslute text-white w-12 rounded-tr-lg hover:scale-110 transition-all duration-200"
            onClick={handleLogout}
          >
            <CiLogout className="scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Details;
