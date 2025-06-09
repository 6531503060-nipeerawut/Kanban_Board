import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "User"
  });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    setMessage("");
    try {
      await axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/auth/register`, formData);
      setMessage("Registered successfully!");
      setTimeout(() => navigate("/api/auth/login"), 1000);
    } catch (err) {
      setMessage(err.response?.data?.message || "Registration failed");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 bg-white p-8 rounded-xl shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
      {message && <p className="text-sm text-center mb-4 text-blue-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          value={formData.name}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          value={formData.email}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          value={formData.password}
          className="w-full px-4 py-2 border rounded-md"
          required
        />
        <select
          name="role"
          onChange={handleChange}
          value={formData.role}
          className="w-full px-4 py-2 border rounded-md"
        >
          <option value="admin">Admin</option>
          <option value="User">User</option>
          <option value="Collaborator">Collaborator</option>
          <option value="Manager">Manager</option>
          <option value="Viewer">Viewer</option>
        </select>
        <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700">
          Register
        </button>
      </form>
    </div>
  );
}