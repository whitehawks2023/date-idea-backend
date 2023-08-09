const selectUserFavouritesByUserId = require("../models/selectUserFavouritesByUserId.model");

const getFavouritesByUserId = (req, res, next) => {
  const { sort_by, order } = req.query;
  const { _id } = req.params;
  selectUserFavouritesByUserId(_id, sort_by, order).then((userFavourites) => {
    res.status(200).json(userFavourites);
  });
};

module.exports = getFavouritesByUserId;
