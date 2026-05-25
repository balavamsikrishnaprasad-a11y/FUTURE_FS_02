const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

// ROUTES
const leadRoutes = require("./routes/leadRoutes");
app.use("/api/leads", leadRoutes);

// SERVER
app.listen(process.env.PORT, () => {
  console.log(`🌊 Server running on port ${process.env.PORT}`);
});