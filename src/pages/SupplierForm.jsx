// pages/SupplierForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSupplier, getSupplierById, updateSupplier } from "../utils/api";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";

const SupplierForm = () => {
  const [formData, setFormData] = useState({ name: "", contact: "" });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);
  const { id } = useParams();
  const navigate = useNavigate();

  // Load supplier data if editing
  useEffect(() => {
    if (id) {
      const fetchSupplier = async () => {
        setLoading(true);
        try {
          const data = await getSupplierById(id);
          setFormData({ name: data.name, contact: data.contact });
        } catch {
          setToast({ type: "error", message: "Failed to load supplier" });
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    }
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (id) {
        await updateSupplier(id, formData);
        setToast({ type: "success", message: "Supplier updated successfully" });
      } else {
        await createSupplier(formData);
        setToast({ type: "success", message: "Supplier added successfully" });
      }
      navigate("/suppliers");
    } catch {
      setToast({ type: "error", message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        {id ? "Edit Supplier" : "Add Supplier"}
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          placeholder="Supplier Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <Input
          placeholder="Contact"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />
        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : id ? "Update" : "Add"}
        </Button>
      </form>

      {toast && (
        <Toast
          type={toast.type}
          message={toast.message}
          onClose={() => setToast(null)}
        />
      )}
    </div>
  );
};

export default SupplierForm;
