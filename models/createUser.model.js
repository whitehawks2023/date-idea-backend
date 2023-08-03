const db = require("../connection.js");
const { checkUserExists } = require("../utils/checkUserExists.js");
const { user } = require("./selectUsers.model.js");

const createUser = (username, first_name, last_name, email, age, avatar) => {
  return checkUserExists(username).then((usernameExist) => {
    if (usernameExist) {
      return Promise.reject({
        msg: "username is already taken",
        status: 403,
      });
    }
    return user
      .create({
        username,
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