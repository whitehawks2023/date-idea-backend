const db = require("../connection.js");
const {user} = require("./selectUsers.model.js");

const createUser = (first_name, last_name, age) => {
  return user
    .create({
      first_name: first_name,
      last_name: last_name,
      age: age,
    })
    .then((response) => {
      return response;
    });
};

module.exports = createUser;
