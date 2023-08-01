const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
});

const user = mongoose.model("users", usersSchema);

const selectAllUsers = () => {
  return user.find({}).then((usersData) => {
    return usersData
  });
};

module.exports = selectAllUsers;
