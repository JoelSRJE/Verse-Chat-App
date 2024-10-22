import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../chattapp/chatinput/chatinput";
import { sendPrivateMessage } from "@/utils/user/sendprivatemessage/sendprivate";
import { listenToPrivateMessages } from "@/utils/user/sendprivatemessage/listentoprivate";

const MainChat = ({ selectedFriend, profile, currentUser }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedFriend) {
      const unsubscribe = listenToPrivateMessages(
        currentUser.uid,
        selectedFriend.friendId,
        setMessages
      );

      return () => unsubscribe();
    }
  }, [selectedFriend, currentUser.uid]);

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
    setTimeout(() => setOpenPicker(false), 0);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    try {
      if (typeof message === "string" && message.trim()) {
        await sendPrivateMessage({
          uid: currentUser.uid,
          senderName: profile.username,
          receiverId: selectedFriend.friendId,
          receiverName: selectedFriend.username,
          message: message,
        });
        setMessage("");
      } else {
        console.log("Message can't be empty!");
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

  if (!selectedFriend) {
    return (
      <div className="flex flex-col justify-between w-auto h-full">
        {/* Top section */}
        <div className="flex items-center p-4 w-full min-h-16 bg-[#000000]/80" />
        {/* Middle Section */}
        <div className="flex justify-center items-center h-full w-full bg-[#282828]/50">
          <p className="text-white text-center pt-4">
            Välj en vän för att visa konversation.
          </p>
        </div>

        {/* Bottom section */}
        <div className="w-[45rem] min-h-16">
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
  }

  return (
    <div className="flex flex-col justify-between w-[45rem] h-full">
      {/* The person you're talking to */}
      {/* Top section */}
      <div className="flex items-center p-4 w-[45rem] min-h-16 bg-[#000000]/80" />

      {/* The conversation */}
      {/* Middle section */}
      <div
        className="flex flex-col w-auto h-full p-4 gap-2 bg-[#282828]/50 overflow-scroll overflow-x-hidden
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-600
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {messages.length > 0 ? (
          messages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${
                message.from === profile.username
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Om meddelandet är från currentUser / friend */}
              {message.from === profile.username ? (
                <div className="flex items-end space-x-2 group">
                  <div className="flex flex-col items-end">
                    <div className="relative bg-[#47a1f5]/70 text-white p-2 rounded-lg max-w-[17rem]">
                      {message.message}

                      {/* remove message */}
                      <button
                        className="absolute top-0 right-0 flex items-center justify-center h-[1.2rem] w-[1.2rem] transform translate-x-[0.5rem] translate-y-[-0.5rem] bg-[#282828]/70 rounded-lg text-transparent group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeMessage(message)}
                      >
                        x
                      </button>
                    </div>
                    <span className="text-xs text-gray-300">
                      {formatDate(message.sentAt)}
                    </span>
                  </div>

                  <div className="flex flex-col h-auto align-end items-center">
                    <img
                      src={profile.avatar}
                      className="w-[2rem] h-auto rounded-full"
                      alt="Sender picture"
                    />
                    <span className="text-sm font-semibold tracking-wide text-gray-300">
                      {message.from.split(" ")[0]}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex space-x-2">
                  <div className="flex flex-col items-center">
                    <img
                      src={selectedFriend.avatar}
                      className="w-[2rem] h-auto rounded-full"
                      alt="Sender picture"
                    />
                    <span className="text-sm font-semibold tracking-wide text-gray-300">
                      {message.from.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-300">
                      {formatDate(message.sentAt)}
                    </span>
                    <div className="bg-[#1119004d]/20 text-white p-2 rounded-lg min-w-auto max-w-[17rem]">
                      {message.message}
                    </div>
                  </div>
                </div>
              )}
              <div ref={endRef} />
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Ingen konversation än.
          </div>
        )}
      </div>

      {/* Chatt input */}
      {/* Bottom section */}
      <div className="w-[45rem] min-h-16">
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

export default MainChat;
