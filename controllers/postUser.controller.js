const db = require("../connection.js");
const fs = require("fs/promises");

const createUser = require("../models/createUser.model");

const postUser = (req, res, next) => {
  const { username, password, first_name, last_name, email, age, avatar } = req.body;
  createUser(username, password, first_name, last_name, email, age, avatar)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postUser;
