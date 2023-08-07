const selectIdeaBySearchQuery = require("../models/selectIdeaBySearchQuery.model");

const getIdeaBySearchQuery = (req, res, next) => {
  const { location, sort_by, order } = req.query;
  selectIdeaBySearchQuery(location, sort_by, order).then((sortedIdeas) => {
    res.status(200).json(sortedIdeas);
  });
};

module.exports = getIdeaBySearchQuery;
