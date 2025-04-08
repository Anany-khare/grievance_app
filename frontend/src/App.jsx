// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AdminDashboard from './pages/AdminDashboard';
import StudentDashboard from './pages/StudentDashboard';
import ProctorDashboard from './pages/ProctorDashboard';
import HodDashboard from './pages/HodDashboard';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />
        <Route path="/proctor/dashboard" element={<ProctorDashboard />} />
        <Route path="/hod/dashboard" element={<HodDashboard />} />
      </Routes>
    </Router>
  );
};

export default App;
