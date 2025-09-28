// src/pages/SupplierForm.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { createSupplier, getSupplierById, updateSupplier } from "../utils/supplierApi";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";

const SupplierForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: { phone: "", email: "", address: "" },
    notes: "",
  });
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
          const res = await getSupplierById(id);
          const data = res.data;
          setFormData({
            name: data.name || "",
            contact: {
              phone: data.contact?.phone || "",
              email: data.contact?.email || "",
              address: data.contact?.address || "",
            },
            notes: data.notes || "",
          });
        } catch {
          setToast({ type: "error", message: "Failed to load supplier" });
        } finally {
          setLoading(false);
        }
      };
      fetchSupplier();
    }
  }, [id]);

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
      if (id) {
        await updateSupplier(id, formData);
        setToast({ type: "success", message: "Supplier updated successfully" });
      } else {
        await createSupplier(formData);
        setToast({ type: "success", message: "Supplier added successfully" });
      }

      setTimeout(() => {
        navigate("/suppliers");
      }, 1000);
    } catch {
      setToast({ type: "error", message: "Operation failed" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-6">{id ? "Edit Supplier" : "Add Supplier"}</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Supplier Name"
          placeholder="Supplier Name"
          value={formData.name}
          name="name"
          onChange={handleChange}
          required
        />

        <Input
          label="Phone"
          placeholder="Phone"
          value={formData.contact.phone}
          name="phone"
          onChange={handleChange}
        />
        <Input
          label="Email"
          placeholder="Email"
          type="email"
          value={formData.contact.email}
          name="email"
          onChange={handleChange}
        />
        <Input
          label="Address"
          placeholder="Address"
          value={formData.contact.address}
          name="address"
          onChange={handleChange}
        />
        <Input
          label="Notes"
          placeholder="Notes"
          value={formData.notes}
          name="notes"
          onChange={handleChange}
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
