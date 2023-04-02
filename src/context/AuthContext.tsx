import React, { createContext, useContext, useState } from 'react';

interface AuthContextData {
  isLoggedIn: boolean;
  setLoggedIn: (value: boolean) => void;
}

const AuthContext = createContext<AuthContextData>({
  isLoggedIn: false,
  setLoggedIn: () => {},
});

export const useAuth = () => useContext(AuthContext);

interface AuthProviderProps {
	children: React.ReactNode;
}


export const AuthProvider: React.FC<AuthProviderProps> = ({children}) => {
	const [isLoggedIn, setLoggedIn] = useState(false);
  
	return (
	  <AuthContext.Provider value={{ isLoggedIn, setLoggedIn }}>
		{children}
	  </AuthContext.Provider>
	);
  };
  