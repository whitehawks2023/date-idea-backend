const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    password: { type: String, required: true },
    full_name: { type: String, required: true },
    email: { type: String, required: true },
    favourites: [{ type: Object, required: false }],
  },
  { versionKey: false }
);

const user = mongoose.model("users", usersSchema);

const selectAllUsers = () => {
  return user.find({}).then((usersData) => {
    return usersData;
  });
};

module.exports = { selectAllUsers, user };
