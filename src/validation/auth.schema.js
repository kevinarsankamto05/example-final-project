const { body } = require("express-validator");

module.exports = {
  login: [
    body("email").notEmpty().isEmail().withMessage("Email not valid"),
    body("password").notEmpty().withMessage("password is required"),
  ],
};
