import jwt_decode from "jwt-decode";
import { createContext, useContext, useState } from "react";
import { jwtAdapter } from "@/app/modules/auth/adapters/jwtAdapter";

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
        setUser(jwt_decode(res.access));
        localStorage.setItem("authTokens", JSON.stringify(res));
      });
    } catch (error) {
      console.error(error);
    }
  };

  let logout = () => {
    setUser(null);
    setAuthTokens(null);
    localStorage.removeItem("authTokens");
  };

  // useEffect(() => {
  //   let updateToken = async () => {
  //     try {
  //       await jwtAdapter
  //         .refresh({ refresh: authTokens.refresh })
  //         .then((res) => {
  //           setAuthTokens(res);
  //           setUser(jwt_decode(res.access));
  //           localStorage.setItem("authTokens", JSON.stringify(res));
  //         });
  //     } catch (error) {
  //       console.error(error);
  //       logout();
  //     }
  //   };

  //   const tenMinutes = 1000 * 60 * 10;
  //   if (!user || !authTokens) {
  //     const tokens = localStorage.getItem("authTokens");

  //     if (typeof tokens === "string") {
  //       setAuthTokens(() => JSON.parse(tokens));
  //       setUser(() => jwt_decode(tokens));
  //     }
  //   } else {
  //     const interval = setInterval(() => {
  //       if (authTokens) {
  //         updateToken();
  //       }
  //     }, tenMinutes);
  //     return () => clearInterval(interval);
  //   }
  // }, [authTokens, user]);

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