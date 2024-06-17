import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import FoodPage from './pages/Food/FoodPage.jsx'
import CartPage from './pages/Cart/CartPage.jsx'
import LoginPage from './pages/Login/LoginPage.js'
import RegisterPage from './pages/Register/RegisterPage.js'
import CheckoutPage from './pages/Checkout/CheckoutPage.js'
import AuthRoute from './components/AuthRoute/AuthRoute.js'
import PaymentPage from './pages/Payment/PaymentPage.js'
import OrderTrackPage from './pages/OrderTrack/OrderTrackPage.js'
import ProfilePage from './pages/Profile/ProfilePage.js'
import OrdersPage from './pages/Orders/OrdersPage.js'

export default function AppRoutes() {
  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path="/search/:searchTerm" element={<HomePage />} />
      <Route path="/tag/:tag" element={<HomePage />} />
      <Route path="food/:id" element={<FoodPage />} />
      <Route path="/cart" element={<CartPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path='/checkout' element={
        <AuthRoute>
          <CheckoutPage />
        </AuthRoute>} />
      <Route path='/payment' element={
        <AuthRoute>
          <PaymentPage />
        </AuthRoute>} />
      <Route path='/track/:orderId' element={
        <AuthRoute>
          <OrderTrackPage />
        </AuthRoute>} />
      <Route path='/profile' element={
        <AuthRoute>
          <ProfilePage />
        </AuthRoute>} />
      <Route path='/orders' element={
        <AuthRoute>
          <OrdersPage />
        </AuthRoute>} />
    </Routes>
  )
}
