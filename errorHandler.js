exports.handleMongoDbErrors = (err, req, res, next) => {
  next(err);
};
exports.handleCustomErrors = (err, req, res, next) => {
  next(err);
};
exports.handleServerErrors = (err, req, res, next) => {};
