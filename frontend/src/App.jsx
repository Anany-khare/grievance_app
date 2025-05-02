import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login'; 
import GrievanceForm from './pages/GrievancePage'; 
import Dashboard from './pages/Dashboard';
import Register from './pages/Register';
import HodDashboard from './pages/HodDashboard';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <Router>
      <Routes>
        
        <Route
          path="/"
          element={<GrievanceForm />}
        />
        <Route
          path="/login"
          element={<Login setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route
          path="/dashboard"
          element={isLoggedIn ? <Dashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />}
        />
        <Route path="/register" element={<Register />} />
        <Route path="/hoddashboard" element={isLoggedIn ? <HodDashboard /> : <Login setIsLoggedIn={setIsLoggedIn} />} />
      </Routes>
    </Router>
  );
}
