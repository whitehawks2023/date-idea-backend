const db = require("../connection.js");
const mongoose = require("mongoose");
const { user } = require("./users.model.js");

const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
});

const createUser = (first_name, last_name, age) => {
  user
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
