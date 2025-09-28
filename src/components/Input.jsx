import React from "react";

const Input = ({
  label,
  id,
  type = "text",
  placeholder = "",
  value,
  onChange,
  error,
  className = "",
  ...rest
}) => {
  return (
    <div className="w-full mb-4">
      {label && (
        <label
          htmlFor={id}
          className="block text-sm font-medium text-gray-200 mb-1"
        >
          {label}
        </label>
      )}

      <input
        id={id}
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
          }
          ${className}`} // ✅ allow extra custom styling
        {...rest}
      />

      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  );
};

export default Input;
