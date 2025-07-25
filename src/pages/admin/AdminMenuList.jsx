import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import MenuItemModal from './MenuItemModal';
import { FaPlus } from 'react-icons/fa';
import { Ellipsis } from "lucide-react";
import { fetchCategories, fetchMenu } from '../../services/operations/menu';
import { useLoader } from '../../components/common/LoaderContext';
import DataTable from '../../components/admin/DataTable';
import Pagination from '../../components/admin/Pagination';

const PAGE_SIZE = 20;

const AdminMenuList = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
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
      showLoader('Loading menu...');
      try {
        const catRes = await fetchCategories(2);
        const cats = catRes.data.data || [];
        setCategories(cats);
        // Fetch menu items for all categories in parallel
        const menuPromises = cats.map(cat => fetchMenu(cat.id, 2));
        const menuResults = await Promise.all(menuPromises);
        const menuMap = {};
        cats.forEach((cat, idx) => {
          menuMap[cat.id] = menuResults[idx]?.data?.data || [];
        });
        setCategoryMenuItems(menuMap);
      } catch (err) {
        setError('Failed to fetch menu data.');
      } finally {
        hideLoader();
        setLoading(false);
      }
    };
    fetchData();
    // eslint-disable-next-line
  }, []);

  // Helper to flatten all items for search/sort/pagination
  const allItems = categories.flatMap(cat =>
    (categoryMenuItems[cat.id] || []).map(item => ({
      ...item,
      category: cat.name
    }))
  );

  // Filter, sort, and paginate
  const filtered = allItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    (item.category || '').toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price' || sortBy === 'startingPrice') {
      return sortDir === 'asc' ? (a.startingPrice - b.startingPrice) : (b.startingPrice - a.startingPrice);
    } else {
      return sortDir === 'asc'
        ? (a[sortBy] || '').localeCompare(b[sortBy] || '')
        : (b[sortBy] || '').localeCompare(a[sortBy] || '');
    }
  });
  const totalPages = Math.ceil(sorted.length / PAGE_SIZE);
  const paginated = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleSort = (col) => {
    if (sortBy === col) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(col);
      setSortDir('asc');
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
    setModalMode('view');
    setModalOpen(true);
  };
  const handleEdit = (item) => {
    setModalItem(item);
    setModalMode('edit');
    setModalOpen(true);
  };
  const handleSave = (updatedItem) => {
    // Not implemented for API data
    setModalOpen(false);
  };

  const handleAdd = () => {
    setModalItem(null);
    setModalMode('add');
    setModalOpen(true);
  };

  const toggleDropdown = (id) => {
    setDropdownId(dropdownId === id ? null : id);
  };

  const columns = [
    {
      header: 'Name',
      cell: (item) => (
        <div className="flex items-center gap-3">
          <span>{item.name}</span>
        </div>
      ),
    },
    {
      header: 'Category',
      cell: (item) => item.category,
    },
    {
      header: 'Price',
      cell: (item) => `$${item.startingPrice ? item.startingPrice.toFixed(2) : '--'}`,
    },
    {
      header: 'Status',
      headerClassName: 'text-center',
      cellClassName: 'text-center',
      cell: (item) => (
        <span
          className={`border text-center border-green-600 bg-green-100 text-green-600 rounded-full px-2 py-1 text-xs`}
        >
          Active
        </span>
      ),
    },
    {
      header: 'Actions',
      headerClassName: 'text-center',
      cellClassName: 'flex justify-center items-center',
      cell: (item) => (
        <div className="relative action-dropdown-container">
          <button
            onClick={() => toggleDropdown(item.id)}
            className="text-gray-500 cursor-pointer hover:text-black transition focus:outline-none flex items-center"
            title="Actions"
          >
            <Ellipsis strokeWidth={1.1}/>
          </button>
          {dropdownId === item.id && (
            <div className='absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-md shadow-lg z-20'>
              <ul className="py-1 text-sm">
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { handleView(item); setDropdownId(null); }}
                  >View</button>
                </li>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { handleEdit(item); setDropdownId(null); }}
                  >Edit</button>
                </li>
                <li>
                  <button
                    className="w-full text-left block px-4 py-2 text-red-600 hover:bg-gray-100"
                    onClick={() => { handleDelete(item.id); setDropdownId(null); }}
                  >Delete</button>
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
      <div className="flex-1 flex flex-col items-center justify-start py-2" style={{ paddingRight: '10px', marginLeft: '256px'  }}>
        <div className="w-full bg-white rounded-xl shadow p-8 min-h-[400px]" style={{ height: '100%' }}>
          <h1 className="text-2xl font-semibold text-gray-900 mb-2">Menu Items</h1>
          <hr className="mb-6" />
          {/* Search and Add */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-0 mb-4 items-center justify-between w-full">
            <input
              className="border rounded px-3 py-2 w-full md:w-64"
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded ml-2 flex items-center gap-2" style={{ minWidth: 120 }} onClick={handleAdd}>
              <FaPlus /> Add Menu Item
            </button>
          </div>
          <div className={`mt-4 rounded-2xl animate-fadein text-black ${dropdownId !== null ? 'overflow-visible' : 'overflow-x-auto'} [scrollbar-gutter:stable]`}>
            {loading ? (
              <div className="text-center text-gray-500 py-8">Loading menu items...</div>
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
          <MenuItemModal
            open={modalOpen}
            onClose={() => setModalOpen(false)}
            item={modalItem}
            mode={modalMode}
            onSave={handleSave}
          />
        </div>
      </div>
    </div>
  );
};

export default AdminMenuList; 