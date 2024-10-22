import React, { useEffect, useState } from "react";

const LoginComponent = ({ handleContent, handleLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail) {
      setEmail(savedEmail);
    }

    if (savedPassword) {
      setPassword(savedPassword);
    }
  }, []);

  const handleLoginClick = async () => {
    if (!email || !password) {
      setMessage("All fields must be filled in");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      handleLogin(email, password);

      if (rememberMe) {
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
      } else {
        localStorage.removeItem("email", email);
        localStorage.removeItem("password", password);
      }

      setLoading(false);
      setTimeout(() => {
        setMessage("Login successful");
      }, 2000);
    } catch (error) {
      console.error("LoginClick error: ", error);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center bg-white rounded-l-[8px] relative">
      <div className="flex flex-col justify-center items-center mb-20">
        <img src="/verselogo.png" alt="Verse logo" className="w-2/5 mb-8" />
        <span className="text-3xl font-bold mb-12">
          {loading ? "Attempting to sign in" : "Sign in"}
        </span>
        <span>{message}</span>
        <div className="flex flex-col gap-4 mb-4 p-2">
          <div className="flex flex-col text-lg">
            <span className=" font-semibold">Email</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold">Password</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-[3rem] p-2 rounded-lg border-[1px] border-greenHighlight"
            />

            <button className="text-end text-sm hover:text-greenHighlight">
              Forgot password?
            </button>
          </div>
        </div>

        <div className="flex flex-row justify-start items-center gap-2 w-[12rem]">
          <input
            type="checkbox"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            className="h-6 w-6 cursor-pointer shadow-lg"
          />
          <span>Remember me</span>
        </div>

        <div className="flex flex-col justify-center items-center w-[15rem] gap-2 mt-2">
          <button
            className="h-[2.5rem] w-[14rem] text-lg font-semibold text-white border-2 border-greenHighlight bg-greenHighlight rounded-lg ease-in duration-200 hover:bg-transparent hover:text-greenHighlight"
            onClick={handleLoginClick}
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign in"}
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
