import React from 'react';

const Receipt = React.forwardRef(({ order, orderItems, payments }, ref) => (
  <div ref={ref} style={{ width: '380px', margin: '0 auto', fontFamily: 'monospace', background: '#fff', color: '#222', padding: 24 }}>
    <h2 style={{ textAlign: 'center', marginBottom: 8 }}>Order Receipt</h2>
    <hr />
    <div style={{ marginBottom: 8 }}>
      <div><b>Order ID:</b> {order.id}</div>
      <div><b>Date:</b> {order.placedAt ? new Date(order.placedAt).toLocaleString() : '-'}</div>
      <div><b>Customer:</b> {order.customerName}</div>
      <div><b>Email:</b> {order.customerEmail || '-'}</div>
      <div><b>Phone:</b> {order.customerPhone || '-'}</div>
      <div><b>Address:</b> {order.customerAddress || '-'}</div>
    </div>
    <hr />
    <div>
      <b>Items:</b>
      <table style={{ width: '100%', fontSize: 14, marginTop: 4, marginBottom: 8 }}>
        <thead>
          <tr>
            <th align="left">Item</th>
            <th align="right">Qty</th>
            <th align="right">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems && orderItems.length > 0 ? orderItems.map((item, idx) => (
            <tr key={idx}>
              <td>{item.menuItemName} {item.sizeName ? `(${item.sizeName})` : ''}</td>
              <td align="right">{item.quantity}</td>
              <td align="right">${item.totalPrice?.toFixed(2)}</td>
            </tr>
          )) : (
            <tr><td colSpan={3} style={{ textAlign: 'center' }}>No items</td></tr>
          )}
        </tbody>
      </table>
    </div>
    <div style={{ marginBottom: 8 }}>
      <b>Total:</b> ${order.totalAmount?.toFixed(2)}
    </div>
    <div style={{ marginBottom: 8 }}>
      <b>Status:</b> {order.status}
    </div>
    <div style={{ marginBottom: 8 }}>
      <b>Order Notes:</b> {order.orderNotes || '-'}
    </div>
    <div style={{ marginBottom: 8 }}>
      <b>Payment Status:</b> {payments && payments.length > 0 ? payments[0].paymentStatus || '-' : '-'}
    </div>
    <hr />
    
    <hr />
    <div style={{ textAlign: 'center', fontSize: 12, marginTop: 12 }}>
      Thank you for your order!
    </div>
  </div>
));

export default Receipt; 