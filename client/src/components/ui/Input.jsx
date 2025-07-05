import React from "react";

export const Input = React.forwardRef(({ className = "", type = "text", ...props }, ref) => {
  return (
    <input
      ref={ref}
      type={type}
      className={`flex h-10 w-full rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-base placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
      {...props}
    />
  );
});

Input.displayName = "Input";
