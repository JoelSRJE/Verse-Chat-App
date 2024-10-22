import React, { useEffect, useState } from "react";
import { getAllUsers } from "@/utils/user/fetchuser/searchusers";
import { CiSearch } from "react-icons/ci";
import { FiUserMinus, FiUserPlus } from "react-icons/fi";
import { addFriend } from "@/utils/user/updateuser/addfriend";
import { useCookies } from "react-cookie";

const SidebarSearch = ({ profile }) => {
  const [cookies] = useCookies(["currentUser"]);
  const currentUser = cookies.currentUser;
  const [allUsers, setAllUsers] = useState([]);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      const users = await getAllUsers();
      setAllUsers(users);
    };

    fetchUsers();
  }, []);

  const handleExamples = () => {
    setShowExamples(!showExamples);
  };

  const renderExamples = () => {
    return allUsers.map((user) => (
      <div
        key={user.userId}
        className="flex items-center justify-between p-2 hover:bg-[#D9D9D9]/80 rounded-lg"
      >
        <div className="flex gap-2 items-center">
          <img
            src={user.avatar}
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="font-semibold">{user.username}</span>
        </div>
        <div className="flex gap-2">
          <button
            className="text-white hover:text-greenHighlight"
            onClick={() => addFriend(currentUser.uid, user)}
          >
            <FiUserPlus />
          </button>
          <button className="text-white hover:text-red-500">
            <FiUserMinus />
          </button>
        </div>
      </div>
    ));
  };

  return (
    <div className="flex flex-row justify-center items-center max-w-[20rem] h-20 bg-[#000000]/60">
      <div className="flex flex-row">
        {/* Search input */}
        <input
          className="w-52 h-12 rounded-l-lg p-2 text-lg bg-[#D9D9D9]/80 outline-none placeholder:text-gray-700"
          placeholder="sök användare.."
          onClick={handleExamples}
        />
        {showExamples && (
          <div className="absolute mt-12 bg-[#D9D9D9]/80 w-72 rounded-lg shadow-lg">
            {allUsers.length > 0 ? (
              renderExamples()
            ) : (
              <div className="p-2 text-center text-gray-700">
                Inga användare hittades
              </div>
            )}
          </div>
        )}
        <button className="flex items-center justify-center w-12 h-12 bg-[#D9D9D9]/80 rounded-r-lg border-1 border-l-greenHighlight">
          <CiSearch className="scale-125 text-xl text-white hover:text-gray-600 mr-2" />
        </button>
      </div>
    </div>
  );
};

export default SidebarSearch;
