const createUserIdea = require("../models/createUserIdea.model");

const postUserIdea = (req, res, next) => {
  const {
    username,
    title,
    location,
    address,
    description,
    type,
    price,
    latitude,
    longitude,
    opening_time,
    closing_time,
    image_url,
  } = req.body;
  createUserIdea(
    username,
    title,
    location,
    address,
    description,
    type,
    price,
    latitude,
    longitude,
    opening_time,
    closing_time,
    image_url
  )
    .then((createdUserIdea) => {
      res.status(201).json(createdUserIdea);
    })
    .catch((err) => {
      next(err);
    });
};

module.exports = postUserIdea;
