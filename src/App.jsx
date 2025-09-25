import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Layout
import DashboardLayout from "./layouts/DashboardLayout";

// Pages
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import ProductForm from "./pages/ProductForm";
import Suppliers from "./pages/Suppliers";
import SupplierForm from "./pages/SupplierForm"; 
import Transactions from "./pages/Transactions";
import TransactionForm from "./pages/TransactionForm";
import Reports from "./pages/Reports";
import UserManagement from "./pages/UserManagement";
import NotFound from "./pages/NotFound"; 
import ProtectedRoute from "./components/ProtectedRoute";

function App() {

  return (
     <Router>
      <Routes>
        {/* Public Login */}
        <Route path="/" element={<Login />} />

        {/* Dashboard routes (protected) */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Dashboard />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Products */}
        <Route
          path="/products"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Products />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/products/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <ProductForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Suppliers */}
        <Route
          path="/suppliers"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Suppliers />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SupplierForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/suppliers/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <SupplierForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Transactions */}
        <Route
          path="/transactions"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Transactions />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/new"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TransactionForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />
        <Route
          path="/transactions/:id/edit"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <TransactionForm />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* Reports */}
        <Route
          path="/reports"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <Reports />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* User Management */}
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <DashboardLayout>
                <UserManagement />
              </DashboardLayout>
            </ProtectedRoute>
          }
        />

        {/* 404 */}
        <Route
          path="*"
          element={
            <DashboardLayout>
              <NotFound />
            </DashboardLayout>
          }
        />
      </Routes>
    </Router>
  )
}

export default App
