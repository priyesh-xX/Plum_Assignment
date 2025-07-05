import React from "react";

export const Separator = ({ orientation = "horizontal", className = "", ...props }) => {
  const isHorizontal = orientation === "horizontal";

  return (
    <div
      role="separator"
      className={`bg-gray-700 ${isHorizontal ? "h-px w-full" : "w-px h-full"} ${className}`}
      {...props}
    />
  );
};
