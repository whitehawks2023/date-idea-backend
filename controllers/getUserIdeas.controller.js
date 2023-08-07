const db = require("../connection.js");
const fs = require("fs/promises");

const { selectUserIdeas } = require("../models/selectUserIdeas.model.js");
const getUserIdeas = (req, res, next) => {
  const { sort_by, order } = req.query;
  selectUserIdeas(sort_by, order)
    .then((ideas) => {
      res.status(200).json({
        ideas,
      });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = getUserIdeas;
