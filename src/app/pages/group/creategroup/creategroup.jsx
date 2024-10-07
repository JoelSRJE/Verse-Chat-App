import React, { useState } from "react";

const CreateGroup = () => {
  const [groupAvatar, setGroupAvatar] = useState(null);
  const [groupName, setGroupName] = useState("");
  const [groupDescription, setGroupDescription] = useState("");
  const [message, setMessage] = useState("");
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleGroupAvatar = (e) => {
    setGroupAvatar(e.target.files[0]);
  };

  const handleCreateGroup = () => {
    // logiken för skickande av data kommer senare.

    try {
      if (groupName === "") {
        setIsSuccessfull(false);
        setMessage("Please enter a group name");
      } else {
        setIsSuccessfull(true);
        setMessage("Group created successfully");
        console.log("Creating group...");
        console.log("Group avatar:", groupAvatar);
        console.log("Group name:", groupName);
        console.log("Group description:", groupDescription);

        // Återställ alla fält
        setGroupAvatar(null);
        setGroupName("");
        setGroupDescription("");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center gap-4 w-auto h-auto">
      <h1 className="text-2xl font-semibold">Create A Group</h1>
      {/* wrapper for inputs */}
      <div className="flex flex-row gap-2 p-4">
        {/* left side */}
        <div className="flex flex-col flex-1 justify-center gap-2">
          <span className="text-lg mb-2">Group Avatar</span>
          <div className="flex justify-center items-center w-[8.5rem] h-[8.5rem] mb-2 border-2 border-dashed border-greenHighlight rounded-lg">
            {groupAvatar ? (
              <img
                src={URL.createObjectURL(groupAvatar)}
                alt="Group avatar preview"
                className="w-[8rem] h-[8rem] rounded-lg"
              />
            ) : (
              <div>
                <span className="italic">Choose image</span>
              </div>
            )}
          </div>
          <input
            type="file"
            onChange={(e) => handleGroupAvatar(e)}
            className="border-[1px] border-transparent hover:border-[1px] hover:border-greenHighlight cursor-pointer"
          />
        </div>

        {/* right side */}
        <div className="flex flex-col flex-1 justify-center gap-2">
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-lg">Name</span>
              <span className="ml-1 text-greenHighlight">*</span>
            </div>

            <input
              required
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
              className="p-2 bg-transparent resize-none outline-none border-[1px] border-greenHighlight rounded-lg"
            />
          </div>
          <div className="flex flex-col gap-2">
            <div>
              <span className="text-lg">Description</span>
              <span className="ml-1 text-xs text-greenHighlight">
                (optional)
              </span>
            </div>

            <textarea
              rows={4}
              cols={5}
              value={groupDescription}
              onChange={(e) => setGroupDescription(e.target.value)}
              className="p-2 bg-transparent resize-none outline-none border-[1px] border-greenHighlight rounded-lg mb-2"
            />
          </div>
        </div>
      </div>
      {isSuccessfull
        ? message && <span className="text-greenHighlight">{message}</span>
        : message && <span className="text-red-500">{message}</span>}

      <button
        onClick={handleCreateGroup}
        className="w-full h-[2.5rem] bg-transparent border-[1px] border-greenHighlight hover:bg-greenHighlight text-white rounded-lg"
      >
        Create
      </button>
      <div className="w-3/4 h-[1px] bg-greenHighlight mb-4" />
    </div>
  );
};

export default CreateGroup;
