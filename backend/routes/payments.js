const express = require('express');
const {
  createOrder,
  verifyPayment,
  getPayments,
  getMyPayments,
} = require('../controllers/payments');
const Payment = require('../models/Payment');
const advancedResults = require('../middleware/advancedResults');

const router = express.Router();

const { protect, authorize } = require('../middleware/auth');

router.route('/order').post(protect, createOrder);
router.route('/verify').post(protect, verifyPayment);
router.route('/mypayments').get(protect, getMyPayments);

router
  .route('/')
  .get(protect, authorize('Admin'), advancedResults(Payment), getPayments);

module.exports = router;
