const deleteUser = require("../models/deleteUser.model");

const removeUser = (req, res, next) => {
  const { username } = req.params;
  deleteUser(username)
    .then((deleteUser) => {
      res.status(204).json({ deleteUser });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = removeUser;
