export default function Button({
  children,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  disabled = false,
  ...props // ✅ allow extra props
}) {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition duration-200 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed";

  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    secondary: "bg-gray-200 text-gray-800 hover:bg-gray-300",
    danger: "bg-red-600 text-white hover:bg-red-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled} // ✅ accessibility
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props} // ✅ pass extra props
    >
      {children}
    </button>
  );
}
