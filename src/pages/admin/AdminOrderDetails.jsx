import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { adminOrders } from "../../utils/api";
import { useLoader } from "../../components/common/LoaderContext";
import Receipt from "../../components/admin/Receipt";
import { useReactToPrint } from "react-to-print";
import html2pdf from "html2pdf.js";
import { ChevronDown } from "lucide-react";
import CustomButton from "../../components/admin/CustomButton";

const AdminOrderDetails = () => {
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
  const [status, setStatus] = useState("");
  const [statusId, setStatusId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [submitLoading, setSubmitLoading] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const { showLoader, hideLoader } = useLoader();
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showStatusDropdown, setShowStatusDropdown] = useState(false);
  const receiptRef = React.useRef();
  const handlePrint = useReactToPrint({
    content: () => receiptRef.current,
    documentTitle:
      orderData && orderData.order
        ? `Order_${orderData.order.id}_Receipt`
        : "Order_Receipt",
  });

  const handleDownloadPDF = () => {
    if (!receiptRef.current) return;
    const orderId = order?.id || "Receipt";
    html2pdf()
      .set({
        margin: [0.2, 0.2, 0.2, 0.2], // top, left, bottom, right (inches)
        filename: `Order_${orderId}.pdf`,
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      })
      .from(receiptRef.current)
      .save();
  };

  useEffect(() => {
    const fetchOrderDetails = async () => {
      setLoading(true);
      showLoader();
      setError("");
      try {
        const response = await adminOrders.getOrderDetailsById(orderId);
        setOrderData(response.data);
        setStatusOptions(response.data.orderStatuses || []);
        if (response.data.order) {
          setStatus(response.data.order.status);
          // Find statusId for the current status
          const currentStatus = (response.data.orderStatuses || []).find(
            (opt) => opt.name === response.data.order.status
          );
          setStatusId(currentStatus ? currentStatus.id : null);
        }
      } catch (err) {
        setError(err.message || "Failed to fetch order details");
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchOrderDetails();
  }, [orderId]);

  // Handle status change
  const handleStatusChange = (selectedStatus) => {
    setStatus(selectedStatus);
    // Find the statusId for the selected status name
    const selected = statusOptions.find((opt) => opt.name === selectedStatus);
    setStatusId(selected ? selected.id : null);
    setShowStatusDropdown(false);
  };

  // Handle submit
  const handleSubmit = async () => {
    setSubmitLoading(true);
    showLoader();
    setSubmitError("");
    try {
      const response = await adminOrders.updateOrderStatusApi({
        orderId: Number(orderId),
        statusId,
      });
      if (response.status === true) {
        navigate("/admin/orders");
      } else {
        setSubmitError(response.message || "Failed to update order status");
      }
    } catch (err) {
      setSubmitError(err.message || "Failed to update order status");
    } finally {
      setSubmitLoading(false);
      hideLoader();
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex overflow-y-auto">
        <div
          className="flex-1 flex flex-col items-center justify-start py-2"
          style={{ paddingRight: "10px", marginLeft: "256px" }}
        >
          <div
            className="w-full bg-mainBg rounded-xl shadow p-8 min-h-screen"
            style={{ height: "100%" }}
          >
            <div className="text-center text-gray-500 py-8">
              Loading order details...
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex">
        <AdminSidebar />
        <div
          className="flex-1 flex flex-col items-center justify-start py-2"
          style={{ paddingRight: "10px", marginLeft: "256px" }}
        >
          <div
            className="w-full bg-mainBg rounded-xl shadow p-8 min-h-screen"
            style={{ height: "100%" }}
          >
            <div className="text-center text-red-500 py-8">{error}</div>
          </div>
        </div>
      </div>
    );
  }

  if (!orderData) {
    return null;
  }

  const { order, orderItems, payments } = orderData;

  return (
    <div className="min-h-screen bg-[#E8EDE9] flex">
      {/* Print Receipt Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50 p-4">
          <div className="bg-mainBg rounded-xl shadow-2xl border border-gray-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6">
            <div className="flex justify-end gap-3 mb-4">
              <CustomButton
                text="Download PDF"
                active={true}
                onClick={handleDownloadPDF}
              />
              <CustomButton
                text="Close"
                active={false}
                onClick={() => setShowPrintModal(false)}
              />
            </div>
            <div>
              <Receipt
                ref={receiptRef}
                order={order}
                orderItems={orderItems}
                payments={payments}
              />
            </div>
          </div>
        </div>
      )}

      <div
        className="flex-1 flex flex-col items-center justify-start py-2 overflow-auto"
        style={{ paddingRight: "10px", marginLeft: "256px" }}
      >
        <div
          className="w-full bg-mainBg rounded-xl shadow p-8 min-h-screen"
          style={{ height: "100%" }}
        >
          <h1 className="text-xl font-roboto_serif font-semibold text-gray-900 mb-2">
            Order Details
          </h1>
          <hr className="mb-6 text-black/10" />

          <div className="flex items-end gap-2 mb-4">
            <div className="flex-1"></div>
            <CustomButton
              text="Print Receipt"
              active={true}
              onClick={() => setShowPrintModal(true)}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Order Details */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Order ID
                  </label>
                  <p className="text-gray-900 font-medium">{order.id}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Customer
                  </label>
                  <p className="text-gray-900">{order.customerName}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Email
                  </label>
                  <p className="text-gray-900">{order.customerEmail || "-"}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Phone
                  </label>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900">
                      {order.customerPhone || "-"}
                    </span>
                    {order.customerPhone && (
                      <a
                        href={`tel:${order.customerPhone}`}
                        className="text-mainRed hover:text-mainRed/80 text-sm font-medium underline"
                        title="Call customer"
                      >
                        Call
                      </a>
                    )}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Date
                  </label>
                  <p className="text-gray-900">
                    {order.placedAt
                      ? new Date(order.placedAt).toLocaleString()
                      : "-"}
                  </p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Total
                  </label>
                  <p className="text-gray-900 font-semibold">
                    ${order.totalAmount?.toFixed(2)}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Delivery Address
                  </label>
                  <p className="text-gray-900">
                    {order.customerAddress || "-"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Order Notes
                  </label>
                  <p className="text-gray-900">{order.orderNotes || "-"}</p>
                </div>
                {payments && payments.length > 0 && (
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-black/30 mb-1">
                      Payment Status
                    </label>
                    <p className="text-gray-900">
                      {payments[0].paymentStatus || "-"}
                    </p>
                  </div>
                )}
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-black/30 mb-1">
                    Order Status
                  </label>
                  <span className="border text-center border-green-600 bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs">
                    {order.status || "Active"}
                  </span>
                </div>
              </div>
            </div>

            {/* Order Items */}
            <div className="border border-gray-200 rounded-lg p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Order Items
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-2 font-medium text-gray-700">
                        Item
                      </th>
                      <th className="text-center py-2 font-medium text-gray-700">
                        Qty
                      </th>
                      <th className="text-right py-2 font-medium text-gray-700">
                        Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {orderItems && orderItems.length > 0 ? (
                      orderItems.map((item, idx) => (
                        <tr key={idx} className="border-b border-gray-100">
                          <td className="py-2">
                            <div>
                              <p className="font-medium text-gray-900">
                                {item.menuItemName}
                              </p>
                              {item.sizeName && (
                                <p className="text-xs text-gray-500">
                                  ({item.sizeName})
                                </p>
                              )}
                              {item.notes && (
                                <p className="text-xs text-gray-500">
                                  Note: {item.notes}
                                </p>
                              )}
                            </div>
                          </td>
                          <td className="text-center py-2 text-gray-900">
                            {item.quantity}
                          </td>
                          <td className="text-right py-2 text-gray-900 font-medium">
                            ${item.totalPrice?.toFixed(2)}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          colSpan={3}
                          className="text-center py-4 text-gray-500"
                        >
                          No items
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Status Update Section */}
          <div className="border border-gray-200 rounded-lg p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Update Status
            </h2>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label className="block text-sm font-medium text-black/30 mb-2">
                  Order Status
                </label>
                <div className="relative">
                  <button
                    type="button"
                    className="bg-mainBg border border-gray-300 rounded-lg px-3 py-2 flex items-center justify-between w-full focus:outline-none focus:ring-1 focus:ring-black text-black"
                    onClick={() => setShowStatusDropdown((v) => !v)}
                  >
                    <span>{status}</span>
                    <ChevronDown
                      className={`text-gray-400 ml-2 transition-transform duration-200 ${
                        showStatusDropdown ? "rotate-180" : ""
                      }`}
                      size={20}
                    />
                  </button>
                  {showStatusDropdown && (
                    <ul className="absolute top-full left-0 right-0 mt-2 bg-mainBg border border-gray-200 rounded-lg shadow-lg z-10">
                      {statusOptions.map((option) => (
                        <li
                          key={option.id}
                          onClick={() => handleStatusChange(option.name)}
                          className="px-4 py-2 cursor-pointer hover:bg-black/5 text-black text-sm font-normal"
                        >
                          {option.name.charAt(0).toUpperCase() +
                            option.name.slice(1)}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              </div>
            </div>
          </div>

          {submitError && (
            <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-center">{submitError}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end gap-3">
            <CustomButton
              text="Back"
              active={false}
              onClick={() => navigate("/admin/orders")}
            />
            <CustomButton
              text={submitLoading ? "Updating..." : "Update Status"}
              active={true}
              onClick={handleSubmit}
              disabled={submitLoading || !statusId}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrderDetails;
