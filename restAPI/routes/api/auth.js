const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../../config/database/database");

//POST /api/
//login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/login",
    successMessage: "Logged in!",
    failureMessage: "Failed to login"
  })(req, res, next);
});

//GET /api/
//get profile page
router.get(
  "/profile",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    db.query("SELECT id, username FROM users WHERE username = ?", [
      req.body.username
    ]).then(results => {
      res.json(results);
    });
  }
);

module.exports = router;
