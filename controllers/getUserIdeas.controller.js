const db = require("../connection.js");
const fs = require("fs/promises");

const selectAllUserIdeas = require("../models/userIdeas.model.js");

const getUserIdeas = (req, res, next) => {
  selectAllUserIdeas().then((ideas) => {
    console.log('ideas', ideas);
    res.status(200).json({
      ideas,
    });
  });
};

module.exports = getUserIdeas;
