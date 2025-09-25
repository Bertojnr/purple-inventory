import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Input from "../components/Input";
import Toast from "../components/Toast";
import { getProducts, getSuppliers } from "../utils/api";

export default function ProductForm() {
  const { id } = useParams(); // Product ID (if editing)
  const navigate = useNavigate();

  const [suppliers, setSuppliers] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    quantity: "",
    supplierId: "",
  });
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await getSuppliers();
        setSuppliers(supplierData);

        if (id) {
          const productData = await getProducts();
          const product = productData.find((p) => p.id.toString() === id);
          if (product) {
            setFormData({
              name: product.name || "",
              price: product.price || "",
              quantity: product.quantity || "",
              supplierId: product.supplierId || "",
            });
          }
        }
      } catch (error) {
        setToast({ message: "Failed to load data.", type: "error" });
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // TODO: Replace with actual POST/PUT API calls
    if (id) {
      setToast({ message: "Product updated successfully!", type: "success" });
    } else {
      setToast({ message: "Product added successfully!", type: "success" });
    }

    setTimeout(() => {
      setToast({ message: "", type: "" });
      navigate("/products");
    }, 1200);

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Product" : "Add Product"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="Product Name"
          name="name"
          value={formData.name}
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
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`px-4 py-2 text-white rounded ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600"
          }`}
        >
          {loading
            ? "Processing..."
            : id
            ? "Update Product"
            : "Add Product"}
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
