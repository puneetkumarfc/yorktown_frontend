import React from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';

const summaryData = [
  { label: 'Total Orders Today', value: 128, icon: '\ud83d\uded2', color: 'red' },
  { label: 'Pending Orders', value: 12, icon: '\u23f3', color: 'orange' },
  { label: 'Revenue', value: '$2,340', icon: '\ud83d\udcb0', color: 'green' },
  { label: 'New Users', value: 23, icon: '\ud83d\udc64', color: 'blue' },
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

const AdminDashboard = () => {
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
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr className="bg-gray-100 text-gray-700">
                  <th className="px-4 py-2 text-left">Order ID</th>
                  <th className="px-4 py-2 text-left">User</th>
                  <th className="px-4 py-2 text-left">Total</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {recentOrders.map(order => (
                  <tr key={order.id} className="border-b last:border-b-0">
                    <td className="px-4 py-2">{order.id}</td>
                    <td className="px-4 py-2">{order.user}</td>
                    <td className="px-4 py-2">{order.total}</td>
                    <td className="px-4 py-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                        order.status === 'Delivered' ? 'bg-green-700 text-green-200' :
                        order.status === 'Pending' ? 'bg-yellow-500 text-yellow-900' :
                        order.status === 'Cancelled' ? 'bg-red-700 text-red-200' :
                        'bg-gray-300 text-gray-700'
                      }`}>
                        {order.status}
                      </span>
                    </td>
                    <td className="px-4 py-2">{order.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Revenue Chart */}
          <div>
            <h2 className="text-lg font-semibold mb-2">Revenue (This Week)</h2>
            <div className="flex items-end gap-4 h-40">
              {chartData.map((bar, idx) => (
                <div key={idx} className="flex flex-col items-center justify-end h-full">
                  <div className="w-8 bg-gradient-to-b from-red-500 to-red-800 rounded-t-lg flex items-end justify-center" style={{ height: `${bar.value / 10 + 20}px` }}>
                    <span className="text-xs text-white font-semibold mb-1">${bar.value}</span>
                  </div>
                  <span className="text-xs text-gray-500 mt-1">{bar.label}</span>
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