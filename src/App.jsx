import { useEffect, useState } from "react";
import "./App.css";
import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Bag from "./pages/Bag";
import Header from "./components/common/Header";
import Footer from "./components/home/sections/Footer";
import Sidebar from "./components/common/Sidebar";
import Menu from "./pages/Menu";
import Contact from "./pages/Contact";
import { routeConstant } from "./constants/RouteConstants";
import ComingSoon from "./pages/ComingSoon";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminOrders from "./pages/admin/AdminOrders";
import AdminOrderDetails from "./pages/admin/AdminOrderDetails";
import AdminMenuList from "./pages/admin/AdminMenuList";
import AdminCoupon from "./pages/admin/AdminCoupon";
import { LoaderProvider, useLoader } from "./components/common/LoaderContext";
import PizzaLoader from "./components/common/PizzaLoader";
import NotFound from "./pages/NotFound";
import SidebarDemo from "./pages/SidebarDemo";
import AdminLayout from "./pages/admin/AdminLayout";

function GlobalLoaderOverlay() {
  const { loading } = useLoader();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <PizzaLoader loading={true} size={110} />
    </div>
  );
}

// User Layout Component
function UserLayout({ sidebarOpen, toggleSidebar }) {
  return (
    <div className="custom-scrollbar bg-mainBg min-h-screen w-full text-black px-[1rem] xl:px-[2rem] overflow-x-hidden">
      <Header toggleSidebar={toggleSidebar} />
      <div
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          sidebarOpen
            ? "opacity-100 pointer-events-auto overflow-hidden"
            : "opacity-0 pointer-events-none"
        }`}
        onClick={toggleSidebar}
      />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Routes>
        <Route path={routeConstant.HOME} element={<Home />} />
        <Route path={routeConstant.BAG} element={<Bag />} />
        <Route path={routeConstant.MENU} element={<Menu />} />
        <Route path={routeConstant.CONTACT} element={<Contact />} />
        <Route path="/coming-soon" element={<ComingSoon />} />
        <Route path="/sidebar-demo" element={<SidebarDemo />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
    </div>
  );
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const location = useLocation();

  // Inject Tawk.to chatbot script only on non-admin pages
  useEffect(() => {
    if (!location.pathname.startsWith("/admin")) {
      if (!window.Tawk_API && !document.getElementById("tawkto-script")) {
        var s1 = document.createElement("script");
        s1.async = true;
        s1.src = "https://embed.tawk.to/687d544df5f241191d3e9335/1j0kp2kmh";
        s1.charset = "UTF-8";
        s1.id = "tawkto-script";
        s1.setAttribute("crossorigin", "*");
        document.body.appendChild(s1);
      }
    } else {
      // Remove the script if navigating to admin
      const tawkScript = document.getElementById("tawkto-script");
      if (tawkScript) tawkScript.remove();
    }
  }, [location.pathname]);

  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <Routes>
        <Route path={routeConstant.ADMIN_LOGIN} element={<AdminLogin />} />
        <Route path={routeConstant.ADMIN_LAYOUT} element={
            localStorage.getItem("adminToken") ? (
              <AdminLayout />
            ) : (
              <Navigate to={routeConstant.ADMIN_LOGIN} replace />
            )
          }>
          <Route path={routeConstant.ADMIN_DASHBOARD_RELATIVE} element={<AdminDashboard />}/>
          <Route path={routeConstant.ADMIN_ORDERS_RELATIVE} element={<AdminOrders />} />
          <Route path={routeConstant.ADMIN_ORDER_DETAILS_RELATIVE} element={<AdminOrderDetails />}/>
          <Route path={routeConstant.ADMIN_MENU_LIST_RELATIVE} element={<AdminMenuList />}/>
          <Route path={routeConstant.ADMIN_COUPON_RELATIVE} element={<AdminCoupon />}/>
          <Route index element={<Navigate to={routeConstant.ADMIN_DASHBOARD_RELATIVE} replace />}/>
        </Route>
        <Route path="/admin/*" element={<Navigate to={routeConstant.ADMIN_LOGIN} replace />}/>
      </Routes>
    );
  }

  return <UserLayout sidebarOpen={sidebarOpen} toggleSidebar={toggleSidebar} />;
}

export default function AppWithLoader() {
  return (
    <LoaderProvider>
      <GlobalLoaderOverlay />
      <App />
    </LoaderProvider>
  );
}
