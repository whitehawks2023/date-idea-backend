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
  if (username.length < 3 || password.length < 3) {
    return Promise.reject({
      msg: "username must be at least 3 characters long",
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
