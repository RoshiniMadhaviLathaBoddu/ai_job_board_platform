import { useState, useEffect } from "react";
import { createJob, getAllJobs, updateJob, deleteJob } from "../services/jobService";

function Dashboard() {
  const [jobs, setJobs] = useState([]);
  const [form, setForm] = useState({ title: "", description: "", company: "", location: "", salary: "" });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    const data = await getAllJobs();
    setJobs(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editId) {
        await updateJob(editId, form);
        setEditId(null);
      } else {
        await createJob(form);
      }
      setForm({ title: "", description: "", company: "", location: "", salary: "" });
      fetchJobs();
    } catch (err) {
      alert(err.response?.data?.error || "Error occurred");
    }
  };

  const handleEdit = (job) => {
    setForm(job);
    setEditId(job._id);
  };

  const handleDelete = async (id) => {
    await deleteJob(id);
    fetchJobs();
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Dashboard - Manage Jobs</h2>
      <form onSubmit={handleSubmit} className="mb-4">
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title" className="w-full p-2 mb-2 border rounded" />
        <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
          placeholder="Description" className="w-full p-2 mb-2 border rounded" />
        <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })}
          placeholder="Company" className="w-full p-2 mb-2 border rounded" />
        <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
          placeholder="Location" className="w-full p-2 mb-2 border rounded" />
        <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
          placeholder="Salary" className="w-full p-2 mb-2 border rounded" />
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          {editId ? "Update" : "Create"} Job
        </button>
      </form>

      {jobs.map((job) => (
        <div key={job._id} className="border p-4 mb-2 rounded">
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p>{job.description}</p>
          <button onClick={() => handleEdit(job)} className="mr-2 bg-yellow-500 text-white px-2 py-1 rounded">Edit</button>
          <button onClick={() => handleDelete(job._id)} className="bg-red-600 text-white px-2 py-1 rounded">Delete</button>
        </div>
      ))}
    </div>
  );
}
export default Dashboard;

