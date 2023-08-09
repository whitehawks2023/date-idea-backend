const db = require("../connection.js");
const fs = require("fs/promises");

const createUser = require("../models/createUser.model");

const postUser = (req, res, next) => {
  const { username, password, full_name, email } = req.body;
  createUser(username, password, full_name, email)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postUser;
