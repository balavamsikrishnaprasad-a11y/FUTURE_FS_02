import { useState } from "react";
import LeadForm from "./components/LeadForm";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import "./App.css";

function App() {
  const [refresh, setRefresh] = useState(false);

  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );

  if (!isLoggedIn) {
    return <Login setIsLoggedIn={setIsLoggedIn} />;
  }

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
  };

  return (
    <div className="App">
      <div className="container">
        {/* Header */}
        <div className="header">
          <div className="header-content">
            <h1>🌊 Ocean CRM Dashboard</h1>
            <p className="header-subtitle">Manage Your Leads Efficiently</p>
          </div>

          <button
            className="logout-btn"
            onClick={handleLogout}
            title="Sign out of your account"
          >
            🚪 Logout
          </button>
        </div>

        {/* Add Lead Section */}
        <div className="section">
          <h2 style={{ marginTop: 0 }}>➕ Add New Lead</h2>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <LeadForm setRefresh={setRefresh} />
          </div>
        </div>

        <hr />

        {/* Dashboard Section */}
        <div className="section">
          <h2>📊 Leads Dashboard</h2>
          <Dashboard refresh={refresh} />
        </div>
      </div>
    </div>
  );
}

export default App;