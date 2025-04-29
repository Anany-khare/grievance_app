import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [grievances, setGrievances] = useState([]);
  
  useEffect(() => {
    axios.get('http://localhost:5000/api/grievance/all', { withCredentials: true })
      .then(res => {
        console.log(res.data);  // Debug: log the data fetched
        setGrievances(res.data);
      })
      .catch(err => console.error(err));
  }, []);
  
  return (
    <div>
      <h1>Grievance Dashboard</h1>
      
      {/* Table to display grievances */}
      {grievances.length === 0 ? (
        <p>No grievances found.</p>
      ) : (
        <table className="table-auto w-full border-collapse border border-gray-300">
          <thead>
            <tr>
              <th className="border border-gray-300 px-4 py-2">Title</th>
              <th className="border border-gray-300 px-4 py-2">Description</th>
              <th className="border border-gray-300 px-4 py-2">Status</th>
              <th className="border border-gray-300 px-4 py-2">Department</th>
            </tr>
          </thead>
          <tbody>
            {grievances.map((grievance) => (
              <tr key={grievance._id}>
                <td className="border border-gray-300 px-4 py-2">{grievance.title}</td>
                <td className="border border-gray-300 px-4 py-2">{grievance.description}</td>
                <td className="border border-gray-300 px-4 py-2">{grievance.status}</td>
                <td className="border border-gray-300 px-4 py-2">{grievance.department?.name || 'No department'}</td> {/* Safely access department name */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
