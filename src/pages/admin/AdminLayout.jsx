import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "../../components/admin/AdminSidebar";
import { PanelRightClose } from "lucide-react";

const AdminLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  return (
    <div className="font-[Roboto] overflow-y-auto custom-scrollbar h-screen">
      <div className="relative min-h-full flex bg-[#E8EDE9]">
        {/* Sidebar */}
        <div className={`!fixed z-40 top-0 left-0 bottom-0 w-[60vw] max-w-[240px] bg-[#E8EDE9] transform transition-transform duration-300 ${
            sidebarOpen ? "translate-x-0" : "-translate-x-[104%]"
          } md:translate-x-0 md:static md:block`}>
          <AdminSidebar toggleSidebar={toggleSidebar} />
        </div>

        {/* Main Content Area */}
        <div className="w-full p-2 md:ml-[240px] h-full overflow-x-hidden">
          <div className="flex items-center justify-between mb-2 p-3 md:p-0 md:mb-0">
            <button
              className={`md:hidden transition-all duration-300`}
              onClick={toggleSidebar}
            >
              <PanelRightClose strokeWidth={1} />
            </button>

            {/* <Breadcrumbs/> */}
          </div>

          {/* Content goes here */}
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
