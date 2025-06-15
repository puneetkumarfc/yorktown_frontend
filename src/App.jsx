import { useState } from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Header from './components/common/Header'

function App() {

  return (
    <div className='bg-black min-h-screen w-full text-white px-[6rem] overflow-x-hidden custom-scrollbar'>
      <Header/>

      <Routes>
        <Route path='/' element={<Home/>}/>

      </Routes>

      {/* todo -> Add Footer */}
    </div>
  )
}

export default App
