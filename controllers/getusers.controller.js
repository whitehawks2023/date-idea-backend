const selectAllUsers = require("../models/users.models");

const getUser = (req, res, next) => {
  selectAllUsers().then((users) => {});
};

module.exports = getUser;
