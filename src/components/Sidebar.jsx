// src/components/Sidebar.jsx
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ShoppingCart,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  // ✅ Safe parse user from localStorage
  let user = null;
  try {
    const storedUser = localStorage.getItem("user");
    if (storedUser && storedUser !== "undefined") {
      user = JSON.parse(storedUser);
    }
  } catch (err) {
    console.warn("Failed to parse user from localStorage", err);
  }
  const role = user?.role || "Staff";

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/products", label: "Products", icon: <Package size={20} /> },
    { path: "/suppliers", label: "Suppliers", icon: <Users size={20} /> },
    { path: "/transactions", label: "Transactions", icon: <ShoppingCart size={20} /> },
    { path: "/reports", label: "Reports", icon: <FileText size={20} /> },
    ...(role === "Admin"
      ? [{ path: "/users", label: "User Management", icon: <Users size={20} /> }]
      : []),
  ];

  const SidebarContent = (
    <div
      className={`bg-gray-800 text-white h-full flex flex-col transition-all duration-300 
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Header + Toggle */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-700">
        {!collapsed && <h1 className="text-lg font-bold">Purple Inv.</h1>}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="p-1 hover:bg-gray-700 rounded"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>
      </div>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 transition-colors
              ${
                location.pathname === item.path
                  ? "bg-gray-700 border-l-4 border-purple-500"
                  : "hover:bg-gray-700"
              }`}
            onClick={() => setMobileOpen(false)}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );

  return (
    <>
      {/* 🔹 Desktop Sidebar */}
      <div className="hidden md:flex">{SidebarContent}</div>

      {/* 🔹 Mobile Hamburger */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 bg-gray-800 text-white p-2 rounded"
      >
        <Menu size={20} />
      </button>

      {/* 🔹 Mobile Drawer */}
      <div
        className={`fixed inset-0 z-40 flex transition-transform duration-300 ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        role="dialog"
        aria-modal="true"
      >
        <div className="relative w-64 h-full">{SidebarContent}</div>

        {/* Overlay */}
        <div
          className="flex-1 bg-black opacity-50"
          onClick={() => setMobileOpen(false)}
        ></div>

        {/* Close button */}
        <button
          onClick={() => setMobileOpen(false)}
          className="absolute top-4 right-4 text-white"
        >
          <X size={24} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
