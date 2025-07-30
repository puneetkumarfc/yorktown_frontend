import React from 'react';

const Receipt = React.forwardRef(({ order, orderItems, payments }, ref) => (
  <div
    ref={ref}
    className="max-w-3xl mx-auto p-8 bg-white text-[1.1rem] text-black font-sans"
  >
    <h2 className="text-center mb-2 text-xl font-semibold">Order Receipt</h2>
    <div className="bg-gray-300 h-px mb-2" />

    <div className="mb-2 space-y-1 text-xs">
      <div><b>Order ID:</b> {order.id}</div>
      <div><b>Date:</b> {order.placedAt ? new Date(order.placedAt).toLocaleString() : '-'}</div>
      <div><b>Customer:</b> {order.customerName}</div>
      <div><b>Email:</b> {order.customerEmail || '-'}</div>
      <div><b>Phone:</b> {order.customerPhone || '-'}</div>
      <div><b>Address:</b> {order.customerAddress || '-'}</div>
    </div>

    <div className="bg-gray-300 h-px mb-2" />

    <div>
      <b className="text-xs">Items:</b>
      <table className="w-full text-xs mt-1 mb-2 border-collapse">
        <thead>
          <tr className="border-t border-gray-300">
            <th className="text-left px-2 py-1">Item</th>
            <th className="text-right px-2 py-1">Qty</th>
            <th className="text-right px-2 py-1">Price</th>
          </tr>
        </thead>
        <tbody>
          {orderItems && orderItems.length > 0 ? orderItems.map((item, idx) => (
            <tr key={idx} className="border-t border-gray-200 align-top">
              <td className="px-2 py-1 space-y-0.5">
                <div>{item.menuItemName} {item.sizeName ? `(${item.sizeName})` : ''}</div>
                {item.toppings.length > 0 && (
                  <div className="text-[10px] text-gray-600">
                    Topppings: {item.toppings.map(topping => topping.toppingName).join(", ")}
                  </div>
                )}
                {item.cheeses.length > 0 && (
                  <div className="text-[10px] text-gray-600">
                    Cheeses: {item.cheeses.map(topping => topping.cheeseName).join(", ")}
                  </div>
                )}
              </td>
              <td className="text-right px-2 py-1">{item.quantity}</td>
              <td className="text-right px-2 py-1">${item.totalPrice?.toFixed(2)}</td>
            </tr>
          )) : (
            <tr>
              <td colSpan={3} className="text-center py-2">No items</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    <div className="mb-2 text-xs"><b>Total:</b> ${order.totalAmount?.toFixed(2)}</div>
    <div className="mb-2 text-xs"><b>Status:</b> {order.status}</div>
    <div className="mb-2 text-xs"><b>Order Notes:</b> {order.orderNotes || '-'}</div>
    <div className="mb-2 text-xs">
      <b>Payment Status:</b> {payments && payments.length > 0 ? payments[0].paymentStatus || '-' : '-'}
    </div>

    <div className="bg-gray-300 h-px my-2" />

    <div className="text-center text-[10px] mt-3">
      Thank you for your order!
    </div>
  </div>
));

export default Receipt;