// src/components/ProtectedRoute.jsx (FIXED)
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext";

const ProtectedRoute = ({ children }) => {
  // ✅ Get both isLoggedIn AND isLoading
  const { isLoggedIn, isLoading } = useAuthContext(); 

  // 1. Show a loading state while the AuthContext checks localStorage
  if (isLoading) {
    return (
      <div style={{ padding: "20px", textAlign: "center" }}>
        Loading User Data...
      </div>
    ); 
  }

  // 2. Only redirect if loading is finished AND the user is not logged in
  if (!isLoggedIn) {
    // Navigate to the root route, assuming it's the login page
    return <Navigate to="/" replace />;
  }

  // 3. Render the protected content (e.g., Dashboard)
  return children;
};

export default ProtectedRoute;