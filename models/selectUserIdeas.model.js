const db = require("../connection.js");
const mongoose = require("mongoose");
const usersSchema = new mongoose.Schema(
  {
    username: { type: String, required: true },
    address: { type: String, required: true },
    title: { type: String, required: true },
    location: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    price: { type: Number, required: true },
    longitude: { type: Number, required: true },
    latitude: { type: Number, required: true },
    opening_time: { type: String, required: true },
    closing_time: { type: String, required: true },
    image_url: { type: String, required: true },
  },
  { versionKey: false }
);

const userIdeas = mongoose.model("user_ideas", usersSchema);

const selectUserIdeas = (sort_by = "location", order = "desc") => {
  let sortOrder;
  if (order === "desc") {
    sortOrder = -1;
  } else {
    sortOrder = 1;
  }


  return userIdeas
    .find({})
    .sort({ [sort_by]: sortOrder })
    .then((userIdeas) => {
      return userIdeas;
    });
};

module.exports = { selectUserIdeas, userIdeas };
