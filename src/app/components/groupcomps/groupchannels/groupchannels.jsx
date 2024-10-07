import React from "react";

const GroupChannels = ({ group }) => {
  return (
    <div className="bg-[#000000]/30 h-full w-full">
      <div>
        {group.map((channel, idx) => (
          <div
            key={idx}
            className="flex flex-row gap-2 hover:bg-[#000000]/40 p-2 cursor-pointer"
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
