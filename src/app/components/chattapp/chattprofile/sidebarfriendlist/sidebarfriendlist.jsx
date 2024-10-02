"use client";
import React from "react";
import { CiTrash } from "react-icons/ci";

const SidebarFriendlist = ({ profile, onSelectFriend }) => {
  console.log(profile.friends);
  const removeConversation = (friend) => {
    try {
      console.log("Removing friend:", friend);
    } catch (error) {
      console.log("Error removing friend:", error);
    }
  };

  return (
    <div className="flex flex-col justify-between w-[20rem] h-full bg-[#000000]/60 text-white">
      <div className="flex flex-col">
        {profile[0].friends.map((friend, idx) => (
          <div
            key={idx}
            onClick={() => onSelectFriend(friend)}
            className="flex justify-between items-center m-[0.4rem] bg-[#535353]/50 rounded-lg hover:bg-[#535353]/90"
          >
            <div className="flex items-center p-2">
              <img
                src={friend.picture}
                className="w-[2rem] h-auto mr-2"
                alt="Profile picture"
              />
              <span>{friend.name}</span>
            </div>

            <button
              onClick={() => removeConversation(friend)}
              className="flex justify-center items-center w-[3rem] h-full rounded-r-lg hover:bg-gray-500 opacity-0 hover:opacity-100 group-hover:opacity-100 transition-opacity duration-300"
            >
              <CiTrash className="scale-150 text-lg text-white hover:text-red-500" />
            </button>
          </div>
        ))}
      </div>

      {/* bottom */}
      <div className="w-[20rem] h-[5rem] bg-[#000000]/50"></div>
    </div>
  );
};

export default SidebarFriendlist;
