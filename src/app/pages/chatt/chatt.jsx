"use client";
import React, { useState } from "react";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import SidebarSearch from "@/app/components/chattapp/search/sidebarsearch";
import SidebarFriendlist from "@/app/components/chattapp/chattprofile/sidebarfriendlist/sidebarfriendlist";
import MainChat from "@/app/components/mainchat/mainchat";

const ChattApp = () => {
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [currentUser, setCurrentUser] = useState({
    name: "Adam Smith",
    picture: "/person2.png",
    online: { status: "online", color: "#4FDDA9" },
    friends: [
      {
        picture: "/person1.png",
        name: "Jacob Alpteg",
        online: { status: "offline", color: "#B8B8B8" },
        privateMessages: [
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hej där!",
          },
          {
            from: "Jacob Alpteg",
            picture: "person1.png",
            message: "Hej, allt bra?",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Jodå, lever livet!",
          },
          {
            from: "Adam Smith",
            picture: "/person2.png",
            message: "Hur är det själv?",
          },
        ],
      },
      {
        picture: "/person3.png",
        name: "Johan Nyman",
        online: { status: "busy", color: "#DD4F52" },
      },
      {
        picture: "/person4.png",
        name: "Oliver Holmberg",
        online: { status: "away", color: "#DDC14F" },
      },
    ],
  });
  const [activeConversation, setActiveConversation] = useState(false);

  const profile = [
    {
      name: "Adam Smith",
      picture: "/person2.png",
      friends: [
        {
          picture: "/person1.png",
          name: "Jacob Alpteg",
          privateMessages: [
            {
              from: "Adam Smith",
              picture: "/person2.png",
              message: "Hej där!",
            },
            {
              from: "Jacob Alpteg",
              picture: "person1.png",
              message: "Hej, allt bra?",
            },
          ],
        },
        { picture: "/person3.png", name: "Johan Nyman" },
        { picture: "/person4.png", name: "Oliver Holmberg" },
      ],
    },
  ];

  const handleSelectedFriend = (friend) => {
    const selected = currentUser.friends.find((f) => f.name === friend.name);
    setSelectedFriend(selected);
  };

  return (
    <div className="overlay flex flex-row justify-center items-center w-screen h-screen p-8">
      <div className="flex w-full h-full bg-[#000000]/80 rounded-lg">
        {/* Side, groups etc */}
        <div className="flex">
          <ChatSidebar />
        </div>

        {/* Sidebar - profile etc */}
        <div className="flex flex-col">
          <SidebarProfile profile={profile} />
          <SidebarSearch />
          <SidebarFriendlist
            profile={profile}
            onSelectFriend={handleSelectedFriend}
          />
        </div>

        {/* Conversation */}
        <div className="flex flex-col">
          <MainChat friend={selectedFriend} currentUser={currentUser} />
        </div>
      </div>
    </div>
  );
};

export default ChattApp;
