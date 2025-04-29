import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// const [isLoggedIn, setIsLoggedIn] = useState(false);


export default function Login({ setIsLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'http://localhost:5000/api/auth/login',
        { email, password },
        { withCredentials: true }
      );

      const { token, user } = response.data;

      // Store token in local storage or context (to use in further requests)
      localStorage.setItem('authToken', token);

      console.log('Login successful, token:', token);
      setIsLoggedIn(true); // Set the login state to true

      // Navigate to the dashboard
      navigate('/dashboard');
    } catch (err) {
      alert('Login failed');
      console.error(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
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
  );
}
