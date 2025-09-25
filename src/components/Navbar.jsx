import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo / App Name */}
      <h1 className="text-xl font-bold">
        <Link to="/">Inventory System</Link>
      </h1>

      {/* Top Nav Links */}
      <div className="space-x-6">
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/suppliers" className="hover:underline">
          Suppliers
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
