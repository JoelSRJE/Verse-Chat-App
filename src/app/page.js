"use client";
import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import ChattApp from "./pages/chatt/chatt";
import AuthLandingPage from "./pages/auth/page";
import { loginUser, logoutUser } from "@/utils/auth/authservices";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "currentUser",
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    if (cookies.currentUser) {
      console.log("User cookie found:", cookies.currentUser);
      setIsLoggedIn(true);

      if (typeof cookies.currentUser === "string") {
        try {
          setCurrentUser(JSON.parse(cookies.currentUser));
        } catch (error) {
          console.error("Error parsing currentUser cookie:", error);
          setCurrentUser(null);
        }
      } else if (typeof cookies.currentUser === "object") {
        setCurrentUser(cookies.currentUser);
      }
    } else {
      console.log("No user cookie found, user is not logged in!");
      setIsLoggedIn(false);
      setCurrentUser(null);
    }
  }, [cookies]);

  const handleLogin = async (email, password) => {
    try {
      const user = await loginUser(email, password);
      const token = await user.getIdToken();

      setCookie("accessToken", token, { path: "/", maxAge: 60 * 60 });
      setCookie("currentUser", JSON.stringify(user), {
        path: "/",
        maxAge: 60 * 60,
      });

      setIsLoggedIn(true);
      setCurrentUser(user);
      console.log("User logged in:", user);
    } catch (error) {
      console.error("handleLogin error: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      removeCookie("accessToken");
      removeCookie("currentUser");
      setIsLoggedIn(false);
      setCurrentUser(null);
      console.log("User logged out.");
    } catch (error) {
      console.error("handle logout error: ", error);
    }
  };

  return (
    <div className=" flex w-screen h-screen">
      <CookiesProvider>
        {isLoggedIn && currentUser ? (
          <ChattApp currentUser={currentUser} handleLogout={handleLogout} />
        ) : (
          <AuthLandingPage handleLogin={handleLogin} />
        )}
      </CookiesProvider>
    </div>
  );
}
