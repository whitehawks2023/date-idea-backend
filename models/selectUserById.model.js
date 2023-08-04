const { user } = require("../models/selectUsers.model");

const selectUserById = (_id, password) => {
  return user.findOne({ _id, password }).then((singleUser) => {
    if (singleUser === null)
      return Promise.reject({ customStatus: 400, msg: "Bad request" });
    return singleUser;
  });
};

module.exports = selectUserById;
