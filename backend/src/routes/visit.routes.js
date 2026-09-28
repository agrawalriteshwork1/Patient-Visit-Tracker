const express = require("express");

const visitController = require("../controllers/visit.controller");

const router = express.Router();

router.get("/", visitController.getAll);
router.post("/", visitController.create);

module.exports = router;