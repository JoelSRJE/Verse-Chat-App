import React, { useEffect, useState } from "react";
import { CiCircleChevDown, CiCircleChevUp } from "react-icons/ci";
import { subscribeToUsersById } from "@/utils/allusers/subscribetousersbyid";
import { CiLogout } from "react-icons/ci";

const GroupDetails = ({ group, handleLogout }) => {
  const [toggleState, setToggleState] = useState({
    owner: true,
    admin: true,
    moderator: true,
    member: true,
    offline: false,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [members, setMembers] = useState(group.members || []);

  useEffect(() => {
    setMembers(group.members || []);
    const unsubscribeFunctions = [];

    const updateMemberStatus = (userId) => {
      const unsubscribe = subscribeToUsersById(userId, (updatedUser) => {
        setMembers((prevMembers) => {
          const updatedMembers = prevMembers.map((member) => {
            if (member.userId === userId) {
              return {
                ...member,
                ...updatedUser,
                lastActive: Date.now(),
              };
            }
            return member;
          });
          return updatedMembers;
        });
      });
      unsubscribeFunctions.push(unsubscribe);
    };

    members.forEach((member) => {
      updateMemberStatus(member.userId);
    });

    setLoading(false);

    return () => {
      unsubscribeFunctions.forEach((unsubscribe) => unsubscribe());
    };
  }, [group.members]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  const rankOrder = ["Owner", "Admin", "Moderator", "Member"];

  const onlineMembers = members.filter((member) => {
    return (
      member.online?.status === "Online" ||
      member.online?.status === "Busy" ||
      member.online?.status === "Away"
    );
  });

  const offlineMembers = members.filter((member) => {
    return member.online?.status === "Offline";
  });

  const handleToggle = (section) => {
    setToggleState((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="flex flex-col justify-between min-w-80 h-full text-white rounded-r-lg">
      {/* Top section */}
      <div className="flex items-center w-full min-h-16 bg-[#000000]/80 text-xl rounded-tr-lg">
        <span className="ml-20">Members</span>
      </div>

      {/* Members Section */}
      <div className="flex flex-col justify-between h-full text-xl gap-2 p-2 bg-[#000000]/60">
        {/* Online members */}
        <div className="p-2">
          {rankOrder.map((rank) => {
            const membersInRank = onlineMembers.filter(
              (member) => member.role === rank
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
                    <button onClick={() => handleToggle(rank.toLowerCase())}>
                      {toggleState[rank.toLowerCase()] ? (
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
                          src={member.avatar}
                          className="w-[2rem] h-auto ml-2"
                          alt="Profile picture"
                        />
                        <div className="flex justify-center items-center w-[1rem] h-[1rem] rounded-full bg-[#000000]/100 ml-2 -translate-x-[1.2rem] translate-y-1/2">
                          <div
                            className="w-[0.5rem] h-[0.5rem] rounded-full animate-pulse"
                            style={{
                              backgroundColor: member.online.color,
                            }}
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
        {/* Offline members */}
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
                      src={member.avatar}
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

      {/* Bottom section */}
      <div className="w-full bg-[#000000]/80 rounded-br-lg">
        <div className="flex justify-end h-16  rounded-br-lg text-white">
          {/* logout */}
          <button
            className="abslute text-white w-12 rounded-tr-lg hover:scale-110 transition-all duration-200"
            onClick={handleLogout}
          >
            <CiLogout className="scale-125" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GroupDetails;
