import React, { useState, useEffect } from 'react';
import Card from '../components/Card';
import '../styles/Inventory.css';

function displayValue(value) {
  if (!value || value === 'N/A') return 'Not available';
  return value;
}

export default function Inventory() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');
  const [responseMsg, setResponseMsg] = useState('');
  const [showDialog, setShowDialog] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://localhost:3000/api/invenmgm/products/getAllProducts', {
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setProducts(data.products);
      } else {
        setProducts([]);
      }
    } catch {
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = (productId) => {
    setDeleteId(productId);
    setShowDialog(true);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    try {
      const res = await fetch(`http://localhost:3000/api/invenmgm/products/deleteProduct/${deleteId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      const data = await res.json();
      if (data.status === 'success') {
        setProducts((prev) => prev.filter((p) => p._id !== deleteId));
      } else {
        alert(data.message || 'Failed to delete product.');
      }
    } catch {
      alert('Server error while deleting.');
    }
    setShowDialog(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowDialog(false);
    setDeleteId(null);
  };

  // Only LLMChat is used for quick actions
  const handleQuerySubmit = async (e) => {
    e.preventDefault();
    setResponseMsg('');
    if (!query.trim()) return;
    try {
      const res = await fetch('http://localhost:3000/api/invenmgm/products/LLMChat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      setResponseMsg(data.message || 'Query processed');
      fetchProducts();
    } catch {
      setResponseMsg('Server error');
    }
  };

  return (
    <main className="inventory-main">
      <div className="inventory-header">Inventory</div>
      {loading ? (
        <p>Loading products...</p>
      ) : products.length === 0 ? (
        <div className="inventory-empty">No products available</div>
      ) : (
        products.map((product) => (
          <Card
            key={product._id}
            title={displayValue(product.name)}
            subtitle={displayValue(product.category) || 'Uncategorized'}
            onDelete={() => handleDelete(product._id)}
          >
            <p>Color: {displayValue(product.color)}</p>
            <p>Size: {displayValue(product.size)}</p>
            <div className="product-quantity">{product.quantity} pcs</div>
          </Card>
        ))
      )}

      <section className="query-section">
        <div className="query-title">Quick Actions</div>
        <form onSubmit={handleQuerySubmit} className="query-form">
          <input
            type="text"
            placeholder="E.g. Add 20 Blue Jeans"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
        </form>
        {responseMsg && <div className="query-response">{responseMsg}</div>}
      </section>

      {showDialog && (
        <div className="dialog-overlay">
          <div className="dialog-box">
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete this product? This action cannot be undone.</p>
            <div className="dialog-actions">
              <button onClick={confirmDelete}>Yes, Delete</button>
              <button onClick={cancelDelete}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}