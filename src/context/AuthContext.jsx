// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // 👈 CRITICAL: Add loading state

  // Load user & token from localStorage on mount
  useEffect(() => {
    try {
      const storedUser = JSON.parse(localStorage.getItem("user"));
      const storedToken = localStorage.getItem("token");
      
      if (storedUser && storedToken) {
        setUser(storedUser);
        setToken(storedToken);
      }
    } catch (err) {
      console.error("Failed to parse user from localStorage:", err);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    } finally {
      // 👈 CRITICAL: Set loading to false once the check is complete
      setIsLoading(false); 
    }
  }, []);

  const login = (userData, authToken) => {
    setUser(userData);
    setToken(authToken);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", authToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  const isLoggedIn = !!user && !!token;

  return (
    <AuthContext.Provider 
      // 👈 Include isLoading in the context value
      value={{ user, token, login, logout, isLoggedIn, isLoading }} 
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);