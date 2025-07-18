import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AdminOrderDetails.module.css';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { adminOrders } from '../../utils/api';
import { useLoader } from '../../components/common/LoaderContext';

const AdminOrderDetails = ({ collapsed, setCollapsed }) => {
  let { orderId } = useParams();
  // Fallback: extract orderId from the URL if useParams() fails
  if (!orderId) {
    const match = window.location.pathname.match(/\/admin\/orders\/(\w+)/);
    if (match && match[1]) {
      orderId = match[1];
    }
  }
  const navigate = useNavigate();
  const [orderData, setOrderData] = useState(null);
  const [statusOptions, setStatusOptions] = useState([]);
  const [status, setStatus] = useState('');
  const [statusId, setStatusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      showLoader();
      setError('');
      try {
        const response = await adminOrders.getOrderDetailsById(orderId);
        setOrderData(response.data);
        setStatusOptions(response.data.orderStatuses || []);
        if (response.data.order) {
          setStatus(response.data.order.status);
          // Find statusId for the current status
          const currentStatus = (response.data.orderStatuses || []).find(opt => opt.name === response.data.order.status);
          setStatusId(currentStatus ? currentStatus.id : null);
        }
      } catch (err) {
        setError(err.message || 'Failed to fetch order details');
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // Handle status change
  const handleStatusChange = (e) => {
    setStatus(e.target.value);
    // Find the statusId for the selected status name
    const selected = statusOptions.find(opt => opt.name === e.target.value);
    setStatusId(selected ? selected.id : null);
  };

  // Handle submit
  const handleSubmit = async () => {
    setSubmitLoading(true);
    showLoader();
    setSubmitError('');
    try {
      const response = await adminOrders.updateOrderStatusApi({ orderId: Number(orderId), statusId });
      if (response.status === true) {
        navigate('/admin/orders');
      } else {
        setSubmitError(response.message || 'Failed to update order status');
      }
    } catch (err) {
      setSubmitError(err.message || 'Failed to update order status');
    } finally {
      setSubmitLoading(false);
      hideLoader();
    }
  };

  if (loading) {
    return <div className={styles.adminOrderDetailsBg + ' ' + styles.gradientBg}><div className={styles.adminOrderDetailsWrapper + ' ' + styles.glassEffect}><div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>Loading order details...</div></div></div>;
  }
  if (error) {
    return <div className={styles.adminOrderDetailsBg + ' ' + styles.gradientBg}><div className={styles.adminOrderDetailsWrapper + ' ' + styles.glassEffect}><div style={{ textAlign: 'center', color: '#ff2222', padding: '2rem' }}>{error}</div></div></div>;
  }
  if (!orderData) {
    return null;
  }
  const { order, orderItems, payments } = orderData;

  return (
    <div className={styles.adminDashboardFlexLayout + (collapsed ? ' ' + styles.collapsed : '')}>
      <div className={styles.sidebarFlex + (collapsed ? ' ' + styles.collapsed : '')}>
        <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      </div>
      <div className={styles.adminOrderDetailsBg + ' ' + styles.gradientBg}>
        <div className={styles.adminOrderDetailsWrapper + ' ' + styles.glassEffect}>
          <div className={styles.titlebar}>
            <h1 className={styles.title}>Order Details</h1>
          </div>
          <div className={styles.detailsItemsLayout}>
            <div className={styles.detailsCol}>
              <div className={styles.sectionCard}>
                <div className={styles.detailsGrid}>
                  <div>
                    <div className={styles.detailLabel}>Order ID</div>
                    <div className={styles.detailValue}>{order.id}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Customer</div>
                    <div className={styles.detailValue}>{order.customerName}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Email</div>
                    <div className={styles.detailValue}>{order.customerEmail || '-'}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Phone</div>
                    <div className={styles.detailValue}>
                      {order.customerPhone ? (
                        <>
                          {order.customerPhone}
                          {` `}
                          <a
                            href={`tel:${order.customerPhone}`}
                            style={{
                              marginLeft: '0.5rem',
                              color: '#bd390e',
                              textDecoration: 'underline',
                              fontWeight: 600,
                              fontSize: '1.1rem',
                            }}
                            title="Call customer"
                          >
                            Call
                          </a>
                        </>
                      ) : '-'}
                    </div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Date</div>
                    <div className={styles.detailValue}>{order.placedAt ? new Date(order.placedAt).toLocaleString() : '-'}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Total</div>
                    <div className={styles.detailValue}>${order.totalAmount?.toFixed(2)}</div>
                  </div>
                  <div className={styles.fullWidth}>
                    <div className={styles.detailLabel}>Delivery Address</div>
                    <div className={styles.detailValue}>{order.customerAddress || '-'}</div>
                  </div>
                  <div className={styles.fullWidth}>
                    <div className={styles.detailLabel}>Order Notes</div>
                    <div className={styles.detailValue}>{order.orderNotes || '-'}</div>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.itemsCol}>
              <div className={styles.detailLabel}>Items</div>
              <table className={styles.itemsTable + ' w-full mt-2'}>
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Qty</th>
                    <th>Price</th>
                    <th>Notes</th>
                  </tr>
                </thead>
                <tbody>
                  {orderItems && orderItems.length > 0 ? orderItems.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.menuItemName} {item.sizeName ? `(${item.sizeName})` : ''}</td>
                      <td>{item.quantity}</td>
                      <td>${item.totalPrice?.toFixed(2)}</td>
                      <td>{item.notes || '-'}</td>
                    </tr>
                  )) : (
                    <tr><td colSpan={4} style={{ textAlign: 'center' }}>No items</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className={styles.statusSection}>
            <label className={styles.detailLabel} htmlFor="order-status">Status</label>
            <select
              id="order-status"
              className={styles.statusDropdown + ' modernStatusDropdown'}
              value={status}
              onChange={handleStatusChange}
            >
              {statusOptions.map(opt => (
                <option key={opt.id} value={opt.name}>{opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}</option>
              ))}
            </select>
          </div>
          {submitError && <div style={{ color: '#bd390e', textAlign: 'center', marginBottom: '1rem' }}>{submitError}</div>}
          <div className={styles.actionsRow}>
            <button className={styles.saveBtn} onClick={handleSubmit} disabled={submitLoading || !statusId}>
              {submitLoading ? 'Submitting...' : 'Submit'}
            </button>
            <button className={styles.cancelBtn} onClick={() => navigate('/admin/orders')}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails; 