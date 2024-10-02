import React from "react";

const MainChat = ({ friend, currentUser }) => {
  if (!friend || !friend.privateMessages) {
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
      <div className="flex flex-col w-[45rem] h-[calc(100vh-1rem)] p-2 gap-2 bg-[#BDBCBC]/30 overflow-y-auto">
        {friend.privateMessages.map((message, idx) => (
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
              <div className="flex items-center space-x-2 ">
                <div className="flex flex-col items-end ">
                  <div className="bg-blue-500 text-white p-2 rounded-lg w-auto">
                    {message.message}
                  </div>
                  <span className="text-xs">{message.from}</span>
                </div>
                <img
                  src={message.picture}
                  className="w-[2rem] h-auto rounded-full"
                  alt="Sender picture"
                />
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <img
                  src={friend.picture}
                  className="w-[2rem] h-auto rounded-full"
                  alt="Sender picture"
                />
                <div className="flex flex-col items-start">
                  <div className="bg-[#4fdda9] text-black p-2 rounded-lg w-auto">
                    {message.message}
                  </div>
                  <span className="text-xs">{message.from}</span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Chatt input */}
      <div className="w-[45rem] h-[5rem] bg-[#000000]/80"></div>
    </div>
  );
};

export default MainChat;
