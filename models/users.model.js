const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  age: { type: Number, required: true },
});

const user = mongoose.model("users", usersSchema);

const selectAllUsers = () => {
  return user.find({}).then((usersData) => {
    console.log(usersData, 'usersData information');
    return usersData;
  });
};


module.exports = { selectAllUsers, user };
