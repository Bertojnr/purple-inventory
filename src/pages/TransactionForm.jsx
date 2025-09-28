// src/pages/TransactionForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getProducts } from "../utils/productApi";
import { createTransaction, getTransactionById, updateTransaction } from "../utils/transactionApi";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { useAuthContext } from "../context/AuthContext";

export default function TransactionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product: "",
    type: "IN",
    quantity: "",
    date: "",
    user: user?.name || "",
    reference: "",
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  // Load products and existing transaction (if editing)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await getProducts();
        setProducts(res.data);
      } catch {
        setToast({ type: "error", message: "Failed to load products" });
      }
    };

    fetchProducts();

    if (id) {
      const fetchTransaction = async () => {
        try {
          const res = await getTransactionById(id);
          setFormData({
            product: res.data.product || "",
            type: res.data.type || "IN",
            quantity: res.data.quantity || "",
            date: res.data.date ? res.data.date.split("T")[0] : "",
            user: res.data.user || user?.name || "",
            reference: res.data.reference || "",
          });
        } catch {
          setToast({ type: "error", message: "Failed to load transaction" });
        }
      };
      fetchTransaction();
    }
  }, [id, user?.name]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const payload = {
        productId: formData.product, // backend expects productId
        type: formData.type,
        quantity: parseInt(formData.quantity, 10),
        reference: formData.reference || "",
        user: formData.user,
      };

      if (id) {
        await updateTransaction(id, payload);
        setToast({ type: "success", message: "Transaction updated successfully" });
      } else {
        await createTransaction(payload);
        setToast({ type: "success", message: "Transaction added successfully" });
      }

      setTimeout(() => navigate("/transactions"), 1000);
    } catch {
      setToast({ type: "error", message: "Failed to save transaction" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Transaction" : "Add Transaction"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Product Select */}
        <div>
          <label className="block text-gray-700 mb-1">Product</label>
          <select
            name="product"
            value={formData.product}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p._id} value={p._id}>{p.name}</option>
            ))}
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="block text-gray-700 mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="IN">IN</option>
            <option value="OUT">OUT</option>
          </select>
        </div>

        {/* Quantity */}
        <Input
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />

        {/* Date */}
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />

        {/* Reference */}
        <Input
          label="Reference"
          name="reference"
          value={formData.reference}
          onChange={handleChange}
        />

        {/* User (read-only) */}
        <Input
          label="User"
          name="user"
          value={formData.user}
          readOnly
        />

        <Button type="submit" disabled={loading}>
          {loading ? "Processing..." : id ? "Update" : "Add"}
        </Button>
      </form>

      {toast && (
        <Toast type={toast.type} message={toast.message} onClose={() => setToast(null)} />
      )}
    </div>
  );
}
