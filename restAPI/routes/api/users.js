const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");

//database config
const db = require("../../config/database/database");

//POST /api/
//Signup route
router.post("/signup", (req, res) => {
  let username = req.body.username.trim();
  let password = req.body.password.trim();
  let passwordConfirm = req.body.passwordConfirm.trim();

  //username has to be 3 or longer
  //password has to be 6 or longer
  if (
    typeof username === "string" &&
    username.length >= 3 &&
    typeof password === "string" &&
    password.length >= 6 &&
    password === passwordConfirm
  ) {
    //Finds user by inputted username
    db.query("SELECT * FROM users WHERE username = ?", [username], function(
      err,
      results
    ) {
      if (err) {
        console.log(err);
        throw err;
      }
      //if the username is found, tells the user that the username is taken
      if (results.length !== 0) {
        res.status(400).json({username: "Username is taken!"});
      } else {
        //if username is not taken, hashes password with bcrypt
        //and saves username and hashed password to database
        bcrypt.genSalt(8, (err, salt) => {
          if (err) {
            console.log(err);
            throw err;
          }
          bcrypt.hash(password, salt).then(hash =>
            db
              .query("INSERT INTO users (username, password) VALUES (?,?)", [
                username,
                hash
              ])
              .then(dbResults => {
                console.log(dbResults);
                res.sendStatus(200);
              })
              .catch(e => res.sendStatus(500))
          );
        });
      }
    });
  } else {
    res.status(400).json({error: "Incorrect username or password. Username hast to be more than 3 characters long nad password more than 6 characters long"});
  }
});

//GET /api/
//passport logout
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

module.exports = router;
