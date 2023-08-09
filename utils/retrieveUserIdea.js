const { userIdeas } = require("../models/selectUserIdeas.model");

const retrieveUserIdea = (_id) => {
    return userIdeas.findOne({ _id }).then((userIdea) => {
        return userIdea;
      });
};

module.exports = retrieveUserIdea;