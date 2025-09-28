// src/pages/UserManagement.jsx
import { useEffect, useState } from "react";
import { getUsers, deleteUser } from "../utils/userApi";
import Toast from "../components/Toast";

export default function UserManagement() {
  const [users, setUsers] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // 🔹 Fetch users on load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch {
      setToast({ message: "Failed to load users", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Delete user
  const handleDelete = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete ${name}?`)) return;

    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setToast({ message: "User deleted successfully", type: "success" });
    } catch {
      setToast({ message: "Failed to delete user", type: "error" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      {loading ? (
        <p>Loading users...</p>
      ) : (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="border p-2">ID</th>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Role</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((u) => (
                <tr key={u._id}>
                  <td className="border p-2">{u._id}</td>
                  <td className="border p-2">{u.name}</td>
                  <td className="border p-2">{u.email}</td>
                  <td className="border p-2">{u.role}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(u._id, u.name)}
                      className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className="text-center p-4">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}

      {/* Toast Notifications */}
      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
}
