const db = require("../connection.js");
const { userIdeas } = require("./selectUserIdeas.model.js");

const createUserIdea = (
  username,
  location,
  description,
  date_type,
  price,
  latitude,
  longitude,
  opening_time,
  closing_time,
  img
) => {
  return userIdeas
    .create({
      username,
      location,
      description,
      date_type,
      price,
      latitude,
      longitude,
      opening_time,
      closing_time,
      img,
    })
    .then((response) => {
      return response;
    });
};

module.exports = createUserIdea;
