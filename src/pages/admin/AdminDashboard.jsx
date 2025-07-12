import React, { useState } from 'react';
import './AdminDashboard.css';
import AdminSidebar from '../../components/admin/AdminSidebar';

const summaryData = [
  { label: 'Total Orders Today', value: 128, icon: '🛒', color: 'red' },
  { label: 'Pending Orders', value: 12, icon: '⏳', color: 'orange' },
  { label: 'Revenue', value: '$2,340', icon: '💰', color: 'green' },
  { label: 'New Users', value: 23, icon: '👤', color: 'blue' },
];

const recentOrders = [
  { id: 'ORD-1001', user: 'John Doe', total: '$45.00', status: 'Delivered', date: '2024-06-01' },
  { id: 'ORD-1002', user: 'Jane Smith', total: '$32.50', status: 'Pending', date: '2024-06-01' },
  { id: 'ORD-1003', user: 'Alice Brown', total: '$27.99', status: 'Delivered', date: '2024-06-01' },
  { id: 'ORD-1004', user: 'Bob Lee', total: '$19.99', status: 'Cancelled', date: '2024-06-01' },
];

const chartData = [
  { label: 'Mon', value: 300 },
  { label: 'Tue', value: 500 },
  { label: 'Wed', value: 400 },
  { label: 'Thu', value: 700 },
  { label: 'Fri', value: 600 },
  { label: 'Sat', value: 900 },
  { label: 'Sun', value: 800 },
];

const AdminDashboard = ({ collapsed, setCollapsed }) => {
  return (
    <div className={`admin-dashboard-layout${collapsed ? ' collapsed' : ''}  px-[1rem] md:px-[6rem]`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="admin-dashboard-container">
        <div className="admin-dashboard-titlebar">
          <h1 className="admin-title">Dashboard</h1>
        </div>
        <div className="admin-dashboard-summary">
          {summaryData.map((item, idx) => (
            <div className="admin-summary-card" key={idx}>
              <div className="admin-summary-icon" style={{ background: '#b30000' }}>{item.icon}</div>
              <div className="admin-summary-value">{item.value}</div>
              <div className="admin-summary-label">{item.label}</div>
            </div>
          ))}
        </div>
        <div className="admin-dashboard-main">
          <div className="admin-dashboard-orders">
            <h2>Recent Orders</h2>
            <table className="admin-orders-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id}>
                    <td>{order.id}</td>
                    <td>{order.user}</td>
                    <td>{order.total}</td>
                    <td><span className={`admin-status admin-status-${order.status.toLowerCase()}`}>{order.status}</span></td>
                    <td>{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="admin-dashboard-charts">
            <h2>Revenue (This Week)</h2>
            <div className="admin-bar-chart">
              {chartData.map((bar, idx) => (
                <div key={idx} className="admin-bar-item">
                  <div className="admin-bar" style={{ height: `150px`, minHeight: '20px', background: 'linear-gradient(180deg, #ff2222 0%, #b30000 100%)', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <span className="admin-bar-value" style={{ color: '#fff', fontSize: '0.9rem', marginBottom: '4px' }}>{`$${bar.value}`}</span>
                  </div>
                  <span className="admin-bar-label">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 