import { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ refresh }) {
  const [leads, setLeads] = useState([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [notesData, setNotesData] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const res = await axios.get("http://localhost:5000/api/leads");
      setLeads(res.data);
    } catch (err) {
      console.error("Error fetching leads:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeads();
  }, [refresh]);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, { status });
      fetchLeads();
    } catch (err) {
      console.error("Error updating status:", err);
    }
  };
  
  const updateNotes = async (id, notes) => {
    try {
      await axios.put(`http://localhost:5000/api/leads/${id}`, { notes });
      fetchLeads();
    } catch (err) {
      console.error("Error updating notes:", err);
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'new': return '🆕';
      case 'contacted': return '📞';
      case 'converted': return '✅';
      default: return '📌';
    }
  };

  const filteredLeads = leads
    .filter((lead) => {
      return (
        lead.name.toLowerCase().includes(search.toLowerCase()) ||
        lead.email.toLowerCase().includes(search.toLowerCase())
      );
    })
    .filter((lead) => {
      return statusFilter === "" || lead.status === statusFilter;
    });

  return (
    <div>
      {/* 🔍 Search + Filter */}
      <div className="filters">
        <input
          type="text"
          placeholder="🔍 Search by name or email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
          <option value="">📊 All Statuses</option>
          <option value="new">🆕 New</option>
          <option value="contacted">📞 Contacted</option>
          <option value="converted">✅ Converted</option>
        </select>
      </div>

      {/* Stats */}
      <div style={{
        display: "flex",
        gap: "15px",
        justifyContent: "center",
        marginBottom: "20px",
        flexWrap: "wrap"
      }}>
        <div style={{
          background: "rgba(255,255,255,0.9)",
          padding: "15px 25px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <strong style={{ color: "#001f3f" }}>Total Leads:</strong> <span style={{ color: "#17a2b8", fontSize: "18px" }}>{leads.length}</span>
        </div>
        <div style={{
          background: "rgba(255,255,255,0.9)",
          padding: "15px 25px",
          borderRadius: "10px",
          boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
        }}>
          <strong style={{ color: "#001f3f" }}>Converted:</strong> <span style={{ color: "#4caf50", fontSize: "18px" }}>{leads.filter(l => l.status === 'converted').length}</span>
        </div>
      </div>

      {/* Dashboard Grid */}
      {loading ? (
        <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
          <p style={{ fontSize: "18px" }}>⏳ Loading leads...</p>
        </div>
      ) : filteredLeads.length === 0 ? (
        <div style={{ textAlign: "center", padding: "40px", color: "white" }}>
          <p style={{ fontSize: "18px" }}>📭 No leads found</p>
        </div>
      ) : (
        <div className="dashboard">
          {filteredLeads.map((lead) => (
            <div className="card" key={lead._id}>
              <div style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "15px",
                paddingBottom: "10px",
                borderBottom: "2px solid #f0f0f0"
              }}>
                <h3 style={{ margin: 0, color: "#001f3f", fontSize: "18px" }}>{lead.name}</h3>
                <span style={{ fontSize: "24px" }}>{getStatusIcon(lead.status)}</span>
              </div>

              <div style={{ textAlign: "left", marginBottom: "12px" }}>
                <p style={{ margin: "8px 0" }}>
                  <strong style={{ color: "#001f3f" }}>📧 Email:</strong>
                  <br />
                  <a href={`mailto:${lead.email}`} style={{ color: "#17a2b8", textDecoration: "none" }}>
                    {lead.email}
                  </a>
                </p>
                <p style={{ margin: "8px 0" }}>
                  <strong style={{ color: "#001f3f" }}>🌐 Source:</strong> {lead.source}
                </p>
                <p style={{ margin: "8px 0" }}>
                  <strong style={{ color: "#001f3f" }}>📌 Status:</strong>
                  <span className={`status-badge ${lead.status}`} style={{
                    marginLeft: "8px",
                    padding: "4px 10px",
                    borderRadius: "6px",
                    fontSize: "12px",
                    fontWeight: "600",
                    backgroundColor: lead.status === 'new' ? '#e3f2fd' : lead.status === 'contacted' ? '#fff3e0' : '#e8f5e9',
                    color: lead.status === 'new' ? '#00bcd4' : lead.status === 'contacted' ? '#ff9800' : '#4caf50'
                  }}>
                    {lead.status.toUpperCase()}
                  </span>
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px", marginBottom: "12px", flexWrap: "wrap" }}>
                <button 
                  onClick={() => updateStatus(lead._id, "contacted")}
                  style={{ flex: 1, minWidth: "100px", fontSize: "12px" }}
                >
                  📞 Contacted
                </button>
                <button
                  onClick={() => updateStatus(lead._id, "converted")}
                  style={{ flex: 1, minWidth: "100px", fontSize: "12px" }}
                >
                  ✅ Converted
                </button>
              </div>

              {/* 📝 Notes */}
              <textarea
                placeholder="💭 Add or edit notes..."
                value={notesData[lead._id] ?? lead.notes ?? ""}
                onChange={(e) =>
                  setNotesData({
                    ...notesData,
                    [lead._id]: e.target.value
                  })
                }
                style={{ fontSize: "13px" }}
              />

              <button 
                onClick={() => updateNotes(lead._id, notesData[lead._id])}
                style={{ marginTop: "8px" }}
              >
                💾 Save Notes
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;