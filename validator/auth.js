const { body } = require('express-validator');
exports.userRegisterValidator = [
  body("name")
    .not()
    .isEmpty()
    .withMessage('Name is Required'),
  body("email")
    .isEmail()
    .withMessage('Must be valid email address'),
  body("password")
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters long')
]