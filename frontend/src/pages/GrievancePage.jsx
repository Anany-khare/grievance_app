import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GrievancePage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ departmentId: '', title: '', description: '' });
  const [ticketNo, setTicketNo] = useState('');
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    axios.get('http://localhost:5000/api/department')
      .then(res => setDepartments(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/grievance/submit', form);
      setIsSubmitted(true);
      setForm({ departmentId: '', title: '', description: '' });
      setSearchResult(res.data); // Show grievance after submission
    } catch (err) {
      alert('Submission failed');
    }
  };

  const handleSearch = async () => {
    if (!ticketNo) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/grievance/search/${ticketNo}`);
      setSearchResult(res.data);
    } catch (err) {
      alert('Ticket not found');
      setSearchResult(null);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white flex justify-between px-6 py-3 shadow">
        <h1 className="text-xl font-bold">Grievance Portal</h1>
        <div className="flex gap-4">
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search Ticket No"
              value={ticketNo}
              onChange={(e) => setTicketNo(e.target.value)}
              className="p-1 rounded text-black"
            />
            <button onClick={handleSearch} className="ml-2 bg-white text-blue-600 px-3 py-1 rounded">
              Search
            </button>
          </div>
          <a href="/login" className="bg-white text-blue-600 px-3 py-1 rounded">
            Login
          </a>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Submit a Grievance (Anonymous)</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Department</label>
            <select
              className="w-full border rounded p-2"
              value={form.departmentId}
              onChange={(e) => setForm({ ...form, departmentId: e.target.value })}
              required
            >
              <option value="">Select Department</option>
              {departments.map((dept) => (
                <option key={dept._id} value={dept._id}>{dept.name}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Title</label>
            <input
              type="text"
              className="w-full border rounded p-2"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              required
            />
          </div>
          <div>
            <label className="block mb-1">Description</label>
            <textarea
              className="w-full border rounded p-2"
              rows="4"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              required
            ></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
            Submit
          </button>
        </form>

        {isSubmitted && (
          <div className="mt-4 p-4 bg-green-100 text-green-800 rounded">
            Grievance submitted successfully! Ticket No: {searchResult?.ticketNo}
          </div>
        )}

        {searchResult ? (
          <div className="mt-8 p-4 border rounded bg-gray-50">
            <h3 className="text-lg font-semibold">Search Result:</h3>
            <p><strong>Ticket No:</strong> {searchResult.ticketNo}</p>
            <p><strong>Department:</strong> {searchResult.department.name}</p>
            <p><strong>Title:</strong> {searchResult.title}</p>
            <p><strong>Description:</strong> {searchResult.description}</p>
            <p><strong>Status:</strong> {searchResult.status}</p>
          </div>
        ) : (
          <p className="mt-8 text-gray-600">No grievance found with that ticket number.</p>
        )}
      </div>
    </div>
  );
}
