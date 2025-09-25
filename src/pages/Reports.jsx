// src/pages/Reports.jsx
import { useEffect, useState } from "react";
import Table from "../components/Table";
import Toast from "../components/Toast";

// Mock data (to be replaced by API later)
const mockLowStock = [
  { id: 101, name: "Laptop", quantity: 5, supplier: "Acme Supplies" },
  { id: 103, name: "Office Chair", quantity: 2, supplier: "Global Traders" },
];

const mockSales = [
  { id: 1, product: "Laptop", quantitySold: 3, total: 3600 },
  { id: 2, product: "Bananas", quantitySold: 50, total: 100 },
];

export default function Reports() {
  const [lowStock, setLowStock] = useState([]);
  const [sales, setSales] = useState([]);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    setLowStock(mockLowStock);
    setSales(mockSales);
  }, []);

  const lowStockColumns = [
    { header: "ID", accessor: "id" },
    { header: "Product Name", accessor: "name" },
    { header: "Quantity", accessor: "quantity" },
    { header: "Supplier", accessor: "supplier" },
  ];

  const salesColumns = [
    { header: "ID", accessor: "id" },
    { header: "Product", accessor: "product" },
    { header: "Quantity Sold", accessor: "quantitySold" },
    { header: "Total ($)", accessor: "total" },
  ];

  // Helper: Convert JSON array to CSV string
  const convertToCSV = (data) => {
    if (!data.length) return "";
    const headers = Object.keys(data[0]).join(",");
    const rows = data.map((row) => Object.values(row).join(",")).join("\n");
    return `${headers}\n${rows}`;
  };

  // Helper: Trigger download
  const downloadCSV = (data, filename) => {
    const csv = convertToCSV(data);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);

    setToast({ type: "success", message: `${filename} downloaded` });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Low-stock Products */}
      <section className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Low-stock Products</h2>
          <button
            onClick={() => downloadCSV(lowStock, "low_stock.csv")}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export CSV
          </button>
        </div>
        <Table columns={lowStockColumns} data={lowStock} />
      </section>

      {/* Sales Summary */}
      <section>
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-xl font-semibold">Sales Summary</h2>
          <button
            onClick={() => downloadCSV(sales, "sales_summary.csv")}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Export CSV
          </button>
        </div>
        <Table columns={salesColumns} data={sales} />
      </section>

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
