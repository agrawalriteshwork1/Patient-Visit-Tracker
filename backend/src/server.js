require("dotenv").config();

const app = require("./app");
const initializeDatabase = require("./config/initializeDatabase");

const PORT = process.env.PORT || 5000;

// Initialize database tables before starting the server
initializeDatabase();

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});