const express = require("express");
const cors = require("cors");
const getUser = require("./controllers/getUsers.controller");
const getUserIdeas = require("./controllers/getUserIdeas.controller");
const postUser = require("./controllers/postUser.controller");
const postUserIdea = require("./controllers/postUserIdea.controller");
const removeUser = require("./controllers/removeUser.controller");
const removeUserIdea = require("./controllers/removeUserIdea.controller");

const app = express();
const db = require("./connection");
const {
  handleMongoDbErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errorHandler");
const patchUser = require("./controllers/patchUser.controller");

app.use(cors());
app.use(express.json());

app.get("/api/users", getUser);
app.get("/api/user_ideas", getUserIdeas);

app.post("/api/user", postUser);
app.post("/api/user_ideas", postUserIdea);

app.delete("/api/user/:username", removeUser)
app.delete("/api/user_ideas/:_id", removeUserIdea)

app.patch("/api/user/:username", patchUser)

app.use(handleMongoDbErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

module.exports = app;
