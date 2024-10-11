"use client";
import React, { useState } from "react";

import ChattApp from "./pages/chatt/chatt";
import LoginPage from "./pages/auth/login/login";
import AuthLandingPage from "./pages/auth/login/page";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  return (
    <div className=" flex w-screen h-screen">
      {isLoggedIn ? (
        <ChattApp />
      ) : (
        <AuthLandingPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
