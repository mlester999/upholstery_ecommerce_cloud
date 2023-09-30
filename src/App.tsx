import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import ForgotPassword from './pages/forgot-password/ForgotPassword';
import Login from './pages/login/Login';
import Dashboard from './pages/portal/Dashboard';
import Sellers from './pages/portal/Sellers';
import Customers from './pages/portal/Customers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/forgot-password' element={<ForgotPassword />} />
        <Route path='/portal/dashboard' element={<Dashboard />} />
        <Route path='/portal/sellers' element={<Sellers />} />
        <Route path='/portal/customers' element={<Customers />} />
        <Route path='/' element={<Navigate to='/login' replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
