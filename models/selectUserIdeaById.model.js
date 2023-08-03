const { userIdeas } = require("./selectUserIdeas.model");

const selectUserIdeaById = (_id) => {
  return userIdeas.findOne({ _id }).then((userIdea) => {
    return userIdea;
  });
};

module.exports = selectUserIdeaById;
