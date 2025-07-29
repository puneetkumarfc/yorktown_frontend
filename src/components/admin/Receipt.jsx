import React from "react";

const Receipt = React.forwardRef(({ order, orderItems, payments }, ref) => {
  // Add error handling for missing data
  if (!order) {
    return (
      <div
        ref={ref}
        className="receipt-pdf-wrapper bg-white border border-gray-200 rounded-xl p-4 text-black max-w-2xl w-full mx-auto font-roboto shadow-lg"
      >
        <p className="text-center text-red-600">No order data available</p>
      </div>
    );
  }

  return (
    <div
      ref={ref}
      className="receipt-pdf-wrapper bg-white border border-gray-200 rounded-xl p-4 text-black max-w-2xl w-full mx-auto font-roboto shadow-lg"
      style={{
        minHeight: "fit-content",
        maxWidth: "100%",
        fontSize: "10px", // Smaller base font size for PDF
      }}
    >
      <h2 className="text-center text-base font-semibold mb-2 font-roboto_serif">
        Order Receipt
      </h2>
      <hr className="mb-3 border-black/10" />
      <div className="mb-4 grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-xs">
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Order ID:</span>
          <span className="font-light text-black/80">{order.id || "N/A"}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Date:</span>
          <span className="font-light text-black/80">
            {order.placedAt ? new Date(order.placedAt).toLocaleString() : "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Customer:</span>
          <span className="font-light text-black/80">
            {order.customerName || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Email:</span>
          <span className="font-light text-black/80">
            {order.customerEmail || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-semibold">Phone:</span>
          <span className="font-light text-black/80">
            {order.customerPhone || "N/A"}
          </span>
        </div>
        <div className="flex flex-col gap-0.5 md:col-span-2">
          <span className="font-semibold">Address:</span>
          <span className="font-light text-black/80">
            {order.customerAddress || "N/A"}
          </span>
        </div>
      </div>
      <hr className="mb-3 border-black/10" />
      <div className="mb-4">
        <b className="block mb-1 text-xs">Items:</b>
        <div className="overflow-x-auto">
          <table className="w-full text-xs border border-gray-200 rounded-lg">
            <thead>
              <tr className="bg-black/5">
                <th className="text-left py-1 px-1 font-medium text-gray-700">
                  Item
                </th>
                <th className="text-center py-1 px-1 font-medium text-gray-700">
                  Qty
                </th>
                <th className="text-right py-1 px-1 font-medium text-gray-700">
                  Price
                </th>
              </tr>
            </thead>
            <tbody>
              {orderItems && orderItems.length > 0 ? (
                orderItems.map((item, idx) => (
                  <tr key={idx} className="border-b border-gray-100">
                    <td className="py-1 px-1">
                      <div>
                        <span className="font-medium text-gray-900">
                          {item.menuItemName || "Unknown Item"}
                        </span>
                        {item.sizeName && (
                          <span className="text-xs text-gray-500 ml-1">
                            ({item.sizeName})
                          </span>
                        )}
                        {item.notes && (
                          <div className="text-xs text-gray-500 mt-0.5">
                            Note: {item.notes}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="text-center py-1 px-1 text-black font-light">
                      {item.quantity || 0}
                    </td>
                    <td className="text-right py-1 px-1 text-black font-light">
                      ${(item.totalPrice || 0).toFixed(2)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={3} className="text-center py-2 text-gray-500">
                    No items
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <div className="mb-1 flex gap-2 text-xs">
        <span className="font-semibold">Total:</span>
        <span className="font-light text-black/80">
          ${(order.totalAmount || 0).toFixed(2)}
        </span>
      </div>
      <div className="mb-1 flex gap-2 text-xs">
        <span className="font-semibold">Status:</span>
        <span className="font-light text-black/80">
          {order.status || "N/A"}
        </span>
      </div>
      <div className="mb-1 flex gap-2 text-xs">
        <span className="font-semibold">Order Notes:</span>
        <span className="font-light text-black/80">
          {order.orderNotes || "N/A"}
        </span>
      </div>
      <div className="mb-3 flex gap-2 text-xs">
        <span className="font-semibold">Payment Status:</span>
        <span className="font-light text-black/80">
          {payments && payments.length > 0
            ? payments[0].paymentStatus || "N/A"
            : "N/A"}
        </span>
      </div>
      <hr className="my-3 border-black/10" />
      <div className="text-center text-xs mt-2 text-black/60 font-roboto">
        Thank you for your order!
      </div>
    </div>
  );
});

Receipt.displayName = "Receipt";

export default Receipt;
