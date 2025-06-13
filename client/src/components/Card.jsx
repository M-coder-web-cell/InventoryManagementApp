import React from 'react';
import './Card.css';

export default function Card({ title, subtitle, children, onDelete }) {
  return (
    <div className="card">
      <div className="card-main">
        <div className="card-info">
          <h2 className="card-title">{title}</h2>
          <h4 className="card-subtitle">{subtitle}</h4>
          <div className="card-content">{children}</div>
        </div>
        <button className="card-delete-btn" onClick={onDelete} title="Delete">
          <svg width="22" height="22" viewBox="0 0 20 20" fill="none">
            <path d="M6 8V15M10 8V15M14 8V15M3 5H17M8 5V3H12V5" stroke="#e74c3c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}