import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import Bag from './pages/Bag'
import Header from './components/common/Header'
import Footer from './components/home/sections/Footer'
import Sidebar from './components/common/Sidebar'
import Menu from './pages/Menu'
import { routeConstant } from './constants/RouteConstants'
import AdminLogin from './pages/admin/AdminLogin'
import AdminHeader from './components/admin/AdminHeader';
import AdminFooter from './components/admin/AdminFooter';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminOrders from './pages/admin/AdminOrders';
import AdminOrderDetails from './pages/admin/AdminOrderDetails';
import AdminMenuList from './pages/admin/AdminMenuList';
import { LoaderProvider, useLoader } from './components/common/LoaderContext';
import PizzaLoader from './components/common/PizzaLoader';
import NotFound from './pages/NotFound';

function GlobalLoaderOverlay() {
  const { loading } = useLoader();
  if (!loading) return null;
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/60">
      <PizzaLoader loading={true} size={110} />
    </div>
  );
}

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [sidebarOpen]);

  const location = useLocation();
  const isAdminLogin = location.pathname === routeConstant.ADMIN_LOGIN;
  const isAdminDashboard = location.pathname === routeConstant.ADMIN_DASHBOARD;
  const isAdminOrders = location.pathname === routeConstant.ADMIN_ORDERS;
  const isAdminOrderDetails = /^\/admin\/orders\//.test(location.pathname) && !isAdminOrders;
  const isAdminMenuList = location.pathname === routeConstant.ADMIN_MENU_LIST;

  if (isAdminLogin) {
    return (
      <div className="bg-black min-h-screen w-full text-white overflow-x-hidden custom-scrollbar">
        <AdminHeader />
        <AdminLogin />
        <AdminFooter />
      </div>
    );
  }
  if (isAdminDashboard) {
    return (
      <div className="bg-black min-h-screen w-full text-white overflow-x-hidden custom-scrollbar">
        <AdminHeader sidebarWidth={collapsed ? 64 : 220} />
        <AdminDashboard collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminFooter sidebarWidth={collapsed ? 64 : 220} />
      </div>
    );
  }
  if (isAdminOrders) {
    return (
      <div className="bg-black min-h-screen w-full text-white overflow-x-hidden custom-scrollbar">
        <AdminHeader sidebarWidth={collapsed ? 64 : 220} />
        <AdminOrders collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminFooter sidebarWidth={collapsed ? 64 : 220} />
      </div>
    );
  }
  if (isAdminOrderDetails) {
    return (
      <div className="bg-black min-h-screen w-full text-white overflow-x-hidden custom-scrollbar">
        <AdminHeader sidebarWidth={collapsed ? 64 : 220} />
        <AdminOrderDetails collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminFooter sidebarWidth={collapsed ? 64 : 220} />
      </div>
    );
  }
  if (isAdminMenuList) {
    return (
      <div className="bg-black min-h-screen w-full text-white overflow-x-hidden custom-scrollbar">
        <AdminHeader sidebarWidth={collapsed ? 64 : 220} />
        <AdminMenuList collapsed={collapsed} setCollapsed={setCollapsed} />
        <AdminFooter sidebarWidth={collapsed ? 64 : 220} />
      </div>
    );
  }

  return (
    <div className={`custom-scrollbar bg-mainBg min-h-screen w-full text-black px-[1rem] xl:px-[2rem] overflow-x-hidden`}>
      <Header toggleSidebar={toggleSidebar}/>
      <div className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto overflow-hidden' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      <Routes>
        <Route path={routeConstant.HOME} element={<Home/>}/>
        <Route path={routeConstant.BAG} element={<Bag/>}/>
        <Route path={routeConstant.MENU} element={<Menu/>}/>
        <Route path={routeConstant.ADMIN_LOGIN} element={<AdminLogin/>}/>
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer/>
    </div>
  )
}

export default function AppWithLoader() {
  return (
    <LoaderProvider>
      <GlobalLoaderOverlay />
      <App />
    </LoaderProvider>
  );
}