const { userIdeas } = require("./selectUserIdeas.model");

const selectIdeaBySearchQuery = (
  location = "",
  sort_by = "location",
  order = "desc"
) => {
  let sortOrder;
  if (order === "desc") {
    sortOrder = -1;
  } else {
    sortOrder = 1;
  }

  return userIdeas
    .find({ location: location })
    .sort({ [sort_by]: sortOrder })
    .then((sortedIdeas) => {
      return sortedIdeas;
    });
};

module.exports = selectIdeaBySearchQuery;
