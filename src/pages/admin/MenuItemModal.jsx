import React, { useState, useEffect } from 'react';

const MenuItemModal = ({ open, onClose, item, mode = "view", onSave }) => {
  const isAdd = mode === 'add';
  const [form, setForm] = useState(item || {});

  useEffect(() => {
    setForm(item || (isAdd ? { name: '', category: '', price: '', status: 'Active', description: '' } : {}));
    // eslint-disable-next-line
  }, [item, isAdd]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    if (onSave) onSave(form);
  };

  if (!open) return null;

  return (
    <div className="logout-confirm-overlay animate-fadein" style={{ zIndex: 2000 }}>
      <div className="logout-confirm-modal" style={{ minWidth: 350, maxWidth: 500 }}>
        <div className="logout-confirm-header" style={{ justifyContent: "space-between" }}>
          <h3 style={{ color: '#ff4444' }}>
            {isAdd ? 'Add Menu Item' : mode === "edit" ? "Edit Menu Item" : "Menu Item Details"}
          </h3>
          <button className="logout-confirm-close" onClick={onClose}>&times;</button>
        </div>
        <div className="logout-confirm-content" style={{ padding: 16 }}>
          {(mode === "view") ? (
            <div>
              <p><b>Name:</b> {item.name}</p>
              <p><b>Category:</b> {item.category}</p>
              <p><b>Price:</b> ${item.price}</p>
              <p><b>Status:</b> {item.status}</p>
              <p><b>Description:</b> {item.description}</p>
            </div>
          ) : (
            <form className="flex flex-col gap-4">
              <div className="flex items-center w-full gap-3">
                <label className="font-semibold mb-0 text-right min-w-[110px] w-[110px]" htmlFor="edit-name">Name:</label>
                <input id="edit-name" name="name" value={form.name || ''} onChange={handleChange} className="admin-titlebar-search-input w-full" />
              </div>
              <div className="flex items-center w-full gap-3">
                <label className="font-semibold mb-0 text-right min-w-[110px] w-[110px]" htmlFor="edit-category">Category:</label>
                <input id="edit-category" name="category" value={form.category || ''} onChange={handleChange} className="admin-titlebar-search-input w-full" />
              </div>
              <div className="flex items-center w-full gap-3">
                <label className="font-semibold mb-0 text-right min-w-[110px] w-[110px]" htmlFor="edit-price">Price:</label>
                <input id="edit-price" name="price" type="number" value={form.price || ''} onChange={handleChange} className="admin-titlebar-search-input w-full" />
              </div>
              <div className="flex items-center w-full gap-3">
                <label className="font-semibold mb-0 text-right min-w-[110px] w-[110px]" htmlFor="edit-status">Status:</label>
                <select id="edit-status" name="status" value={form.status || ''} onChange={handleChange} className="admin-titlebar-search-input w-full">
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
              <div className="flex items-center w-full gap-3">
                <label className="font-semibold mb-0 text-right min-w-[110px] w-[110px]" htmlFor="edit-description">Description:</label>
                <textarea id="edit-description" name="description" value={form.description || ''} onChange={handleChange} className="admin-titlebar-search-input w-full" />
              </div>
            </form>
          )}
        </div>
        <div className="logout-confirm-footer" style={{ justifyContent: "flex-end" }}>
          <button className="logout-confirm-btn cancel" onClick={onClose}>Close</button>
          {(mode === "edit" || isAdd) && (
            <button className="logout-confirm-btn confirm" onClick={handleSave}>Save</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default MenuItemModal; 