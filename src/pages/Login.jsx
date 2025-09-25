// src/pages/Login.jsx
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState({ show: false, type: "", message: "" });

  const handleLogin = (e) => {
    e.preventDefault();

    if (!email || !password) {
      setToast({
        show: true,
        type: "error",
        message: "Please fill in all fields",
      });
      return;
    }

    // 🚧 Later: Replace this with API call
    setToast({
      show: true,
      type: "success",
      message: "Login successful!",
    });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-purple-900 px-4">
      <div className="w-full max-w-md bg-red-800 rounded-2xl shadow-lg p-6">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Purple Inventory
        </h1>

        <form onSubmit={handleLogin} className="space-y-4">
          <Input
            label="Email"
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <Button type="submit">Login</Button>
        </form>
      </div>

      {toast.show && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast({ show: false, type: "", message: "" })}
        />
      )}
    </div>
  );
};

export default Login;
