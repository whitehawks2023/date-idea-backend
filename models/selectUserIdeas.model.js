const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    date_type: { type: String, required: true },
    price: { type: Number, required: true },
    longtitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    opening_time: { type: String, required: true },
    closing_time: { type: String, required: true },
    img: { type: String, required: true },
  },
  { versionKey: false }
);

const userIdeas = mongoose.model("user_ideas", usersSchema);

const selectUserIdeas = () => {
  return userIdeas.find({}).then((userIdeasData) => {
    return userIdeasData;
  });
};

module.exports = { selectUserIdeas, userIdeas };
