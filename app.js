const express = require("express");
const cors = require("cors");
const getUser = require("./controllers/getusers.controller");
const app = express();
const db = require("./connection");

app.use(cors());
app.use(express.json());

app.get("/api/users", getUser);

module.exports = app;
