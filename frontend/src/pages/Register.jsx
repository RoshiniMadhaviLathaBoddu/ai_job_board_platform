import { useState } from "react";
import API from "../services/api";

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post("/users/register", form);
      alert("Registration successful! Please login.");
    } catch (err) {
      alert(err.response?.data?.error || "Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <input type="text" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
        placeholder="Name" className="w-full p-2 mb-4 border rounded" />
      <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
        placeholder="Email" className="w-full p-2 mb-4 border rounded" />
      <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
        placeholder="Password" className="w-full p-2 mb-4 border rounded" />
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">Register</button>
    </form>
  );
}
export default Register;

