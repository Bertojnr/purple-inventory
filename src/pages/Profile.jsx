// src/pages/Profile.jsx
import { useEffect, useState } from "react";

export default function Profile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="p-6">
        <h1 className="text-2xl font-bold">Profile</h1>
        <p className="text-gray-600">No user data available.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Profile</h1>
      <div className="bg-white shadow rounded-lg p-6 max-w-md">
        <p>
          <span className="font-semibold">Name:</span> {user.name}
        </p>
        <p>
          <span className="font-semibold">Email:</span> {user.email}
        </p>
        <p>
          <span className="font-semibold">Role:</span> {user.role}
        </p>
      </div>
    </div>
  );
}
