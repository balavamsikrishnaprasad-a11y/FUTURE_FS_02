const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const dbFile = process.env.DB_FILE || "./leads.db";

// Create database connection with serialization
const db = new sqlite3.Database(dbFile, (err) => {
  if (err) {
    console.error("❌ Error opening database:", err.message);
    process.exit(1);
  } else {
    console.log("✅ SQLite Database Connected");
    initializeDatabase();
  }
});

// Enable foreign keys and serialize
db.serialize();
db.configure("busyTimeout", 30000);

function initializeDatabase() {
  db.run(
    `CREATE TABLE IF NOT EXISTS leads (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      source TEXT,
      status TEXT DEFAULT 'new',
      notes TEXT,
      createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
    )`,
    (err) => {
      if (err) {
        console.error("❌ Error creating table:", err.message);
      } else {
        console.log("📊 Leads table ready");
      }
    }
  );
}

module.exports = db;
