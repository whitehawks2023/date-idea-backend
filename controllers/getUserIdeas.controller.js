const db = require("../connection.js");
const fs = require("fs/promises");

const selectAllUserIdeas = require("../models/selectUserIdeas.model.js");

const getUserIdeas = (req, res, next) => {
  selectAllUserIdeas().then((ideas) => {
    res.status(200).json({
      ideas,
    });
  });
};

module.exports = getUserIdeas;
