const Strategy = require('passport-http').Strategy

module.exports = passport => {
    passport.use(new Strategy((username, password, cb) => {
        db.query('SELECT id, username, password FROM users WHERE username = ?', [username]).then(dbResults => {
      
          if(dbResults.length == 0)
          {
            return cb(null, false);
          }
      
          bcrypt.compare(password, dbResults[0].password).then(bcryptResult => {
            if(bcryptResult == true)
            {
              cb(null, dbResults[0]);
            }
            else
            {
              return cb(null, false);
            }
          })
      
        }).catch(dbError => cb(err))
      }));
}