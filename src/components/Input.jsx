// src/components/Input.jsx
import React from "react";

const Input = ({
  label,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  ...rest
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label className="block text-sm font-medium text-gray-200 mb-1">
          {label}
        </label>
      )}

      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-lg bg-gray-800 text-gray-100 border 
          focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-gray-700 focus:border-indigo-500"
          }`}
        {...rest}
      />

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
