// src/pages/ProductForm.jsx
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Toast from "../components/Toast";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
} from "../utils/productApi";
import { getSuppliers } from "../utils/supplierApi";

export default function ProductForm() {
  const { id } = useParams(); // Product ID if editing
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    sku: "",
    category: "",
    price: "",
    quantity: "",
    reorderLevel: "",
    supplierId: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  // Fetch suppliers & product (if editing)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierRes = await getSuppliers();
        setSuppliers(supplierRes.data);

        if (id) {
          const productRes = await getProductById(id);
          const product = productRes.data;
          setFormData({
            name: product.name || "",
            sku: product.sku || "",
            category: product.category || "",
            price: product.price || "",
            quantity: product.quantity || "",
            reorderLevel: product.reorderLevel || "",
            supplierId: product.supplierId || "",
          });
        }
      } catch (error) {
        setToast({ message: "Failed to load data.", type: "error" });
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Basic validation
    const { name, sku, category, price, quantity, reorderLevel, supplierId } = formData;
    if (!name || !sku || !category || !price || !quantity || !reorderLevel || !supplierId) {
      setToast({ message: "Please fill in all fields.", type: "error" });
      return;
    }

    setLoading(true);
    try {
      if (id) {
        await updateProduct(id, formData);
        setToast({ message: "Product updated successfully!", type: "success" });
      } else {
        await createProduct(formData);
        setToast({ message: "Product added successfully!", type: "success" });
      }

      setTimeout(() => {
        setToast({ message: "", type: "" });
        navigate("/products");
      }, 1200);
    } catch (error) {
      setToast({ message: "Failed to save product.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">{id ? "Edit Product" : "Add Product"}</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          label="SKU"
          name="sku"
          value={formData.sku}
          onChange={handleChange}
          required
        />
        <Input
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
        />
        <Input
          label="Price"
          name="price"
          type="number"
          value={formData.price}
          onChange={handleChange}
          required
        />
        <Input
          label="Quantity"
          name="quantity"
          type="number"
          value={formData.quantity}
          onChange={handleChange}
          required
        />
        <Input
          label="Reorder Level"
          name="reorderLevel"
          type="number"
          value={formData.reorderLevel}
          onChange={handleChange}
          required
        />

        <div>
          <label className="block text-gray-700 mb-1">Supplier</label>
          <select
            name="supplierId"
            value={formData.supplierId}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded-lg"
            required
          >
            <option value="">-- Select Supplier --</option>
            {suppliers.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-purple-700 hover:bg-purple-800"
          }`}
        >
          {loading ? "Processing..." : id ? "Update Product" : "Add Product"}
        </button>
      </form>

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
