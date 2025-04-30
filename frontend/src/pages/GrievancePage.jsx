import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GrievancePage() {
  const [departments, setDepartments] = useState([]);
  const [form, setForm] = useState({ departmentId: '', title: '', description: '' });
  const [ticketNo, setTicketNo] = useState('');
  const [searchTicketNo, setSearchTicketNo] = useState(''); // 👈 separate state for search bar
  const [searchResult, setSearchResult] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

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
      setTicketNo(res.data.ticketNo); // 👈 only for modal, not for search input
      setIsModalOpen(true);
    } catch (err) {
      alert('Submission failed');
    }
  };

  const handleSearch = async () => {
    if (!searchTicketNo) return;
    try {
      const res = await axios.get(`http://localhost:5000/api/grievance/search/${searchTicketNo}`);
      setSearchResult(res.data);
      setIsSearchModalOpen(true);
    } catch (err) {
      // alert('Ticket not found');
      setSearchResult(null);
      setIsSearchModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsSearchModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="bg-blue-600 text-white flex justify-between px-6 py-3 shadow">
        <h1 className="text-xl font-bold">Grievance Portal</h1>
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search Ticket No"
            value={searchTicketNo}
            onChange={(e) => setSearchTicketNo(e.target.value)}
            className="p-1 rounded text-black"
          />
          <button
            onClick={handleSearch}
            className="bg-white text-blue-600 px-3 py-1 rounded"
          >
            Search
          </button>
          <button onClick={() => window.location.href = '/login'}
              className="bg-white text-blue-600 px-3 py-1 rounded">Login</button>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-semibold mb-4">Submit a Grievance</h2>
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
      </div>

      {/* Modal for Ticket Number */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Grievance Submitted Successfully!</h2>
            <p className="mb-4">Your ticket number is: <strong>{ticketNo}</strong></p>
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Modal for Search Result */}
      {isSearchModalOpen && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-1/3">
            <h2 className="text-2xl font-semibold mb-4">Search Result</h2>
            {searchResult ? (
              <>
                <p><strong>Ticket No:</strong> {searchResult.ticketNo}</p>
                <p><strong>Department:</strong> {searchResult.department?.name || 'N/A'}</p>
                <p><strong>Title:</strong> {searchResult.title}</p>
                <p><strong>Description:</strong> {searchResult.description}</p>
                <p><strong>Status:</strong> {searchResult.status}</p>
              </>
            ) : (
              <p>No grievance found with that ticket number.</p>
            )}
            <button
              onClick={closeModal}
              className="bg-blue-600 text-white px-4 py-2 rounded mt-4"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
