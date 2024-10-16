import React from "react";
import { CiSearch } from "react-icons/ci";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";

const SidebarSearch = () => {
  return (
    <div className="flex flex-row justify-center items-center max-w-[20rem] h-[4rem] bg-[#000000]/60">
      <div className="flex flex-row">
        {/* Search input */}
        <input className="ml-2 w-[12rem] h-[2rem] rounded-l-lg p-2 text-lg bg-[#D9D9D9]/80 outline-none" />
        <button className="flex items-center justify-center w-[2rem] h-[2rem] bg-[#D9D9D9]/80 rounded-r-lg border-1 border-l-greenHighlight">
          <CiSearch className="scale-125 text-xl text-white hover:text-gray-600 mr-2" />
        </button>
      </div>

      <div className="flex flex-row  gap-4 ml-4">
        <button className="text-white hover:text-greenHighlight">
          <FiUserPlus />
        </button>
        <button className="text-white hover:text-red-500">
          <FiUserMinus />
        </button>
      </div>
    </div>
  );
};

export default SidebarSearch;
