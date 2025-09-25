// src/pages/Suppliers.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getSuppliers, deleteSupplier } from "../utils/api";
import Table from "../components/Table";
import Toast from "../components/Toast";
import Button from "../components/Button";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSuppliers = async () => {
      try {
        const data = await getSuppliers();
        setSuppliers(data);
      } catch (error) {
        setToast({ message: "Failed to load suppliers", type: "error" });
      }
    };
    fetchSuppliers();
  }, []);

  const handleEdit = (id) => {
    navigate(`/suppliers/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;

    try {
      await deleteSupplier(id);
      setSuppliers((prev) => prev.filter((s) => s.id !== id));
      setToast({ message: `Supplier #${id} deleted successfully`, type: "success" });
    } catch {
      setToast({ message: "Failed to delete supplier", type: "error" });
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "name", label: "Name" },
    {
      key: "actions",
      label: "Actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => handleEdit(row.id)}>
            Edit
          </Button>
          <Button variant="danger" onClick={() => handleDelete(row.id)}>
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Suppliers</h2>
        <button
          onClick={() => navigate("/suppliers/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Supplier
        </button>
      </div>

      <Table columns={columns} data={suppliers} />

      {toast.message && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ message: "", type: "" })}
        />
      )}
    </div>
  );
};

export default Suppliers;
