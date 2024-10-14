"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";
import GroupModal from "../group/groupmodal/groupmodal";
import GroupView from "../group/groupview/groupview";
import { fetchGroups } from "@/utils/group/getgroups/getgroups";

const ChattApp = ({ profile, handleLogout }) => {
  const [groups, setGroups] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [openGroupModal, setOpenGroupModal] = useState(false);

  //console.log("Before getgroups profile: ", profile);

  /*
Uppdaterat regler i firestore.
Kolla så att gruppen som väljs, renderar ut korrekt grupp utifrån dess id som vi har åtkomst till.
Behöver bara jämföra och sedan pusha korrekt data till selectedGroup
*/

  useEffect(() => {
    const getGroups = async () => {
      const groupData = await fetchGroups(profile);
      setGroups(groupData);
      console.log("Groups: ", groupData);
    };

    getGroups();
  }, [profile]);

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
    } else {
      setSelectedGroup(null);
    }
  };

  const handleModal = () => {
    setOpenGroupModal(!openGroupModal);
  };

  return (
    <div className="overlay flex flex-row justify-center items-center w-screen h-screen p-12 overflow-x-hidden">
      <div className="flex  h-full bg-[#000000]/80 rounded-lg">
        {/* Side, groups etc */}
        <div className="flex">
          <ChatSidebar
            profile={profile}
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
