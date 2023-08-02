const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema({
  username: { type: String, required: true },
  location: { type: String, required: true },
  description: { type: String, required: true },
  date_type: { type: String, required: true },
  price_pp: { type: Number, required: true },
  opening_time: { type: String, required: true },
  closing_time: { type: String, required: true },
  img: { type: String, required: true },
});

const user_ideas = mongoose.model("user_ideas", usersSchema);

const selectAllUserIdeas = () => {
  return user_ideas.find({}).then((userIdeasData) => {
    return userIdeasData
  });
};

module.exports = selectAllUserIdeas;
