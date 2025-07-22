import React from 'react';
import {
  HomeIcon,
  CalendarIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
} from '@heroicons/react/24/outline';

const navLinks = [
  { name: 'Home', icon: HomeIcon },
  { name: 'Orders', icon: ClipboardDocumentListIcon },
  { name: 'Menu', icon: ClipboardDocumentListIcon },
  { name: 'Coupons', icon: MegaphoneIcon },
  { name: 'Settings', icon: Cog6ToothIcon },
];

export default function SidebarDemo() {
  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="flex flex-col w-65 h-screen border-gray-200">
        {/* Logo/title and dropdown */}
        <div className="flex items-center h-16 px-6 border-b border-gray-100">
          <span className="font-bold text-lg tracking-tight text-gray-900 flex-1"><p class="font-bold cursor-pointer">York<span class="text-customOrange">T</span>own</p></span>
          <ChevronLeftIcon className="w-5 h-5 text-gray-400" />
        </div>
        {/* Main navigation */}
        <nav className="flex-1 px-2 py-6">
          <ul className="space-y-1">
            {navLinks.map((link) => (
              <li key={link.name}>
                <SidebarButton icon={<link.icon className="w-5 h-5" />} label={link.name} />
              </li>
            ))}
          </ul>
        </nav>
        {/* User profile */}
        <div className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 mt-auto">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">Erica</p>
            <p className="text-xs text-gray-500 truncate">erica@example.com</p>
          </div>
          <ChevronDownIcon className="w-5 h-5 text-gray-400" />
        </div>
      </aside>
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-start py-2" style={{ paddingRight: '10px' }}>
        <div className="w-full bg-white rounded-xl shadow p-8 min-h-[400px]" style={{ height: '100%' }}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Inbox</h1>
          <hr className="mb-6" />
          {/* Content goes here */}
        </div>
      </div>
    </div>
  );
}

function SidebarButton({ icon, label, active }) {
  return (
    <button
      className={`flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium text-gray-700 transition group ${
        active
          ? 'bg-gray-100 text-gray-900'
          : 'hover:bg-gray-50 hover:text-blue-600'
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
} 