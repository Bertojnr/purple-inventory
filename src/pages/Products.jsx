// src/pages/Products.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, deleteProduct } from "../utils/productApi";
import { getSuppliers } from "../utils/supplierApi";
import Table from "../components/Table";
import Toast from "../components/Toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productRes, supplierRes] = await Promise.all([
          getProducts(),
          getSuppliers(),
        ]);

        const productData = productRes.data;
        const supplierData = supplierRes.data;

        // Map supplierId → supplier name
        const supplierMap = {};
        supplierData.forEach((s) => {
          supplierMap[s._id] = s.name;
        });

        // Enrich products with supplierName
        const enrichedProducts = productData.map((p) => ({
          ...p,
          supplierName: supplierMap[p.supplierId] || "Unknown",
        }));

        setProducts(enrichedProducts);
      } catch (error) {
        setToast({ message: "Failed to load products", type: "error" });
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/products/${id}/edit`);
  };

  const handleDelete = async (id) => {
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      setToast({ message: `Product deleted successfully`, type: "success" });
    } catch (error) {
      setToast({ message: "Failed to delete product", type: "error" });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products</h2>
        <button
          onClick={() => navigate("/products/new")}
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
        >
          + Add Product
        </button>
      </div>

      <Table
        columns={[
          { key: "name", label: "Product Name" },
          { key: "price", label: "Price" },
          { key: "quantity", label: "Quantity" },
          { key: "supplierName", label: "Supplier" },
        ]}
        data={products}
        actions={{
          onEdit: handleEdit,
          onDelete: handleDelete,
        }}
      />

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
