"use client";
import React, { useState } from "react";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";
import GroupModal from "../group/groupmodal/groupmodal";
import GroupView from "../group/groupview/groupview";

const ChattApp = ({ profile, handleLogout }) => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const handleSelectedFriend = (friend) => {
    const selected = profile.friends.find(
      (f) => f.username === friend.username
    );
    setSelectedFriend(selected);
  };

  const handleContentChange = (content, group = null) => {
    setSelectedContent(content);
    if (group) {
      setSelectedGroup(group);
    }
  };

  const handleModal = () => {
    setOpenGroupModal(!openGroupModal);
  };
  // console.log("profile from chatt:", profile);
  return (
    <div className="overlay flex flex-row justify-center items-center w-screen h-screen p-12 overflow-x-hidden">
      <div className="flex  h-full bg-[#000000]/80 rounded-lg">
        {/* Side, groups etc */}
        <div className="flex">
          <ChatSidebar
            handleContentChange={handleContentChange}
            handleModal={handleModal}
          />
        </div>

        {selectedContent === "welcome" && (
          <WelcomePage profile={profile} handleLogout={handleLogout} />
        )}
        {selectedContent === "group" && (
          <GroupView group={selectedGroup} profile={profile} />
        )}
        {selectedContent === "profile" && (
          <PrivateProfile
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
            profile={profile}
          />
        )}

        {/* Group modal */}

        {openGroupModal && <GroupModal setOpenGroupModal={setOpenGroupModal} />}
      </div>
    </div>
  );
};

export default ChattApp;
