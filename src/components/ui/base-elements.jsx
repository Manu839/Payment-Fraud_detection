import React from "react";

// Button
export function Button({ 
  variant = "default", 
  size = "default", 
  className = "", 
  children, 
  ...props 
}) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-green-600 text-white hover:bg-green-500",
    destructive: "bg-red-600 text-white hover:bg-red-500",
    outline: "border border-gray-300 bg-white text-gray-800 hover:bg-gray-100",
    secondary: "bg-green-100 text-green-800 hover:bg-green-200",
    ghost: "bg-transparent hover:bg-green-100 text-green-800",
    link: "text-green-600 underline hover:text-green-800",
  };

  const sizes = {
    default: "h-9 px-4 py-2",
    sm: "h-8 px-3 text-xs",
    lg: "h-10 px-6",
    icon: "h-9 w-9 p-0",
  };

  return (
    <button
      className={`${base} ${variants[variant] || ""} ${sizes[size] || ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

// Input
export function Input({ type = "text", className = "", ...props }) {
  return (
    <input
      type={type}
      className={`h-9 w-full rounded-md border border-green-300 bg-white px-3 py-1 text-sm shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 ${className}`}
      {...props}
    />
  );
}

// Label
export function Label({ htmlFor, className = "", children, ...props }) {
  return (
    <label
      htmlFor={htmlFor}
      className={`text-sm font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}

// Separator
export function Separator({ orientation = "horizontal", className = "", ...props }) {
  const base = "bg-green-200";
  const orientationStyle = orientation === "vertical" ? "w-px h-full" : "h-px w-full";

  return (
    <div
      role="separator"
      aria-orientation={orientation}
      className={`${base} ${orientationStyle} ${className}`}
      {...props}
    />
  );
}

// Badge
export function Badge({ variant = "default", className = "", children, ...props }) {
  const base = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition";

  const variants = {
    default: "bg-green-600 text-white",
    secondary: "bg-green-100 text-green-800",
    destructive: "bg-red-600 text-white",
    outline: "border border-green-400 text-green-800",
  };

  return (
    <span className={`${base} ${variants[variant] || ""} ${className}`} {...props}>
      {children}
    </span>
  );
}
