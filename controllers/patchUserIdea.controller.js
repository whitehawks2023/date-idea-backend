const updateUserIdea = require("../models/updateUserIdea.model");

const patchUserIdea = (req, res, next) => {
  const { _id } = req.params;

  const { location, date_type, price, opening_time, closing_time, img } = req.body;
  updateUserIdea(_id, location, date_type, price, opening_time, closing_time, img).then(
      (updatedIdea) => {
      res.status(200).json(updatedIdea);
    }
  );
};

module.exports = patchUserIdea;
