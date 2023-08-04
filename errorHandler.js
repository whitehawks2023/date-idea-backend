exports.handleMongoDbErrors = (err, req, res, next) => {
  if (err.customStatus) {
    res.status(err.customStatus).json({ msg: err.msg });
  } else if (err.statusCode === 400) {
    res.status(400).json({ msg: "Bad request" });
  } else if (err.messageFormat === undefined) {
    res.status(404).json({ msg: "Not found" });
  } else {
    next(err);
  }
};

exports.handleCustomErrors = (err, req, res, next) => {
  next(err);
};
exports.handleServerErrors = (err, req, res, next) => {};
