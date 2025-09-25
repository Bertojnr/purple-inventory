// src/hooks/useAuth.js
import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);

  // Load user from localStorage (persist login across refresh)
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const isLoggedIn = !!user;

  return { user, login, logout, isLoggedIn };
}
