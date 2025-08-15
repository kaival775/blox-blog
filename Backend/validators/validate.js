const { validationResult } = require("express-validator");

const validate = (req, res, next) => {
  const errors = validationResult(req);
  const mappedErrors = {};

  if (errors.isEmpty()) {
    next();
  } else {
    errors.errors.map((error) => {
      mappedErrors[error.path] = error.msg;
    });
    res.status(400).json({ code: 400, status: false, message: mappedErrors });
  }
};

module.exports = validate;
