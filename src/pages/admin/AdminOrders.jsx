import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { useNavigate } from 'react-router-dom';
import { routeConstant } from '../../constants/RouteConstants';
import { adminOrders } from '../../utils/api';
import { useLoader } from '../../components/common/LoaderContext';

const PAGE_SIZE = 20;

const AdminOrders = () => {
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
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />
      <div className="flex-1 flex flex-col items-center justify-start py-2" style={{ paddingRight: '10px', marginLeft: '256px' }}>
        <div className="w-full bg-white rounded-xl shadow p-8 min-h-[400px]" style={{ height: '100%' }}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Orders Dashboard</h1>
          <hr className="mb-6" />
          {/* Search and Table */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 mb-4 items-center justify-between w-full">
            <input
              className="border rounded px-3 py-2 w-full md:w-64"
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2" onClick={() => setPage(1)}>Search</button>
          </div>
          <div className="rounded-2xl overflow-x-auto animate-fadein">
            {loading ? (
              <div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>Loading orders...</div>
            ) : error ? (
              <div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>{error}</div>
            ) : (
              <table className="min-w-full bg-white rounded-lg overflow-hidden">
                <thead>
                  <tr>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Order ID</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">User</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Date</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Total</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Status</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Payment Status</th>
                    <th className="px-6 py-4 text-left font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.length > 0 ? orders.map((order, idx) => (
                    <tr key={order.id} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.customerName}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.placedAt ? new Date(order.placedAt).toLocaleDateString() : '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">${order.totalAmount?.toFixed(2)}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.status}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-gray-900">{order.paymentStatus || '-'}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button className="bg-black text-white px-4 py-2 rounded font-medium hover:bg-gray-800 transition" onClick={() => navigate(routeConstant.ADMIN_ORDER_DETAILS.replace(':orderId', order.id))}>View</button>
                      </td>
                    </tr>
                  )) : (
                    <tr><td colSpan={7} className="text-center text-red-500 py-8">No orders found.</td></tr>
                  )}
                </tbody>
              </table>
            )}
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4 animate-fadein">
            <button onClick={() => handlePage(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-gray-200 mx-1 disabled:opacity-50">&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded mx-1 ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePage(i + 1)}
              >{i + 1}</button>
            ))}
            <button onClick={() => handlePage(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-200 mx-1 disabled:opacity-50">&gt;</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrders; 