import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import styles from './AdminOrderDetails.module.css';
import AdminSidebar from '../../components/admin/AdminSidebar';

const mockOrder = {
  id: 'ORD-1001',
  user: 'John Doe',
  date: '2024-06-01',
  total: '$45.00',
  status: 'Delivered',
  address: '123 Main St, New York, NY',
  items: [
    { name: 'Pizza Margherita', qty: 2, price: '$20.00' },
    { name: 'Coke', qty: 1, price: '$5.00' },
  ],
};

// Replace statusOptions with the new statuses
const statusOptions = [
  { id: 6, name: 'cancelled' },
  { id: 5, name: 'delivered' },
  { id: 3, name: 'in oven' },
  { id: 2, name: 'preparing' },
  { id: 4, name: 'ready for pickup' },
  { id: 1, name: 'received' },
];

const AdminOrderDetails = ({ collapsed, setCollapsed }) => {
  const { orderId } = useParams();
  const navigate = useNavigate();
  // In real app, fetch order by orderId
  // Default to the id of the current status (simulate 'received' for now)
  const [status, setStatus] = useState(1);

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
                    <div className={styles.detailValue}>{mockOrder.id}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Customer</div>
                    <div className={styles.detailValue}>{mockOrder.user}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Date</div>
                    <div className={styles.detailValue}>{mockOrder.date}</div>
                  </div>
                  <div>
                    <div className={styles.detailLabel}>Total</div>
                    <div className={styles.detailValue}>{mockOrder.total}</div>
                  </div>
                  <div className={styles.fullWidth}>
                    <div className={styles.detailLabel}>Delivery Address</div>
                    <div className={styles.detailValue}>{mockOrder.address}</div>
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
                  </tr>
                </thead>
                <tbody>
                  {mockOrder.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{item.name}</td>
                      <td>{item.qty}</td>
                      <td>{item.price}</td>
                    </tr>
                  ))}
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
              onChange={e => setStatus(Number(e.target.value))}
            >
              {statusOptions.map(opt => (
                <option key={opt.id} value={opt.id}>{opt.name.charAt(0).toUpperCase() + opt.name.slice(1)}</option>
              ))}
            </select>
          </div>
          <div className={styles.actionsRow}>
            <button className={styles.saveBtn}>Save</button>
            <button className={styles.cancelBtn} onClick={() => navigate('/admin/orders')}>Cancel</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails; 