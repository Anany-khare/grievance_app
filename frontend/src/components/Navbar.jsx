import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // to get current route path

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);  // user is logged in
    } else {
      setIsLoggedIn(false); // user is not logged in
    }
  }, []);

  const handleClick = () => {
    if (location.pathname === '/grievance') {
      if (!isLoggedIn) {
        navigate('/login'); // If not logged in, go to login page
      } else {
        navigate('/dashboard'); // If logged in, go to dashboard
      }
    } else if (location.pathname === '/dashboard') {
      localStorage.removeItem('authToken');  // logout action
      setIsLoggedIn(false);
      navigate('/'); // redirect to home or login page
    }
  };

  return (
    <div className="navbar bg-gray-800 p-4 flex justify-between items-center text-white">
      <div className="logo">Your Logo</div>
      <button
        onClick={handleClick}
        className="bg-blue-600 px-4 py-2 rounded"
        disabled={location.pathname === '/login' && isLoggedIn} // Disable if on login page and already logged in
      >
        {location.pathname === '/grievance' ? ( // If grievance page
          isLoggedIn ? 'Dashboard' : 'Login'
        ) : location.pathname === '/dashboard' ? ( // If on dashboard
          'Logout'
        ) : ( // If not in above two
          'Login'
        )}
      </button>
    </div>
  );
};

export default Navbar;
