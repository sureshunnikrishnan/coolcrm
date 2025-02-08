const express = require('express');
const router = express.Router();
const { validateCustomer } = require('../middleware/validateRequest');
const {
  createCustomer,
  getCustomers,
  getCustomerById,
} = require('../controllers/customerController');

router.post('/', validateCustomer, createCustomer);
router.get('/', getCustomers);
router.get('/:id', getCustomerById);

module.exports = router;
