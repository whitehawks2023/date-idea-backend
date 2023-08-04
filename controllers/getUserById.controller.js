const selectUserById = require("../models/selectUserById.model");

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  const { password } = req.params;
  selectUserById(_id, password).then((singleUser) => {
    res.status(200).send(singleUser);
  }).catch((err) => {
    next(err);
  });
};

module.exports = getUserById;
