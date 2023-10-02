"use client";

import { useState } from "react";
import Signup from "@/modules/auth/components/Signup";
import Login from "@/modules/auth/components/Login";
import { useUserContext } from "@/app/UserContext";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { user, logout } = useUserContext();
  return !user ? (
    <>
      <div className="flex gap-4">
        <button onClick={() => setIsSignUp(true)}>Sign Up</button>
        <button onClick={() => setIsSignUp(false)}>Log In</button>
      </div>
      {isSignUp ? <Signup /> : <Login />}
    </>
  ) : (
    <>
      <p>You signed in!</p>
      <p>{user.email}</p>
      <button onClick={() => logout()}>Log Out</button>
    </>
  );
}
