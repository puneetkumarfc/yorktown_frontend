import React, { useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import { adminAuth } from '../../utils/api';
import { FaTachometerAlt, FaListAlt, FaSignOutAlt, FaBars, FaUtensils } from 'react-icons/fa';
import './AdminSidebar.css';

const links = [
  { label: 'Dashboard', to: routeConstant.ADMIN_DASHBOARD, icon: <FaTachometerAlt /> },
  { label: 'Orders', to: routeConstant.ADMIN_ORDERS, icon: <FaListAlt /> },
  { label: 'Menu', to: routeConstant.ADMIN_MENU_LIST, icon: <FaUtensils /> },
];

const AdminSidebar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleLogout = () => {
    setShowLogoutConfirm(true);
  };

  const confirmLogout = () => {
    adminAuth.logout();
    navigate(routeConstant.ADMIN_LOGIN);
    setShowLogoutConfirm(false);
  };

  const cancelLogout = () => {
    setShowLogoutConfirm(false);
  };

  return (
    <>
      <div className={`admin-sidebar${collapsed ? ' collapsed' : ''}`}> 
        <button className="admin-sidebar-toggle" onClick={() => setCollapsed(!collapsed)}>
          <FaBars />
        </button>
        <nav className="admin-sidebar-nav">
          {links.map(link => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                'admin-sidebar-link' + (isActive ? ' active' : '')
              }
              end
            >
              <span className="admin-sidebar-icon">{link.icon}</span>
              {!collapsed && <span className="admin-sidebar-label">{link.label}</span>}
            </NavLink>
          ))}
          <button className="admin-sidebar-link logout" onClick={handleLogout}>
            <span className="admin-sidebar-icon"><FaSignOutAlt /></span>
            {!collapsed && <span className="admin-sidebar-label">Logout</span>}
          </button>
        </nav>
      </div>

      {/* Logout Confirmation Modal */}
      {showLogoutConfirm && (
        <div className="logout-confirm-overlay" onClick={cancelLogout}>
          <div className="logout-confirm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="logout-confirm-header">
              <h3>Confirm Logout</h3>
              <button className="logout-confirm-close" onClick={cancelLogout}>
                ×
              </button>
            </div>
            <div className="logout-confirm-content">
              <p>Are you sure you want to logout?</p>
            </div>
            <div className="logout-confirm-footer">
              <button className="logout-confirm-btn cancel" onClick={cancelLogout}>
                Cancel
              </button>
              <button className="logout-confirm-btn confirm" onClick={confirmLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminSidebar; 