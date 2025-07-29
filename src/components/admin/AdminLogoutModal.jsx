import React from "react";

const AdminLogoutModal = ({cancelLogout, confirmLogout}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-[9999] px-4">
      <div className="bg-mainBg rounded-xl shadow-2xl border border-gray-200 w-full max-w-md p-6 mx-4">
        <div className="flex items-center justify-between mb-1">
          <h2 className="text-lg text-center w-full font-roboto_serif text-gray-900 font-semibold">
            Confirm Logout
          </h2>
        </div>

        <div className="mb-6">
          <p className="font-roboto font-normal text-gray-600 text-center">
            Are you sure you want to logout? You will be redirected to the login
            page.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-3">
          <button
            onClick={cancelLogout}
            className="cursor-pointer px-4 py-2 text-gray-700 bg-black/5 hover:bg-black/10 rounded-lg font-medium transition-colors order-2 sm:order-1"
          >
            Cancel
          </button>
          <button
            onClick={confirmLogout}
            className="cursor-pointer px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-lg font-medium transition-colors order-1 sm:order-2"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminLogoutModal;
