const db = require("../connection.js");
const fs = require("fs/promises");

const {selectUserIdeas} = require("../models/selectUserIdeas.model.js");

const getUserIdeas = (req, res, next) => {
  selectUserIdeas().then((ideas) => {
    res.status(200).json({
      ideas,
    });
  });
};

module.exports = getUserIdeas;
