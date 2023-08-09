const db = require("../connection.js");
const { checkUserExists } = require("../utils/checkUserExists.js");
const { user } = require("./selectUsers.model.js");

const createUser = (username, password, full_name, email) => {
  if (username.length < 3) {
    return Promise.reject({
      msg: `username cannot be blank and must be at least 3 characters long`,
      customStatus: 400,
    });
  }
  if (password.length < 3) {
    return Promise.reject({
      msg: `password cannot be blank and must be at least 3 characters long`,
      customStatus: 400,
    });
  }
  if (full_name.length < 3) {
    return Promise.reject({
      msg: `full name cannot be blank and must be at least 3 characters long`,
      customStatus: 400,
    });
  }

  return checkUserExists(username).then((usernameExist) => {
    if (usernameExist) {
      return Promise.reject({
        msg: "username is already taken",
        customStatus: 403,
      });
    }
    return user
      .create({
        username,
        password,
        full_name,
        email,
      })
      .then((response) => {
        return response;
      });
  });
};

module.exports = createUser;
