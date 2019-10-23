const express = require("express");
const router = express.Router();
const passport = require("passport");
const db = require("../../config/database/database");

//POST /api/
//login handle
router.post("/login", (req, res, next) => {
  passport.authenticate("local", {
    successRedirect: "/profile",
    failureRedirect: "/failurelogin",
    successMessage: "logged in Pog",
    failureMessage: "failed to login pepehands"
  })(req, res, next);
});

//GET /api/
//get user by id only for testing
router.get(
  "/users/:id",
  passport.authenticate("local", { session: false }),
  (req, res) => {
    db.query("SELECT id, username FROM users WHERE id = ?", [
      req.params.id
    ]).then(results => {
      res.json(results);
    });
  }
);

module.exports = router;
