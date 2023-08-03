const selectUserById = require("../models/selectUserById.model");

const getUserById = (req, res, next) => {
  const { _id } = req.params;
  selectUserById(_id).then((singleUser) => {
    res.status(200).send(singleUser);
  });
};

module.exports = getUserById;
