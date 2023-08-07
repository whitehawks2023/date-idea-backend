// ORIGINAL
// const { user } = require("./selectUsers.model");

// const updateUser = (username, first_name, last_name, email, avatar) => {
//   const detailsObj = {};

//   if (first_name !== undefined) {
//     detailsObj.first_name = first_name;
//   }
//   if (last_name !== undefined) {
//     detailsObj.last_name = last_name;
//   }
//   if (email !== undefined) {
//     detailsObj.email = email;
//   }
//   if (avatar !== undefined) {
//     detailsObj.avatar = avatar;
//   }

//   return user
//     .updateOne({ username: username }, detailsObj)
//       .then((updatedUser) => {
//       return updatedUser;
//     });
// };

// module.exports = updateUser;

// NEW UPDATE PASSWORD
const { user } = require("./selectUsers.model");

const updateUser = (password) => {
  const detailsObj = {};

  if (password !== undefined) {
    detailsObj.password = password;
  }

  return user
    .updateOne({ username: username }, detailsObj)
    .then((updatedUser) => {
      return updatedUser;
    });
};

module.exports = updateUser;
