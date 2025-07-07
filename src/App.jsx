import { useEffect, useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Bag from './pages/Bag'
import Header from './components/common/Header'
import Footer from './components/home/sections/Footer'
import Sidebar from './components/common/Sidebar'
import Menu from './pages/Menu'
import { routeConstant } from './constants/RouteConstants'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  return (
    <div className={`bg-black min-h-screen w-full text-white px-[1rem] md:px-[6rem] overflow-x-hidden custom-scrollbar`}>
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
      </Routes>

      <Footer/>
    </div>
  )
}

export default App
