import React from "react";
import {
  BellIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function AdminModernHeader() {
  return (
    <header className="sticky top-0 z-40 w-full h-16 bg-mainBg border-b border-gray-200 shadow-sm flex items-center px-8">
      {/* Spacer to align with sidebar */}
      <div className="flex-1" />
      {/* Actions */}
      <div className="flex items-center gap-4 ml-auto">
        {/* User avatar */}
        <div className="flex items-center gap-2 cursor-pointer p-1 rounded-full hover:bg-gray-100 transition">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            className="w-9 h-9 rounded-full object-cover border"
          />
          <span className="hidden md:block font-medium text-gray-900">
            Erica
          </span>
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </div>
    </header>
  );
}
