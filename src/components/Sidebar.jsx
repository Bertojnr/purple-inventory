import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Package,
  Users,
  FileText,
  ShoppingCart,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { path: "/dashboard", label: "Dashboard", icon: <LayoutDashboard size={20} /> },
    { path: "/products", label: "Products", icon: <Package size={20} /> },
    { path: "/suppliers", label: "Suppliers", icon: <Users size={20} /> },
    { path: "/transactions", label: "Transactions", icon: <ShoppingCart size={20} /> },
    { path: "/reports", label: "Reports", icon: <FileText size={20} /> },
    { path: "/users", label: "User Management", icon: <Users size={20} /> },
  ];

  return (
    <div
      className={`bg-gray-800 text-white h-screen transition-all duration-300 flex flex-col
        ${collapsed ? "w-16" : "w-64"}`}
    >
      {/* Toggle Button */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="p-2 hover:bg-gray-700"
      >
        {collapsed ? "➡️" : "⬅️"}
      </button>

      {/* Menu */}
      <nav className="flex-1 mt-4">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors ${
              location.pathname === item.path ? "bg-gray-700" : ""
            }`}
          >
            {item.icon}
            {!collapsed && <span>{item.label}</span>}
          </Link>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;
