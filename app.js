const express = require("express");
const cors = require("cors");
const getUser = require("./controllers/getUsers.controller");
const getUserIdeas = require("./controllers/getUserIdeas.controller");
const app = express();
const db = require("./connection");
const postUser = require("./controllers/postUser.controller");

app.use(cors());
app.use(express.json());

app.get("/api/user", getUser);

app.get("/api/user_ideas", getUserIdeas);

app.post("/api/user", postUser);

module.exports = app;
