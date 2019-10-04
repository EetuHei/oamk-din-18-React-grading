const express = require("express");
const app = express();
const port = 3003;
const sequelize = require("sequelize");
const bodyParse = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");


app.use(morgan("short"));
app.use(express.static("./public"));
app.use(bodyParser.json());