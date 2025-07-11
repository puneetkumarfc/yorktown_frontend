import React, { useState } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaEdit, FaTrash, FaEye, FaPlus } from 'react-icons/fa';
import './AdminOrders.css'; // Reuse admin table styles for consistency
import MenuItemModal from './MenuItemModal';

const staticMenuItems = [
  { id: 1, name: 'Margherita Pizza', price: 12.99, category: 'Pizza', status: 'Active', image: '', description: 'Classic cheese & tomato pizza.' },
  { id: 2, name: 'Veggie Sub', price: 9.99, category: 'Submarines', status: 'Active', image: '', description: 'Loaded with fresh veggies.' },
  { id: 3, name: 'Chicken Wrap', price: 10.99, category: 'Wraps', status: 'Inactive', image: '', description: 'Grilled chicken with sauce.' },
  { id: 4, name: 'Cheesecake', price: 6.99, category: 'Deserts', status: 'Active', image: '', description: 'Rich and creamy.' },
  { id: 5, name: 'Pepperoni Pizza', price: 13.99, category: 'Pizza', status: 'Active', image: '', description: 'Pepperoni and cheese.' },
  { id: 6, name: 'Club Sandwich', price: 11.99, category: 'Clubs', status: 'Inactive', image: '', description: 'Triple layered sandwich.' },
];

const PAGE_SIZE = 4;

const AdminMenuList = ({ collapsed, setCollapsed }) => {
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [showDelete, setShowDelete] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState('view');
  const [modalItem, setModalItem] = useState(null);
  const [menuItems, setMenuItems] = useState(staticMenuItems);

  // Filter, sort, and paginate static data
  const filtered = menuItems.filter(item =>
    item.name.toLowerCase().includes(search.toLowerCase()) ||
    item.category.toLowerCase().includes(search.toLowerCase())
  );
  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'price') {
      return sortDir === 'asc' ? a.price - b.price : b.price - a.price;
    } else {
      return sortDir === 'asc'
        ? a[sortBy].localeCompare(b[sortBy])
        : b[sortBy].localeCompare(a[sortBy]);
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
    if (modalMode === 'add') {
      setMenuItems(prev => [
        { ...updatedItem, id: prev.length ? Math.max(...prev.map(i => i.id)) + 1 : 1 },
        ...prev
      ]);
    } else if (modalMode === 'edit') {
      setMenuItems(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
    }
    setModalOpen(false);
  };

  const handleAdd = () => {
    setModalItem(null);
    setModalMode('add');
    setModalOpen(true);
  };

  return (
    <div className={`admin-dashboard-layout${collapsed ? ' collapsed' : ''} px-[1rem] md:px-[6rem]`}> 
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="admin-orders-container px-[1rem] md:px-[6rem]">
        <div className="glass-effect admin-titlebar flex-col md:flex-row gap-4 md:gap-0">
          <h1 className="admin-title">Menu Items</h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full md:w-auto justify-between md:justify-end">
            <input
              className="admin-titlebar-search-input w-full md:w-64"
              type="text"
              placeholder="Search menu..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(1); }}
            />
            <button className="admin-titlebar-search-btn flex items-center gap-2" style={{ minWidth: 120 }} onClick={handleAdd}>
              <FaPlus /> Add Menu Item
            </button>
          </div>
        </div>
        <div className="glass-effect rounded-2xl overflow-x-auto animate-fadein">
          <table className="w-full table-auto">
            <thead>
              <tr className="bg-red-500 text-white">
                <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('name')}>
                  Name {sortBy === 'name' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('category')}>
                  Category {sortBy === 'category' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left cursor-pointer font-semibold" onClick={() => handleSort('price')}>
                  Price {sortBy === 'price' && (sortDir === 'asc' ? '↑' : '↓')}
                </th>
                <th className="px-6 py-4 text-left font-semibold">Status</th>
                <th className="px-6 py-4 text-left font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginated.map(item => (
                <tr key={item.id} className="table-row transition-all duration-300 hover:bg-red-900/10">
                  <td className="px-6 py-4 font-semibold flex items-center gap-3">
                    {item.image ? <img src={item.image} alt={item.name} className="w-10 h-10 rounded-full object-cover" /> : <span className="w-10 h-10 rounded-full bg-mainRed/30 flex items-center justify-center text-lg font-bold text-mainRed">{item.name[0]}</span>}
                    <span>{item.name}</span>
                  </td>
                  <td className="px-6 py-4">{item.category}</td>
                  <td className="px-6 py-4">${item.price.toFixed(2)}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${item.status === 'Active' ? 'bg-green-700 text-green-200' : 'bg-gray-700 text-gray-300'}`}>{item.status}</span>
                  </td>
                  <td className="px-6 py-4 flex gap-3 items-center">
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-mainRed/80 text-white transition-all duration-200" title="View" onClick={() => handleView(item)}><FaEye /></button>
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-yellow-600 text-white transition-all duration-200" title="Edit" onClick={() => handleEdit(item)}><FaEdit /></button>
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-red-600 text-white transition-all duration-200" title="Delete" onClick={() => handleDelete(item.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {paginated.length === 0 && (
                <tr><td colSpan={5} style={{ textAlign: 'center', color: '#ff2222' }}>No menu items found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="admin-orders-pagination animate-fadein" style={{ justifyContent: 'flex-end', marginRight: 0 }}>
          <button onClick={() => handlePage(page - 1)} disabled={page === 1}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i + 1 ? 'active' : ''}
              onClick={() => handlePage(i + 1)}
            >{i + 1}</button>
          ))}
          <button onClick={() => handlePage(page + 1)} disabled={page === totalPages}>&gt;</button>
        </div>
        {/* Delete Confirmation Modal */}
        {showDelete && (
          <div className="logout-confirm-overlay animate-fadein">
            <div className="logout-confirm-modal">
              <div className="logout-confirm-header">
                <h3>Confirm Delete</h3>
                <button className="logout-confirm-close" onClick={() => setShowDelete(false)}>&times;</button>
              </div>
              <div className="logout-confirm-content">
                <p>Are you sure you want to delete this menu item?</p>
              </div>
              <div className="logout-confirm-footer">
                <button className="logout-confirm-btn cancel" onClick={() => setShowDelete(false)}>Cancel</button>
                <button className="logout-confirm-btn confirm" onClick={confirmDelete}>Delete</button>
              </div>
            </div>
          </div>
        )}
        <MenuItemModal
          open={modalOpen}
          onClose={() => setModalOpen(false)}
          item={modalItem}
          mode={modalMode}
          onSave={handleSave}
        />
      </div>
      <style>{`
        .animate-fadein { animation: fadeIn 0.5s; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: none; } }
      `}</style>
    </div>
  );
};

export default AdminMenuList; 