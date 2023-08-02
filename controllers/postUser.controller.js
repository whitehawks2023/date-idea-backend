const createUser = require("../models/createUser.model");

const postUser = (req, res, next) => {
  const { username, first_name, last_name, email, age, avatar } = req.body;
  createUser(username, first_name, last_name, email, age, avatar)
    .then((createdUser) => {
      res.status(201).json(createdUser);
    })
    .catch((err) => {
      console.log(err, 'err <----');
      next(err);
    });
};

module.exports = postUser;
