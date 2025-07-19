import React, { useState, useEffect } from 'react';
import './AdminOrders.css';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import { adminOrders } from '../../utils/api';
import { useLoader } from '../../components/common/LoaderContext';

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
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      showLoader();
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
        hideLoader();
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
                <tr className="table-order text-white">
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
                  <th className="px-6 py-4 text-left font-semibold">Payment Status</th>
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
                    <span
                        className="px-3 py-1 rounded-full text-sm font-medium admin-status"
                        style={{
                          background:
                            order.status === 'delivered' ? '#4CAF50' : // green
                            order.status === 'pending' ? '#FFC107' : // amber
                            order.status === 'cancelled' ? '#F44336' : // red
                            order.status === 'in oven' ? '#FF9800' : // orange
                            order.status === 'ready for pickup' ? '#2196F3' : // blue
                            order.status === 'received' ? '#9C27B0' : // purple
                            '#e1d5bd',
                          color:
                            order.status === 'pending' ? '#000' : '#fff',
                          border: '1.5px solid #bd390e',
                          minWidth: 110,
                          display: 'inline-block',
                          textAlign: 'center',
                          textTransform: 'capitalize',
                        }}
                      >
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4" data-label="Payment Status">{order.paymentStatus || '-'}</td>
                    <td className="px-6 py-4" data-label="Actions">
                    <button
                        style={{
                          background: 'linear-gradient(90deg, #bd390e 0%, #e1d5bd 100%)',
                          color: '#fff',
                          fontWeight: 700,
                          border: 'none',
                          borderRadius: 12,
                          padding: '0.7rem 2rem',
                          boxShadow: '0 4px 16px 0 rgba(189,57,14,0.15)',
                          letterSpacing: 1,
                          fontSize: '1.1rem',
                          cursor: 'pointer',
                          transition: 'background 0.2s, color 0.2s',
                        }}
                        onClick={() => navigate(routeConstant.ADMIN_ORDER_DETAILS.replace(':orderId', order.id))}
                      >
                        View
                      </button>
                    </td>
                  </tr>
                )) : (
                  <tr><td colSpan={7} style={{ textAlign: 'center', color: '#ff2222' }}>No orders found.</td></tr>
                )}
              </tbody>
            </table>
          )}
        </div>
        <div className="admin-orders-pagination animate-fadein" style={{ justifyContent: 'flex-end', marginRight: 0 }}>
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