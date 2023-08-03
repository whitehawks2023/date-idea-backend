const { user } = require("../models/selectUsers.model");

const selectUserById = (_id) => {
  return user.findOne({ _id }).then((singleUser) => {
    return singleUser;
  });
};

module.exports = selectUserById;
