import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/common/Header'
import Footer from './components/home/sections/Footer'
import Sidebar from './components/common/Sidebar'

function App() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  }

  return (
    <div className='bg-black min-h-screen w-full text-white px-[6rem] overflow-x-hidden custom-scrollbar relative'>
      <Header toggleSidebar={toggleSidebar}/>
      
      <div
        className={`fixed inset-0 bg-black/20 z-30 transition-opacity duration-300 ${
          sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleSidebar}
      />
      <Sidebar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />

      <Routes>
        <Route path='/' element={<Home/>}/>

      </Routes>

      <Footer/>
    </div>
  )
}

export default App
