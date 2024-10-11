import React from "react";
import Image from "next/image";

const LoginComponent = ({ handleContent }) => {
  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-white rounded-l-[8px] relative">
      <div className="flex flex-col justify-center items-center mb-20">
        <img src="/verselogo.png" alt="Verse logo" className="w-2/5 mb-8" />
        <span className="text-3xl font-bold mb-12">Sign In</span>
        <div className="flex flex-col gap-4 mb-4 p-2">
          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Email</span>
            <input
              type="email"
              placeholder="Email"
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />

            <button className="text-end text-sm hover:text-greenHighlight">
              Forgot password?
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 w-[12rem] hover:bg-greenHighlight">
          <input type="checkbox" className="h-6 w-6 cursor-pointer" />
          <span>Remember me</span>
        </div>
        <div className="flex flex-col justify-center items-center w-[15rem] gap-2 mt-2">
          <button
            className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight"
            onClick={() => handleContent()}
          >
            Sign In
          </button>
          <div className="w-[8rem] h-[3px] rounded-lg bg-[#000000]/40" />
          <button
            className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight"
            onClick={() => handleContent()}
          >
            Create Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
