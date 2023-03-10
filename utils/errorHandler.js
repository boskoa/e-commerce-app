function errorHandler(error, req, res, next) {
  console.log("ERROR", error.name, error.message);

  next();
}

module.exports = { errorHandler };
