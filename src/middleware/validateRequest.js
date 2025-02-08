const { body, validationResult } = require('express-validator');

const validateCustomer = [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('mobileNumber')
    .trim()
    .matches(/^\+?[1-9]\d{1,14}$/)
    .withMessage('Invalid mobile number'),
  body('email')
    .trim()
    .isEmail()
    .withMessage('Invalid email address'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

module.exports = {
  validateCustomer,
};
