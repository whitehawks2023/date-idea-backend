const updateUser = require("../models/updateUser.model");

const patchUser = (req, res, next) => {
  const { username } = req.params;
  const { full_name, password, email } = req.body;
  updateUser(username, full_name, email, password).then(
    (updatedUser) => {
      res.status(200).json(updatedUser);
    }
  );
};

module.exports = patchUser;
