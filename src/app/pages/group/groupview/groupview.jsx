import React, { useState } from "react";
import GroupChannels from "@/app/components/groupcomps/groupchannels/groupchannels";
import GroupChat from "@/app/components/groupcomps/groupchat/groupchat";
import GroupName from "@/app/components/groupcomps/groupname/groupname";
import GroupProfile from "@/app/components/groupcomps/groupprofile/groupprofile";
import GroupDetails from "@/app/components/groupcomps/groupdetails/groupdetails";

const GroupView = ({ group, currentUser }) => {
  const [activeChannel, setActiveChannel] = useState(group.channels[0]);

  if (!group) {
    return <div>Group not found</div>;
  }

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  return (
    <div className="flex">
      {/* Group sidebar */}
      <div className="flex flex-col overflow-x-hidden">
        <GroupName group={group} />
        <GroupChannels
          channels={group.channels}
          onChannelClick={handleChannelClick}
          activeChannel={activeChannel}
        />
        <GroupProfile currentUser={currentUser} />
      </div>

      {/* Group chat */}
      <div className="overflow-x-hidden">
        <GroupChat group={group} channel={activeChannel} />
      </div>

      {/* Group details */}
      <div className="overflow-x-hidden">
        <GroupDetails group={group} />
      </div>
    </div>
  );
};

export default GroupView;
