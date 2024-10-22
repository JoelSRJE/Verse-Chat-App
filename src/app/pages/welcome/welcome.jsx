import React from "react";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import { CiLogout } from "react-icons/ci";

const WelcomePage = ({ profile, handleLogout }) => {
  return (
    <div className="flex flex-col justify-between w-[85rem] h-full">
      {/* Top section */}
      <div className="flex w-full justify-end min-h-16 bg-[#000000]/80 rounded-tr-lg" />

      <div className="flex flex-row h-full w-full">
        <div className="flex flex-col justify-center items-center p-4 w-full bg-[#000000]/40 text-gray-300">
          <span className="text-3xl font-semibold mb-4 text-center">
            Welcome to Verse!
          </span>
          <span className="text-xl font-sem mb-4 text-center">
            Use the sidebar to navigate around
          </span>

          <div className="w-1/3 h-[1px] bg-greenHighlight" />

          <span className="w-[20rem] text-center text-lg mt-4">
            If any new updates are getting pushed. Information will appear here!
          </span>
        </div>

        {/* right side */}
        <div className="w-16 bg-[#000000]/80" />
      </div>

      {/* Bottom section */}
      <div className="flex justify-between rounded-br-lg text-white">
        {/* Left */}
        <SidebarProfile profile={profile} />
        {/* Middle */}
        <div className="bg-[#0000]/80 w-full min-h-16" />
        {/* Right - logout */}
        <div className="flex justify-end items-center bg-[#0000]/80 rounded-br-lg">
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

export default WelcomePage;
