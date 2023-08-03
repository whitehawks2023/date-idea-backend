const {userIdeas} = require("./selectUserIdeas.model.js");

const deleteUserIdea = (_id) => {
    return userIdeas.deleteOne({ _id }).then((deletedIdea) => {
        return deletedIdea;
    });
};

module.exports = deleteUserIdea;
