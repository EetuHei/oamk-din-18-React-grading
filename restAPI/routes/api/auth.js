const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../../config/database/database");

// POST /api/
// login handle
router.post("/login", passport.authenticate("local"), (req, res, next) => {
  res.status(200).json({success: true})
})

//GET /api/
//get profile page
router.get(
  "/profile",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    db.query("SELECT id, username, history FROM users WHERE username = ?", [
      req.body.username
    ]).then(results => {
      res.json(results);
    });
  }
);

module.exports = router;
