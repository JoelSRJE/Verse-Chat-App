"use client";
import React, { useState } from "react";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";
import GroupModal from "../group/groupmodal/groupmodal";
import GroupView from "../group/groupview/groupview";

const ChattApp = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    username: "Patron Saint",
    picture: "/person2.png",
    online: { status: "online", color: "#4FDDA9" },
    friends: [
      {
        picture: "/person1.png",
        username: "Jacob",
        friendsSince: "22.02.2023",
        online: { status: "offline", color: "#B8B8B8" },
        pinnedMessages: [{ name: "Jacob", text: "Hej där!" }],
        files: [],
        images: [],
        privateMessages: [
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
        ],
      },
      {
        picture: "/person3.png",
        username: "Nymme",
        friendsSince: "25.02.2023",
        online: { status: "busy", color: "#DD4F52" },
        privateMessages: [
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Nymme",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Patron Saint",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
        ],
      },
      {
        picture: "/person4.png",
        username: "Olle",
        friendsSince: "27.02.2023",
        online: { status: "away", color: "#DDC14F" },
        privateMessages: [],
      },
    ],
  });
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [openGroupModal, setOpenGroupModal] = useState(false);

  const profile = [
    {
      username: "Patron Saint",
      picture: "/person2.png",
      online: { status: "online", color: "#4FDDA9" },
      friends: [
        {
          picture: "/person1.png",
          username: "Jacob",
          friendsSince: "22.02.2023",
          online: { status: "offline", color: "#B8B8B8" },
          pinnedMessages: [{ name: "Jacob", text: "Hej där!" }],
          files: [],
          images: [],
          privateMessages: [
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Hej där!",
            },
            {
              from: "Jacob",
              picture: "person1.png",
              message: "Hej, allt bra?",
            },
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Jodå, lever livet!",
            },
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Hur är det själv?",
            },
          ],
        },
        {
          picture: "/person3.png",
          username: "Nymme",
          friendsSince: "25.02.2023",
          online: { status: "busy", color: "#DD4F52" },
          privateMessages: [
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Hej där!",
            },
            {
              from: "Nymme",
              picture: "person1.png",
              message: "Hej, allt bra?",
            },
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Jodå, lever livet!",
            },
            {
              from: "Patron Saint",
              picture: "/person2.png",
              message: "Hur är det själv?",
            },
          ],
        },
        {
          picture: "/person4.png",
          username: "Olle",
          friendsSince: "27.02.2023",
          online: { status: "away", color: "#DDC14F" },
        },
      ],
    },
  ];

  const handleSelectedFriend = (friend) => {
    const selected = currentUser.friends.find(
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

        {selectedContent === "welcome" && <WelcomePage profile={profile} />}
        {selectedContent === "group" && (
          <GroupView group={selectedGroup} currentUser={currentUser} />
        )}
        {selectedContent === "profile" && (
          <PrivateProfile
            profile={profile}
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
            currentUser={currentUser}
          />
        )}

        {/* Group modal */}

        {openGroupModal && <GroupModal setOpenGroupModal={setOpenGroupModal} />}
      </div>
    </div>
  );
};

export default ChattApp;
