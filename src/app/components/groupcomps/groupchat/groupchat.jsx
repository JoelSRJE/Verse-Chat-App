import React, { useState, useRef, useEffect } from "react";
import ChatInput from "../../chattapp/chatinput/chatinput";
import { sendGroupMessage } from "@/utils/group/sendgroupmessage/sendgroupmessage";
import { listenToGroupMessages } from "@/utils/group/sendgroupmessage/listentogroupmessage";

const GroupChat = ({ group, profile, channel }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    const unsubscribe = listenToGroupMessages(
      group.id,
      channel.channelId,
      setMessages
    );

    return () => {
      unsubscribe();
    };
  }, [group.id, channel.channelId]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
    setTimeout(() => setOpenPicker(false), 0);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      if (typeof message === "string" && message.trim()) {
        await sendGroupMessage({
          groupId: group.id,
          channelId: channel.channelId,
          memberAvatar: profile.avatar,
          senderName: profile.username,
          message: message,
        });
        setMessage("");
      } else {
        console.log("Message can't be empty");
      }
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  };

  const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return (
      date.toLocaleDateString("en-US", {
        day: "numeric",
        month: "numeric",
        year: "numeric",
      }) +
      " " +
      date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
    );
  };

  return (
    <div className="flex flex-col justify-between w-[45rem] h-full">
      {/* Top section */}
      <div className="flex justify-center items-center w-auto min-h-16 bg-[#000000]/80 text-white">
        {channel.channelName.replace(/-/g, " ")}
      </div>

      {/* Middle section */}
      <div
        className="flex flex-col gap-2 w-auto bg-[#282828]/50 text-white h-full overflow-scroll overflow-x-hidden
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-600
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {messages.map((message, idx) => (
          <div key={idx} className="flex flex-col p-2 min-h-[4rem] rounded">
            <div className="flex items-center space-x-2">
              <img
                src={message.memberAvatar || null}
                alt="user avatar"
                className="w-8 h-8 bg-greenHighlight rounded-full mr-2"
              />
              <div className="flex flex-col rounded-lg">
                <div className="flex gap-2">
                  <span className="relative font-semibold">{message.from}</span>
                  <span className="relative text-sm">
                    {formatDate(message.sentAt)}
                  </span>
                </div>

                <div>
                  <p className="h-auto mb-1">
                    {message.message || "No message"}
                  </p>
                </div>
              </div>
            </div>
            <div className="w-auto h-[2px] bg-gray-700" />
          </div>
        ))}
        <div ref={endRef}></div>
      </div>

      {/* Bottom section */}
      <div>
        <ChatInput
          openPicker={openPicker}
          setOpenPicker={setOpenPicker}
          message={message}
          setMessage={setMessage}
          sendMessage={sendMessage}
          handleEmoji={handleEmoji}
        />
      </div>
    </div>
  );
};

export default GroupChat;
