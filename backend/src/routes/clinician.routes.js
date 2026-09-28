const express = require("express");

const clinicianController = require("../controllers/clinician.controller");

const router = express.Router();

router.get("/", clinicianController.getAll);
router.post("/", clinicianController.create);

module.exports = router;