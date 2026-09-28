const db = require("../config/database");

function createPatient(name) {
  const statement = db.prepare(`
    INSERT INTO patients (name)
    VALUES (?)
  `);

  const result = statement.run(name);

  return getPatientById(result.lastInsertRowid);
}

function getAllPatients() {
  const statement = db.prepare(`
    SELECT id, name, created_at
    FROM patients
    ORDER BY name ASC
  `);

  return statement.all();
}

function getPatientById(id) {
  const statement = db.prepare(`
    SELECT id, name, created_at
    FROM patients
    WHERE id = ?
  `);

  return statement.get(id);
}

module.exports = {
  createPatient,
  getAllPatients,
  getPatientById,
};