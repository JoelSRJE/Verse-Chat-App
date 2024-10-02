import React from "react";
import LoginPage from "./pages/auth/login";
import ChattApp from "./pages/chatt/chatt";

export default function Home() {
  return (
    <div className=" flex w-screen h-screen">
      <ChattApp />
    </div>
  );
}
