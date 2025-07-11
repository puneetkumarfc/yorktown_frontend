import React, { useState, useEffect } from 'react';
import './AdminOrders.css';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import { adminOrders } from '../../utils/api';

const PAGE_SIZE = 20;

const AdminOrders = ({ collapsed, setCollapsed }) => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('id');
  const [sortDir, setSortDir] = useState('desc');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError('');
      try {
        const payload = {
          search,
          sort: sortBy,
          rowSize: PAGE_SIZE,
          pageNumber: page - 1,
        };
        const response = await adminOrders.getOrdersList(payload);
        setOrders(response.data.orders || []);
        setTotalPages(response.data.totalPages || 1);
      } catch (err) {
        setError(err.message || 'Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [search, sortBy, sortDir, page]);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
    }
    setPage(1);
  };

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  return (
    <div className={`admin-dashboard-layout${collapsed ? ' collapsed' : ''}  px-[1rem] md:px-[6rem]`}>
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="admin-orders-container px-[1rem] md:px-[6rem]">
        <div className="glass-effect admin-titlebar">
          <h1 className="admin-title">Orders Dashboard</h1>
          <div className="admin-titlebar-search">
            <input
              className="admin-titlebar-search-input"
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <button className="admin-titlebar-search-btn" onClick={() => setPage(1)}>Search</button>
          </div>
        </div>
        <div className="glass-effect rounded-2xl overflow-hidden">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>Loading orders...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>{error}</div>
          ) : (
            <table className="w-full table-auto">
              <thead>
                <tr className="bg-red-500 text-white">
                  <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('id')}>
                    Order ID {sortBy === 'id' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('customerName')}>
                    User {sortBy === 'customerName' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('placedAt')}>
                    Date {sortBy === 'placedAt' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('totalAmount')}>
                    Total {sortBy === 'totalAmount' && (sortDir === 'asc' ? '↑' : '↓')}
                  </th>
                  <th className="px-6 py-4 text-left font-semibold">Status</th>
                  <th className="px-6 py-4 text-left font-semibold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length > 0 ? orders.map(order => (
                  <tr key={order.id} className="table-row transition duration-300">
                    <td className="px-6 py-4" data-label="Order ID">{order.id}</td>
                    <td className="px-6 py-4" data-label="User">{order.customerName}</td>
                    <td className="px-6 py-4" data-label="Date">{order.placedAt ? new Date(order.placedAt).toLocaleString() : '-'}</td>
                    <td className="px-6 py-4" data-label="Total">${order.totalAmount?.toFixed(2)}</td>
                    <td className="px-6 py-4" data-label="Status">
                      <span className={`px-3 py-1 rounded-full text-sm font-medium ${order.status === 'delivered' ? 'bg-green-600' : order.status === 'pending' ? 'bg-yellow-600' : 'bg-red-600'}`}>{order.status}</span>
                    </td>
                    <td className="px-6 py-4" data-label="Actions">
                      <button className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition duration-300 shadow-md" onClick={() => navigate(routeConstant.ADMIN_ORDER_DETAILS.replace(':orderId', order.id))}>
                        View
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={6} style={{ textAlign: 'center', color: '#ff2222' }}>No orders found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="admin-orders-pagination">
          <button onClick={() => handlePage(page - 1)} disabled={page === 1}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => handlePage(i + 1)}
            >{i + 1}</button>
          ))}
          <button onClick={() => handlePage(page + 1)} disabled={page === totalPages}>&gt;</button>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders; 