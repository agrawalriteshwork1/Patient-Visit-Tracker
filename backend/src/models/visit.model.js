const db = require("../config/database");

function createVisit({ clinicianId, patientId, visitedAt, notes }) {
  const statement = db.prepare(`
    INSERT INTO visits (
      clinician_id,
      patient_id,
      visited_at,
      notes
    )
    VALUES (?, ?, COALESCE(?, CURRENT_TIMESTAMP), ?)
  `);

  const result = statement.run(
    clinicianId,
    patientId,
    visitedAt || null,
    notes || null
  );

  return getVisitById(result.lastInsertRowid);
}

function getAllVisits() {
  const statement = db.prepare(`
    SELECT
      visits.id,
      visits.clinician_id,
      clinicians.name AS clinician_name,
      visits.patient_id,
      patients.name AS patient_name,
      visits.visited_at,
      visits.notes
    FROM visits
    INNER JOIN clinicians
      ON visits.clinician_id = clinicians.id
    INNER JOIN patients
      ON visits.patient_id = patients.id
    ORDER BY visits.visited_at DESC
  `);

  return statement.all();
}

function getVisitById(id) {
  const statement = db.prepare(`
    SELECT
      visits.id,
      visits.clinician_id,
      clinicians.name AS clinician_name,
      visits.patient_id,
      patients.name AS patient_name,
      visits.visited_at,
      visits.notes
    FROM visits
    INNER JOIN clinicians
      ON visits.clinician_id = clinicians.id
    INNER JOIN patients
      ON visits.patient_id = patients.id
    WHERE visits.id = ?
  `);

  return statement.get(id);
}

function clinicianExists(id) {
  const statement = db.prepare(`
    SELECT id
    FROM clinicians
    WHERE id = ?
  `);

  return Boolean(statement.get(id));
}

function patientExists(id) {
  const statement = db.prepare(`
    SELECT id
    FROM patients
    WHERE id = ?
  `);

  return Boolean(statement.get(id));
}

module.exports = {
  createVisit,
  getAllVisits,
  getVisitById,
  clinicianExists,
  patientExists,
};