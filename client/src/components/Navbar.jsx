import React, { useEffect, useState } from 'react';
import './Navbar.css';

export default function Navbar() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) return savedTheme;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return prefersDark ? 'dark' : 'light';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'light' ? 'dark' : 'light'));
  };

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:3000/api/invenmgm/users/logout', {
        method: 'POST',
        credentials: 'include',
      });
      window.location.href = '/login';
    } catch {
      alert('Logout failed');
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar__brand">Arft</div>
      <div className="navbar__links">
        <a href="/" className="navbar__link">Home</a>
        <a href="/inventory" className="navbar__link">Inventory</a>
        <a href="/profile" className="navbar__link">Profile</a>
        <button className="navbar__link navbar__logout" onClick={handleLogout}>
          Logout
        </button>
        <label className="theme-switch">
          <input
            type="checkbox"
            onChange={toggleTheme}
            checked={theme === 'dark'}
          />
          <span className="slider"></span>
        </label>
      </div>
    </nav>
  );
}
