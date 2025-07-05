import React from "react";

export const Card = ({ className = "", children, ...props }) => {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-gray-800 text-white shadow-md ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex flex-col space-y-2 p-6 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardTitle = ({ className = "", children, ...props }) => {
  return (
    <h2
      className={`text-2xl font-semibold tracking-tight ${className}`}
      {...props}
    >
      {children}
    </h2>
  );
};

export const CardDescription = ({ className = "", children, ...props }) => {
  return (
    <p className={`text-sm text-gray-400 ${className}`} {...props}>
      {children}
    </p>
  );
};

export const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};

export const CardFooter = ({ className = "", children, ...props }) => {
  return (
    <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
      {children}
    </div>
  );
};
