import React, { useState, useEffect } from "react";
import "../styles/Dashboard.css";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Label,
  Bar
} from "recharts";

const rateLimitData = [
  { name: "2 days ago", usage: 2, upperlimit: 8 },
  { name: "Yesterday", usage: 5, upperlimit: 8 },
  { name: "Today", usage: 6, upperlimit: 8 }
];

const CustomBarTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="custom-tooltip">
        <p className="label" style={{ color: "#1a1a2e", fontWeight: 600 }}>{label}</p>
        {payload.map((entry, index) => (
          <p
            key={`item-${index}`}
            className="desc"
            style={{ color: entry.color, margin: 0 }}
          >
            {entry.name}: {entry.value}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

export default function Dashboard() {
  const [products, setProducts] = useState([]);
  const [user, setUser] = useState({ name: "", tier: "" });

  useEffect(() => {
    fetch("http://localhost:3000/api/invenmgm/products/getAllProducts", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        const all = data.products || [];
        setProducts(all.slice(0, 5));
      })
      .catch(err => console.error("Failed to fetch products", err));
  }, []);

  useEffect(() => {
    fetch("http://localhost:3000/api/invenmgm/users/me", {
      credentials: "include"
    })
      .then(res => res.json())
      .then(data => {
        setUser({
          name: data?.name || "User",
          tier: data?.role || "FREE"
        });
      })
      .catch(() => setUser({ name: "User", tier: "FREE" }));
  }, []);

  const colors = ["#1e90ff", "#82ca9d", "#ffb347", "#ff6961", "#a084e8"];

  const barKeys = products.length
    ? Object.keys(products[0]).filter(
        key => key !== "name" && typeof products[0][key] === "number"
      )
    : ["quantity"];

  const barData = products.map(p => ({
    name: p.name,
    ...barKeys.reduce((acc, key) => ({ ...acc, [key]: p[key] }), {})
  }));

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">User Dashboard</h1>
      <div className="charts-row">
        <div className="user-info-container">
          <h3 className="user-info-title">User Info</h3>
          <div className="user-info-content">
            <div><span className="user-info-label">Name:</span> {user.name}</div>
            <div><span className="user-info-label">Tier:</span> {user.tier}</div>
          </div>
        </div>
        <div className="line-graph-container">
          <h3 className="line-graph-title">AI Rate Limit Usage</h3>
          <LineChart
            width={450}
            height={300}
            data={rateLimitData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="usage" stroke="#8884d8" />
            <Line type="monotone" dataKey="upperlimit" stroke="#82ca9d" />
          </LineChart>
        </div>
        <div className="products-bar-graph-container">
          <h3 className="bar-graph-title">Some of your products</h3>
          <BarChart
            width={600}
            height={330}
            data={barData}
            margin={{ top: 10, right: 30, left: 20, bottom: 40 }}
            barCategoryGap={20}
            barGap={2}
          >
            <CartesianGrid strokeDasharray="2 2" />
            <XAxis
              dataKey="name"
              height={60}
              tick={{ fontSize: 12, fill: "#FFFFFF" }}
            >
              <Label value="Products" position="insideBottom" offset={-5} />
            </XAxis>
            <YAxis tick={{ fontSize: 16, fill: "#FFFFFF" }} />
            <Tooltip content={<CustomBarTooltip />} />
            {barKeys.map((key, idx) => (
              <Bar
                key={key}
                dataKey={key}
                barSize={30}
                fill={colors[idx % colors.length]}
                name={key}
              />
            ))}
          </BarChart>
        </div>
      </div>
    </div>
  );
}