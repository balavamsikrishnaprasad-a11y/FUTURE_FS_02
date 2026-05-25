const express = require("express");
const router = express.Router();
const db = require("../db");

// CREATE LEAD
router.post("/add", (req, res) => {
  try {
    const { name, email, source } = req.body;
    
    // Validation
    if (!name || !email) {
      return res.status(400).json({ error: "Name and email are required" });
    }
    
    const query = `INSERT INTO leads (name, email, source, status, notes) VALUES (?, ?, ?, 'new', '')`;
    const params = [name, email, source || ""];
    
    db.run(query, params, function(err) {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Database error: " + err.message });
      }
      
      const newLead = {
        id: this.lastID,
        name,
        email,
        source: source || "",
        status: "new",
        notes: "",
        createdAt: new Date().toISOString()
      };
      
      console.log("✅ Lead created:", newLead);
      res.status(201).json(newLead);
    });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// GET ALL LEADS
router.get("/", (req, res) => {
  try {
    const query = `SELECT * FROM leads ORDER BY createdAt DESC`;
    
    db.all(query, (err, rows) => {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Failed to fetch leads" });
      }
      
      console.log("✅ Fetched " + (rows ? rows.length : 0) + " leads");
      res.json(rows || []);
    });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// UPDATE LEAD
router.put("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;
    
    if (!status && notes === undefined) {
      return res.status(400).json({ error: "At least one field (status or notes) is required" });
    }
    
    let query = "UPDATE leads SET";
    const params = [];
    
    if (status) {
      query += " status = ?";
      params.push(status);
    }
    
    if (notes !== undefined) {
      if (status) {
        query += ", notes = ?";
      } else {
        query += " notes = ?";
      }
      params.push(notes);
    }
    
    query += " WHERE id = ?";
    params.push(id);
    
    db.run(query, params, function(err) {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Failed to update lead" });
      }
      
      // Fetch and return updated lead
      db.get(`SELECT * FROM leads WHERE id = ?`, [id], (err, row) => {
        if (err) {
          console.error("❌ Database error:", err.message);
          return res.status(500).json({ error: "Failed to fetch updated lead" });
        }
        
        console.log("✅ Lead updated:", row);
        res.json(row);
      });
    });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

// DELETE LEAD
router.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const query = `DELETE FROM leads WHERE id = ?`;
    
    db.run(query, [id], function(err) {
      if (err) {
        console.error("❌ Database error:", err.message);
        return res.status(500).json({ error: "Failed to delete lead" });
      }
      
      console.log("✅ Lead deleted with id:", id);
      res.json({ message: "Lead deleted successfully", id });
    });
  } catch (error) {
    console.error("❌ Server error:", error.message);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;