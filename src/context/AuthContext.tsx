import React, { createContext, useContext, useState } from 'react';
import { isExpired } from "react-jwt";

interface AuthContextData {
  isLoggedIn: boolean;
  token: string | null;
  setToken: (value: string | null) => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  token: null,
  setToken: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
  children: React.ReactNode;
}

const isTokenExpired = (token: string | null): boolean => {
  if (!token || token === "") {
    return true;
  }

  return isExpired(token)
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [token, setTokenState] = useState<string | null>(localStorage.getItem('token'));
  const setToken = (value: string | null) => {
    if (value) {
      localStorage.setItem('token', value);
    } else {
      localStorage.removeItem('token');
    }
    setTokenState(value);
  };


  const isLoggedIn = !isTokenExpired(token);

  return (
    <AuthContext.Provider value={{ isLoggedIn, token, setToken }}>
      {children}
    </AuthContext.Provider>
  );
};
