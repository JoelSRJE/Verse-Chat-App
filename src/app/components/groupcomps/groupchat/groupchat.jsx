import React from "react";
import MainChat from "../../mainchat/mainchat";
import ChatInput from "../../chattapp/chatinput/chatinput";

const GroupChat = ({ group, channel }) => {
  if (!channel.messages === null) {
    return (
      <div className="flex flex-col justify-between w-[45rem] h-full bg-[#000000]/80">
        {/* Top section */}
        <div className="flex p-4 w-[45rem] h-[4rem]"></div>
        {/* Middle Section */}
        <p className="flex justify-center items-center h-full text-center pt-4 bg-[#282828]/50">
          Välj en vän för att visa konversationen.
        </p>
        {/* Bottom section */}
        <div className="w-[45rem] h-[5rem]"></div>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between w-[45rem] h-full">
      {/* Top section */}
      <div className="flex justify-center items-center w-auto h-[4rem] bg-[#000000]/80 text-white">
        {channel.channelName}
      </div>

      {/* Middle section */}
      <div className="flex flex-col gap-2 w-auto bg-[#282828]/50 text-white h-full">
        {channel.messages.map((message, idx) => (
          <div key={idx} className="flex flex-col p-2 min-h-[4rem] rounded">
            <div className="flex items-center space-x-2">
              <img
                src={message.avatar || null}
                alt="user avatar"
                className="relative -top-2 w-8 h-8 rounded-full mr-2"
              />
              <div className="flex flex-col rounded-lg">
                <span className="relative -top-1 font-semibold">
                  {message.from}
                </span>
                <p className="h-auto mb-1">{message.message || "No message"}</p>
              </div>
            </div>
            <div className="w-auto h-[2px] bg-gray-700" />
          </div>
        ))}
      </div>

      {/* Bottom section */}
      <div className="h-[4rem] bg-[#000000]/80">
        <ChatInput />
      </div>
    </div>
  );
};

export default GroupChat;
