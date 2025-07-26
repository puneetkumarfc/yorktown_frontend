import React from "react";
import { X } from "lucide-react";

const DeleteModal = ({ open, onClose, onConfirm, module, coupon }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <div className="bg-mainBg rounded-xl shadow-2xl border border-gray-200 w-full max-w-xl p-6">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold font-roboto_serif text-black">
            Delete {module || "Item"}
          </h2>
          <button
            className="text-gray-400 hover:text-black text-2xl font-bold bg-transparent border-none cursor-pointer"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={24} />
          </button>
        </div>
        <div className="mb-8 text-black/80 text-base font-normal">
          <p>
            Are you sure you want to delete this{" "}
            {module?.toLowerCase() || "item"}
            {coupon && coupon.code ? `: "${coupon.code}"` : ""}? This action
            cannot be undone.
          </p>
        </div>
        <div className="flex justify-end gap-3 mt-5">
          <button
            type="button"
            className="px-5 py-2 rounded-lg border border-gray-300 bg-mainBg text-black font-normal hover:bg-gray-100 transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-mainRed text-white font-normal hover:bg-mainRed/80 transition-all"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
