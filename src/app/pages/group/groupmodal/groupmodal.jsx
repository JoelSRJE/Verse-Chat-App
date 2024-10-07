import React from "react";
import JoinGroup from "../joingroup/joingroup";
import CreateGroup from "../creategroup/creategroup";

const GroupModal = ({ setOpenGroupModal }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* overlay */}
      <div
        className="absolute inset-0 bg-black opacity-60"
        onClick={() => setOpenGroupModal(false)}
      />
      <div className="relative w-auto h-auto p-4 bg-[#000000]/100 text-white rounded-lg shadow-lg">
        <button
          className="p-2 h-auto w-8 hover:bg-greenHighlight rounded-lg text-center"
          onClick={() => setOpenGroupModal(false)}
        >
          X
        </button>
        <h2 className="text-xl font-bold mb-4 text-center">Options</h2>
        <div className="flex flex-col">
          <CreateGroup />
          <JoinGroup />
        </div>
      </div>
    </div>
  );
};

export default GroupModal;
