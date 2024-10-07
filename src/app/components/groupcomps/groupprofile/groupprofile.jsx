import React from "react";

const GroupProfile = ({ currentUser }) => {
  const maxLength = 10;

  return (
    <div className="flex w-[20rem] h-[4rem] bg-[#000000]/80 text-white">
      <div className="flex justify-center items-center ml-3">
        {/* Profile picture */}
        <img
          src={currentUser.picture}
          alt="Profile picture"
          className="w-[2.5rem] h-auto"
        />
        {/* Status ball */}
        <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
          <div
            className="w-[0.5rem] h-[0.5rem] rounded-full animate-pulse"
            style={{ backgroundColor: currentUser.online.color }}
          />
        </div>

        {/* username & status */}
        <div className="flex flex-col">
          <span className="ml-1 text-lg font-semibold">
            {currentUser.username.slice(0, maxLength) + "..."}
          </span>
          <span className="ml-1 text-xs italic">
            {currentUser.online.status}
          </span>
        </div>
      </div>
    </div>
  );
};

export default GroupProfile;
