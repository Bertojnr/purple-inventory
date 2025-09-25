// src/components/ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth"; // ✅ correct import

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth(); // get the current user

  if (!user) {
    // Not logged in, redirect to login
    return <Navigate to="/" replace />;
  }

  // Logged in, render the child component
  return children;
};

export default ProtectedRoute;
