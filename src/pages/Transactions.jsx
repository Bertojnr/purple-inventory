import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getTransactions, deleteTransaction } from "../utils/transactionApi";
import { getProducts } from "../utils/productApi";
import Table from "../components/Table";
import Toast from "../components/Toast";

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [transactionRes, productRes] = await Promise.all([
          getTransactions(),
          getProducts(),
        ]);

        const transactionData = transactionRes.data;
        const productData = productRes.data;

        // Map productId → product name
        const productMap = {};
        productData.forEach((p) => {
          productMap[p._id] = p.name;
        });

        // Enrich transactions with product name and formatted date
        const enrichedTransactions = transactionData.map((t) => ({
          ...t,
          productName: productMap[t.product] || "Unknown",
          formattedDate: t.date ? new Date(t.date).toLocaleDateString() : "",
        }));

        setTransactions(enrichedTransactions);
      } catch {
        setToast({ message: "Failed to load transactions", type: "error" });
      }
    };

    fetchData();
  }, []);

  const handleEdit = (id) => navigate(`/transactions/${id}/edit`);

  const handleDelete = async (id) => {
    try {
      await deleteTransaction(id);
      setTransactions((prev) => prev.filter((t) => t._id !== id));
      setToast({ message: "Transaction deleted successfully", type: "success" });
    } catch {
      setToast({ message: "Failed to delete transaction", type: "error" });
    }
  };

  const columns = [
    { header: "Product", accessor: "productName" },
    { header: "Type", accessor: "type" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Date", accessor: "formattedDate" },
    { header: "User", accessor: "user" },
    { header: "Reference", accessor: "reference" }, // ✅ added reference column
    {
      header: "Actions",
      accessor: "actions",
      render: (row) => (
        <div className="flex gap-2">
          <button
            className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
            onClick={() => handleEdit(row._id)}
          >
            Edit
          </button>
          <button
            className="px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600"
            onClick={() => handleDelete(row._id)}
          >
            Delete
          </button>
        </div>
      ),
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          onClick={() => navigate("/transactions/new")}
          className="px-4 py-2 bg-purple-700 text-white rounded hover:bg-purple-800"
        >
          + Add Transaction
        </button>
      </div>

      <Table columns={columns} data={transactions} />

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
