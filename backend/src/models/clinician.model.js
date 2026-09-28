const db = require("../config/database");

function createClinician(name) {
  const statement = db.prepare(`
    INSERT INTO clinicians (name)
    VALUES (?)
  `);

  const result = statement.run(name);

  return getClinicianById(result.lastInsertRowid);
}

function getAllClinicians() {
  const statement = db.prepare(`
    SELECT id, name, created_at
    FROM clinicians
    ORDER BY name ASC
  `);

  return statement.all();
}

function getClinicianById(id) {
  const statement = db.prepare(`
    SELECT id, name, created_at
    FROM clinicians
    WHERE id = ?
  `);

  return statement.get(id);
}

module.exports = {
  createClinician,
  getAllClinicians,
  getClinicianById,
};