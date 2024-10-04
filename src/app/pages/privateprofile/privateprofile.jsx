import SidebarFriendlist from "@/app/components/chattapp/chattprofile/sidebarfriendlist/sidebarfriendlist";
import SidebarProfile from "@/app/components/chattapp/chattprofile/sidebarprofile/sidebarprofile";
import Details from "@/app/components/chattapp/frienddetails/details";
import SidebarSearch from "@/app/components/chattapp/search/sidebarsearch";
import MainChat from "@/app/components/mainchat/mainchat";
import React from "react";

const PrivateProfile = ({
  profile,
  handleSelectedFriend,
  selectedFriend,
  currentUser,
}) => {
  return (
    <div className="flex">
      {/* Profile sidebar */}
      <div className="flex flex-col overflow-x-hidden">
        <SidebarProfile profile={profile} />
        <SidebarSearch />
        <SidebarFriendlist
          profile={profile}
          onSelectFriend={handleSelectedFriend}
        />
      </div>

      {/* Conversation */}
      <div className="flex flex-col overflow-x-hidden">
        <MainChat friend={selectedFriend} currentUser={currentUser} />
      </div>

      {/* Details */}
      <div className="overflow-x-hidden">
        <Details friend={selectedFriend} />
      </div>
    </div>
  );
};

export default PrivateProfile;
