const express = require("express");
const cors = require("cors");
const getUser = require("./controllers/getUsers.controller");
const getUserIdeas = require("./controllers/getUserIdeas.controller");
const postUser = require("./controllers/postUser.controller");
const postUserIdea = require("./controllers/postUserIdea.controller");
const removeUser = require("./controllers/removeUser.controller");
const removeUserIdea = require("./controllers/removeUserIdea.controller");
const patchUser = require("./controllers/patchUser.controller");
const patchUserIdea = require("./controllers/patchUserIdea.controller");
const getUserIdeasById = require("./controllers/getUserIdeaById.controller");
const getUserById = require("./controllers/getUserById.controller");
const getIdeaBySearchQuery = require("./controllers/getIdeaBySearchQuery.controller");

const app = express();
const db = require("./connection");
const {
  handleMongoDbErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./errorHandler");

app.use(cors());
app.use(express.json());

app.get("/api/users", getUser);
app.get("/api/users/:_id/:password", getUserById);
app.get("/api/user_ideas/:_id", getUserIdeasById);
app.get("/api/user_ideas", getUserIdeas);
app.get("/api/search", getIdeaBySearchQuery);

app.post("/api/users", postUser);
app.post("/api/user_ideas", postUserIdea);

app.delete("/api/users/:username", removeUser);
app.delete("/api/user_ideas/:_id", removeUserIdea);

app.patch("/api/users/:username", patchUser);
app.patch("/api/user_ideas/:_id", patchUserIdea);

app.use(handleMongoDbErrors);
app.use(handleCustomErrors);
app.use(handleServerErrors);

app.all("*", (req, res) => {
  res.status(404).send({ msg: "Not found" });
});

module.exports = app;
