import React from "react";
import Image from "next/image";

const LoginPage = () => {
  const getChar = () => {
    const appName = "Verse";
    const colors = ["#C6DEF1", "#C9E4DE", "#F2C6DE", "#F7D9C4", "#DBCDF0"];
    return appName.split("").map((char, idx) => (
      <span
        key={idx}
        style={{ color: colors[idx] }}
        className="text-5xl font-bold [text-shadow:_1px_1px_2px_gray]"
      >
        {char}
      </span>
    ));
  };

  getChar();

  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen">
      {/* left side */}
      <div className="relative flex-1 max-w-fit">
        <img
          src="/loginbg.jpg"
          alt="Picture of a phone and laptop"
          className="h-screen w-full object-fit shadow-xl rounded-lg"
        />

        {/* overlay */}
        <div className="overlay absolute inset-0 opacity-90 rounded-lg" />

        <div className="absolute inset-0 flex flex-col gap-4 justify-center items-center">
          <div className="h-auto p-4 rounded-lg bg-[#FFF]/80 w-[30rem]">
            <h1 className="text-black text-center text-5xl font-bold ">
              Welcome to {getChar()}!
            </h1>
          </div>{" "}
          <span className="text-xl text-white font-semibold w-[40rem] [text-shadow:_1px_1px_2px_gray]">
            Join the conversation and stay connected with your friends and
            communities in real-time. Wether you’re chatting one-on-one or in
            group discussions, Verse makes it eay to share thoughts, ideas, and
            moments.
          </span>
          <div className="flex flex-col w-[40rem] mb-4">
            <span className="text-white font-semibold text-2xl text-center [text-shadow:_1px_1px_2px_gray]">
              Sign in to continue
            </span>
            <span className="text-white font-medium [text-shadow:_1px_1px_gray]">
              Already have an account? Enter your details to access your chats
              and start messaging.
            </span>
          </div>
          <div className="flex flex-col w-[40rem] mb-4">
            <span className="text-white font-semibold text-2xl text-center [text-shadow:_1px_1px_2px_gray]">
              Create an Account
            </span>
            <span className="text-white font-medium [text-shadow:_1px_1px_gray]">
              New to Verse? Sign up now and be part of the conversation. It's
              quick and easy!
            </span>
          </div>
          <div>
            <img src="/chattingsvg.svg" className="mb-4" />
          </div>
          <span className="text-white font-medium">
            Stay connected, stay informed, and start chatting today!
          </span>
        </div>
      </div>

      {/* right side */}
      <div className="flex flex-col flex-1 justify-center items-center w-screen h-screen bg-white rounded-l-[8px]">
        <img src="/verselogo.png" alt="Verse logo" className="w-1/5 mb-8" />
        <span className="text-3xl font-bold mb-12">Sign In</span>
        <div className="flex flex-col gap-4 mb-4">
          <div className="flex flex-col gap-1">
            <span className="text-lg">Email</span>
            <input
              type="email"
              placeholder="Email"
              className="h-12 px-4 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-lg">Password</span>
            <input
              type="password"
              placeholder="Password"
              className="h-12 px-4 rounded-lg border-[1px] border-greenHighlight"
            />

            <button className="text-end text-sm hover:text-greenHighlight">
              Forgot password?
            </button>
          </div>
        </div>
        <div className="flex flex-row justify-start items-center gap-2 w-[12rem]">
          <input type="checkbox" className="h-6 w-6 cursor-pointer" />
          <span>Remember me</span>
        </div>

        <div className="flex flex-col justify-center items-center w-[12rem] gap-2 mt-2">
          <button className="h-[2rem] w-[12rem] border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent">
            Sign In
          </button>
          <div className="w-[8rem] h-[3px] rounded-lg bg-[#000000]/40" />
          <button className="h-[2rem] w-[12rem] border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent">
            Create Account
          </button>
        </div>

        <div className="flex items-center flex-row gap-4 mt-[4rem]">
          <button className="font-semibold hover:text-greenHighlight">
            About
          </button>
          <div className="h-5 w-[2px] rounded-lg rotate-[40deg] bg-greenHighlight" />
          <button className="font-semibold hover:text-greenHighlight">
            Contact
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
