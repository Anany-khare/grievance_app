import React, { useState } from 'react';
import axios from 'axios';
import { getUser, clearAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

const StudentDashboard = () => {
  const [content, setContent] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    clearAuth();
    navigate('/login');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess('');
    setError('');

    if (!user || !user._id || !user.department) {
      setError('User info missing.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/grievances', {
        student: user._id,
        department: user.department,
        content,
      });

      setSuccess('Grievance submitted!');
      setContent('');
    } catch (err) {
      console.error(err.response?.data || err.message);
      setError(err.response?.data?.message || 'Error submitting grievance');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar */}
      <nav className="bg-blue-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
        <div className="text-xl font-bold">Grievance App</div>
        <div className="space-x-4">
          <button
            className="px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => alert(`Name: ${user.name}\nEmail: ${user.email}`)}
          >
            Profile
          </button>
          <button
            className="px-4 py-2 rounded bg-red-500 hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </nav>

      {/* Form */}
      <div className="max-w-xl mx-auto mt-10 bg-white p-6 rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Submit Grievance</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            value={user?.name || ''}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
            placeholder="Name"
          />
          <input
            type="text"
            value={user?.department || ''}
            disabled
            className="w-full px-4 py-2 border rounded bg-gray-100"
            placeholder="Department"
          />
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Describe your grievance..."
            className="w-full px-4 py-2 border rounded"
            required
          />
          <button
            type="submit"
            className="bg-blue-700 text-white px-6 py-2 rounded hover:bg-blue-800"
          >
            Submit
          </button>
          {success && <p className="text-green-600">{success}</p>}
          {error && <p className="text-red-600">{error}</p>}
        </form>
      </div>
    </div>
  );
};

export default StudentDashboard;
