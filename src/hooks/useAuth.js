import { useState, useEffect } from "react";

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  // Load user & token from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    // Only parse if storedUser exists and is not "undefined"
    if (storedUser && storedUser !== "undefined" && storedToken) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        setToken(storedToken);
      } catch (err) {
        console.error("Failed to parse user from localStorage:", err);
        cleanupStorage();
      }
    } else {
      cleanupStorage();
    }
  }, []);

  const cleanupStorage = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  // Login function
  const login = (userData, authToken) => {
    if (!userData || !authToken) return;

    setUser(userData);
    setToken(authToken);

    try {
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", authToken);
    } catch (err) {
      console.error("Failed to save user/token to localStorage:", err);
    }
  };

  // Logout function
  const logout = () => cleanupStorage();

  // Boolean flag to check if user is logged in
  const isLoggedIn = !!user && !!token;

  return { user, token, login, logout, isLoggedIn };
}
