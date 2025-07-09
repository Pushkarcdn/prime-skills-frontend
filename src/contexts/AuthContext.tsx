/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-refresh/only-export-components */

import {
  type ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import useFetch from "../hooks/useFetch";
import hitApi from "../api/axios";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  isSignedIn: boolean;
  setIsSignedIn: (value: boolean) => void;
  signOut: () => Promise<boolean>;
  userData: any;
  loading: boolean;
  refetch: () => void;
  isFinished: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const navigate = useNavigate();

  const [isSignedIn, setIsSignedIn] = useState<boolean>(false);

  const signOut = async () => {
    try {
      const res = await hitApi("/signout");
      if (res?.success) {
        setIsSignedIn(false);
        navigate("/");
      }
      return res?.success;
    } catch (error) {
      console.error("Error during logout:", error);
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
        refetch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
