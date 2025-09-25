// src/pages/Transactions.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Toast from "../components/Toast";
import { getTransactions, deleteTransaction } from "../utils/api"; // We'll create mock APIs

export default function Transactions() {
  const [transactions, setTransactions] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const data = await getTransactions();
        setTransactions(data);
      } catch (error) {
        setToast({ message: "Failed to load transactions", type: "error" });
      }
    };

    fetchTransactions();
  }, []);

  const handleEdit = (id) => {
    navigate(`/transactions/${id}/edit`);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this transaction?")) return;

    try {
      await deleteTransaction(id);
      setTransactions(prev => prev.filter(t => t.id !== id));
      setToast({ message: "Transaction deleted successfully", type: "success" });
    } catch (error) {
      setToast({ message: "Failed to delete transaction", type: "error" });
    }
  };

  const columns = [
    { key: "id", label: "ID" },
    { key: "productName", label: "Product" },
    { key: "quantity", label: "Quantity" },
    { key: "totalPrice", label: "Total Price" },
    { key: "date", label: "Date" },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Transactions</h2>
        <button
          onClick={() => navigate("/transactions/new")}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          + Add Transaction
        </button>
      </div>

      <Table
        columns={columns}
        data={transactions}
        actions={{ onEdit: handleEdit, onDelete: handleDelete }}
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
