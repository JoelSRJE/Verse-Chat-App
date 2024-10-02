import React from "react";
import { CiSearch } from "react-icons/ci";

const SidebarSearch = () => {
  return (
    <div className="flex flex-row justify-center items-center w-[20rem] h-[4rem] bg-[#000000]/80">
      {/* Search input */}
      <input className="w-[2/3] h-[2.5rem] rounded-l-lg p-2 text-lg bg-[#D9D9D9]/80 outline-none" />
      <button className="flex items-center justify-center w-[2rem] h-[2.5rem] bg-[#D9D9D9]/80 rounded-r-lg border-1 border-l-greenHighlight">
        <CiSearch className="scale-150 text-xl text-white" />
      </button>
    </div>
  );
};

export default SidebarSearch;
