import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/RouteConstants";
import DataTable from "../../components/admin/DataTable";
import { Ellipsis } from "lucide-react";

const summaryData = [
  {
    label: "Total Orders Today",
    value: 128,
    icon: "\ud83d\uded2",
    color: "red",
  },
  { label: "Pending Orders", value: 12, icon: "\u23f3", color: "orange" },
  { label: "Revenue", value: "$2,340", icon: "\ud83d\udcb0", color: "green" },
  { label: "New Users", value: 23, icon: "\ud83d\udc64", color: "blue" },
];

const recentOrders = [
  {
    id: "ORD-1001",
    numericId: 1001,
    user: "John Doe",
    total: "$45.00",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1002",
    numericId: 1002,
    user: "Jane Smith",
    total: "$32.50",
    status: "Pending",
    date: "2024-06-01",
  },
  {
    id: "ORD-1003",
    numericId: 1003,
    user: "Alice Brown",
    total: "$27.99",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1004",
    numericId: 1004,
    user: "Bob Lee",
    total: "$19.99",
    status: "Cancelled",
    date: "2024-06-01",
  },
  {
    id: "ORD-1005",
    numericId: 1005,
    user: "Sarah Wilson",
    total: "$67.50",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1006",
    numericId: 1006,
    user: "Mike Johnson",
    total: "$23.75",
    status: "Pending",
    date: "2024-06-01",
  },
  {
    id: "ORD-1007",
    numericId: 1007,
    user: "Emily Davis",
    total: "$89.99",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1008",
    numericId: 1008,
    user: "David Miller",
    total: "$15.25",
    status: "Cancelled",
    date: "2024-06-01",
  },
  {
    id: "ORD-1009",
    numericId: 1009,
    user: "Lisa Anderson",
    total: "$42.80",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1010",
    numericId: 1010,
    user: "Tom Wilson",
    total: "$78.45",
    status: "Pending",
    date: "2024-06-01",
  },
  {
    id: "ORD-1011",
    numericId: 1011,
    user: "Rachel Green",
    total: "$34.20",
    status: "Delivered",
    date: "2024-06-01",
  },
  {
    id: "ORD-1012",
    numericId: 1012,
    user: "Chris Taylor",
    total: "$56.90",
    status: "Delivered",
    date: "2024-06-01",
  },
];

const chartData = [
  { label: "Mon", value: 300 },
  { label: "Tue", value: 500 },
  { label: "Wed", value: 400 },
  { label: "Thu", value: 700 },
  { label: "Fri", value: 600 },
  { label: "Sat", value: 900 },
  { label: "Sun", value: 800 },
];

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [dropdownId, setDropdownId] = useState(null);

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownId !== null &&
        !event.target.closest(".action-dropdown-container")
      ) {
        setDropdownId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [dropdownId]);

  const columns = [
    {
      header: "Order ID",
      cell: (order) => order.id,
    },
    {
      header: "User",
      cell: (order) => order.user,
    },
    {
      header: "Total",
      cell: (order) => order.total,
    },
    {
      header: "Status",
      headerClassName: "text-center",
      cellClassName: "text-center",
      cell: (order) => (
        <span
          className={`border text-center rounded-full px-2 py-1 text-xs ${
            order.status === "Delivered"
              ? "border-green-600 bg-green-100 text-green-600"
              : order.status === "Pending"
              ? "border-yellow-400 bg-yellow-100 text-yellow-500"
              : order.status === "Cancelled"
              ? "border-red-600 bg-red-100 text-red-600"
              : "border-gray-400 bg-gray-100 text-gray-500"
          }`}
        >
          {order.status}
        </span>
      ),
    },
    {
      header: "Date",
      cell: (order) => order.date,
    },
    {
      header: "Actions",
      headerClassName: "text-center",
      cellClassName: "flex justify-center items-center",
      cell: (item) => (
        <div className="relative action-dropdown-container">
          <button
            onClick={() => toggleDropdown(item.id)}
            className="text-gray-500 cursor-pointer hover:text-black transition focus:outline-none flex items-center"
            title="Actions"
          >
            <Ellipsis strokeWidth={1.1} />
          </button>
          {dropdownId === item.id && (
            <div className="absolute right-0 mt-2 w-28 bg-mainBg border border-gray-200 rounded-md shadow-lg z-20">
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-black/5"
                    onClick={() => {
                      navigate(
                        routeConstant.ADMIN_ORDER_DETAILS.replace(
                          ":orderId",
                          item.numericId
                        )
                      );
                      setDropdownId(null);
                    }}
                  >
                    View
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="bg-mainBg flex flex-col items-center w-full rounded-xl">
      <div
        className="w-full shadow p-3 md:p-4 min-h-screen"
        style={{ height: "100%" }}
      >
        <h1 className="text-2xl font-roboto_serif font-semibold text-gray-900 mb-12">
          Dashboard
        </h1>

        {/* Summary cards */}
        <div>
          <h2 className="text-lg font-roboto_serif font-semibold mb-2 text-gray-900">
            Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mb-8">
            {summaryData.map((item, idx) => (
              <div
                key={idx}
                className="bg-mainBg border border-black/7 rounded-xl p-6 shadow-xs hover:shadow-sm transition-shadow duration-200"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="text-2xl" style={{ color: item.color }}>
                    {item.icon}
                  </div>
                  <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">
                    {item.label.split(" ").slice(-1)[0]}
                  </div>
                </div>
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {item.value}
                </div>
                <div className="text-sm text-gray-500">{item.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Orders Table */}
        <div className="mb-8">
          <h2 className="text-lg font-roboto_serif font-semibold mb-2 text-gray-900">
            Recent Orders
          </h2>
          <div
            className={`rounded-2xl animate-fadein text-black ${
              dropdownId !== null ? "overflow-visible" : "overflow-x-auto"
            }`}
          >
            <DataTable
              columns={columns}
              data={recentOrders}
              isMenuOpen={dropdownId !== null}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
