// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import {
  getInventoryReport,
  getSupplierReport,
  getTransactionReport,
  getLowStockReport,
  getSalesReport,
} from "../utils/reportApi";
import Toast from "../components/Toast";

export default function Reports() {
  const [inventory, setInventory] = useState(null);
  const [suppliers, setSuppliers] = useState(null);
  const [transactions, setTransactions] = useState(null);
  const [lowStock, setLowStock] = useState(null);
  const [sales, setSales] = useState(null);
  const [toast, setToast] = useState({ message: "", type: "" });

  // Date filters
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  useEffect(() => {
    const fetchReports = async () => {
      try {
        const [invRes, supRes, tranRes, lowRes, salesRes] = await Promise.all([
          getInventoryReport(),
          getSupplierReport(),
          getTransactionReport(),
          getLowStockReport(),
          getSalesReport(), // fetch without filter by default
        ]);

        setInventory(invRes.data);
        setSuppliers(supRes.data);
        setTransactions(tranRes.data);
        setLowStock(lowRes.data);
        setSales(salesRes.data);
      } catch {
        setToast({ message: "Failed to load reports", type: "error" });
      }
    };

    fetchReports();
  }, []);

  // 🔹 Fetch Sales Report with filters
  const handleSalesFilter = async () => {
    try {
      const { data } = await getSalesReport(fromDate, toDate);
      setSales(data);
    } catch {
      setToast({ message: "Failed to fetch sales report", type: "error" });
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Reports</h1>

      {/* Inventory Report */}
      {inventory && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Inventory Report</h2>
          <p>Total Products: {inventory.totalProducts}</p>
          <p>Total Stock: {inventory.totalStock}</p>
          <p>Total Value: ${inventory.totalValue}</p>
        </div>
      )}

      {/* Supplier Report */}
      {suppliers && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Supplier Report</h2>
          <p>Total Suppliers: {suppliers.totalSuppliers}</p>
          <h3 className="mt-2 mb-1 font-medium">Top Suppliers</h3>
          <ul className="list-disc list-inside text-gray-700">
            {suppliers.topSuppliers.map((s, i) => (
              <li key={i}>
                {s.supplier} — {s.count} products
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Transaction Report */}
      {transactions && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Transaction Report</h2>
          <p>Total Transactions: {transactions.totalTransactions}</p>
          <p>IN: {transactions.inCount}</p>
          <p>OUT: {transactions.outCount}</p>
          <h3 className="mt-2 mb-1 font-medium">Recent Transactions</h3>
          <ul className="list-disc list-inside text-gray-700">
            {transactions.recentTransactions.map((t) => (
              <li key={t._id}>
                {t.type} — {t.quantity} units on{" "}
                {new Date(t.date).toLocaleDateString()}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Low Stock Report */}
      {lowStock && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Low Stock Report</h2>
          <p>Products below reorder level: {lowStock.count}</p>
          <ul className="list-disc list-inside text-gray-700">
            {lowStock.lowStock.map((p) => (
              <li key={p._id}>
                {p.name} — {p.quantity} units left (Reorder Level:{" "}
                {p.reorderLevel})
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Sales Report */}
      {sales && (
        <div className="bg-white p-4 rounded-lg shadow mb-4">
          <h2 className="font-semibold mb-2">Sales Report</h2>

          {/* Date Range Filter */}
          <div className="flex gap-2 mb-4">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded p-2"
            />
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded p-2"
            />
            <button
              onClick={handleSalesFilter}
              className="bg-purple-700 hover:bg-purple-800 text-white px-4 py-2 rounded"
            >
              Filter
            </button>
          </div>

          <ul className="list-disc list-inside text-gray-700">
            {sales.sales.map((s) => (
              <li key={s.productId}>
                {s.name} — {s.totalQuantity} units sold, Revenue: $
                {s.totalRevenue}
              </li>
            ))}
          </ul>
        </div>
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
