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
  if (location.length === 0) {
    return Promise.reject({
      msg: `location cannot be blank`,
      customStatus: 400,
    });
  }
  if (description.length < 50) {
    return Promise.reject({
      msg: `description must be at least 50 characters long`,
      customStatus: 400,
    });
  }
  if (date_type.length === 0) {
    return Promise.reject({
      msg: `Date type cannot be blank`,
      customStatus: 400,
    });
  }
  if (price.length == 0) {
    return Promise.reject({
      msg: `price cannot be blank`,
      customStatus: 400,
    });
  }
  if (typeof longitude !== 'number' || typeof latitude !== 'number') {
    return Promise.reject({
      msg: `longitude and latitude must be a number`,
      customStatus: 400,
    });
  }
  if (opening_time.length === 0 || closing_time.length === 0) {
    return Promise.reject({
      msg: `Opening time and closing time cannot be blank`,
      customStatus: 400,
    });
  }
  if (img.length === 0) {
    return Promise.reject({
      msg: `Img cannot be blank`,
      customStatus: 400,
    });
  }

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
