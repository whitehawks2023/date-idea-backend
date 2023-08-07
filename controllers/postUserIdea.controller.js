const createUserIdea = require("../models/createUserIdea.model");

const postUserIdea = (req, res, next) => {
  const {
    username,
    location,
    description,
    type,
    price,
    latitude,
    longitude,
    opening_time,
    closing_time,
    img,
  } = req.body;
  createUserIdea(
    username,
    location,
    description,
    type,
    price,
    latitude,
    longitude,
    opening_time,
    closing_time,
    img
  )
    .then((createdUserIdea) => {
      res.status(201).json(createdUserIdea);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postUserIdea;
