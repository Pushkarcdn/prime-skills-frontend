/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */

import { type ReactNode, useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import hitApi from "../../api/axios";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "./AuthContext";

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signOut = async () => {
    try {
      const res = await hitApi("/sign-out");
      if (res?.success) {
        setIsSignedIn(false);
        navigate("/sign-in");
      }
      return res?.success;
    } catch (error) {
      console.error("Error during logout: ", error);
    }
  };

  const signIn = async (data: any) => {
    try {
      const res = await hitApi("/sign-in", "POST", data);
      if (res?.success) {
        setIsSignedIn(true);
        refetch();
      }
      return res;
    } catch (error) {
      console.error("Error during login: ", error);
    }
  };

  const {
    data: userData,
    fetchData: refetch,
    loading,
    isFinished,
  } = useFetch("/me") as any;

  useEffect(() => {
    if (userData) setIsSignedIn(!!userData);
  }, [userData]);

  return (
    <AuthContext.Provider
      value={{
        isSignedIn,
        loading,
        isFinished,
        setIsSignedIn,
        userData,
        signOut,
        signIn,
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
