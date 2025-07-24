import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ChevronDownIcon
} from '@heroicons/react/24/outline';
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { routeConstant } from '../../constants/RouteConstants';
import { adminAuth } from '../../utils/api';

export default function AdminSidebar() {
  const navigate = useNavigate();

  const navLinks = [
    { name: 'Dashboard', icon: HomeIcon, to: routeConstant.ADMIN_DASHBOARD },
    { name: 'Orders', icon: ClipboardDocumentListIcon, to: routeConstant.ADMIN_ORDERS },
    { name: 'Menu', icon: ClipboardDocumentListIcon, to: routeConstant.ADMIN_MENU_LIST },
    { name: 'Coupons', icon: MegaphoneIcon, to: routeConstant.ADMIN_COUPON },
    { name: 'Settings', icon: Cog6ToothIcon, to: routeConstant.ADMIN_SETTINGS },
  ];

  const [sidebarOpen, setSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentUser = adminAuth.getCurrentUser() || { email: 'erica@example.com', name: 'Erica' };

  return (
    <aside className="flex flex-col w-64 h-screen border-gray-200 fixed top-0 left-0 z-30" style={{ minHeight: '100vh' }}>
      {/* Logo/title and collapse button */}
      <div className="flex items-center h-16 px-6 border-b border-gray-100">
        <span className="font-bold text-lg tracking-tight text-gray-900 flex-1">
          <p className="font-bold cursor-pointer">York<span className="text-customOrange">T</span>own</p>
        </span>

        <div className='' onClick={toggleSidebar}>
          {sidebarOpen ? <IoIosArrowForward className="w-5 h-5 text-gray-400" /> : <IoIosArrowBack className="w-5 h-5 text-gray-400" />}
        </div>
      </div>
      {/* Main navigation */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li key={link.name}>
              <NavLink
                to={link.to}
                className={({ isActive }) =>
                  `flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium transition group ${
                    isActive
                      ? 'bg-gray-100 text-gray-900'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-blue-600'
                  }`
                }
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </NavLink>
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
          <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name || 'Admin'}</p>
          <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
        </div>
        <ChevronDownIcon className="w-5 h-5 text-gray-400" />
      </div>
    </aside>
  );
} 