import React from "react";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import { CiLogout } from "react-icons/ci";

const WelcomePage = ({ profile, handleLogout }) => {
  return (
    <div className="flex flex-col justify-between w-[85rem] h-full">
      <div className="flex flex-row">
        <SidebarProfile profile={profile} />
        <div className="flex w-full justify-end h-[4rem] bg-[#000000]/80 rounded-tr-lg">
          {/* logout */}
          <button
            className="flex justify-center items-center text-white w-[3rem] rounded-tr-lg hover:scale-110"
            onClick={handleLogout}
          >
            <CiLogout className="scale-150" />
          </button>
        </div>
      </div>

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
        <div className="w-[5rem] bg-[#000000]/80" />
      </div>

      <div className="w-full h-[4rem] bg-[#000000]/80 rounded-br-lg text-white" />
    </div>
  );
};

export default WelcomePage;
