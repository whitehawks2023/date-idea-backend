const retrieveUserIdea = require("../utils/retrieveUserIdea");
const { user } = require("../models/selectUsers.model");

const createUserFavouriteIdea = async (_id, user_id) => {
    const favedIdea = await retrieveUserIdea(_id);
  return user
    .findByIdAndUpdate(
      user_id,
      { $push: { favourites: favedIdea } },
      { new: true }
    )
      .then((updatedUser) => {
      return updatedUser;
    });
};

module.exports = createUserFavouriteIdea;
