/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter, Routes, Route, Navigate } from 'react-router';
import MobileLayout from './pages/MobileLayout';
import CustomerHome from './pages/CustomerHome';
import RestaurantDetail from './pages/RestaurantDetail';
import Cart from './pages/Cart';
import OrderTracking from './pages/OrderTracking';
import AdminDashboard from './pages/AdminDashboard';
import RoleSwitcher from './components/RoleSwitcher';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MobileLayout />}>
           <Route index element={<CustomerHome />} />
           <Route path="search" element={<div className="p-8 text-center">Search Page</div>} />
           <Route path="cart" element={<Cart />} />
           <Route path="profile" element={<div className="p-8 text-center">Profile Page</div>} />
           <Route path="restaurant/:id" element={<RestaurantDetail />} />
        </Route>
        
        <Route path="/tracking" element={<OrderTracking />} />

        {/* Dashboard roles */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/restaurant" element={<div className="font-display p-8 text-2xl font-bold bg-gray-50 h-screen flex justify-center items-center text-gray-400">Restaurant Partner App<br/>(Coming Soon)</div>} />
        <Route path="/rider" element={<div className="font-display p-8 text-2xl font-bold bg-gray-50 h-screen flex justify-center items-center text-gray-400">Delivery Rider App<br/>(Coming Soon)</div>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      <RoleSwitcher />
    </BrowserRouter>
  );
}
