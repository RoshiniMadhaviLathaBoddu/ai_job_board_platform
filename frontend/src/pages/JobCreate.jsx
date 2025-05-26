import { useState } from "react";
import API from "../services/api";

function JobCreate() {
  const [form, setForm] = useState({ title: "", description: "", location: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/jobs', form);
      alert('Job created successfully');
      setForm({ title: "", description: "", location: "" });
    } catch (err) {
      console.error(err);
      alert('Failed to create job');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Create Job</h2>
      <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
        placeholder="Title" className="w-full p-2 mb-4 border rounded" />
      <input value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
        placeholder="Description" className="w-full p-2 mb-4 border rounded" />
      <input value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })}
        placeholder="Location" className="w-full p-2 mb-4 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Create Job</button>
    </form>
  );
}

export default JobCreate;
