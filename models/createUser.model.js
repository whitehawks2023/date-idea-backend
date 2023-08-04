const db = require("../connection.js");
const { checkUserExists } = require("../utils/checkUserExists.js");
const { user } = require("./selectUsers.model.js");

const createUser = (
  username,
  password,
  first_name,
  last_name,
  email,
  age,
  avatar
) => {
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
  if (first_name.length < 3) {
    return Promise.reject({
      msg: `first name cannot be blank and must be at least 3 characters long`,
      customStatus: 400,
    });
  }
  if (last_name.length < 2) {
    return Promise.reject({
      msg: `last name cannot be blank and must be at least 3 characters long`,
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
        first_name,
        last_name,
        email,
        age,
        avatar,
      })
      .then((response) => {
        return response;
      });
  });
};

module.exports = createUser;
