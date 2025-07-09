// overlay-elements.jsx
import React, { useState } from "react";
import { X } from "lucide-react";

// Simple Alert Dialog
export function SimpleAlertDialog({ title = "Are you sure?", description = "This action cannot be undone.", onConfirm }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
      >
        Open Alert
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6">
            <h2 className="text-xl font-semibold mb-2">{title}</h2>
            <p className="text-gray-600 mb-4">{description}</p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setOpen(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onConfirm?.();
                  setOpen(false);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

// Sheet / Drawer
export function Sheet({ title = "Drawer", children }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Open Sheet
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setOpen(false)}
          />
          <div className="relative ml-auto h-full w-3/4 max-w-sm bg-white shadow-xl p-6">
            <button
              className="absolute top-4 right-4 text-gray-500 hover:text-black"
              onClick={() => setOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="text-sm text-gray-600">{children}</div>
          </div>
        </div>
      )}
    </>
  );
}
