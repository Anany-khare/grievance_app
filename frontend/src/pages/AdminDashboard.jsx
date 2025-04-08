// src/pages/AdminDashboard.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AddUser from './admin/AddUser';
import AddDepartment from './admin/AddDepartment';
import { clearAuth } from '../utils/auth';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('addUser');
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth(); // clear token + user
    navigate('/'); // go back to login page
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">Grievance App</div>
        <div className="space-x-4">
          <button
            className={`px-4 py-2 rounded hover:bg-blue-700 ${activeTab === 'addUser' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('addUser')}
          >
            Add User
          </button>
          <button
            className={`px-4 py-2 rounded hover:bg-blue-700 ${activeTab === 'addDepartment' ? 'bg-blue-700' : ''}`}
            onClick={() => setActiveTab('addDepartment')}
          >
            Add Department
          </button>
          <button
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Dashboard Content */}
      <div className="p-6">
        {activeTab === 'addUser' && <AddUser />}
        {activeTab === 'addDepartment' && <AddDepartment />}
      </div>
    </div>
  );
};

export default AdminDashboard;
