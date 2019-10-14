const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");

//database config
const db = require("../../config/database/database")

//load models
// const users = require("../models/users");

//POST /api/
//Signup route
router.post("/signup", (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();

 //need to make check if username already exists

  if (
    typeof username === "string" &&
    username.length > 3 &&
    typeof password === "string" &&
    password.length > 6
  ) {
    bcrypt.genSalt(8, (err, salt) => {
      bcrypt.hash(password, salt).then(hash =>
        db
          .query("INSERT INTO users (username, password) VALUES (?,?)", [
            username,
            hash
          ])
          .then(dbResults => {
            console.log(dbResults);
            res.sendStatus(201);
          })
          .catch(e => res.sendStatus(500))
      );
    });
  } else {
    console.log(
      "Incorrect username or password. Username hast to be more than 3 characters long nad password more than 6 characters long"
    );
    res.sendStatus(400);
  }
});

//GET /api/
//Get route


module.exports = router;