const {
  createClinician,
  getAllClinicians,
} = require("../models/clinician.model");

function create(req, res) {
  try {
    const { name } = req.body;

    if (!name || typeof name !== "string" || !name.trim()) {
      return res.status(400).json({
        success: false,
        error: "Clinician name is required",
      });
    }

    const clinician = createClinician(name.trim());

    return res.status(201).json({
      success: true,
      data: clinician,
    });
  } catch (error) {
    console.error("Error creating clinician:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to create clinician",
    });
  }
}

function getAll(req, res) {
  try {
    const clinicians = getAllClinicians();

    return res.status(200).json({
      success: true,
      data: clinicians,
    });
  } catch (error) {
    console.error("Error fetching clinicians:", error);

    return res.status(500).json({
      success: false,
      error: "Failed to fetch clinicians",
    });
  }
}

module.exports = {
  create,
  getAll,
};