import React, { useEffect, useRef, useState } from "react";
import LoginComponent from "./login/login";
import RegisterComponent from "./register/register";
import gsap from "gsap";

const AuthLandingPage = ({ handleLogin, setIsLoggedIn }) => {
  const [rightContent, setRightContent] = useState(true);
  const leftRef = useRef();
  const rightRef = useRef();

  useEffect(() => {
    if (leftRef.current && rightRef.current) {
      gsap.fromTo(
        leftRef.current,
        {
          x: "-100%",
          opacity: 0,
        },
        { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(
        rightRef.current,
        { x: "100%", opacity: 0 },
        { x: "0%", opacity: 1, duration: 1, ease: "power2.out" }
      );
    }
  }, []);

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

  const handleContent = () => {
    setRightContent(!rightContent);
  };

  return (
    <div className="flex flex-row justify-center items-center w-screen h-screen">
      {/* left side */}
      <div ref={leftRef} className="relative flex-1 max-w-fit">
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
          </div>
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
          <div className="flex flex-col w-[40rem]">
            <img src="/chattingsvg.svg" className="w-auto h-auto mb-4" />
            <span className="text-white font-medium text-center">
              Stay connected, stay informed, and start chatting today!
            </span>
          </div>
        </div>
      </div>

      {/* right side */}
      <div
        ref={rightRef}
        className="flex flex-col flex-1 justify-center items-center w-screen h-screen bg-white rounded-l-[8px] relative"
      >
        {/* Switch between login/register view */}
        {rightContent ? (
          <LoginComponent
            handleContent={handleContent}
            handleLogin={handleLogin}
          />
        ) : (
          <RegisterComponent handleContent={handleContent} />
        )}

        {/* About / Contact */}
        <div className="absolute bottom-4 flex items-center justify-center gap-4">
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

export default AuthLandingPage;
