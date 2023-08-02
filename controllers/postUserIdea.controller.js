const createUserIdea = require("../models/createUserIdea.model");

const postUserIdea = (req, res, next) => {
  const { username, location, description, date_type, price_pp, opening_time, closing_time, img } = req.body;
  createUserIdea(username, location, description, date_type, price_pp, opening_time, closing_time, img).then((createdUserIdea) => {
    res.status(201).json(createdUserIdea);
  });
};

module.exports = postUserIdea;
