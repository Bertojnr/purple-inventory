// src/pages/Login.jsx
import React, { useState } from "react";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import manage from "../assets/manage.jpg";

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
   <div className="flex min-h-screen bg-gray-100 flex-col md:flex-row">
  {/* Illustration */}
  <div className="flex-1 flex items-center justify-center bg-gray-200 p-4">
    <img
      src={manage}
      alt="Inventory Illustration"
      className="max-w-full max-h-96 md:max-h-full object-contain"
    />
  </div>

  {/* Login Form */}
  <div className="flex-1 flex items-center justify-center p-6">
    <div className="w-full max-w-md bg-white rounded-3xl shadow-2xl p-8">
      <h1 className="text-3xl font-extrabold text-center text-purple-900 mb-6">
        Purple Inventory
      </h1>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          label="Email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
        />

        <Input
          label="Password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border-purple-300 focus:border-purple-500 focus:ring focus:ring-purple-200"
        />

        <Button
          type="submit"
          className="w-full bg-purple-700 hover:bg-purple-800 text-white font-semibold py-3 rounded-xl transition-all duration-300"
        >
          Login
        </Button>
      </form>
    </div>
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
