// src/components/Toast.jsx
import { useEffect } from "react";
import { CheckCircle, XCircle, Info, AlertTriangle } from "lucide-react";

export default function Toast({ message, type = "success", onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  // Icon + style mapping
  const typeConfig = {
    success: { bg: "bg-green-500", icon: <CheckCircle size={18} /> },
    error: { bg: "bg-red-500", icon: <XCircle size={18} /> },
    info: { bg: "bg-blue-500", icon: <Info size={18} /> },
    warning: { bg: "bg-yellow-500 text-black", icon: <AlertTriangle size={18} /> },
  };

  const { bg, icon } = typeConfig[type] || typeConfig.success;

  return (
    <div
      className={`flex items-center gap-2 fixed top-5 right-5 px-4 py-3 mb-2 rounded-lg shadow-lg text-sm font-medium animate-slide-in ${bg}`}
    >
      {icon}
      <span>{message}</span>
    </div>
  );
}
