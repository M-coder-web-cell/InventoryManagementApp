import React, { useState } from 'react';
import '../styles/signup.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if(formData.password !== formData.passwordConfirm) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await fetch('http://127.0.0.1:3000/api/invenmgm/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.status === 'success') {
        // Redirect or do something after signup success
        window.location.href = '/inventory';
      } else {
        setError(data.message || 'Signup failed');
      }
    } catch{
      setError('Server error');
    }
  };

  return (
    <div className="signup-container">
      <h2>Create Account</h2>
      {error && <div className="signup-error">{error}</div>}
      <form className="signup-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="passwordConfirm"
          placeholder="Confirm Password"
          value={formData.passwordConfirm}
          onChange={handleChange}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      <div className="signup-footer">
        Already have an account? <a href="/login">Log in</a>
      </div>
    </div>
  );
}
