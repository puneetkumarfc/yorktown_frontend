import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import DataTable from '../../components/admin/DataTable';
import { Ellipsis } from 'lucide-react';

const summaryData = [
  { label: 'Total Orders Today', value: 128, icon: '\ud83d\uded2', color: 'red' },
  { label: 'Pending Orders', value: 12, icon: '\u23f3', color: 'orange' },
  { label: 'Revenue', value: '$2,340', icon: '\ud83d\udcb0', color: 'green' },
  { label: 'New Users', value: 23, icon: '\ud83d\udc64', color: 'blue' },
];

const recentOrders = [
  { id: 'ORD-1001', numericId: 1001, user: 'John Doe', total: '$45.00', status: 'Delivered', date: '2024-06-01' },
  { id: 'ORD-1002', numericId: 1002, user: 'Jane Smith', total: '$32.50', status: 'Pending', date: '2024-06-01' },
  { id: 'ORD-1003', numericId: 1003, user: 'Alice Brown', total: '$27.99', status: 'Delivered', date: '2024-06-01' },
  { id: 'ORD-1004', numericId: 1004, user: 'Bob Lee', total: '$19.99', status: 'Cancelled', date: '2024-06-01' },
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

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dropdownId, setDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownId !== null && !event.target.closest('.action-dropdown-container')) {
        setDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownId]);

  const columns = [
    {
      header: "Order ID",
      cell: (order) => order.id,
    },
    {
      header: "User",
      cell: (order) => order.user,
    },
    {
      header: "Total",
      cell: (order) => order.total,
    },
    {
      header: "Status",
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      cell: (order) => (
        <span className={`border text-center rounded-full px-2 py-1 text-xs ${
          order.status === 'Delivered' ? 'border-green-600 bg-green-100 text-green-600' :
          order.status === 'Pending' ? 'border-yellow-400 bg-yellow-100 text-yellow-500' :
          order.status === 'Cancelled' ? 'border-red-600 bg-red-100 text-red-600' :
          'border-gray-400 bg-gray-100 text-gray-500'
        }`}>
          {order.status}
        </span>
      ),
    },
    {
      header: "Date",
      cell: (order) => order.date,
    },
    {
      header: "Actions",
      headerClassName: "text-center",
      cellClassName: "flex justify-center items-center",
      cell: (item) => (
        <div className="relative action-dropdown-container">
          <button
            onClick={() => toggleDropdown(item.id)}
            className="text-gray-500 cursor-pointer hover:text-black transition focus:outline-none flex items-center"
            title="Actions"
          >
            <Ellipsis strokeWidth={1.1}/>
          </button>
          {dropdownId === item.id && (
            <div className='absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20'>
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { navigate(routeConstant.ADMIN_ORDER_DETAILS.replace(":orderId", item.numericId)); setDropdownId(null); }}
                  >View</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col items-center justify-start py-2" style={{ paddingRight: '10px', marginLeft: '256px' }}>
        <div className="w-full bg-white rounded-xl shadow p-8 min-h-[400px]" style={{ height: '100%' }}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Dashboard</h1>
          <hr className="mb-6" />
          {/* Summary cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {summaryData.map((item, idx) => (
              <div key={idx} className="flex flex-col items-center bg-gray-50 rounded-lg p-4 shadow-sm">
                <div className="text-3xl mb-2" style={{ color: item.color }}>{item.icon}</div>
                <div className="text-xl font-bold">{item.value}</div>
                <div className="text-gray-500 text-sm">{item.label}</div>
              </div>
            ))}
          </div>
          {/* Recent Orders Table */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-2">Recent Orders</h2>
            <div className={`rounded-2xl animate-fadein text-black ${dropdownId !== null ? 'overflow-visible' : 'overflow-x-auto'}`}>
              <DataTable columns={columns} data={recentOrders} isMenuOpen={dropdownId !== null} />
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 