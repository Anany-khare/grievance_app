import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [ticket, setTicket] = useState('');
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  const search = async () => {
    if (!ticket) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/grievance/search/${ticket}`);
      setResult(res.data);
    } catch (err) {
      alert('Ticket not found');
      setResult(null);
    }
  };

  const logout = () => {
    axios
      .post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true })
      .then(() => {
        setIsLoggedIn(false);
        navigate('/login');
      })
      .catch(() => alert('Error logging out'));
  };

  return (
    <div className="bg-blue-600 text-white flex justify-between px-6 py-3 shadow">
      <h1 className="text-xl font-bold cursor-pointer" onClick={() => navigate('/')}>
        Grievance Portal
      </h1>
      <div className="flex gap-4 items-center">
        {isLoggedIn ? (
          <>
            <button onClick={logout} className="bg-white text-blue-600 px-3 py-1 rounded">
              Logout
            </button>
          </>
        ) : (
          <Link to="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
            Login
          </Link>
        )}
        <input
          type="text"
          placeholder="Search Ticket No"
          value={ticket}
          onChange={(e) => setTicket(e.target.value)}
          className="p-1 rounded text-black"
        />
        <button onClick={search} className="bg-white text-blue-600 px-3 py-1 rounded">
          Search
        </button>
      </div>
    </div>
  );
}
