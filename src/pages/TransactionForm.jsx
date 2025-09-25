// src/pages/TransactionForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Toast from "../components/Toast";
import { getProducts } from "../utils/api";

// Using same mockTransactions from Transactions.jsx
let mockTransactions = [
  { id: 1, productId: 101, type: "OUT", quantity: 2, date: "2025-09-25", user: "Alice" },
  { id: 2, productId: 102, type: "IN", quantity: 50, date: "2025-09-24", user: "Bob" },
  { id: 3, productId: 103, type: "OUT", quantity: 1, date: "2025-09-23", user: "Charlie" },
];

export default function TransactionForm() {
  const { id } = useParams(); // Transaction ID for editing
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    productId: "",
    type: "IN",
    quantity: "",
    date: "",
    user: "",
  });
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch {
        setToast({ type: "error", message: "Failed to load products" });
      }
    };

    fetchProducts();

    // If editing, load existing transaction
    if (id) {
      const transaction = mockTransactions.find((t) => t.id.toString() === id);
      if (transaction) {
        setFormData({ ...transaction });
      }
    }
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    if (id) {
      // Edit transaction
      mockTransactions = mockTransactions.map((t) =>
        t.id.toString() === id ? { ...t, ...formData, id: Number(id) } : t
      );
      setToast({ type: "success", message: "Transaction updated successfully" });
    } else {
      // Add new transaction
      const newTransaction = { ...formData, id: Date.now() };
      mockTransactions.push(newTransaction);
      setToast({ type: "success", message: "Transaction added successfully" });
    }

    setTimeout(() => {
      setLoading(false);
      navigate("/transactions");
    }, 1000);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Transaction" : "Add Transaction"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 mb-1">Product</label>
          <select
            name="productId"
            value={formData.productId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">-- Select Product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </div>

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

        <Input
          label="Quantity"
          type="number"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <Input
          label="Date"
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          required
        />
        <Input
          label="User"
          name="user"
          value={formData.user}
          onChange={handleChange}
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
}
