const { userIdeas } = require("./selectUserIdeas.model");

const updateUserIdea = (_id, location, date_type, price, opening_time, closing_time, img) => {
  const detailsObj = {};

  if (location !== undefined) {
    detailsObj.location = location;
  }
  if (date_type !== undefined) {
    detailsObj.date_type = date_type;
  }
  if (price !== undefined) {
    detailsObj.price = price;
  }
  if (opening_time !== undefined) {
    detailsObj.opening_time = opening_time;
  }
  if (closing_time !== undefined) {
    detailsObj.closing_time = closing_time;
  }
  if (img !== undefined) {
    detailsObj.img = img;
  }
  return userIdeas
    .updateOne({ _id: _id }, detailsObj)
      .then((updatedUser) => {
      return updatedUser;
    });
};

module.exports = updateUserIdea;
