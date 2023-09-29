"use client";

import { useState } from "react";
import Signup from "./Signup";
import Login from "./Login";
import { useUserContext } from "@/app/UserContext";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  return (
    <>
      <div>
        <button onClick={() => setIsSignUp(true)}>Sign Up</button>
        <button onClick={() => setIsSignUp(false)}>Log In</button>
      </div>
      {isSignUp ? <Signup /> : <Login />}
    </>
  );
}
