// src/pages/UserManagement.jsx
import { useState } from "react";
import Input from "../components/Input";
import Toast from "../components/Toast";

export default function UserManagement() {
  const [users, setUsers] = useState([
    { id: 1, name: "Admin User", email: "admin@example.com", role: "Admin" },
    { id: 2, name: "John Doe", email: "john@example.com", role: "Staff" },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({ name: "", email: "", role: "Staff" });
  const [toast, setToast] = useState({ message: "", type: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSaveUser = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email) {
      setToast({ message: "Name & Email are required", type: "error" });
      return;
    }

    if (editingUser) {
      // Update existing user
      setUsers(users.map((u) => (u.id === editingUser.id ? { ...u, ...formData } : u)));
      setToast({ message: "User updated successfully", type: "success" });
    } else {
      // Add new user
      const newUser = { id: Date.now(), ...formData };
      setUsers([...users, newUser]);
      setToast({ message: "User added successfully", type: "success" });
    }

    setShowForm(false);
    setEditingUser(null);
    setFormData({ name: "", email: "", role: "Staff" });
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({ name: user.name, email: user.email, role: user.role });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    const userToDelete = users.find((u) => u.id === id);
    if (userToDelete && window.confirm(`Are you sure you want to delete ${userToDelete.name}?`)) {
      setUsers(users.filter((u) => u.id !== id));
      setToast({ message: "User deleted", type: "success" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>

      <button
        onClick={() => {
          setEditingUser(null);
          setFormData({ name: "", email: "", role: "Staff" });
          setShowForm(true);
        }}
        className="mb-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        + Add User
      </button>

      {/* User Table */}
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
          {users.map((u) => (
            <tr key={u.id}>
              <td className="border p-2">{u.id}</td>
              <td className="border p-2">{u.name}</td>
              <td className="border p-2">{u.email}</td>
              <td className="border p-2">{u.role}</td>
              <td className="border p-2 flex gap-2">
                <button
                  onClick={() => handleEdit(u)}
                  className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(u.id)}
                  className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Add/Edit User Modal */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-lg font-semibold mb-4">
              {editingUser ? "Edit User" : "Add New User"}
            </h2>
            <form onSubmit={handleSaveUser}>
              <Input label="Name" name="name" value={formData.name} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={formData.email} onChange={handleChange} />
              <div className="mb-3">
                <label className="block text-sm font-medium mb-1">Role</label>
                <select
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="w-full border rounded-lg px-3 py-2"
                >
                  <option value="Admin">Admin</option>
                  <option value="Staff">Staff</option>
                </select>
              </div>

              <div className="flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditingUser(null);
                  }}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  {editingUser ? "Update" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
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
