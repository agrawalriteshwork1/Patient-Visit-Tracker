const db = require("./database");

function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS clinicians (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS patients (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS visits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      clinician_id INTEGER NOT NULL,
      patient_id INTEGER NOT NULL,
      visited_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      notes TEXT,

      FOREIGN KEY (clinician_id)
        REFERENCES clinicians(id)
        ON DELETE RESTRICT,

      FOREIGN KEY (patient_id)
        REFERENCES patients(id)
        ON DELETE RESTRICT
    );
  `);

  console.log("Database initialized successfully");
}

module.exports = initializeDatabase;