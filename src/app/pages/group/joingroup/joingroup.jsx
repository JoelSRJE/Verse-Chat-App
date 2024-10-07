import React, { useState } from "react";

const JoinGroup = () => {
  const [message, setMessage] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  /* 

    Logiken för att skicka data kommer senare.
    sök efter gruppen & låt användaren bli medlem.
    
    */

  const handleJoinGroup = () => {
    try {
      console.log("Joining group...");
      setIsSuccessfull(true);
      setMessage("Group joined successfully");
    } catch (error) {
      console.log("Error:", error);
      setIsSuccessfull(false);
      setMessage("Error joining group");
    }
  };

  return (
    <div className="flex justify-center flex-col gap-2">
      <span className="text-xl font-semibold mb-2">Or Join A Group</span>
      <input
        type="text"
        alt="Input for joining group"
        placeholder="Fill in the groups id"
        className="w-full h-[3rem] text-base p-2 bg-transparent border-[1px] border-greenHighlight outline-none rounded-lg"
      />
      <button
        onClick={handleJoinGroup}
        className="hover:bg-greenHighlight p-2 border-[1px] border-greenHighlight rounded-lg"
      >
        Join
      </button>
      {isSuccessfull
        ? message && <span className="text-greenHighlight">{message}</span>
        : message && <span className="text-red-500">{message}</span>}
    </div>
  );
};

export default JoinGroup;
