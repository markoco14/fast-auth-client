"use client"

import jwt_decode from "jwt-decode";
import { createContext, useContext, useEffect, useState } from "react";
import { jwtAdapter } from "@/app/modules/auth/adapters/jwtAdapter";
import Cookie from 'js-cookie';
import { cookies } from "next/headers";

type UserContextProviderProps = {
  children: React.ReactNode; // not allowed: React.ReactNode
};

type AuthUser = {
  email: string;
  user_id: number;
};

type UserContext = {
  user: AuthUser | null;
  loginUser: Function;
  logout: Function;
};

const UserContext = createContext<UserContext | null>(null);

export default function UserContextProvider({
  children,
}: UserContextProviderProps) {
  const [authTokens, setAuthTokens] = useState<any>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  let loginUser = async (formData: any) => {
    try {
      await jwtAdapter.get({ payload: formData }).then((res) => {
        setAuthTokens(res);
        setUser(jwt_decode(res.access_token));

        // set token in cookies
        Cookie.set("accessToken", res.access_token, { expires: 1 }); // Expires in 7 days, you can adjust this
        Cookie.set("refreshToken", res.refresh_token, { expires: 7 });

        // set token in local storage
        localStorage.setItem("authTokens", JSON.stringify(res));
      });
    } catch (error) {
      console.error(error);
    }
  };

  let logout = () => {
    setUser(null);
    setAuthTokens(null);
    // remove from cookoie
    Cookie.remove("accessToken");
    Cookie.remove("refreshToken");

    // remove from local storage
    localStorage.removeItem("authTokens");
  };

  useEffect(() => {
    let updateToken = async () => {
      try {
        await jwtAdapter
          .refresh({ access_token: authTokens.access_token, refresh_token: authTokens.refresh_token })
          .then((res) => {
            setAuthTokens(res);
            setUser(jwt_decode(res.access_token));
            // set token in cookies
            Cookie.set("accessToken", res.access_token, { expires: 1 }); // Expires in 7 days, you can adjust this
            Cookie.set("refreshToken", res.refresh_token, { expires: 7 });

            // set in local storage
            localStorage.setItem("authTokens", JSON.stringify(res));
          });
      } catch (error) {
        console.error(error);
        logout();
      }
    };
    const tenSeconds = 1000 * 10
    const oneMinute = 1000 * 60 * 1
    const fiveMinutes = 1000 * 60 * 5;
    const tenMinutes = 1000 * 60 * 10;
    if (!user || !authTokens) {
      const tokens = localStorage.getItem("authTokens");

      if (typeof tokens === "string") {
        setAuthTokens(() => JSON.parse(tokens));
        setUser(() => jwt_decode(tokens));
      }
    } else {
      const interval = setInterval(() => {
        if (authTokens) {
          updateToken();
        }
      }, tenMinutes);
      return () => clearInterval(interval);
    }
  }, [authTokens, user]);

  return (
    <UserContext.Provider
      value={{
        user: user,
        loginUser: loginUser,
        logout: logout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error(
      "useUserContext must be consumed within a UserContextProvider"
    );
  }
  return context;
}
