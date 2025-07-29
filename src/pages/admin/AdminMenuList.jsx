import React, { useState, useEffect } from "react";

import MenuModal from "../../components/admin/MenuModal";
import { FaPlus } from "react-icons/fa";
import { Ellipsis, Search, X } from "lucide-react";
import { fetchCategories, fetchMenu } from "../../services/operations/menu";
import { useLoader } from "../../components/common/LoaderContext";
import DataTable from "../../components/admin/DataTable";
import Pagination from "../../components/admin/Pagination";
import CustomButton from "../../components/admin/CustomButton";

const PAGE_SIZE = 10;

const AdminMenuList = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortDir, setSortDir] = useState("asc");
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("view");
  const [modalItem, setModalItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryMenuItems, setCategoryMenuItems] = useState({}); // { [categoryId]: [items] }
  const [dropdownId, setDropdownId] = useState(null);
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  // Fetch categories and menu items on mount
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
      setLoading(true);
      showLoader("Loading menu...");
      try {
        const catRes = await fetchCategories(2);
        const cats = catRes.data.data || [];
        setCategories(cats);
        // Fetch menu items for all categories in parallel
        const menuPromises = cats.map((cat) => fetchMenu(cat.id, 2));
        const menuResults = await Promise.all(menuPromises);
        const menuMap = {};
        cats.forEach((cat, idx) => {
          menuMap[cat.id] = menuResults[idx]?.data?.data || [];
        });
        setCategoryMenuItems(menuMap);
      } catch (err) {
        setError("Failed to fetch menu data.");
      } finally {
        hideLoader();
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Helper to flatten all items for search/sort/pagination
  const allItems = categories.flatMap((cat) =>
    (categoryMenuItems[cat.id] || []).map((item) => ({
      ...item,
      category: cat.name,
    }))
  );

  // Filter, sort, and paginate
  const filtered = allItems.filter(
    (item) =>
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "price" || sortBy === "startingPrice") {
      return sortDir === "asc"
        ? a.startingPrice - b.startingPrice
        : b.startingPrice - a.startingPrice;
    } else {
      return sortDir === "asc"
        ? (a[sortBy] || "").localeCompare(b[sortBy] || "")
        : (b[sortBy] || "").localeCompare(a[sortBy] || "");
    }
  });
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

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

  const handleDelete = (id) => {
    setDeleteId(id);
    setShowDelete(true);
  };

  const confirmDelete = () => {
    // For now, just close modal (no actual delete)
    setShowDelete(false);
    setDeleteId(null);
  };

  const handleView = (item) => {
    setModalItem(item);
    setModalMode("view");
    setModalOpen(true);
  };
  const handleEdit = (item) => {
    setModalItem(item);
    setModalMode("edit");
    setModalOpen(true);
  };
  const handleSave = (updatedItem) => {
    // Not implemented for API data
    setModalOpen(false);
  };

  const handleAdd = () => {
    setModalItem(null);
    setModalMode("add");
    setModalOpen(true);
  };

  const handleClear = () => setSearch("");

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  const columns = [
    {
      header: "Name",
      cell: (item) => (
        <div className="flex items-center gap-3">
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: "Category",
      cell: (item) => item.category,
    },
    {
      header: "Price",
      cell: (item) =>
        `$${item.startingPrice ? item.startingPrice.toFixed(2) : "--"}`,
    },
    {
      header: "Status",
      headerClassName: "text-center",
      cellClassName: "text-center",
      cell: (item) => (
        <span
          className={`border text-center border-green-600 bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs`}
        >
          Active
        </span>
      ),
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
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-black/5 cursor-pointer"
                    onClick={() => {
                      handleView(item);
                      setDropdownId(null);
                    }}
                  >
                    View
                  </button>
                </li>
                <li className="relative group">
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-400 cursor-not-allowed"
                    onClick={() => {}} // Disabled
                  >
                    Edit
                  </button>
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Coming Soon
                  </div>
                </li>
                <li className="relative group">
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-400 cursor-not-allowed"
                    onClick={() => {}} // Disabled
                  >
                    Delete
                  </button>
                  <div className="absolute left-full top-0 ml-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                    Coming Soon
                  </div>
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
          Menu Items
        </h1>
        {/* Search and Add */}
        <div className="flex items-end gap-2 mb-4">
          {/* Search bar */}
          <div className="relative flex items-center w-full">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-black/20 w-5 h-5 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              onKeyDown={(e) => e.key === "Enter"}
              placeholder="Search menu..."
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
          <div className="relative group">
            <CustomButton
              text={"Add Menu Item"}
              active={false}
              image={FaPlus}
              onClick={() => {}} // Disabled
            />
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
              Coming Soon
            </div>
          </div>
        </div>
        <div
          className="mt-4 rounded-2xl animate-fadein text-black overflow-x-auto [scrollbar-gutter:stable] table-container"
        >
          {loading ? (
            <div className="text-center text-gray-500 py-8">
              Loading menu items...
            </div>
          ) : error ? (
            <div className="text-center text-red-500 py-8">{error}</div>
          ) : (
            <DataTable columns={columns} data={paginated} />
          )}
        </div>
        {/* Pagination */}
        {!loading && !error && totalPages > 0 && (
          <Pagination
            page={page}
            totalPages={totalPages}
            handlePage={handlePage}
          />
        )}
        {/* Modals */}
        <MenuModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          item={modalItem}
          mode={modalMode}
          onSave={handleSave}
        />
      </div>
    </div>
  );
};

export default AdminMenuList;
