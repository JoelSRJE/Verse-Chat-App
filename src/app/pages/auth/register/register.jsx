import React, { useState } from "react";

const RegisterPage = ({ handleContent }) => {
  const [avatar, setAvatar] = useState(null);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleAvatar = (e) => {
    setAvatar(e.target.files[0]);
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-white rounded-l-[8px] relative">
      <div className="flex flex-col justify-center items-center mb-20">
        <img src="/verselogo.png" alt="Verse logo" className="w-2/5 mb-8" />
        <span className="text-3xl font-bold mb-12">Register</span>
        <div className="flex flex-col gap-4 mb-4 p-2">
          <div className="flex flex-col justify-center items-center gap-2">
            <div className="flex justify-center items-center w-[8.5rem] h-[8.5rem] border-2 border-dashed border-greenHighlight rounded-lg">
              {avatar ? (
                <img
                  src={URL.createObjectURL(avatar)}
                  alt="User avatar preview"
                  className="w-[8.5rem] h-[8.3rem] rounded-lg"
                />
              ) : (
                <div>
                  <span className="italic">Choose image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={(e) => handleAvatar(e)}
              className="bg-greenHighlight p-2 rounded-lg text-white cursor-pointer"
            />
          </div>

          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Username</span>
            <input
              type="text"
              placeholder="Enter username"
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Email</span>
            <input
              type="email"
              placeholder="Enter email"
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              placeholder="Choose password"
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[15rem] gap-2 mt-2">
          <button className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight">
            Create Account
          </button>
          <div className="w-[8rem] h-[3px] rounded-lg bg-[#000000]/40" />
          <button
            className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight"
            onClick={() => handleContent()}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
