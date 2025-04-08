// src/pages/admin/AddDepartment.jsx
import React, { useState } from 'react';
import axios from 'axios';

const AddDepartment = () => {
  const [name, setName] = useState('');
  const [hodName, setHodName] = useState('');
  const [hodEmail, setHodEmail] = useState('');
  const [hodPassword, setHodPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      // Step 1: Create HOD user
      const hodRes = await axios.post('http://localhost:5000/api/users', {
        name: hodName,
        email: hodEmail,
        password: hodPassword,
        role: 'hod',
        department: name,
      });

      // Step 2: Create Department
      const deptRes = await axios.post('http://localhost:5000/api/departments', {
        name,
        hodEmail,
      });

      setMessage('Department and HOD added successfully!');
      setName('');
      setHodName('');
      setHodEmail('');
      setHodPassword('');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.message || err.message));
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow-md mt-6">
      <h2 className="text-xl font-semibold mb-4">Add Department</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Department Name (e.g., CSE)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="HOD Name"
          value={hodName}
          onChange={(e) => setHodName(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          placeholder="HOD Email"
          value={hodEmail}
          onChange={(e) => setHodEmail(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          placeholder="HOD Password"
          value={hodPassword}
          onChange={(e) => setHodPassword(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Add Department
        </button>
      </form>
      {message && <p className="mt-4 text-sm">{message}</p>}
    </div>
  );
};

export default AddDepartment;
