import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  MegaphoneIcon,
  Cog6ToothIcon,
  ChevronUpIcon,
  ArrowRightOnRectangleIcon,
} from "@heroicons/react/24/outline";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";
import { routeConstant } from "../../constants/RouteConstants";
import { adminAuth } from "../../utils/api";
import AdminLogoutModal from "./AdminLogoutModal";
import { PanelRightOpen } from "lucide-react";

export default function AdminSidebar({ toggleSidebar }) {
  const navigate = useNavigate();

  const navLinks = [
    { name: "Dashboard", icon: HomeIcon, to: routeConstant.ADMIN_DASHBOARD },
    {
      name: "Orders",
      icon: ClipboardDocumentListIcon,
      to: routeConstant.ADMIN_ORDERS,
    },
    // {
    //   name: "Menu",
    //   icon: ClipboardDocumentListIcon,
    //   to: routeConstant.ADMIN_MENU_LIST,
    // },
    { name: "Coupons", icon: MegaphoneIcon, to: routeConstant.ADMIN_COUPON },
    { name: "Settings", icon: Cog6ToothIcon, to: routeConstant.ADMIN_SETTINGS },
  ];

  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const currentUser = adminAuth.getCurrentUser() || {
    email: "erica@example.com",
    name: "Erica",
  };

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
    <aside className="h-full w-full flex flex-col">
      {/* Logo/title and collapse button */}
      <div className="flex items-center justify-between h-16 px-4 w-full border-b border-black/10">
        <PanelRightOpen
          strokeWidth={1}
          className="md:hidden block"
          onClick={toggleSidebar}
        />
        <span className="font-bold text-lg tracking-tight text-gray-900">
          <p className="font-bold cursor-pointer">
            York<span className="text-customOrange">T</span>own
          </p>
        </span>
      </div>

      {/* Main navigation */}
      <nav className="flex-1 px-2 py-6 overflow-y-auto">
        <ul className="space-y-1">
          {navLinks.map((link) => (
            <li
              key={link.name}
              className={link.name === "Settings" ? "relative group" : ""}
            >
              {link.name === "Settings" ? (
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
                        ? "bg-black/10 text-gray-900"
                        : "text-gray-700 hover:bg-black/5"
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
          className="flex items-center gap-3 px-6 py-4 border-t border-black/10 mt-auto cursor-pointer hover:bg-black/5 transition-colors"
          onClick={() => setShowUserDropdown(!showUserDropdown)}
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="User avatar"
            className="w-10 h-10 rounded-full object-cover border"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-gray-900 truncate">
              {currentUser.name || "Admin"}
            </p>
            <p className="text-xs text-gray-500 truncate">
              {currentUser.email}
            </p>
          </div>
          <ChevronUpIcon
            className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${
              showUserDropdown ? "rotate-180" : ""
            }`}
          />
        </div>

        {/* Dropdown menu */}
        {showUserDropdown && (
          <div className="absolute bottom-full left-0 right-0 mb-2 bg-mainBg border border-black/10 rounded-lg shadow-lg z-50">
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-6 py-3 text-left text-gray-700 hover:bg-black/5 cursor-pointer transition-colors rounded-lg"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        )}
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutModal && (
        <AdminLogoutModal
          cancelLogout={cancelLogout}
          confirmLogout={confirmLogout}
        />
      )}
    </aside>
  );
}
