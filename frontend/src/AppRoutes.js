import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FoodPage from './pages/Food/FoodPage.jsx'
import CartPage from './pages/Cart/CartPage.jsx'
import LoginPage from './pages/Login/LoginPage.js'

export default function AppRoutes() {
  return (
    <Routes>
        <Route path = '/' element = {<HomePage/>}/>
        <Route path="/search/:searchTerm" element={<HomePage />} />
        <Route path="/tag/:tag" element={<HomePage />} />
        <Route path="food/:id" element={<FoodPage/>} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
    </Routes>
  )
}
