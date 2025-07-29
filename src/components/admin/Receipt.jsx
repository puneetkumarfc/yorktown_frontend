import React from "react";

const Receipt = React.forwardRef(({ order, orderItems, payments }, ref) => (
  <div
    ref={ref}
    className="receipt-pdf-wrapper bg-white border border-gray-200 rounded-xl p-8 text-black max-w-2xl w-full mx-auto font-roboto shadow-lg"
    style={{
      // Print-specific styles
      "@media print": {
        backgroundColor: "white",
        color: "black",
        boxShadow: "none",
        border: "1px solid #ccc",
        margin: "0",
        padding: "20px",
        maxWidth: "100%",
        width: "100%",
      },
    }}
  >
    <h2 className="text-center text-xl font-semibold mb-4 font-roboto_serif">
      Order Receipt
    </h2>
    <hr className="mb-6 border-black/10" />
    <div className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Order ID:</span>
        <span className="font-light text-black/80">{order.id}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Date:</span>
        <span className="font-light text-black/80">
          {order.placedAt ? new Date(order.placedAt).toLocaleString() : "-"}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Customer:</span>
        <span className="font-light text-black/80">{order.customerName}</span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Email:</span>
        <span className="font-light text-black/80">
          {order.customerEmail || "-"}
        </span>
      </div>
      <div className="flex flex-col gap-1">
        <span className="font-semibold">Phone:</span>
        <span className="font-light text-black/80">
          {order.customerPhone || "-"}
        </span>
      </div>
      <div className="flex flex-col gap-1 md:col-span-2">
        <span className="font-semibold">Address:</span>
        <span className="font-light text-black/80">
          {order.customerAddress || "-"}
        </span>
      </div>
    </div>
    <hr className="mb-6 border-black/10" />
    <div className="mb-8">
      <b className="block mb-2">Items:</b>
      <div className="overflow-x-auto">
        <table className="w-full text-xs border border-gray-200 rounded-lg">
          <thead>
            <tr className="bg-black/5">
              <th className="text-left py-2 px-2 font-medium text-gray-700">
                Item
              </th>
              <th className="text-center py-2 px-2 font-medium text-gray-700">
                Qty
              </th>
              <th className="text-right py-2 px-2 font-medium text-gray-700">
                Price
              </th>
            </tr>
          </thead>
          <tbody>
            {orderItems && orderItems.length > 0 ? (
              orderItems.map((item, idx) => (
                <tr key={idx} className="border-b border-gray-100">
                  <td className="py-2 px-2">
                    <span className="font-medium text-gray-900">
                      {item.menuItemName}
                    </span>
                    {item.sizeName && (
                      <span className="text-xs text-gray-500 ml-1">
                        ({item.sizeName})
                      </span>
                    )}
                  </td>
                  <td className="text-center py-2 px-2 text-black font-light">
                    {item.quantity}
                  </td>
                  <td className="text-right py-2 px-2 text-black font-light">
                    ${item.totalPrice?.toFixed(2)}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={3} className="text-center py-4 text-gray-500">
                  No items
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
    <div className="mb-2 flex gap-2 text-sm">
      <span className="font-semibold">Total:</span>
      <span className="font-light text-black/80">
        ${order.totalAmount?.toFixed(2)}
      </span>
    </div>
    <div className="mb-2 flex gap-2 text-sm">
      <span className="font-semibold">Status:</span>
      <span className="font-light text-black/80">{order.status}</span>
    </div>
    <div className="mb-2 flex gap-2 text-sm">
      <span className="font-semibold">Order Notes:</span>
      <span className="font-light text-black/80">
        {order.orderNotes || "-"}
      </span>
    </div>
    <div className="mb-6 flex gap-2 text-sm">
      <span className="font-semibold">Payment Status:</span>
      <span className="font-light text-black/80">
        {payments && payments.length > 0
          ? payments[0].paymentStatus || "-"
          : "-"}
      </span>
    </div>
    <hr className="my-6 border-black/10" />
    <div className="text-center text-xs mt-4 text-black/60 font-roboto">
      Thank you for your order!
    </div>
  </div>
));

export default Receipt;
