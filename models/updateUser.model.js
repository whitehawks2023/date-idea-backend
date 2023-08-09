const { user } = require("./selectUsers.model");

const updateUser = (username, full_name, email, password) => {
  const detailsObj = {};


  
  if (full_name !== undefined) {
    detailsObj.full_name = full_name;
  }

  if (email !== undefined) {
    detailsObj.email = email;
  }

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
