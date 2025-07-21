import React, { useState, useEffect } from 'react';
import AdminSidebar from '../../components/admin/AdminSidebar';
import { FaEye, FaEdit, FaTrash, FaPlus } from 'react-icons/fa';
import './AdminOrders.css'; // Use the same theme as orders/menu list
import { adminCoupons } from '../../utils/api';
import toast from 'react-hot-toast';
import { useLoader } from '../../components/common/LoaderContext';

const PAGE_SIZE = 10;

function CouponModal({ open, onClose, coupon, mode, onSave }) {
  if (!open) return null;
  const [editCoupon, setEditCoupon] = useState(coupon || {
    code: '',
    discountType: 'PERCENT',
    discount: '',
    maxDiscountAmount: '',
    minOrderAmount: '',
    startDate: '',
    expiry: '',
    status: 'Active',
    maxUses: '',
    maxUsesPerUser: '',
    // orderType: 'BOTH', // will be sent as static in API integration
  });
  const isView = mode === 'view';
  const isEdit = mode === 'edit' || mode === 'add';
  const isAdd = mode === 'add';

  // When switching to view mode, update state to match coupon
  React.useEffect(() => {
    if (isView && coupon) {
      setEditCoupon({
        code: coupon.code || '',
        discountType: coupon.discountType || 'PERCENT',
        discount: coupon.discount || '',
        maxDiscountAmount: coupon.maxDiscountAmount || '',
        minOrderAmount: coupon.minOrderAmount || '',
        startDate: coupon.startDate || '',
        expiry: coupon.expiry || '',
        status: coupon.status || 'Active',
        maxUses: coupon.maxUses || '',
        maxUsesPerUser: coupon.maxUsesPerUser || '',
      });
    }
  }, [isView, coupon]);

  // Helper for input styling
  const inputStyle = { marginLeft: 0, background: isView ? '#f1eee8' : undefined };

  return (
    <div className="logout-confirm-overlay animate-fadein" style={{ zIndex: 2000 }}>
      <div className="logout-confirm-modal" style={{ minWidth: 440, maxWidth: 540, width: '100%', paddingLeft: 32, paddingRight: 32 }}>
        <div className="logout-confirm-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ color: '#bd390e', fontWeight: 900, fontSize: 26 }}>{isAdd ? 'Add Coupon' : isView ? 'Coupon Details' : 'Edit Coupon'}</h3>
          <button className="logout-confirm-close" onClick={onClose} style={{ color: '#bd390e', fontSize: 28, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#a82a0c'} onMouseOut={e => e.currentTarget.style.color = '#bd390e'}>&times;</button>
        </div>
        <div className="flex flex-col gap-4 mt-4" style={{ paddingLeft: 12, paddingRight: 12 }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            {/* Code */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Code</span>
              <input
                className="admin-titlebar-search-input"
                value={editCoupon.code}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, code: e.target.value })}
                style={inputStyle}
                required
                readOnly={isView}
              />
            </label>
            {/* Discount Type */}
            <div className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Discount Type</span>
              <div className="flex gap-6 items-center mt-1">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="discountType"
                    checked={editCoupon.discountType === 'PERCENT'}
                    disabled={!isEdit}
                    onChange={() => setEditCoupon({ ...editCoupon, discountType: 'PERCENT' })}
                    readOnly={isView}
                  />
                  <span style={{ fontWeight: 500 }}>Percent</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    name="discountType"
                    checked={editCoupon.discountType === 'FLAT'}
                    disabled={!isEdit}
                    onChange={() => setEditCoupon({ ...editCoupon, discountType: 'FLAT' })}
                    readOnly={isView}
                  />
                  <span style={{ fontWeight: 500 }}>Flat</span>
                </label>
              </div>
            </div>
            {/* Discount */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Discount</span>
              <input
                className="admin-titlebar-search-input"
                type="number"
                value={editCoupon.discount}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, discount: e.target.value })}
                style={inputStyle}
                min="0"
                step="0.01"
                required
                readOnly={isView}
              />
            </label>
            {/* Maximum Discount Amount */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Maximum Discount Amount</span>
              <input
                className="admin-titlebar-search-input"
                type="number"
                value={editCoupon.maxDiscountAmount}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, maxDiscountAmount: e.target.value })}
                style={inputStyle}
                min="0"
                step="0.01"
                required
                readOnly={isView}
              />
            </label>
            {/* Minimum Order Amount */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Minimum Order Amount</span>
              <input
                className="admin-titlebar-search-input"
                type="number"
                value={editCoupon.minOrderAmount}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, minOrderAmount: e.target.value })}
                style={inputStyle}
                min="0"
                step="0.01"
                required
                readOnly={isView}
              />
            </label>
            {/* Start Date */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Start Date</span>
              <input
                type="date"
                className="admin-titlebar-search-input"
                value={editCoupon.startDate}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, startDate: e.target.value })}
                style={inputStyle}
                required
                readOnly={isView}
              />
            </label>
            {/* Expiry */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Expiry</span>
              <input
                type="date"
                className="admin-titlebar-search-input"
                value={editCoupon.expiry}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, expiry: e.target.value })}
                style={inputStyle}
                required
                readOnly={isView}
              />
            </label>
            {/* Status */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Status</span>
              <select
                className="admin-titlebar-search-input"
                value={editCoupon.status}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, status: e.target.value })}
                style={inputStyle}
                required
                readOnly={isView}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </label>
            {/* Max Uses */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Max Uses</span>
              <input
                className="admin-titlebar-search-input"
                type="number"
                value={editCoupon.maxUses}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, maxUses: e.target.value })}
                style={inputStyle}
                min="0"
                required
                readOnly={isView}
              />
            </label>
            {/* Max Uses Per User */}
            <label className="flex flex-col gap-1" style={{ color: '#bd390e', fontWeight: 600 }}>
              <span>Max Uses Per User</span>
              <input
                className="admin-titlebar-search-input"
                type="number"
                value={editCoupon.maxUsesPerUser}
                disabled={!isEdit}
                onChange={e => setEditCoupon({ ...editCoupon, maxUsesPerUser: e.target.value })}
                style={inputStyle}
                min="0"
                required
                readOnly={isView}
              />
            </label>
          </div>
        </div>
        <div className="logout-confirm-footer mt-6" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="logout-confirm-btn cancel" onClick={onClose}>Cancel</button>
          {isEdit && (
            <button className="logout-confirm-btn confirm" onClick={() => onSave(editCoupon)}>{isAdd ? 'Add' : 'Edit'}</button>
          )}
        </div>
      </div>
    </div>
  );
}

function DeleteModal({ open, onClose, onConfirm, coupon }) {
  if (!open) return null;
  return (
    <div className="logout-confirm-overlay animate-fadein">
      <div className="logout-confirm-modal" style={{ minWidth: 420, maxWidth: 520, width: '100%', paddingLeft: 32, paddingRight: 32 }}>
        <div className="logout-confirm-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
          <h3 style={{ color: '#bd390e', fontWeight: 900, fontSize: 26 }}>Delete Coupon</h3>
          <button className="logout-confirm-close" onClick={onClose} style={{ color: '#bd390e', fontSize: 28, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.2s' }} onMouseOver={e => e.currentTarget.style.color = '#a82a0c'} onMouseOut={e => e.currentTarget.style.color = '#bd390e'}>&times;</button>
        </div>
        <div className="logout-confirm-content" style={{ color: '#bd390e', fontWeight: 600, paddingLeft: 12, marginBottom: 24 }}>
          <p>Are you sure you want to delete this coupon{coupon && coupon.code ? `: "${coupon.code}"` : ''}?</p>
        </div>
        <div className="logout-confirm-footer" style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <button className="logout-confirm-btn cancel" onClick={onClose}>Cancel</button>
          <button className="logout-confirm-btn confirm" onClick={onConfirm}>Delete</button>
        </div>
      </div>
    </div>
  );
}

const AdminCoupon = ({ collapsed, setCollapsed }) => {
  const [coupons, setCoupons] = useState([]);
  const [modal, setModal] = useState({ open: false, coupon: null, mode: null });
  const [modalLoading, setModalLoading] = useState(false);
  const [deleteModal, setDeleteModal] = useState({ open: false, couponId: null });
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [sort, setSort] = useState('code,asc');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  // Add a ref to trigger reload
  const [reload, setReload] = useState(0);
  const { showLoader, hideLoader } = useLoader();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      showLoader();
      setError('');
      try {
        const body = {
          search,
          page,
          size: PAGE_SIZE,
          sort,
        };
        const res = await adminCoupons.getCouponList(body);
        if (res.success && res.data) {
          setCoupons(res.data.content.map(c => ({
            id: c.id,
            code: c.code,
            discountType: c.discountType,
            discount: c.discountValue,
            maxDiscountAmount: c.maxDiscountAmount,
            minOrderAmount: c.minOrderAmount,
            startDate: c.startDate ? c.startDate.split('T')[0] : '',
            expiry: c.endDate ? c.endDate.split('T')[0] : '',
            status: c.isActive ? 'Active' : 'Inactive',
            maxUses: c.maxUses,
            maxUsesPerUser: c.maxUsesPerUser,
          })));
          setTotalPages(res.data.totalPages || 1);
        } else {
          setCoupons([]);
          setTotalPages(1);
          setError(res.message || 'Failed to fetch coupons');
        }
      } catch (err) {
        setCoupons([]);
        setTotalPages(1);
        setError(err.message || 'Failed to fetch coupons');
      } finally {
        setLoading(false);
        hideLoader();
      }
    };
    fetchData();
  }, [search, page, sort, reload]);

  const handleSort = (col) => {
    let direction = 'asc';
    if (sort.startsWith(col)) {
      direction = sort.endsWith('asc') ? 'desc' : 'asc';
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
        setModal({ open: true, coupon: mapCouponDetails(res.data), mode: 'view' });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch coupon details.');
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
        setModal({ open: true, coupon: mapCouponDetails(res.data), mode: 'edit' });
      }
    } catch (err) {
      toast.error(err.message || 'Failed to fetch coupon details.');
    } finally {
    //   setModalLoading(false);
      hideLoader();
    }
  };
  // Helper to map API details to modal fields
  function mapCouponDetails(data) {
    return {
      id: data.id,
      code: data.code || '',
      discountType: data.discountType || 'PERCENT',
      discount: data.discountValue || '',
      maxDiscountAmount: data.maxDiscountAmount || '',
      minOrderAmount: data.minOrderAmount || '',
      startDate: data.startDate ? data.startDate.split('T')[0] : '',
      expiry: data.endDate ? data.endDate.split('T')[0] : '',
      status: data.isActive ? 'Active' : 'Inactive',
      maxUses: data.maxUses || '',
      maxUsesPerUser: data.maxUsesPerUser || '',
    };
  }
  const handleDelete = couponId => setDeleteModal({ open: true, couponId });
  const handleAdd = () => setModal({ open: true, coupon: null, mode: 'add' });

  const handleSaveEdit = async (editCoupon) => {
    // Validation: All fields required
    if (!editCoupon.code || !editCoupon.discountType || !editCoupon.discount || !editCoupon.maxDiscountAmount || !editCoupon.minOrderAmount || !editCoupon.startDate || !editCoupon.expiry || !editCoupon.status || !editCoupon.maxUses || !editCoupon.maxUsesPerUser) {
      toast.error('All fields are required.');
      return;
    }
    // Validation: Expiry must be after start date
    if (editCoupon.startDate && editCoupon.expiry && new Date(editCoupon.expiry) <= new Date(editCoupon.startDate)) {
      toast.error('Expiry date must be after start date.');
      return;
    }
    // Validation: Discount type
    if (editCoupon.discountType !== 'PERCENT' && editCoupon.discountType !== 'FLAT') {
      toast.error('Discount type must be either PERCENT or FLAT.');
      return;
    }
    // Prepare API payload
    const payload = {
      ...(modal.mode === 'edit' && modal.coupon && modal.coupon.id ? { id: modal.coupon.id, updatedAt: new Date().toISOString() } : {}),
      code: editCoupon.code,
      discountType: editCoupon.discountType,
      discountValue: Number(editCoupon.discount),
      maxDiscountAmount: Number(editCoupon.maxDiscountAmount),
      minOrderAmount: Number(editCoupon.minOrderAmount),
      startDate: editCoupon.startDate ? `${editCoupon.startDate}T00:00:00` : '',
      endDate: editCoupon.expiry ? `${editCoupon.expiry}T23:59:59` : '',
      maxUses: Number(editCoupon.maxUses),
      maxUsesPerUser: Number(editCoupon.maxUsesPerUser),
      orderType: 'BOTH',
      isActive: editCoupon.status === 'Active',
    };
    try {
      const res = await adminCoupons.upsertCoupon(payload);
      if (res.success) {
        setModal({ open: false, coupon: null, mode: null });
        toast.success(modal.mode === 'edit' ? 'Coupon updated successfully!' : 'Coupon created successfully!');
        setReload(r => r + 1); // triggers useEffect to reload list
      }
    } catch (err) {
      toast.error(err.message || 'Failed to create coupon.');
    }
  };

  const handleConfirmDelete = async () => {
    const couponId = deleteModal.couponId;
    if (!couponId) return;
    showLoader();
    try {
      await adminCoupons.deleteCoupon(couponId);
      toast.success('Coupon deleted successfully!');
      setDeleteModal({ open: false, couponId: null });
      setReload(r => r + 1); // refresh list
    } catch (err) {
      toast.error(err.message || 'Failed to delete coupon.');
    } finally {
      hideLoader();
    }
  };

  return (
    <div className={`admin-dashboard-layout${collapsed ? ' collapsed' : ''} px-[1rem] md:px-[6rem]`}> 
      <AdminSidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="admin-orders-container px-[1rem] md:px-[6rem]">
        <div className="glass-effect admin-titlebar flex-col md:flex-row gap-4 md:gap-0">
          <h1 className="admin-title">Coupons</h1>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4 items-center w-full md:w-auto justify-between md:justify-end">
            <input
              className="admin-titlebar-search-input w-full md:w-64"
              type="text"
              placeholder="Search coupons..."
              value={search}
              onChange={e => { setSearch(e.target.value); setPage(0); }}
            />
            <button className="admin-titlebar-search-btn flex items-center gap-2" style={{ minWidth: 120 }} onClick={handleAdd}>
              <FaPlus /> Add Coupon
            </button>
          </div>
        </div>
        <div className="glass-effect rounded-2xl overflow-x-auto animate-fadein">
          {loading ? (
            <div style={{ textAlign: 'center', color: '#bd390e', padding: '2rem' }}>Loading coupons...</div>
          ) : error ? (
            <div style={{ textAlign: 'center', color: '#bd390e', padding: '2rem' }}>{error}</div>
          ) : (
          <table className="w-full table-auto admin-orders-table">
            <thead>
              <tr className="table-order text-white">
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('code')}>Code {sort.startsWith('code') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('discountType')}>Discount Type {sort.startsWith('discountType') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('discountValue')}>Discount {sort.startsWith('discountValue') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('startDate')}>Start Date {sort.startsWith('startDate') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('endDate')}>Expiry Date {sort.startsWith('endDate') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff', cursor: 'pointer'}} onClick={() => handleSort('isActive')}>Status {sort.startsWith('isActive') ? (sort.endsWith('asc') ? '↑' : '↓') : ''}</th>
                <th className="px-6 py-4 text-left font-semibold" style={{color: '#fff'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map(coupon => (
                <tr key={coupon.id} className="table-row transition-all duration-300 hover:bg-red-900/10">
                  <td className="px-6 py-4 font-semibold">{coupon.code}</td>
                  <td className="px-6 py-4">{coupon.discountType}</td>
                  <td className="px-6 py-4">{coupon.discount}</td>
                  <td className="px-6 py-4">{coupon.startDate}</td>
                  <td className="px-6 py-4">{coupon.expiry}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${coupon.status === 'Active' ? 'bg-green-700 text-green-200' : 'bg-gray-700 text-gray-300'}`}>{coupon.status}</span>
                  </td>
                  <td className="px-6 py-4 flex gap-3 items-center">
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-mainRed/80 text-white transition-all duration-200" title="View" onClick={() => handleView(coupon)}><FaEye /></button>
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-yellow-600 text-white transition-all duration-200" title="Edit" onClick={() => handleEdit(coupon)}><FaEdit /></button>
                    <button className="p-2 rounded-lg bg-black/30 hover:bg-red-600 text-white transition-all duration-200" title="Delete" onClick={() => handleDelete(coupon.id)}><FaTrash /></button>
                  </td>
                </tr>
              ))}
              {coupons.length === 0 && !loading && !error && (
                <tr><td colSpan={7} style={{ textAlign: 'center', color: '#ff2222' }}>No coupons found.</td></tr>
              )}
            </tbody>
          </table>
          )}
        </div>
        <div className="admin-orders-pagination animate-fadein" style={{ justifyContent: 'flex-end', marginRight: 0 }}>
          <button onClick={() => handlePage(page - 1)} disabled={page === 0}>&lt;</button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              className={page === i ? 'active' : ''}
              onClick={() => handlePage(i)}
            >{i + 1}</button>
          ))}
          <button onClick={() => handlePage(page + 1)} disabled={page === totalPages - 1}>&gt;</button>
        </div>
      </div>
      <CouponModal
        open={modal.open}
        onClose={() => setModal({ open: false, coupon: null, mode: null })}
        coupon={modal.coupon}
        mode={modal.mode}
        onSave={handleSaveEdit}
      />
      {modalLoading && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40">
          <div className="bg-white/90 rounded-lg px-8 py-6 text-lg font-semibold text-[#bd390e] shadow-lg">Loading coupon details...</div>
        </div>
      )}
      <DeleteModal
        open={deleteModal.open}
        onClose={() => setDeleteModal({ open: false, couponId: null })}
        onConfirm={handleConfirmDelete}
        coupon={coupons.find(c => c.id === deleteModal.couponId)}
      />
    </div>
  );
};

export default AdminCoupon; 