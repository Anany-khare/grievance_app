import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HodDashboard = () => {
  const [grievances, setGrievances] = useState([]);
  const [searchTicketNo, setSearchTicketNo] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
//   const [departmentId, setDepartmentId] = useState(null);


  const fetchDepartment = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get('http://localhost:5000/api/auth/me', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        timeout: 10000
      });

      console.log("✅ /me response:", res.data);

      const deptId = res.data?.department?._id;
      if (!deptId) {
        console.warn("⚠️ Department not assigned.");
        return;
      }

      console.log("🏢 Department ID:", deptId);
      setDepartmentId(deptId);
    } catch (err) {
      console.error("❌ Error fetching department:", err);
    }
  };

  const fetchGrievances = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const res = await axios.get('http://localhost:5000/api/grievance/department', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        timeout: 10000
      });

      console.log("📋 Grievances fetched:", res.data);
      setGrievances(res.data);
    } catch (err) {
      console.error("❌ Error fetching grievances:", err);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/');
      return;
    }

    const loadData = async () => {
      await fetchDepartment();
      await fetchGrievances(); // works after departmentId is set
    };

    loadData();
  }, [navigate]);

  const handleSearch = async () => {
    const token = localStorage.getItem('authToken');
    setIsSearching(true); // Set search mode to true before sending the request

    try {
      const res = await axios.get(`http://localhost:5000/api/grievance/search/${searchTicketNo}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      setGrievances([res.data]); // Display only the searched grievance
    } catch (err) {
      console.error('Error searching grievance:', err);
      setGrievances([]); // Clear grievances if not found
    }
  };

  const handleClearSearch = () => {
    setSearchTicketNo('');
    fetchGrievances(); // Fetch all grievances again
    setIsSearching(false); // Reset search mode
  };

  const updateStatus = async (id, newStatus) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.put(`http://localhost:5000/api/grievance/${id}/status`, { status: newStatus }, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchGrievances();
    } catch (err) {
      console.error(`Error updating to ${newStatus}:`, err);
    }
  };

  const handleReject = async (id) => {
    const token = localStorage.getItem('authToken');
    try {
      await axios.delete(`http://localhost:5000/api/grievance/${id}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      fetchGrievances();
    } catch (err) {
      console.error('Error rejecting grievance:', err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-blue-600 text-white px-6 py-4 flex justify-between items-center shadow">
        <a href="/"><h1 className="text-xl font-semibold">HOD Dashboard</h1></a>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search Ticket No"
            value={searchTicketNo}
            onChange={(e) => setSearchTicketNo(e.target.value)}
            className="p-1 rounded text-black"
          />
          <button
            onClick={isSearching ? handleClearSearch : handleSearch}
            className="bg-white text-blue-600 px-3 py-1 rounded"
          >
            {isSearching ? 'Clear' : 'Search'}
          </button>
          <button
            onClick={handleLogout}
            className="bg-white text-blue-600 px-3 py-1 rounded"
          >
            Logout
          </button>
        </div>
      </nav>

      <div className="p-8">
        <h1 className="text-2xl font-bold mb-4">HOD Grievance Dashboard</h1>

        {grievances.length === 0 ? (
          <p>No grievances found.</p>
        ) : (
          <table className="table-auto w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">Ticket No</th>
                <th className="border border-gray-300 px-4 py-2">Title</th>
                <th className="border border-gray-300 px-4 py-2">Description</th>
                <th className="border border-gray-300 px-4 py-2">Status</th>
                <th className="border border-gray-300 px-4 py-2">Department</th>
                <th className="border border-gray-300 px-4 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {grievances.map((grievance) => (
                <tr key={grievance._id}>
                  <td className="border border-gray-300 px-4 py-2">{grievance.ticketNo}</td>
                  <td className="border border-gray-300 px-4 py-2">{grievance.title}</td>
                  <td className="border border-gray-300 px-4 py-2">{grievance.description}</td>
                  <td className="border border-gray-300 px-4 py-2">{grievance.status}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {grievance.department?.name || 'No department'}
                  </td>
                  <td className="border border-gray-300 px-4 py-2 space-x-2">
                    <button
                      className="bg-yellow-400 hover:bg-yellow-500 text-white px-2 py-1 rounded text-sm"
                      onClick={() => updateStatus(grievance._id, 'In Progress')}
                    >
                      Mark In Progress
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => updateStatus(grievance._id, 'Resolved')}
                    >
                      Mark Resolved
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded text-sm"
                      onClick={() => handleReject(grievance._id)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default HodDashboard;
