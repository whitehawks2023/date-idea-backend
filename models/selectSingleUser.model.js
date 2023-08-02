const { user } = require("./selectUsers.model");
const selectSingleUser = (username) => {
  return user.findOne({ username }).then((userRecord) => {
    if (userRecord) return true;
    else return false;
  });
};
module.exports = { selectSingleUser };