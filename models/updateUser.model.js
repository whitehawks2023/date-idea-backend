const { user } = require("./selectUsers.model");

const updateUser = (
  username,
  first_name,
  last_name,
  email,
  avatar,
  password
) => {
  const detailsObj = {};

  if (first_name !== undefined) {
    detailsObj.first_name = first_name;
  }
  if (last_name !== undefined) {
    detailsObj.last_name = last_name;
  }
  if (email !== undefined) {
    detailsObj.email = email;
  }
  if (avatar !== undefined) {
    detailsObj.avatar = avatar;
  }
  if (password !== undefined) {
    detailsObj.password = password;
  }

  console.log(detailsObj);
  return user
    .updateOne({ username: username }, detailsObj)
    .then((updatedUser) => {
      return updatedUser;
    });
};

module.exports = updateUser;
