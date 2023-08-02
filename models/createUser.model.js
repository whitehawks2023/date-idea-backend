const db = require("../connection.js");
const { selectSingleUser } = require("./selectSingleUser.model.js");
const { user } = require("./selectUsers.model.js");
const createUser = (username, first_name, last_name, email, age, avatar) => {
  return selectSingleUser(username).then((usernameExist) => {
    console.log(usernameExist, "evaluation");
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