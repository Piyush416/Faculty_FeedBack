import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, createRoutesFromElements, createBrowserRouter, RouterProvider } from 'react-router-dom';

import Header from './components/Header'
import Footer from './components/Footer'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Cards from './pages/Cards';
import Layout from './components/Layout';

const route = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/submit-feedback" element={<Cards />} />
    </Route>
  )
)


function App() {
  return (

    <div className='h-screen'>
      <RouterProvider router={route} />
    </div>


    // <Router>
    //   <div className="border-8 border-yellow-500 m-10 p-10">
    //     <Header />
    //     <div className='border-4 border-red-700 m-10'>
    //       <Routes>
    //         <Route path="/" element={<Home />} />
    //         <Route path="/login" element={<Login />} />
    //         <Route path="/register" element={<Register />} />
    //         <Route path="/box-card" element={<Cards />} />
    //       </Routes>
    //     </div>
    //     <Footer />
    //   </div>
    // </Router>
  )
}
export default App
