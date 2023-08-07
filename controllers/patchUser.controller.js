const updateUser = require("../models/updateUser.model");

const patchUser = (req, res, next) => {
  const { username } = req.params;
  const { first_name, password, last_name, email, avatar } = req.body;
  updateUser(username, first_name, last_name, email, avatar, password).then(
    (updatedUser) => {
      res.status(200).json(updatedUser);
    }
  );
};

module.exports = patchUser;
