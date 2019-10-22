// const passport = require("passport");
const bcrypt = require("bcryptjs");
const db = require("./database/database");
var LocalStrategy = require("passport-local").Strategy;

module.exports = function(passport) {
  passport.use(
    new LocalStrategy((username, password, cb, err) => {
      db.query("SELECT id, username, password FROM users WHERE username = ?", [
        username
      ])
        .then(results => {
          if (results.length === 0) {
            return cb(null, false);
          }
          
          bcrypt.compare(password, results[0].password).then(bcryptResult => {
            if (bcryptResult === true) {
              cb(null, results[0]);
            } else {
              return cb(null, false);
            }
          });
        })
        .catch(dbError => cb(err));
    })
  );

  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {

    done(null, user.id);
  });

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    db.query("SELECT * FROM users WHERE id = " + id, function(err, rows) {
      done(err, rows[0]);
    });
  });
};
