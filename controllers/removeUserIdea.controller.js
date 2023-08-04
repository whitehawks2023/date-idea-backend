const deleteUserIdea = require("../models/deleteUserIdea.model");

const removeUserIdea = (req, res, next) => {
  const { _id } = req.params;

  deleteUserIdea(_id)
    .then((deleteUser) => {
      res.status(204).json({ deleteUser });
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = removeUserIdea;
