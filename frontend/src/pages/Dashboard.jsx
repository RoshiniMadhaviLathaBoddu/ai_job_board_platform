import { useEffect, useState } from "react";
import API from "../services/api";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", location: "" });

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleCreateJob = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', form);
      alert('Job created successfully!');
      setForm({ title: "", description: "", location: "" });
      fetchJobs();  // Refresh job list
    } catch (err) {
      console.error(err);
      alert('Failed to create job');
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard</h2>

      {/* Job Creation Form */}
      <form onSubmit={handleCreateJob} className="max-w-md mb-8">
        <h3 className="text-xl font-bold mb-2">Create New Job</h3>
        <input
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description"
          className="w-full p-2 mb-2 border rounded"
        />
        <input
          value={form.location}
          onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Location"
          className="w-full p-2 mb-2 border rounded"
        />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Job
        </button>
      </form>

      {/* Job Listings */}
      <h3 className="text-xl font-bold mb-2">Job Listings</h3>
      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-2 rounded">
          <h4 className="text-lg font-bold">{job.title}</h4>
          <p>{job.description}</p>
          <p><strong>Location:</strong> {job.location}</p>
        </div>
      ))}
    </div>
  );
}

export default Dashboard;
