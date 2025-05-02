import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [searchTicketNo, setSearchTicketNo] = useState('');
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    const role = localStorage.getItem('userRole');
    if (token && role) {
      setIsLoggedIn(true);
      navigate(role === 'HOD' ? '/hoddashboard' : '/dashboard');
    }
  }, [navigate, setIsLoggedIn]);

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // ✅ Save token and role in localStorage
      localStorage.setItem('authToken', token);
      localStorage.setItem('userRole', user.role);
      setIsLoggedIn(true);

      // ✅ Redirect based on role
      if (user.role === 'ADMIN') {
        navigate('/dashboard');
      } else if (user.role === 'HOD') {
        navigate('/hoddashboard');
      } else {
        alert('Unauthorized role');
      }
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* ✅ Navbar */}
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <a href="/"><h1 className="text-xl font-semibold">Grievance System</h1> </a>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Search Ticket No"
            value={searchTicketNo}
            onChange={(e) => setSearchTicketNo(e.target.value)}
            className="p-1 rounded text-black"
          />
          <button className="bg-white text-blue-600 px-3 py-1 rounded hover:bg-gray-200">
            Search
          </button>
          <button
            className="bg-gray-300 text-gray-500 px-3 py-1 rounded cursor-not-allowed"
            disabled
          >
            Login
          </button>
        </div>
      </nav>

      {/* 👇 Login Form */}
      <div className="flex items-center justify-center py-16">
        <form onSubmit={login} className="bg-white p-8 rounded shadow w-96 space-y-4">
          <h2 className="text-2xl font-bold">Admin / HOD Login</h2>
          <input
            type="email"
            placeholder="Email"
            className="w-full border p-2 rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full border p-2 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Login</button>
        </form>
      </div>
    </div>
  );
}