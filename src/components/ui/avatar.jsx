import React from "react";

export function Avatar({ src, alt = "Avatar", fallback = "?", className = "" }) {
  return (
    <div className={`relative h-10 w-10 rounded-full overflow-hidden bg-gray-200 ${className}`}>
      {src ? (
        <img src={src} alt={alt} className="h-full w-full object-cover" />
      ) : (
        <div className="h-full w-full flex items-center justify-center text-sm text-gray-600">
          {fallback}
        </div>
      )}
    </div>
  );
}
