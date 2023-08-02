const db = require("../connection.js");
const { user, selectAllUsers } = require("./selectUsers.model.js");

const createUser = (username, first_name, last_name, email, age, avatar) => {
  selectAllUsers().then((users) => {
    users.forEach((user) => {
      if (user.username === username) {
        return Promise.reject({
          msg: "username is already taken",
          status: 403,
        });
      } else {
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
      }
    });
  });
};

module.exports = createUser;
