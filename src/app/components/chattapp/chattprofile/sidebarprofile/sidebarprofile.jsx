import React from "react";

const SidebarProfile = ({ profile }) => {
  console.log("profile from sidebarprofile:", profile);
  return (
    <div className="flex w-[20rem] h-[4rem] bg-[#000000]/80 text-white">
      <div className="flex justify-center items-center ml-3">
        {/* Profile picture */}
        <img
          src={profile.avatar}
          alt="Profile picture"
          className="w-[3rem] h-auto"
        />
        {/* Status */}
        <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 -translate-x-2/3 translate-y-1/2">
          <div
            className="w-[0.5rem] h-[0.5rem] rounded-full  animate-pulse"
            style={{ backgroundColor: profile.online.color }}
          />
        </div>
        <span className="ml-1 text-lg font-semibold">{profile.username}</span>
      </div>
    </div>
  );
};

export default SidebarProfile;
