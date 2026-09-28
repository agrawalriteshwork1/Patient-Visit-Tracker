const {
  createVisit,
  getAllVisits,
  clinicianExists,
  patientExists,
} = require("../models/visit.model");

function create(req, res) {
  try {
    const {
      clinicianId,
      patientId,
      visitedAt,
      notes,
    } = req.body;

    if (!clinicianId) {
      return res.status(400).json({
        success: false,
        error: "Clinician is required",
      });
    }

    if (!patientId) {
      return res.status(400).json({
        success: false,
        error: "Patient is required",
      });
    }

    if (!clinicianExists(clinicianId)) {
      return res.status(400).json({
        success: false,
        error: "Clinician not found",
      });
    }

    if (!patientExists(patientId)) {
      return res.status(400).json({
        success: false,
        error: "Patient not found",
      });
    }

    const visit = createVisit({
      clinicianId,
      patientId,
      visitedAt,
      notes: notes?.trim() || null,
    });

    return res.status(201).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    console.error("Error creating visit:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create visit",
    });
  }
}

function getAll(req, res) {
  try {
    const visits = getAllVisits();

    return res.status(200).json({
      success: true,
      data: visits,
    });
  } catch (error) {
    console.error("Error fetching visits:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch visits",
    });
  }
}

module.exports = {
  create,
  getAll,
};