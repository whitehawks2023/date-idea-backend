const { user } = require("../models/selectUsers.model");

const retrieveUserFavourites = (_id, sort_by = "location", order = "desc") => {
  let sortOrder = order === "desc" ? -1 : 1;

  return user.findOne({ _id }).then((userInfo) => {
    userInfo.favourites.sort((a, b) => {
      if (typeof a[sort_by] === "string") {
        return sortOrder * a[sort_by].localeCompare(b[sort_by]);
      } else {
        return sortOrder * (a[sort_by] - b[sort_by]);
      }
    });
    return userInfo.favourites;
  });
};

module.exports = retrieveUserFavourites;
