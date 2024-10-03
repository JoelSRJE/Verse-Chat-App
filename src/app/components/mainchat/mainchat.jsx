import React, { useEffect, useRef, useState } from "react";
import ChatInput from "../chattapp/chatinput/chatinput";

const MainChat = ({ friend, currentUser }) => {
  const [openPicker, setOpenPicker] = useState(false);
  const [message, setMessage] = useState("");

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [friend?.privateMessages]);

  const removeMessage = (message) => {
    try {
      console.log("Removing message:", message);
    } catch (error) {
      console.log("Error removing message: ", error);
    }
  };

  const handleEmoji = (e) => {
    setMessage((prev) => prev + e.emoji);
    console.log("Stänger emoji picker");
    setTimeout(() => setOpenPicker(false), 0);
  };

  const sendMessage = () => {
    try {
      console.log("Sending message:", message);
    } catch (error) {
      console.log("Error sending message: ", error);
    }
  };

  if (!friend) {
    return (
      <div className="w-[45rem] h-full bg-[#BDBCBC]/30">
        <p className="text-center pt-4">
          Välj en vän för att visa konversationen.
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col justify-between w-[45rem] h-full">
      {/* The person you're talking to */}
      <div className="flex items-center p-4 w-[45rem] h-[4rem] bg-[#000000]/80">
        <img
          src={friend.picture}
          className="w-[2rem] h-auto mr-2"
          alt="Friend picture"
        />
        <span className="text-white">{friend.name}</span>
      </div>

      {/* The conversation */}
      <div
        className="flex flex-col w-[45rem] h-[calc(100vh-1rem)] p-2 gap-2 bg-[#BFBCBC]/10 overflow-scroll overflow-x-hidden
        [&::-webkit-scrollbar]:w-2
        [&::-webkit-scrollbar-track]:rounded-full
        [&::-webkit-scrollbar-track]:bg-gray-300
        [&::-webkit-scrollbar-thumb]:rounded-full
        [&::-webkit-scrollbar-thumb]:bg-gray-600
        dark:[&::-webkit-scrollbar-track]:bg-neutral-700
        dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500"
      >
        {friend.privateMessages?.length > 0 ? (
          friend.privateMessages.map((message, idx) => (
            <div
              key={idx}
              className={`flex ${
                message.from === currentUser.name
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Om meddelandet är från currentUser / friend */}
              {message.from === currentUser.name ? (
                <div className="flex items-center space-x-2 group">
                  <div className="flex flex-col items-start">
                    <div className="relative bg-[#47a1f5]/70 text-white p-2 rounded-lg w-auto ">
                      {message.message}

                      {/* remove message */}
                      <button
                        className="absolute top-0 right-0 flex items-center justify-center h-[1.2rem] w-[1.2rem] transform translate-x-[0.5rem] translate-y-[-0.5rem] bg-[#282828]/70 rounded-lg text-transparent group-hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                        onClick={() => removeMessage(message)}
                      >
                        x
                      </button>
                    </div>
                    <span className="text-xs">1min ago</span>
                  </div>

                  <div>
                    <img
                      src={message.picture}
                      className="w-[2rem] h-auto rounded-full"
                      alt="Sender picture"
                    />
                    <span className="text-xs">
                      {message.from.split(" ")[0]}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <div>
                    <img
                      src={friend.picture}
                      className="w-[2rem] h-auto rounded-full"
                      alt="Sender picture"
                    />
                    <span className="text-xs">
                      {message.from.split(" ")[0]}
                    </span>
                  </div>

                  <div className="flex flex-col items-end">
                    <div className="bg-[#1119004d]/20 text-white p-2 rounded-lg w-auto">
                      {message.message}
                    </div>
                    <span className="text-xs">1min ago</span>
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="text-center text-gray-500">
            Ingen konversation än.
          </div>
        )}
        <div ref={endRef}></div>
      </div>

      {/* Chatt input */}
      <div className="w-[45rem] h-[5rem] bg-[#000000]/80">
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
