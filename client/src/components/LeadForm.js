import { useState } from "react";
import axios from "axios";

function LeadForm({ setRefresh }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    source: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Validation
    if (!form.name || !form.email || !form.source) {
      setMessage("❌ Please fill in all fields");
      setLoading(false);
      return;
    }

    try {
      await axios.post("http://localhost:5000/api/leads/add", form);
      setMessage("✅ Lead added successfully!");
      setForm({ name: "", email: "", source: "" });
      setRefresh(prev => !prev);
      
      // Clear message after 3 seconds
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setMessage("❌ Error adding lead. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="lead-form">
      <div style={{ textAlign: "center", marginBottom: "20px" }}>
        <h3 style={{ margin: "0 0 5px 0", color: "#001f3f" }}>Lead Information</h3>
        <p style={{ margin: 0, fontSize: "12px", color: "#666" }}>Add a new prospect to track</p>
      </div>

      {message && (
        <div style={{
          padding: "12px",
          marginBottom: "15px",
          borderRadius: "8px",
          fontSize: "14px",
          backgroundColor: message.includes("✅") ? "#e8f5e9" : "#ffebee",
          color: message.includes("✅") ? "#2e7d32" : "#c62828",
          border: `1px solid ${message.includes("✅") ? "#4caf50" : "#ff5252"}`
        }}>
          {message}
        </div>
      )}

      <div className="form-group">
        <label htmlFor="name">Full Name *</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="John Doe"
          value={form.name}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="email">Email Address *</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="john@example.com"
          value={form.email}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <div className="form-group">
        <label htmlFor="source">Lead Source *</label>
        <input
          id="source"
          name="source"
          type="text"
          placeholder="Website, Referral, Social Media..."
          value={form.source}
          onChange={handleChange}
          disabled={loading}
        />
      </div>

      <button type="submit" disabled={loading} className="submit-button">
        {loading ? "⏳ Submitting..." : "✨ Add Lead"}
      </button>
    </form>
  );
}

export default LeadForm;