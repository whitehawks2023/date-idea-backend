const createUserFavouriteIdea = require("../models/createUserFavouriteIdea.model");

const postUserFavouriteIdea = (req, res, next) => {
  const { _id } = req.params;
  const { user_id } = req.params;
  createUserFavouriteIdea(_id, user_id).then((ideaFaved) => {
    res.status(200).json(ideaFaved);
  });
};

module.exports = postUserFavouriteIdea;
