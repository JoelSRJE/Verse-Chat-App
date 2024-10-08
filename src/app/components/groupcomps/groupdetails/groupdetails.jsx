import React, { useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";

const GroupDetails = ({ group }) => {
  const [toggleState, setToggleState] = useState({
    owner: true,
    admin: true,
    moderator: true,
    member: true,
    offline: false,
  });

  const rankOrder = ["Owner", "Admin", "Moderator", "Member"];

  const onlineMembers = group.members.filter(
    (member) =>
      member.online.status === "online" ||
      member.online.status === "busy" ||
      member.online.status === "away"
  );

  const offlineMembers = group.members.filter(
    (member) => member.online.status === "offline"
  );

  const handleToggle = (section) => {
    setToggleState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex flex-col justify-between w-[20rem] h-full text-white rounded-r-lg overflow-x-hidden">
      {/* Top section */}
      <div className="flex justify-center items-center w-full h-[4rem] bg-[#000000]/80 text-xl rounded-tr-lg">
        Members
      </div>

      {/* Medlemmar */}
      <div className="flex flex-col justify-between h-full text-xl gap-2 p-2 bg-[#000000]/60">
        {/* Online medlemmar */}
        <div className="p-2">
          {rankOrder.map((rank) => {
            const membersInRank = onlineMembers.filter(
              (member) => member.rank === rank
            );

            if (membersInRank.length > 0) {
              return (
                <div key={rank}>
                  <div className="flex justify-between pl-2 pr-2">
                    <h2 className="text-lg text-white my-2">
                      {rank} - {"("}
                      <span className="text-sm">{membersInRank.length}</span>
                      {")"}
                    </h2>
                    <button
                      onClick={() => handleToggle(rank.toLocaleLowerCase())}
                    >
                      {toggleState[rank.toLocaleLowerCase()] ? (
                        <CiCircleChevUp className="scale-125" />
                      ) : (
                        <CiCircleChevDown className="scale-125" />
                      )}
                    </button>
                  </div>

                  {toggleState[rank.toLowerCase()] &&
                    membersInRank.map((member, idx) => (
                      <div
                        key={idx}
                        className="flex items-center p-1 hover:bg-[#535353]/90 cursor-pointer"
                      >
                        <img
                          src={member.picture}
                          className="w-[2rem] h-auto ml-2"
                          alt="Profile picture"
                        />
                        <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 ml-2 -translate-x-[1.2rem] translate-y-1/2">
                          <div
                            className="w-[0.5rem] h-[0.5rem] rounded-full"
                            style={{ backgroundColor: member.online.color }}
                          />
                        </div>
                        <span>{member.username}</span>
                      </div>
                    ))}
                </div>
              );
            }
            return null;
          })}
        </div>

        {/* Offline medlemmar */}
        <div className="p-2">
          {offlineMembers.length > 0 && (
            <div>
              <div className="flex justify-between pl-2 pr-2">
                <h2 className="text-lg text-white my-2">
                  Offline - {"("}
                  <span className="text-sm text-gray-400">
                    {offlineMembers.length}
                  </span>
                  {")"}
                </h2>
                <button onClick={() => handleToggle("offline")}>
                  {toggleState.offline ? (
                    <CiCircleChevUp className="scale-125" />
                  ) : (
                    <CiCircleChevDown className="scale-125" />
                  )}
                </button>
              </div>

              {toggleState.offline &&
                offlineMembers.map((member, idx) => (
                  <div
                    key={idx}
                    className="flex items-center p-1 hover:bg-[#535353]/90 cursor-pointer"
                  >
                    <img
                      src={member.picture}
                      className="w-[2rem] h-auto ml-2"
                      alt="Profile picture"
                    />
                    <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 ml-2 -translate-x-[1.2rem] translate-y-1/2">
                      <div
                        className="w-[0.5rem] h-[0.5rem] rounded-full"
                        style={{ backgroundColor: member.online.color }}
                      />
                    </div>
                    <span>{member.username}</span>
                  </div>
                ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Section */}
      <div className="w-[20rem] h-[4rem] bg-[#000000]/80" />
    </div>
  );
};

export default GroupDetails;
