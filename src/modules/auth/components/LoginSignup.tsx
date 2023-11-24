"use client";

import { useState } from "react";
import SignupForm from "@/modules/auth/components/SignupForm";
import LoginForm from "@/modules/auth/components/LoginForm";
import { useUserContext } from "@/app/UserContext";

export default function LoginSignup() {
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const { user, logout } = useUserContext();
  return !user ? (
    <div className="max-w-[600px] mx-auto">
      {isSignUp ? (
        <div className="grid gap-4">
          <h1>Create New Account</h1>
          <p>Enter your info to make an account.</p>
          <SignupForm />
          <p>
            Already a member?{" "}
            <button
              className="underline underline-offset-2"
              onClick={() => setIsSignUp(false)}
            >
              Log In
            </button>
          </p>
        </div>
      ) : (
        <div className="grid gap-4">
          <h1>Welcome Back</h1>
          <p>Log in with your email and password to use the app.</p>
          <LoginForm />
          <p>
            Not a member?{" "}
            <button
              className="underline underline-offset-2"
              onClick={() => setIsSignUp(true)}
            >
              Sign Up
            </button>{" "}
          </p>
        </div>
      )}
    </div>
  ) : (
    <div className="max-w-[600px] mx-auto">
      <h1>Welcome back</h1>
      <p>Have fun using the app... Whatever it does!</p>
      <button onClick={() => logout()}>Log Out</button>
    </div>
  );
}
