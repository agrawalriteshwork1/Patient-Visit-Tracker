const express = require("express");
const cors = require("cors");

const clinicianRoutes = require("./routes/clinician.routes");
const patientRoutes = require("./routes/patient.routes");
const visitRoutes = require("./routes/visit.routes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/clinicians", clinicianRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/visits", visitRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Patient Visit Tracker API is running",
  });
});

module.exports = app;