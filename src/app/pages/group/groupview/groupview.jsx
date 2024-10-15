import React, { useState } from "react";
import GroupChannels from "@/app/components/groupcomps/groupchannels/groupchannels";
import GroupChat from "@/app/components/groupcomps/groupchat/groupchat";
import GroupName from "@/app/components/groupcomps/groupname/groupname";
import GroupProfile from "@/app/components/groupcomps/groupprofile/groupprofile";
import GroupDetails from "@/app/components/groupcomps/groupdetails/groupdetails";

const GroupView = ({ group, profile }) => {
  if (!group) {
    return <div>Group not found</div>;
  }

  const [activeChannel, setActiveChannel] = useState(
    group.channels?.[0] || null
  );

  const handleChannelClick = (channel) => {
    setActiveChannel(channel);
    console.log("Active channel: ", channel);
  };

  return (
    <div className="flex">
      {/* Group sidebar */}
      <div className="flex flex-col overflow-x-hidden">
        <GroupName group={group} />
        {group.channels && group.channels.length > 0 ? (
          <GroupChannels
            channels={group.channels}
            onChannelClick={handleChannelClick}
            activeChannel={activeChannel}
          />
        ) : (
          <div>No channels available</div>
        )}

        <GroupProfile profile={profile} />
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
