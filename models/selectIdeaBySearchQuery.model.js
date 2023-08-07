const { userIdeas } = require("./selectUserIdeas.model");

const selectIdeaBySearchQuery = (sort_by = "location", order = "desc") => {
  let sortOrder;
  if (order === "desc") {
    sortOrder = -1;
  } else {
    sortOrder = 1;
  }

  return userIdeas
    .find({})
    .sort({ [sort_by]: sortOrder })
    .then((sortedIdeas) => {
      return sortedIdeas
    });
};

module.exports = selectIdeaBySearchQuery;
