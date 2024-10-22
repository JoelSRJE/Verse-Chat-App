"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";
import GroupModal from "../../components/groupcomps/groupmodal/groupmodal";
import GroupView from "../group/groupview";
import { fetchGroups } from "@/utils/group/getgroups/getgroups";

const ChattApp = ({ profile, handleLogout, currentUser, groupData }) => {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [openGroupModal, setOpenGroupModal] = useState(false);

  useEffect(() => {
    const getGroups = async () => {
      if (profile) {
        if (groupData && groupData.length > 0) {
          setGroups(groupData);
        } else {
          const fetchedGroups = await fetchGroups(profile);
          setGroups(fetchedGroups);
        }
      }
    };

    getGroups();
  }, [profile, groupData]);

  const handleContentChange = (content, group = null) => {
    setSelectedContent(content);
    if (group) {
      setSelectedGroup(group);
    } else {
      setSelectedGroup(null);
    }
  };

  const handleModal = () => {
    setOpenGroupModal(!openGroupModal);
  };

  return (
    <div className="overlay flex flex-row justify-center items-center w-screen h-screen p-12 overflow-x-hidden min-w-full">
      <div className="flex h-full bg-[#000000]/80 rounded-lg max-w-[87rem]">
        {/* Side, groups etc */}
        <div className="flex">
          <ChatSidebar
            profile={profile}
            handleContentChange={handleContentChange}
            handleModal={handleModal}
            groups={groups}
          />
        </div>

        {selectedContent === "welcome" && (
          <WelcomePage profile={profile} handleLogout={handleLogout} />
        )}

        {selectedContent === "group" && (
          <GroupView
            group={selectedGroup}
            profile={profile}
            handleLogout={handleLogout}
          />
        )}

        {selectedContent === "profile" && (
          <PrivateProfile
            handleLogout={handleLogout}
            currentUser={currentUser}
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
