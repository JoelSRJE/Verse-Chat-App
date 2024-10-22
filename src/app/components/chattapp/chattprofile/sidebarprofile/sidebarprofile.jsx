import React from "react";

const SidebarProfile = ({ profile }) => {
  return (
    <div className="flex min-w-72 min-h-16 bg-[#000000]/80 text-white">
      <div className="flex justify-center items-center ml-3">
        {/* Profile picture */}
        <img src={profile.avatar} alt="Profile picture" className="w-12 h-12" />
        {/* Status */}
        <div className="flex justify-center items-center w-4 h-4 rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
          <div
            className="w-2 h-2 rounded-full  animate-pulse"
            style={{ backgroundColor: profile.online.color }}
          />
        </div>
        <span className="ml-1 text-lg font-semibold">{profile.username}</span>
      </div>
    </div>
  );
};

export default SidebarProfile;
