import React, { useState, useEffect } from "react";

import { FaPlus } from "react-icons/fa";
import { Ellipsis, Search, X } from "lucide-react";
import "./AdminOrders.css"; // Use the same theme as orders/menu list
import { adminCoupons } from "../../utils/api";
import toast from "react-hot-toast";
import { useLoader } from "../../components/common/LoaderContext";
import DataTable from "../../components/admin/DataTable";
import Pagination from "../../components/admin/Pagination";
import CouponModal from "../../components/admin/CouponModal";
import CustomButton from "../../components/admin/CustomButton";
import DeleteModal from "../../components/admin/DeleteModal";

const PAGE_SIZE = 10;

const AdminCoupon = () => {
  const [coupons, setCoupons] = useState([]);
  const [modal, setModal] = useState({ open: false, coupon: null, mode: null });
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({
    open: false,
    couponId: null,
  });
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState("code,asc");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [dropdownId, setDropdownId] = useState(null);
  // Add a ref to trigger reload
  const [reload, setReload] = useState(0);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      showLoader();
      setError("");
      try {
        const body = {
          search,
          page,
          size: PAGE_SIZE,
          sort,
        };
        const res = await adminCoupons.getCouponList(body);
        if (res.success && res.data) {
          setCoupons(
            res.data.content.map((c) => ({
              id: c.id,
              code: c.code,
              discountType: c.discountType,
              discount: c.discountValue,
              maxDiscountAmount: c.maxDiscountAmount,
              minOrderAmount: c.minOrderAmount,
              startDate: c.startDate ? c.startDate.split("T")[0] : "",
              expiry: c.endDate ? c.endDate.split("T")[0] : "",
              status: c.isActive ? "Active" : "Inactive",
              maxUsesPerUser: c.maxUsesPerUser,
            }))
          );
          setTotalPages(res.data.totalPages || 1);
        } else {
          setCoupons([]);
          setTotalPages(1);
          setError(res.message || "Failed to fetch coupons");
        }
      } catch (err) {
        setCoupons([]);
        setTotalPages(1);
        setError(err.message || "Failed to fetch coupons");
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchData();
  }, [search, page, sort, reload]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside any element with the action-dropdown-container class
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

  const handleSort = (col) => {
    let direction = "asc";
    if (sort.startsWith(col)) {
      direction = sort.endsWith("asc") ? "desc" : "asc";
    }
    setSort(`${col},${direction}`);
    setPage(0);
  };

  const handlePage = (newPage) => {
    if (newPage >= 0 && newPage < totalPages) setPage(newPage);
  };

  const handleView = async (coupon) => {
    // setModalLoading(true);
    showLoader();
    try {
      const res = await adminCoupons.getCouponDetails(coupon.id);
      if (res.success) {
        setModal({
          open: true,
          coupon: mapCouponDetails(res.data),
          mode: "view",
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch coupon details.");
    } finally {
      //   setModalLoading(false);
      hideLoader();
    }
  };
  const handleEdit = async (coupon) => {
    // setModalLoading(true);
    showLoader();
    try {
      const res = await adminCoupons.getCouponDetails(coupon.id);
      if (res.success) {
        setModal({
          open: true,
          coupon: mapCouponDetails(res.data),
          mode: "edit",
        });
      }
    } catch (err) {
      toast.error(err.message || "Failed to fetch coupon details.");
    } finally {
      //   setModalLoading(false);
      hideLoader();
    }
  };
  // Helper to map API details to modal fields
  function mapCouponDetails(data) {
    return {
      id: data.id,
      code: data.code || "",
      discountType: data.discountType || "PERCENT",
      discount: data.discountValue || "",
      maxDiscountAmount: data.maxDiscountAmount || "",
      minOrderAmount: data.minOrderAmount || "",
      startDate: data.startDate ? data.startDate.split("T")[0] : "",
      expiry: data.endDate ? data.endDate.split("T")[0] : "",
      status: data.isActive ? "Active" : "Inactive",
      maxUsesPerUser: data.maxUsesPerUser || "",
    };
  }
  const handleDelete = (couponId) => setDeleteModal({ open: true, couponId });
  const handleAdd = () => setModal({ open: true, coupon: null, mode: "add" });
  const handleClear = () => setSearch("");
  const handleInputChange = (e) => setSearch(e.target.value);

  const handleSaveEdit = async (editCoupon) => {
    // Validation: All fields required
    if (
      !editCoupon.code ||
      !editCoupon.discountType ||
      !editCoupon.discount ||
      !editCoupon.maxDiscountAmount ||
      !editCoupon.minOrderAmount ||
      !editCoupon.startDate ||
      !editCoupon.expiry ||
      !editCoupon.status ||
      !editCoupon.maxUsesPerUser
    ) {
      toast.error("All fields are required.");
      return;
    }
    // Validation: Expiry must be after start date
    if (
      editCoupon.startDate &&
      editCoupon.expiry &&
      new Date(editCoupon.expiry) <= new Date(editCoupon.startDate)
    ) {
      toast.error("Expiry date must be after start date.");
      return;
    }
    // Validation: Discount type
    if (
      editCoupon.discountType !== "PERCENT" &&
      editCoupon.discountType !== "FLAT"
    ) {
      toast.error("Discount type must be either PERCENT or FLAT.");
      return;
    }
    // Prepare API payload
    const payload = {
      ...(modal.mode === "edit" && modal.coupon && modal.coupon.id
        ? { id: modal.coupon.id, updatedAt: new Date().toISOString() }
        : {}),
      code: editCoupon.code,
      discountType: editCoupon.discountType,
      discountValue: Number(editCoupon.discount),
      maxDiscountAmount: Number(editCoupon.maxDiscountAmount),
      minOrderAmount: Number(editCoupon.minOrderAmount),
      startDate: editCoupon.startDate ? `${editCoupon.startDate}T00:00:00` : "",
      endDate: editCoupon.expiry ? `${editCoupon.expiry}T23:59:59` : "",
      maxUsesPerUser: Number(editCoupon.maxUsesPerUser),
      orderType: "BOTH",
      isActive: editCoupon.status === "Active",
    };
    try {
      const res = await adminCoupons.upsertCoupon(payload);
      if (res.success) {
        setModal({ open: false, coupon: null, mode: null });
        toast.success(
          modal.mode === "edit"
            ? "Coupon updated successfully!"
            : "Coupon created successfully!"
        );
        setReload((r) => r + 1); // triggers useEffect to reload list
      }
    } catch (err) {
      toast.error(err.message || "Failed to create coupon.");
    }
  };

  const handleConfirmDelete = async () => {
    const couponId = deleteModal.couponId;
    if (!couponId) return;
    showLoader();
    try {
      await adminCoupons.deleteCoupon(couponId);
      toast.success("Coupon deleted successfully!");
      setDeleteModal({ open: false, couponId: null });
      setReload((r) => r + 1); // refresh list
    } catch (err) {
      toast.error(err.message || "Failed to delete coupon.");
    } finally {
      hideLoader();
    }
  };

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  const columns = [
    {
      header: "Code",
      cell: (coupon) => coupon.code,
    },
    {
      header: "Type",
      cell: (coupon) => coupon.discountType,
    },
    {
      header: "Discount",
      cell: (coupon) =>
        coupon.discountType === "PERCENT"
          ? `${coupon.discount}%`
          : `$${coupon.discount}`,
    },
    {
      header: "Start Date",
      cell: (coupon) => coupon.startDate,
    },
    {
      header: "Expiry Date",
      cell: (coupon) => coupon.expiry,
    },
    {
      header: "Status",
      cell: (coupon) => (
        <span
          className={`border text-center ${
            coupon.status === "Active"
              ? "border-green-600 bg-green-100 text-green-600"
              : "border-red-600 bg-red-100 text-red-600"
          } rounded-full px-2 py-1 text-xs`}
        >
          {coupon.status}
        </span>
      ),
    },
    {
      header: "Actions",
      headerClassName: "text-center",
      cellClassName: "flex justify-center items-center",
      cell: (coupon) => (
        <div className="relative action-dropdown-container">
          <button
            onClick={() => toggleDropdown(coupon.id)}
            className="text-gray-500 cursor-pointer hover:text-black transition focus:outline-none flex items-center"
            title="Actions"
          >
            <Ellipsis strokeWidth={1.1} />
          </button>
          {dropdownId === coupon.id && (
            <div className="absolute right-0 mt-2 w-28 bg-mainBg border border-gray-200 rounded-md shadow-lg z-20">
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-black/5 cursor-pointer"
                    onClick={() => {
                      handleView(coupon);
                      setDropdownId(null);
                    }}
                  >
                    View
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-black/5 cursor-pointer"
                    onClick={() => {
                      handleEdit(coupon);
                      setDropdownId(null);
                    }}
                  >
                    Edit
                  </button>
                </li>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-red-600 hover:bg-black/5 cursor-pointer"
                    onClick={() => {
                      handleDelete(coupon.id);
                      setDropdownId(null);
                    }}
                  >
                    Delete
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
        <h1 className="text-xl font-roboto_serif font-semibold text-gray-900 mb-8">
          Coupons
        </h1>

        {/* handleAdd, setSearch, setPage */}

        {/* Search and Add */}
        <div className="flex items-end gap-2 mb-4">
          {/* Search bar */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black/20 w-5 h-5 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === "Enter"}
              placeholder="Search"
              className="w-full py-2 px-8 border border-black/20 placeholder:text-black/30 rounded-xl focus:outline-none focus:border-black/50 text-black"
              autoComplete="off"
            />
            {search && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-black/20 hover:text-black/50 transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
          <CustomButton
            text={"Add"}
            active={true}
            image={FaPlus}
            onClick={handleAdd}
          />
        </div>

        <div
          className="rounded-2xl animate-fadein text-black overflow-x-auto table-container"
        >
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Loading coupons...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <DataTable columns={columns} data={coupons} />
          )}
        </div>
        {/* Pagination */}
        <Pagination
          page={page}
          totalPages={totalPages}
          handlePage={handlePage}
        />
        {/* Modals */}
        <CouponModal
          open={modal.open}
          onClose={() => setModal({ open: false, coupon: null, mode: null })}
          coupon={modal.coupon}
          mode={modal.mode}
          onSave={handleSaveEdit}
        />
        <DeleteModal
          open={deleteModal.open}
          onClose={() => setDeleteModal({ open: false, couponId: null })}
          onConfirm={handleConfirmDelete}
          module="Coupon"
          coupon={coupons.find((c) => c.id === deleteModal.couponId)}
        />
      </div>
    </div>
  );
};

export default AdminCoupon;
