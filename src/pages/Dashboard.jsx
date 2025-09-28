// src/pages/Dashboard.jsx
import { useEffect, useState } from "react";
import { getProducts } from "../utils/productApi";
import { getSuppliers } from "../utils/supplierApi";
import { getTransactions } from "../utils/transactionApi";

export default function Dashboard() {
  const [stats, setStats] = useState({
    totalProducts: 0,
    totalSuppliers: 0,
    totalTransactions: 0,
    lowStock: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, suppliersRes, transactionsRes] = await Promise.all([
          getProducts(),
          getSuppliers(),
          getTransactions(),
        ]);

        const products = productsRes.data;
        setStats({
          totalProducts: products.length,
          totalSuppliers: suppliersRes.data.length,
          totalTransactions: transactionsRes.data.length,
          lowStock: products.filter((p) => p.quantity <= p.reorderLevel).length,
        });
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-6 space-y-6">
      <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
      <p className="text-gray-700">Quick overview of your inventory system.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-purple-700 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Products</h3>
          <p className="text-2xl font-bold">{stats.totalProducts}</p>
        </div>

        <div className="bg-green-600 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Suppliers</h3>
          <p className="text-2xl font-bold">{stats.totalSuppliers}</p>
        </div>

        <div className="bg-blue-600 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Total Transactions</h3>
          <p className="text-2xl font-bold">{stats.totalTransactions}</p>
        </div>

        <div className="bg-red-600 text-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold">Low Stock Products</h3>
          <p className="text-2xl font-bold">{stats.lowStock}</p>
        </div>
      </div>
    </div>
  );
}
