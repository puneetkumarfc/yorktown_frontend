import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ArrowRightOnRectangleIcon
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
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const currentUser = adminAuth.getCurrentUser() || { email: 'erica@example.com', name: 'Erica' };

  const handleLogout = () => {
    setShowUserDropdown(false);
    setShowLogoutModal(true);
  };

  const confirmLogout = () => {
    // Clear session/localStorage
    localStorage.clear();
    sessionStorage.clear();
    // Redirect to login page
    navigate(routeConstant.ADMIN_LOGIN);
  };

  const cancelLogout = () => {
    setShowLogoutModal(false);
  };

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
            <li key={link.name} className={link.name === 'Settings' ? 'relative group' : ''}>
              {link.name === 'Settings' ? (
                // Disabled Settings link with tooltip
                <>
                  <div className="flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium text-black/20 cursor-not-allowed">
                    <link.icon className="w-5 h-5" />
                    <span>{link.name}</span>
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                    Coming Soon
                  </div>
                </>
              ) : (
                // Regular NavLink for other items
                <NavLink
                  to={link.to}
                  className={({ isActive }) =>
                    `flex items-center gap-3 w-full px-4 py-2 rounded-lg font-medium transition group ${
                      isActive
                        ? 'bg-gray-100 text-gray-900'
                        : 'text-gray-700 hover:bg-gray-50 hover:text-customOrange'
                    }`
                  }
                >
                  <link.icon className="w-5 h-5" />
                  <span>{link.name}</span>
                </NavLink>
              )}
            </li>
          ))}
        </ul>
      </nav>

      {/* User profile */}
      <div className="relative">
        <div 
          className="flex items-center gap-3 px-6 py-4 border-t border-gray-100 mt-auto cursor-pointer hover:bg-gray-50 transition-colors"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">{currentUser.name || 'Admin'}</p>
            <p className="text-xs text-gray-500 truncate">{currentUser.email}</p>
          </div>
          <ChevronUpIcon className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
            showUserDropdown ? 'rotate-180' : ''
          }`} />
        </div>
        
        {/* Dropdown menu */}
        {showUserDropdown && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-700 hover:bg-gray-50 transition-colors rounded-lg"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-2xl border border-gray-200 w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="text-lg font-roboto_serif text-gray-900 font-semibold">
                Confirm Logout
              </h2>
            </div>
            
            <div className="mb-6">
              <p className="font-roboto text-gray-600">
                Are you sure you want to logout? You will be redirected to the login page.
              </p>
            </div>
            
            <div className="flex justify-end gap-3">
              <button
                onClick={cancelLogout}
                className="px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
} 