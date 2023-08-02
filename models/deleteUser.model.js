const { user } = require("./selectUsers.model");

const deleteUser = (username) => {
  return user.deleteOne({ username }).then((deletedUser) => {
    return deletedUser;
  });
};

module.exports = deleteUser;
