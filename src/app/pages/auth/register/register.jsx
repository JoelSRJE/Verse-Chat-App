import React, { useState } from "react";
import { registerUser } from "@/utils/auth/authservices";

const RegisterComponent = ({ handleContent }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const [message, setMessage] = useState(null);
  const [isSuccessfull, setIsSuccessfull] = useState(false);

  const handleAvatar = (e) => {
    setAvatarFile(e.target.files[0]);
  };

  const clearFields = () => {
    setAvatarFile(null);
    setUsername("");
    setEmail("");
    setPassword("");
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      setMessage("All fields must be filled in!");
      return;
    }

    try {
      const defaultAvatar = "/avatarplaceholder.png";
      const finalAvatar = avatarFile ? avatarFile : defaultAvatar;

      const regUser = await registerUser(
        finalAvatar,
        username,
        email,
        password
      );
      setIsSuccessfull(true);
      setMessage("Your account has been successfully created!");
      clearFields();
      setTimeout(() => {
        setMessage(null);
      }, 5000);
    } catch (error) {
      setIsSuccessfull(false);
      setMessage(error.message);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-white rounded-l-[8px] relative">
      <div className="flex flex-col justify-center items-center mb-20">
        <img src="/verselogo.png" alt="Verse logo" className="w-2/5 mb-8" />
        <span className="text-3xl font-bold mb-4">Register</span>
        <span className="text-xl font-semibold mb-4 w-[18rem]">
          Please fill out the form below to register an account
        </span>
        {isSuccessfull ? (
          <span className="text-xl font-semibold text-green-700 mb-4">
            {message}
          </span>
        ) : (
          <span className="text-xl font-bold text-red-700 mb-4">{message}</span>
        )}
        <div className="flex flex-col gap-4 mb-4 p-2">
          <div className="flex flex-col justify-center items-center gap-4">
            <div className="flex justify-center items-center w-[8.5rem] h-[8.5rem] border-2 border-dashed border-greenHighlight rounded-lg">
              {avatarFile ? (
                <div>
                  <img
                    src={URL.createObjectURL(avatarFile)}
                    alt="User avatar preview"
                    className="w-[8.5rem] h-[8.3rem] rounded-lg"
                  />
                </div>
              ) : (
                <div className="flex flex-col justify-center items-center">
                  <img
                    src="/avatarplaceholder.png"
                    alt="avatar"
                    className="w-[6.5rem] h-[6.5rem] rounded-lg"
                  />
                  <span className="italic">Choose image</span>
                </div>
              )}
            </div>
            <input
              type="file"
              onChange={handleAvatar}
              className="p-2 rounded-lg  cursor-pointer"
            />
          </div>

          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Username</span>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Email</span>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              placeholder="Choose password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
        </div>

        <div className="flex flex-col justify-center items-center w-[15rem] gap-2 mt-2">
          <button
            className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight"
            onClick={handleRegister}
          >
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

export default RegisterComponent;
