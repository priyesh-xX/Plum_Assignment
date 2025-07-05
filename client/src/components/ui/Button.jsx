import React from "react";

export const Button = ({ children, className = "", variant = "default", size = "default", ...props }) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    default: "bg-purple-600 text-white hover:bg-purple-700",
    outline: "border border-purple-500 text-purple-400 bg-transparent hover:bg-purple-500 hover:text-white",
    ghost: "text-purple-400 hover:bg-purple-800",
    link: "text-purple-400 underline hover:text-white",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 px-3 text-sm",
    lg: "h-11 px-8 text-base",
    icon: "h-10 w-10 p-2",
  };

  const finalClassName = `${baseClasses} ${variants[variant] || variants.default} ${sizes[size] || sizes.default} ${className}`;

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
};
