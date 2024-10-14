"use client";
import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import ChattApp from "./pages/chatt/chatt";
import AuthLandingPage from "./pages/auth/page";
import { loginUser, logoutUser } from "@/utils/auth/authservices";
import { updateUser } from "@/utils/user/updateuser/updateuser";
import { useUserProfile } from "@/utils/user/userlistener/userlistener";

export default function Home() {
  const [cookies, setCookie, removeCookie] = useCookies([
    "accessToken",
    "currentUser",
    "profile",
  ]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (cookies.currentUser) {
      setIsLoggedIn(true);

      if (typeof cookies.currentUser === "string") {
        try {
          const user = JSON.parse(cookies.currentUser);
          setCurrentUser(user);
        } catch (error) {
          console.error("Error parsing currentUser cookie:", error);
          setCurrentUser(null);
          setProfile(null);
        }
      } else if (typeof cookies.currentUser === "object") {
        setCurrentUser(cookies.currentUser);
      }

      // Kontrollera och ställ in profil
      if (cookies.profile) {
        if (typeof cookies.profile === "string") {
          try {
            const userProfile = JSON.parse(cookies.profile);
            setProfile(userProfile);
          } catch (error) {
            console.error("Error parsing profile cookie:", error);
            setProfile(null);
          }
        } else if (typeof cookies.profile === "object") {
          setProfile(cookies.profile);
        }
      }
    } else {
      console.log("No user cookie found, user is not logged in!");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setProfile(null);
    }
  }, [cookies]);

  const userProfile = useUserProfile(
    isLoggedIn && currentUser ? currentUser.uid : null
  );

  useEffect(() => {
    if (userProfile) {
      setProfile(userProfile);
    }
  }, [userProfile]);

  const handleLogin = async (email, password) => {
    try {
      const { authData, userData } = await loginUser(email, password);
      const token = await authData.getIdToken();

      setCookie("accessToken", token, { path: "/", maxAge: 60 * 60 });
      setCookie("currentUser", JSON.stringify(authData), {
        path: "/",
        maxAge: 60 * 60,
      });
      setCookie("profile", JSON.stringify(userData), {
        path: "/",
        maxAge: 60 * 60,
      });

      setIsLoggedIn(true);
      setCurrentUser(authData);
      setProfile(userData);

      const updates = {
        lastSeen: new Date().getTime(),
        online: { status: "Online", color: "#4FDDA9" },
      };
      await updateUser(authData.uid, updates);
    } catch (error) {
      console.error("handleLogin error: ", error);
    }
  };

  const handleLogout = async () => {
    try {
      const updates = {
        lastSeen: new Date().getTime(),
        online: { status: "Offline", color: "#B8B8B8" },
      };
      await updateUser(currentUser.uid, updates);
      await logoutUser();
      removeCookie("accessToken");
      removeCookie("currentUser");
      removeCookie("profile");
      setIsLoggedIn(false);
      setCurrentUser(null);
      setProfile(null);
      console.log("User logged out.");
    } catch (error) {
      console.error("handle logout error: ", error);
    }
  };

  return (
    <div className=" flex w-screen h-screen">
      <CookiesProvider>
        {isLoggedIn && currentUser ? (
          <ChattApp profile={profile} handleLogout={handleLogout} />
        ) : (
          <AuthLandingPage handleLogin={handleLogin} />
        )}
      </CookiesProvider>
    </div>
  );
}
