const asyncHandler = require('express-async-handler');
const Razorpay = require('razorpay');
const Payment = require('../models/Payment');
const User = require('../models/User');
const crypto = require('crypto');

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// @desc      Create a payment order
// @route     POST /api/v1/payments/order
// @access    Private
exports.createOrder = asyncHandler(async (req, res, next) => {
  const { amount, currency, receipt } = req.body;

  const options = {
    amount: amount * 100, // amount in the smallest currency unit
    currency,
    receipt,
  };

  const order = await razorpay.orders.create(options);

  if (!order) {
    return res.status(400).json({ success: false, msg: 'Could not create order' });
  }

  const payment = await Payment.create({
    user: req.user.id,
    amount: amount,
    razorpay_order_id: order.id,
  });

  res.status(200).json({
    success: true,
    data: order,
  });
});

// @desc      Verify a payment
// @route     POST /api/v1/payments/verify
// @access    Private
exports.verifyPayment = asyncHandler(async (req, res, next) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  const body = razorpay_order_id + '|' + razorpay_payment_id;

  const expectedSignature = crypto
    .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest('hex');

  const isAuthentic = expectedSignature === razorpay_signature;

  if (isAuthentic) {
    // Database comes here
    const payment = await Payment.findOneAndUpdate(
      { razorpay_order_id },
      {
        razorpay_payment_id,
        razorpay_signature,
        status: 'captured',
      },
      { new: true }
    );

    const user = await User.findById(payment.user);
    user.membershipStatus = 'Active';
    user.lastPaymentDate = new Date();
    await user.save();

    res.redirect(`/paymentsuccess?reference=${razorpay_payment_id}`);
  } else {
    res.status(400).json({
      success: false,
    });
  }
});

// @desc      Get all payments
// @route     GET /api/v1/payments
// @access    Private/Admin
exports.getPayments = asyncHandler(async (req, res, next) => {
  res.status(200).json(res.advancedResults);
});

// @desc      Get my payments
// @route     GET /api/v1/payments/mypayments
// @access    Private
exports.getMyPayments = asyncHandler(async (req, res, next) => {
  const payments = await Payment.find({ user: req.user.id });

  res.status(200).json({
    success: true,
    count: payments.length,
    data: payments,
  });
});
