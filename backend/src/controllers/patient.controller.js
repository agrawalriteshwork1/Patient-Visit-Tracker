const {
  createPatient,
  getAllPatients,
} = require("../models/patient.model");

function create(req, res) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Patient name is required",
      });
    }

    const patient = createPatient(name.trim());

    return res.status(201).json({
      success: true,
      data: patient,
    });
  } catch (error) {
    console.error("Error creating patient:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create patient",
    });
  }
}

function getAll(req, res) {
  try {
    const patients = getAllPatients();

    return res.status(200).json({
      success: true,
      data: patients,
    });
  } catch (error) {
    console.error("Error fetching patients:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch patients",
    });
  }
}

module.exports = {
  create,
  getAll,
};