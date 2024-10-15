"use client";
import React, { useEffect, useState } from "react";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";
import GroupModal from "../group/groupmodal/groupmodal";
import GroupView from "../group/groupview/groupview";
import { fetchGroups } from "@/utils/group/getgroups/getgroups";
import { fetchUsersById } from "@/utils/user/fetchuser/fetchuser";

const ChattApp = ({ profile, handleLogout }) => {
  const [groups, setGroups] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [openGroupModal, setOpenGroupModal] = useState(false);

  console.log("Before getgroups profile: ", profile);

  /*
Uppdaterat regler i firestore.
Kolla så att gruppen som väljs, renderar ut korrekt grupp utifrån dess id som vi har åtkomst till.
Behöver bara jämföra och sedan pusha korrekt data till selectedGroup
*/

  useEffect(() => {
    const getGroupsWithMembers = async () => {
      try {
        // Hämtar grupperna
        const groupData = await fetchGroups(profile);
        console.log("Fetched groupData: ", groupData);

        // Kontrollera om groupData är en array
        if (Array.isArray(groupData)) {
          const updatedGroups = await Promise.all(
            groupData.map(async (group) => {
              console.log("Processing group: ", group); // Logga varje grupp för att se vad den innehåller

              // Kontrollera att gruppen har en members-array
              if (Array.isArray(group.members)) {
                console.log("Group members: ", group.members); // Logga medlemmarna i gruppen
                const updatedMembers = await Promise.all(
                  group.members.map(async (member) => {
                    console.log("Processing member: ", member); // Logga varje medlem
                    const user = await fetchUsersById(member.userId);
                    return { ...member, user };
                  })
                );
                return { ...group, members: updatedMembers };
              } else {
                console.log(
                  "Group has no members array or is not an array: ",
                  group
                ); // Om gruppen inte har en members-array
              }
              // Om gruppen inte har medlemmar, returnera gruppen som den är
              return group;
            })
          );

          setGroups(updatedGroups);
          console.log("Updated groups with members: ", updatedGroups); // Logga den uppdaterade gruppen
        } else {
          console.error("Group data is not an array:", groupData);
        }
      } catch (error) {
        console.error("Error fetching groups or members:", error);
      }
    };

    getGroupsWithMembers();
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
            groups={groups}
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
