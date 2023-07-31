const db = require("../connection.js");
const fs = require("fs/promises");

const selectAllUsers = require("../models/users.models");

const getUser = (req, res, next) => {
  selectAllUsers().then((users) => {
    console.log(users);
  });
};

module.exports = getUser;
