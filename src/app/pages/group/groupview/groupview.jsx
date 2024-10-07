import React, { useState } from "react";
import GroupChannels from "@/app/components/groupcomps/groupchannels/groupchannels";
import GroupChat from "@/app/components/groupcomps/groupchat/groupchat";
import GroupName from "@/app/components/groupcomps/groupname/groupname";
import GroupProfile from "@/app/components/groupcomps/groupprofile/groupprofile";

const GroupView = ({ group, currentUser }) => {
  const [activeChannel, setActiveChannel] = useState(group.channels[0]);

  //   console.log("group", group);
  if (!group) {
    return <div>Group not found</div>;
  }

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
  };

  return (
    <div className="flex w-full h-full">
      <div className="flex flex-col justify-between overflow-x-hidden">
        <GroupName group={group} />
        <GroupChannels
          channels={group.channels}
          onChannelClick={handleChannelClick}
          activeChannel={activeChannel}
        />
        <GroupProfile currentUser={currentUser} />
      </div>
      <div className="overflow-x-hidden">
        <GroupChat group={group} channel={activeChannel} />
      </div>
    </div>
  );
};

export default GroupView;
