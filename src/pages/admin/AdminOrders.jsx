import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/RouteConstants";
import { adminOrders } from "../../utils/api";
import { useLoader } from "../../components/common/LoaderContext";
import DataTable from "../../components/admin/DataTable";
import { Ellipsis } from "lucide-react";
import Searchbar from "../../components/admin/Searchbar";
import Pagination from "../../components/admin/Pagination";

const PAGE_SIZE = 10;

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortDir, setSortDir] = useState("desc");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showLoader, hideLoader } = useLoader();
  const [dropdownId, setDropdownId] = useState(null);

  const [query, setQuery] = useState("");
  const handleInputChange = (e) => setQuery(e.target.value);
  const handleClear = () => setQuery("");

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownId !== null && !event.target.closest('.action-dropdown-container')) {
        setDropdownId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [dropdownId]);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      showLoader();
      setError("");
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
        setError(err.message || "Failed to fetch orders");
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchOrders();
  }, [search, sortBy, sortDir, page]);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === "asc" ? "desc" : "asc");
    } else {
      setSortBy(col);
      setSortDir("asc");
    }
    setPage(1);
  };

  const handlePage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) setPage(newPage);
  };

  const columns = [
    {
      header: "Order Id",
      cell: (row) => row.id,
    },
    {
      header: "User",
      cell: (row) => row.customerName,
    },
    {
      header: "Date Placed",
      cell: (row) =>
        row.placedAt ? new Date(row.placedAt).toLocaleDateString() : "-",
    },
    {
      header: "Total",
      cell: (row) =>
        row.totalAmount != null ? `$${row.totalAmount.toFixed(2)}` : "-",
    },
    {
      header: "Status",
      cell: (row) => row.status || "unknown",
    },
    {
      header: "Payment Status",
      headerClassName: "text-center",
      cellClassName: "text-center",
      cell: (row, index) => (
        <span
          key={index}
          className={`border text-center ${
            row.paymentStatus === "PAID"
              ? "border-green-600 bg-green-100 text-green-600"
              : "border-yellow-400 bg-yellow-100 text-yellow-500"
          } rounded-full px-2 py-1 text-xs`}
        >
          {row.paymentStatus || "-"}
        </span>
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-center",
      cellClassName: "flex justify-center items-center",
      cell: (row) => (
        <div className="relative action-dropdown-container">
          <button
            onClick={() => toggleDropdown(row.id)}
            className="text-gray-500 cursor-pointer hover:text-black transition focus:outline-none flex items-center"
            title="Actions"
          >
            <Ellipsis strokeWidth={1.1}/>
          </button>
          {dropdownId === row.id && (
            <div className='absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20'>
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => {
                      navigate(routeConstant.ADMIN_ORDER_DETAILS.replace(":orderId", row.id));
                      setDropdownId(null);
                    }}
                  >View</button>
                </li>
              </ul>
            </div>
          )}
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <AdminSidebar />

      <div
        className="flex-1 flex flex-col items-center justify-start py-2"
        style={{ paddingRight: "10px", marginLeft: "256px" }}
      >
        <div
          className="w-full bg-white rounded-xl shadow p-8 min-h-[400px]"
          style={{ height: "100%" }}
        >
          <h1 className="text-xl font-semibold text-gray-900 mb-2 font-roboto_serif">
            Your Orders
          </h1>

          {/* Search and Table */}
           <Searchbar/>

          <div className={`mt-4 rounded-2xl animate-fadein text-black ${dropdownId !== null ? 'overflow-visible' : 'overflow-x-auto'} [scrollbar-gutter:stable]`}>
            {loading ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#ff2222",
                  padding: "2rem",
                }}
              >
                Loading orders...
              </div>
            ) : error ? (
              <div
                style={{
                  textAlign: "center",
                  color: "#ff2222",
                  padding: "2rem",
                }}
              >
                {error}
              </div>
            ) : (
              <DataTable columns={columns} data={orders} />
            )}
          </div>
          
          {/* Pagination */}
          <Pagination page={page} totalPages={totalPages} handlePage={handlePage} />

        </div>
      </div>
    </div>
  );
};

export default AdminOrders;