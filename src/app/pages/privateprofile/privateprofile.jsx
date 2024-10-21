import React, { useState, useEffect } from "react";
import SidebarFriendlist from "@/app/components/chattapp/chattprofile/sidebarfriendlist/sidebarfriendlist";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import Details from "@/app/components/chattapp/frienddetails/details";
import SidebarSearch from "@/app/components/chattapp/search/sidebarsearch";
import MainChat from "@/app/components/mainchat/mainchat";
import { fetchUsersById } from "@/utils/user/fetchuser/fetchuser";
import { subscribeToUsersById } from "@/utils/allusers/subscribetousersbyid";

const PrivateProfile = ({ handleLogout, currentUser, profile }) => {
  const [activeConversation, setActiveConversation] = useState(false);
  const [friendsWithData, setFriendsWithData] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const fetchFriendsData = async () => {
    if (profile.friends.length === 0) return;

    try {
      const friendsData = await Promise.all(
        profile.friends.map(async (friend) => {
          const userData = await fetchUsersById(friend.friendId);
          return userData ? { ...friend, ...userData } : null;
        })
      );
      setFriendsWithData(friendsData.filter((friend) => friend !== null));
    } catch (error) {
      console.log("Fel vid hämtning av vänners data:", error);
    }
  };

  useEffect(() => {
    fetchFriendsData();
  }, [profile.friends]);

  useEffect(() => {
    if (profile.friends.length === 0) return;

    const unsubscribeList = profile.friends.map((friend) =>
      subscribeToUsersById(friend.friendId, (updatedUser) => {
        setFriendsWithData((prevFriends) =>
          prevFriends.map((f) =>
            f.friendId === friend.friendId ? { ...f, ...updatedUser } : f
          )
        );
      })
    );

    return () => {
      unsubscribeList.forEach((unsubscribe) => unsubscribe());
    };
  }, [profile.friends]);

  const handleSelectedFriend = (friend) => {
    setSelectedFriend(friend);
  };

  const handleActiveConversation = (friend) => {
    setActiveConversation(friend.username);
  };

  return (
    <div className="flex">
      {/* Profile sidebar */}
      <div className="flex flex-col overflow-x-hidden">
        <SidebarProfile profile={profile} />
        <SidebarSearch profile={profile} />
        <SidebarFriendlist
          friendsWithData={friendsWithData}
          onSelectFriend={handleSelectedFriend}
          activeConversation={activeConversation}
          handleActiveConversation={handleActiveConversation}
        />
      </div>

      {/* Conversation */}
      <div className="flex flex-col overflow-x-hidden">
        <MainChat
          selectedFriend={selectedFriend}
          profile={profile}
          currentUser={currentUser}
        />
      </div>

      {/* Details */}
      <div className="overflow-x-hidden">
        <Details friend={selectedFriend} handleLogout={handleLogout} />
      </div>
    </div>
  );
};

export default PrivateProfile;
