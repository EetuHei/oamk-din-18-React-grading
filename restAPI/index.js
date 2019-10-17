//server

//get all tools we need
const express = require("express");
const app = express();
const port = 4000;
const passport = require("passport");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
// const cors = require("cors");
const morgan = require("morgan");
const session = require("express-session");

//db config
const db = require("./config/database/database");

//router files
const users = require("./routes/api/users");

//passport config
require("./config/passport/passport");
app.use(passport.initialize());

//set up express application
app.use(morgan("short")); //log every request to console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser.json()); //get info from html forms
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(
//   session({
//     secret: "potato",
//     resave: true,
//     saveUninitialized: true
//   })
// );
// app.use(passport.session());

//routes
app.use("/api/", users);

//launch
Promise.all([
  db.query(`CREATE TABLE IF NOT EXISTS users(
            id INT AUTO_INCREMENT PRIMARY KEY,
            username VARCHAR(32) UNIQUE,
            password VARCHAR(256)
        )`)
  // Add more table create statements if you need more tables
])
  .then(() => {
    console.log("database initialized");
    app.listen(port, () => {
      console.log(`Example API listening on http://localhost:${port}\n`);
    });
  })
  .catch(error => console.log(error));

// app.use(express.static("./public")); //
