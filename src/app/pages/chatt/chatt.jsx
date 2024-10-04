"use client";
import React, { useState } from "react";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import SidebarSearch from "@/app/components/chattapp/search/sidebarsearch";
import SidebarFriendlist from "@/app/components/chattapp/chattprofile/sidebarfriendlist/sidebarfriendlist";
import MainChat from "@/app/components/mainchat/mainchat";
import Details from "@/app/components/chattapp/frienddetails/details";
import PrivateProfile from "../privateprofile/privateprofile";
import WelcomePage from "../welcome/welcome";

const ChattApp = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
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
        PinnedMessages: [{ name: "Jacob", text: "Hej där!" }],
        Files: [],
        Images: [],
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
  });
  const [selectedContent, setSelectedContent] = useState("welcome");
  const [activeConversation, setActiveConversation] = useState(false);

  const profile = [
    {
      username: "Patron Saint",
      picture: "/person2.png",
      friends: [
        {
          picture: "/person1.png",
          username: "Jacob",
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
          ],
        },
        { picture: "/person3.png", username: "Nymme" },
        { picture: "/person4.png", username: "Olle" },
      ],
    },
  ];

  const handleSelectedFriend = (friend) => {
    const selected = currentUser.friends.find(
      (f) => f.username === friend.username
    );
    setSelectedFriend(selected);
  };

  const handleContentChange = (content) => {
    setSelectedContent(content);
  };

  return (
    <div className="overlay flex flex-row justify-center items-center w-screen h-screen p-12 overflow-x-hidden">
      <div className="flex  h-full bg-[#000000]/80 rounded-lg">
        {/* Side, groups etc */}
        <div className="flex">
          <ChatSidebar handleContentChange={handleContentChange} />
        </div>

        {selectedContent === "welcome" && <WelcomePage profile={profile} />}
        {selectedContent === "profile" && (
          <PrivateProfile
            profile={profile}
            handleSelectedFriend={handleSelectedFriend}
            selectedFriend={selectedFriend}
            currentUser={currentUser}
          />
        )}

        {/* Slut */}
      </div>
    </div>
  );
};

export default ChattApp;
