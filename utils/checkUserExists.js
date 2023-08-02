const { user } = require("../models/selectUsers.model");

const checkUserExists = (username) => {
  return user.findOne({ username }).then((userRecord) => {
    if (userRecord) return true;
    else return false;
  });
};

module.exports = { checkUserExists };