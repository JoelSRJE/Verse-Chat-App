import React from "react";

const GroupChannels = ({ channels, activeChannel, onChannelClick }) => {
  // if (!channels || channels.length === 0) {
  //   return <div>No channels available</div>;
  // }

  return (
    <div className="bg-[#000000]/60 h-full w-72">
      <div className="flex flex-col p-2 gap-1">
        {channels.map((channel, idx) => (
          <div
            key={idx}
            onClick={() => onChannelClick(channel)}
            className={`flex flex-row gap-2 p-2 cursor-pointer hover:bg-[#535353]/90 rounded-lg ${
              activeChannel === channel ? "bg-[#BFBCBC]/10" : ""
            }`}
          >
            <button className="flex gap-[2px] text-gray-500 text-lg tracking-wide">
              <span className="text-greenHighlight">#</span>
              {channel.channelName}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupChannels;
