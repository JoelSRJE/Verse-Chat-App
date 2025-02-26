"use client";
import React, { useEffect, useState } from "react";
import { CookiesProvider, useCookies } from "react-cookie";
import ChattApp from "./pages/chatt/chatt";
import AuthLandingPage from "./pages/auth/page";
import { loginUser, logoutUser } from "@/utils/auth/authservices";
import { updateUser } from "@/utils/user/updateuser/updateuser";
import { useUserProfile } from "@/app/hooks/userlistener/userlistener";
import { useGroup } from "./hooks/grouplistener/grouplistener";
import { LoadingPage } from "./components/loading/loading";

export default function Home() {
  const [timer, setTimer] = useState(300);
  const [showLoading, setShowLoading] = useState(true);
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
      } // Kontrollera och ställ in profil

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

  const groupData = useGroup(profile);

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
      const userUpdate = {
        lastSeen: new Date().getTime(),
        online: { status: "Offline", color: "#B8B8B8" },
      };
      await updateUser(currentUser.uid, userUpdate);

      await logoutUser();

      setIsLoggedIn(false);
      setCurrentUser(null);
      setProfile(null);
      removeCookie("accessToken", { path: "/" });
      removeCookie("currentUser", { path: "/" });
      removeCookie("profile", { path: "/" });
      console.log("User logged out.");
    } catch (error) {
      console.error("handle logout error: ", error);
      alert("Failed to logout. Please try again!");
    }

    console.log("Cookies after logout", cookies);
  };

  const handleLoadingFinish = () => {
    setShowLoading(false);
  };

  return (
    <div className="flex w-screen h-screen">
      <CookiesProvider>
        {showLoading ? (
          <LoadingPage onFinish={handleLoadingFinish} />
        ) : isLoggedIn && currentUser ? (
          <ChattApp
            profile={profile}
            handleLogout={handleLogout}
            currentUser={currentUser}
          />
        ) : (
          <AuthLandingPage handleLogin={handleLogin} />
        )}
      </CookiesProvider>
    </div>
  );
}
