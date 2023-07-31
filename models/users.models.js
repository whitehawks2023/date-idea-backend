const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  _id: { type: Object, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
});
const user = mongoose.model("user", usersSchema);

const selectAllUsers = () => {
  return user.find({}).limit(10);
};

module.exports = selectAllUsers;
