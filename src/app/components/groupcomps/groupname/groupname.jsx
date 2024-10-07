import React from "react";

const GroupName = ({ group }) => {
  console.log("groupName: ", group);
  return (
    <div className="flex justify-center items-center w-[20rem] h-[4rem] bg-[#000000]/80 text-white">
      {/* Group name */}
      <span className="text-xl font-semibold tracking-wide">
        {group.groupName}
      </span>
    </div>
  );
};

export default GroupName;
