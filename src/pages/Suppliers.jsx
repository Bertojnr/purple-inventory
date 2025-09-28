// src/pages/Suppliers.jsx
import React, { useEffect, useState } from "react";
import { getSuppliers, createSupplier, updateSupplier, deleteSupplier } from "../utils/supplierApi";
import Input from "../components/Input";
import Button from "../components/Button";
import Table from "../components/Table";
import Toast from "../components/Toast";

const Suppliers = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    contact: { phone: "", email: "", address: "" },
    notes: "",
  });
  const [editingId, setEditingId] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      const res = await getSuppliers();
      setSuppliers(res.data);
    } catch {
      setToast({ type: "error", message: "Failed to load suppliers" });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "email", "address"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        contact: { ...prev.contact, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await updateSupplier(editingId, formData);
        setToast({ type: "success", message: "Supplier updated successfully" });
      } else {
        await createSupplier(formData);
        setToast({ type: "success", message: "Supplier added successfully" });
      }
      setFormData({ name: "", contact: { phone: "", email: "", address: "" }, notes: "" });
      setEditingId(null);
      await loadSuppliers();
    } catch {
      setToast({ type: "error", message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (supplier) => {
    setEditingId(supplier._id);
    setFormData({
      name: supplier.name,
      contact: {
        phone: supplier.contact?.phone || "",
        email: supplier.contact?.email || "",
        address: supplier.contact?.address || "",
      },
      notes: supplier.notes || "",
    });
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this supplier?")) return;
    try {
      await deleteSupplier(id);
      setToast({ type: "success", message: "Supplier deleted" });
      await loadSuppliers();
    } catch {
      setToast({ type: "error", message: "Delete failed" });
    }
  };

  const columns = [
    { header: "ID", accessor: "_id" },
    { header: "Name", accessor: "name" },
    { header: "Phone", accessor: "contact.phone" },
    { header: "Email", accessor: "contact.email" },
    { header: "Address", accessor: "contact.address" },
    { header: "Notes", accessor: "notes" },
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <Button variant="secondary" onClick={() => handleEdit(row)}>Edit</Button>
          <Button variant="danger" onClick={() => handleDelete(row._id)}>Delete</Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Suppliers</h1>

      <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 mb-6">
        <Input placeholder="Name" name="name" value={formData.name} onChange={handleChange} required />
        <Input placeholder="Phone" name="phone" value={formData.contact.phone} onChange={handleChange} />
        <Input placeholder="Email" name="email" value={formData.contact.email} onChange={handleChange} />
        <Input placeholder="Address" name="address" value={formData.contact.address} onChange={handleChange} />
        <Input placeholder="Notes" name="notes" value={formData.notes} onChange={handleChange} />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : editingId ? "Update" : "Add"}
        </Button>
      </form>

      <Table columns={columns} data={suppliers} />

      {toast && <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />}
    </div>
  );
};

export default Suppliers;
