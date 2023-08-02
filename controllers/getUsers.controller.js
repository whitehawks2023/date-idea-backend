const db = require("../connection.js");
const fs = require("fs/promises");

const { selectAllUsers } = require("../models/users.model.js");

const getUser = (req, res, next) => {
  selectAllUsers().then((users) => {
    res.status(200).json({
      users,
    });
  });
};

module.exports = getUser;
