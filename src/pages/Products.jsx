import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getProducts, getSuppliers, deleteProduct } from "../utils/api";
import Table from "../components/Table";
import Toast from "../components/Toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const supplierData = await getSuppliers();
        const productData = await getProducts();

        const supplierMap = {};
        supplierData.forEach((s) => (supplierMap[s.id] = s.name));

        const enrichedProducts = productData.map((p) => ({
          ...p,
          supplierName: supplierMap[p.supplierId] || "Unknown",
        }));

        setProducts(enrichedProducts);
      } catch (error) {
        setToast({ message: "Failed to load products", type: "error" });
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleEdit = (id) => {
    navigate(`/products/${id}/edit`); // Correct edit URL
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    try {
      await deleteProduct(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      setToast({ message: `Product #${id} deleted successfully`, type: "success" });
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-gray-600">Loading products...</p>
      ) : (
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
      )}

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
