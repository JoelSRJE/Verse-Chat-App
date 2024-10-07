import GroupChannels from "@/app/components/groupcomps/groupchannels/groupchannels";
import GroupChat from "@/app/components/groupcomps/groupchat/groupchat";
import GroupName from "@/app/components/groupcomps/groupname/groupname";
import GroupProfile from "@/app/components/groupcomps/groupprofile/groupprofile";
import React from "react";

const GroupView = ({ group, currentUser }) => {
  console.log("group", group);
  if (!group) {
    return <div>Group not found</div>;
  }
  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col justify-between">
        <GroupName group={group} />
        <GroupChannels group={group.channels} />
        <GroupProfile currentUser={currentUser} />
      </div>
      <div>
        <GroupChat />
      </div>
    </div>
  );
};

export default GroupView;
