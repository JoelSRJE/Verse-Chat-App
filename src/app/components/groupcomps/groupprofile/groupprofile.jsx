import React from "react";

const GroupProfile = ({ profile }) => {
  return (
    <div className="flex w-72 min-h-16 bg-[#000000]/80 text-white">
      <div className="flex justify-center items-center ml-3">
        {/* Profile picture */}
        <img src={profile.avatar} alt="Profile picture" className="w-12 h-12" />
        {/* Status ball */}
        <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
          <div
            className="w-[0.5rem] h-[0.5rem] rounded-full animate-pulse"
            style={{ backgroundColor: profile.online.color }}
          />
        </div>

        {/* username & status */}
        <div className="flex flex-col">
          <span className="ml-1 text-lg font-semibold">{profile.username}</span>
        </div>
      </div>
    </div>
  );
};

export default GroupProfile;
