import React, { useState, useEffect } from "react";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { useNavigate } from "react-router-dom";
import { routeConstant } from "../../constants/RouteConstants";
import { adminOrders } from "../../utils/api";
import { useLoader } from "../../components/common/LoaderContext";
import DataTable from "../../components/admin/DataTable";
import { VscEye } from "react-icons/vsc";
import Searchbar from "../../components/admin/Searchbar";
import Pagination from "../../components/admin/Pagination";


const PAGE_SIZE = 20;

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

  const [query, setQuery] = useState("");
  const handleInputChange = (e) => setQuery(e.target.value);
  const handleClear = () => setQuery("");


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
        <button
          className="text-black text-xl cursor-pointer hover:text-black/50 transition"
          onClick={() =>
            navigate(
              routeConstant.ADMIN_ORDER_DETAILS.replace(":orderId", row.id)
            )
          }
        >
          <VscEye />
        </button>
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

          <div className="rounded-2xl overflow-x-auto animate-fadein text-black">
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