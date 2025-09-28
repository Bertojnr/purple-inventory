// // src/components/Navbar.jsx
// import React from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../context/AuthContext"; // ✅ use context

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { user, logout } = useAuthContext(); // ✅ get user & logout from context
//   const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

//   const handleLogout = () => {
//     logout(); // ✅ clears context + localStorage
//     navigate("/"); // redirect to login
//   };

//   return (
//     <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
//       {/* Logo / App Name */}
//       <h1 className="text-xl font-bold">
//         <Link to="/dashboard">Inventory System</Link>
//       </h1>

//       {/* Right Side */}
//       <div className="flex items-center space-x-6">
//         {/* Quick Links */}
//         <Link to="/products" className="hover:underline">
//           Products
//         </Link>
//         <Link to="/suppliers" className="hover:underline">
//           Suppliers
//         </Link>

//         {/* User Info + Dropdown */}
//         <div className="relative group flex items-center space-x-3">
//           {/* Avatar Circle */}
//           <div className="w-10 h-10 flex items-center justify-center bg-purple-700 text-white rounded-full font-semibold">
//             {avatarLetter}
//           </div>

//           {/* Greeting + Role Badge */}
//           <div className="hidden md:flex flex-col text-sm">
//             <span className="font-medium">Hi, {user?.name || "User"}</span>
//             {user?.role && (
//               <span
//                 className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
//                   user.role === "Admin"
//                     ? "bg-red-500 text-white"
//                     : "bg-green-500 text-white"
//                 }`}
//               >
//                 {user.role}
//               </span>
//             )}
//           </div>

//           {/* Dropdown */}
//           <div>
//             <button className="hover:underline">Account ▾</button>
//             <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg hidden group-hover:block">
//               <Link
//                 to="/profile"
//                 className="block px-4 py-2 hover:bg-gray-100"
//               >
//                 My Profile
//               </Link>
//               <button
//                 onClick={handleLogout}
//                 className="block w-full text-left px-4 py-2 hover:bg-gray-100"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


// src/components/Navbar.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../context/AuthContext"; // ✅ use context

const Navbar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuthContext(); // ✅ get user & logout from context

  // Safe avatar letter
  const avatarLetter = user?.name ? user.name.charAt(0).toUpperCase() : "U";

  const handleLogout = () => {
    logout(); // ✅ clears context + localStorage
    navigate("/"); // redirect to login
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo / App Name */}
      <h1 className="text-xl font-bold">
        <Link to="/dashboard">Inventory System</Link>
      </h1>

      {/* Right Side */}
      <div className="flex items-center space-x-6">
        {/* Quick Links */}
        <Link to="/products" className="hover:underline">
          Products
        </Link>
        <Link to="/suppliers" className="hover:underline">
          Suppliers
        </Link>

        {/* User Info + Dropdown */}
        <div className="relative group flex items-center space-x-3">
          {/* Avatar Circle */}
          <div className="w-10 h-10 flex items-center justify-center bg-purple-700 text-white rounded-full font-semibold">
            {avatarLetter}
          </div>

          {/* Greeting + Role Badge */}
          <div className="hidden md:flex flex-col text-sm">
            <span className="font-medium">Hi, {user?.name || "User"}</span>
            {user?.role && (
              <span
                className={`inline-block mt-1 px-2 py-0.5 text-xs rounded-full ${
                  user.role === "Admin"
                    ? "bg-red-500 text-white"
                    : "bg-green-500 text-white"
                }`}
              >
                {user.role}
              </span>
            )}
          </div>

          {/* Dropdown */}
          <div>
            <button className="hover:underline">Account ▾</button>
            <div className="absolute right-0 mt-2 w-40 bg-white text-black rounded shadow-lg hidden group-hover:block">
              <Link
                to="/profile"
                className="block px-4 py-2 hover:bg-gray-100"
              >
                My Profile
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 hover:bg-gray-100"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
