"use client";
import React, { useEffect, useState } from "react";

import ChattApp from "./pages/chatt/chatt";
import AuthLandingPage from "./pages/auth/page";
import { getUserData } from "@/utils/userdata/getuserdata";

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getUserData();
        setCurrentUser(data);
        setIsLoggedIn(true);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setIsLoggedIn(false);
      }
    };

    fetchUserData();
  }, []);

  if (!currentUser) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" flex w-screen h-screen">
      {isLoggedIn ? (
        <ChattApp currentUser={currentUser} />
      ) : (
        <AuthLandingPage setIsLoggedIn={setIsLoggedIn} />
      )}
    </div>
  );
}
