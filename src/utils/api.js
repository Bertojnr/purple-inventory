// utils/api.js

// --- Mock Data (in-memory) ---
let suppliers = [
  { id: 1, name: "Acme Supplies" },
  { id: 2, name: "Global Traders" },
  { id: 3, name: "FarmFresh Ltd" },
];

let products = [
  { id: 101, name: "Laptop", price: 1200, quantity: 5, supplierId: 1 },
  { id: 102, name: "Bananas", price: 2, quantity: 100, supplierId: 3 },
  { id: 103, name: "Office Chair", price: 150, quantity: 20, supplierId: 2 },
];

// --- Supplier APIs ---
export const getSuppliers = async () => suppliers;

export const getSupplierById = async (id) =>
  suppliers.find((s) => s.id === Number(id));

export const createSupplier = async (supplier) => {
  const newSupplier = { id: Date.now(), ...supplier };
  suppliers.push(newSupplier);
  return newSupplier;
};

export const updateSupplier = async (id, updatedSupplier) => {
  suppliers = suppliers.map((s) =>
    s.id === Number(id) ? { ...s, ...updatedSupplier } : s
  );
  return suppliers.find((s) => s.id === Number(id));
};

export const deleteSupplier = async (id) => {
  suppliers = suppliers.filter((s) => s.id !== Number(id));
};

// --- Product APIs ---
export const getProducts = async () => products;

export const getProductById = async (id) =>
  products.find((p) => p.id === Number(id));

export const createProduct = async (product) => {
  const newProduct = { id: Date.now(), ...product };
  products.push(newProduct);
  return newProduct;
};

export const updateProduct = async (id, updatedProduct) => {
  products = products.map((p) =>
    p.id === Number(id) ? { ...p, ...updatedProduct } : p
  );
  return products.find((p) => p.id === Number(id));
};

export const deleteProduct = async (id) => {
  products = products.filter((p) => p.id !== Number(id));
};

// --- Transactions ---
let transactions = [
  { id: 1, productName: "Laptop", quantity: 2, totalPrice: 2400, date: "2025-09-25" },
  { id: 2, productName: "Bananas", quantity: 10, totalPrice: 20, date: "2025-09-24" },
];

export const getTransactions = async () => transactions;

export const getTransactionById = async (id) => transactions.find(t => t.id === Number(id));

export const createTransaction = async (transaction) => {
  const newTransaction = { id: Date.now(), ...transaction };
  transactions.push(newTransaction);
  return newTransaction;
};

export const updateTransaction = async (id, updatedTransaction) => {
  transactions = transactions.map(t => t.id === Number(id) ? { ...t, ...updatedTransaction } : t);
  return transactions.find(t => t.id === Number(id));
};

export const deleteTransaction = async (id) => {
  transactions = transactions.filter(t => t.id !== Number(id));
};

