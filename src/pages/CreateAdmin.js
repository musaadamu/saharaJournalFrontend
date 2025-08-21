import React, { useState } from 'react';
import axios from 'axios';

const CreateAdmin = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess('');
    setError('');
    try {
      // Send JWT token in Authorization header
      const token = localStorage.getItem('authToken') || localStorage.getItem('token');
      const res = await axios.post(
        'https://saharabackend-v190.onrender.com/api/auth/create-admin',
        { ...form, role: 'admin' },
        token ? { headers: { Authorization: `Bearer ${token}` } } : undefined
      );
      setSuccess('Admin created successfully!');
      setForm({ name: '', email: '', password: '' });
    } catch (err) {
      setError(
        err.response?.data?.message || 'Failed to create admin. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-admin-container">
      <h2>Create Admin Account</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={form.password}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create Admin'}
        </button>
      </form>
      {success && <p style={{ color: 'green' }}>{success}</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default CreateAdmin;
