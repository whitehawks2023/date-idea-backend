const selectUserIdeaById = require("../models/selectUserIdeaById.model");

const getUserIdeasById = (req, res, next) => {
  const { _id } = req.params;
  selectUserIdeaById(_id).then((userIdea) => {
    res.status(200).send(userIdea);
  });
};

module.exports = getUserIdeasById;
