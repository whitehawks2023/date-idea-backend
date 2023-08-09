const retrieveUserFavourites = require("../utils/retrieveUserFavourties");

const selectUserFavouritesByUserId = (_id, sort_by, order) => {
    return retrieveUserFavourites(_id, sort_by, order).then((userFavourites) => {
        return userFavourites
    })
};

module.exports = selectUserFavouritesByUserId;