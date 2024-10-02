import ChatSidebar from "../../components/chattapp/sidebar/sidebar";
import React from "react";

const ChattApp = () => {
  return (
    <div className="overlay flex justify-center items-center w-screen h-screen p-8">
      <div className="w-full h-full bg-[#000000]/80 rounded-lg">
        <ChatSidebar />
      </div>
    </div>
  );
};

export default ChattApp;
