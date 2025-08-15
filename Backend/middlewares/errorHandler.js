const errorHandler = (error, req, res, next) => {
  let code = res.code ? res.code : 500;
  let message = error.message;

  // Handle MongoDB duplicate key error
  if (error.code === 11000) {
    code = 400;
    message = "Email already exists";
  }

  res.status(code).json({ code, status: false, message, stack: error.stack });
};

module.exports = errorHandler;
