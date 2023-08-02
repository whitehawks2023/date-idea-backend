const createUser = require("../models/createUser.model");

const postUser = (req, res, next) => {
  const { first_name, last_name, age } = req.body;
  createUser(first_name, last_name, age).then((createdUser) => {
    res.status(201).json(createdUser);
  });
};

module.exports = postUser;
