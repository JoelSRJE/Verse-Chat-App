import React, { useEffect, useState, useRef } from "react";
import { gsap } from "gsap";

export const LoadingPage = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);
  const [progressText, setProgressText] = useState("");
  const loaderRef = useRef(null);

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

  useEffect(() => {
    if (progress <= 25) {
      setProgressText("Setting up..");
    } else if (progress <= 50) {
      setProgressText("Loading resources..");
    } else if (progress <= 75) {
      setProgressText("Verifying files..");
    } else if (progress <= 100) {
      setProgressText("Welcome !");
    }
  }, [progress]);

  useEffect(() => {
    const animation = gsap.to(loaderRef.current, {
      y: -20,
      repeat: -1,
      yoyo: true,
      duration: 1,
      ease: "power1.inOut",
    });

    return () => {
      animation.kill();
    };
  }, []);

  useEffect(() => {
    const totalDuration = 3000;
    const interval = 25;
    const step = 100 / (totalDuration / interval);

    const intervalId = setInterval(() => {
      setProgress((prevProgress) => {
        const newProgress = prevProgress + step;
        if (newProgress >= 100) {
          clearInterval(intervalId);
          setTimeout(() => {
            onFinish();
          }, 1000);

          return 100;
        }
        return newProgress;
      });
    }, interval);

    return () => clearInterval(intervalId);
  }, [onFinish]);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-gray-900 text-white text-2xl">
      <div ref={loaderRef} className="text-4xl font-bold mb-4">
        <div className="flex justify-center items-center h-screen">
          {/* Yttre  div */}
          <div className="flex justify-center items-center h-[11.6rem] w-[11.6rem] border-2 border-[#282828]/80 rotate-45">
            {/* progress */}
            <div
              className="absolute flex justify-center items-center h-[16rem] w-[16rem] -rotate-45 z-10"
              style={{
                clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
                background: `linear-gradient(to top, #4fdda9 ${progress}%, transparent ${progress}%)`,
              }}
            >
              {/* Inre div som innehåller text */}
              <div className="flex justify-center items-center text-center h-[10rem] w-[10rem] border-2 border-[#282828]/80 bg-gray-900 rotate-45 z-10 rounded-md">
                <div className="-rotate-45">
                  <h1 className="rotate-0 text-4xl font-bold">{getChar()}</h1>
                  <p className="text-base font-thin">{progressText}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
