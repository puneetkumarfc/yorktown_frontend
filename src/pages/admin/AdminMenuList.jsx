import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import MenuItemModal from './MenuItemModal';
import { fetchCategories, fetchMenu } from '../../services/operations/menu';
import { useLoader } from '../../components/common/LoaderContext';

const PAGE_SIZE = 20;

const AdminMenuList = () => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [modalItem, setModalItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryMenuItems, setCategoryMenuItems] = useState({}); // { [categoryId]: [items] }
  const [error, setError] = useState(null);
  const { showLoader, hideLoader } = useLoader();

  // Fetch categories and menu items on mount
  useEffect(() => {
    const fetchData = async () => {
      setError(null);
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
          <div className="rounded-2xl overflow-x-auto animate-fadein">
            <table className="min-w-full bg-white rounded-lg overflow-hidden">
              <thead>
                <tr>
                  <th className="px-6 py-4 text-left font-medium text-gray-500">Name</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-500">Category</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-500">Price</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-500">Status</th>
                  <th className="px-6 py-4 text-left font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginated.map((item, idx) => (
                  <tr key={item.id} className={idx % 2 === 1 ? 'bg-gray-50' : ''}>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900 flex items-center gap-3">
                      {item.imageUrl ? <img src={item.imageUrl} alt={item.name} className="w-10 h-10 rounded-full object-cover" /> : <span className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-lg font-bold text-gray-500">{item.name[0]}</span>}
                      <span>{item.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">{item.category}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">${item.startingPrice ? item.startingPrice.toFixed(2) : '--'}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">Active</td>
                    <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                      <button className="bg-black text-white px-3 py-1 rounded font-medium hover:bg-gray-800 transition" title="View" onClick={() => handleView(item)}>View</button>
                      <button className="bg-black text-white px-3 py-1 rounded font-medium hover:bg-gray-800 transition" title="Edit" onClick={() => handleEdit(item)}>Edit</button>
                      <button className="bg-black text-white px-3 py-1 rounded font-medium hover:bg-gray-800 transition" title="Delete" onClick={() => handleDelete(item.id)}>Delete</button>
                    </td>
                  </tr>
                ))}
                {paginated.length === 0 && (
                  <tr><td colSpan={5} className="text-center text-red-500 py-8">No menu items found.</td></tr>
                )}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <div className="flex justify-end mt-4 animate-fadein">
            <button onClick={() => handlePage(page - 1)} disabled={page === 1} className="px-3 py-1 rounded bg-gray-200 mx-1 disabled:opacity-50">&lt;</button>
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                className={`px-3 py-1 rounded mx-1 ${page === i + 1 ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
                onClick={() => handlePage(i + 1)}
              >{i + 1}</button>
            ))}
            <button onClick={() => handlePage(page + 1)} disabled={page === totalPages} className="px-3 py-1 rounded bg-gray-200 mx-1 disabled:opacity-50">&gt;</button>
          </div>
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