import React, { useState } from "react";
import { tryToJoin } from "@/utils/user/updateuser/joingroup";
import { useCookies } from "react-cookie";

const JoinGroup = () => {
  const [cookies] = useCookies(["currentUser"]);
  const currentUser = cookies.currentUser;
  console.log("CurrentUser from JoinGroup: ", currentUser.uid);
  const [groupId, setGroupId] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleJoinGroup = async () => {
    console.log("Joining group...");
    const result = await tryToJoin(currentUser.uid, groupId);
    console.log("Result:", result);
    setIsSuccessfull(result.success);
    setMessage(result.message);
  };

  return (
    <div className="flex justify-center flex-col gap-2">
      <span className="text-xl font-semibold mb-2">Or Join A Group</span>
      <input
        type="text"
        value={groupId}
        onChange={(e) => setGroupId(e.target.value)}
        alt="Input for joining group"
        placeholder="Fill in the groups id"
        className="w-[20rem] h-[3rem] border-[1px] border-transparent text-base p-2 bg-transparent hover:border-[1px] hover:border-greenHighlight outline-none rounded-lg"
      />
      <button
        onClick={handleJoinGroup}
        className="bg-greenHighlight w- p-2 border-[1px] border-greenHighlight hover:bg-transparent rounded-lg"
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
