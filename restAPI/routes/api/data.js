const express = require("express");
const router = express.Router();

const db = require("../../config/database/database");

//GET /api/
//marker data
router.get("/markers", (req, res) => {
  db.query("SELECT * FROM markers").then(results => {
    res.json(results);
  });
});

module.exports = router;
